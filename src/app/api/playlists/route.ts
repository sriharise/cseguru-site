// ✅ PATCHED: /app/api/playlists/route.ts
// Refactored to support proper server-side caching with Cache-Control header

import { NextRequest, NextResponse } from "next/server";

function getVideoDurationInSeconds(duration: string | undefined): number {
  if (!duration) return 0;
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");
  return hours * 3600 + minutes * 60 + seconds;
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!apiKey || !channelId) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 500 });
  }
  try {
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&maxResults=50&key=${apiKey}`
    );
    const playlistData = await playlistRes.json();
    const playlists = await Promise.all(
      (playlistData.items || []).map(async (playlist: any) => {
      const playlistId = playlist.id;

      const playlistItemsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
      );
      const playlistItems = await playlistItemsRes.json();

      const videoIds = (playlistItems.items || [])
        .map((v: any) => v.contentDetails?.videoId)
        .filter(Boolean)
        .join(",");

      if (!videoIds) return null;

      const videoDetailsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${apiKey}`
      );
      const videoDetails = await videoDetailsRes.json();

      const durations: Record<string, string> = {};
      (videoDetails.items || []).forEach((v: any) => {
        durations[v.id] = v.contentDetails?.duration || "PT0M0S";
      });

      const filteredVideos = (playlistItems.items || []).filter((video: any) => {
        const id = video.contentDetails?.videoId;
        return id && video.snippet && getVideoDurationInSeconds(durations[id]) >= 120;
      });

      if (filteredVideos.length === 0) return null;

      return {
        id: playlistId,
        title: playlist.snippet?.title || "Untitled",
        videos: filteredVideos,
      };
    })
  );

  const cleanPlaylists = playlists.filter(Boolean);

  return NextResponse.json({ playlists: cleanPlaylists }, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=86400", // ✅ Server cache for 1 day
      }
    });
  } catch (error) {
    console.error("YouTube API error:", error);
    return NextResponse.json({ playlists: [] }, { status: 500 });
  }
}
