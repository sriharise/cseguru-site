// ✅ PATCHED: route.ts (API: /api/playlist/[id])
// Added logging and fallback to diagnose empty video response

import { NextRequest, NextResponse } from "next/server";

// Inline helper to convert ISO8601 duration to seconds
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
  const url = new URL(request.url);
  const playlistId = url.pathname.split("/").pop() || "";

  const apiKey = process.env.YOUTUBE_API_KEY;

if (!apiKey || !playlistId) {
  console.warn("Missing API key or playlist ID");
  return NextResponse.json({ videos: [], error: "Missing API key or playlist ID" }, { status: 400 });
}

try {
  const playlistItemsRes = await fetch (
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
  );

  const playlistData = await playlistItemsRes.json();
const videoIds = (playlistData.items || [])
  .map((v: any) => v.contentDetails?.videoId)
  .filter(Boolean)
  .slice(0, 40)
  .join(",");

if (!videoIds) {
  console.warn("No video IDs extracted from playlist.");
  return NextResponse.json({ videos: [] });
}

const videoDetailsRes = await fetch(
  `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds}&key=${apiKey}`
);

const videoDetailsData = await videoDetailsRes.json();
const durations: Record<string, string> = {};
(videoDetailsData.items || []).forEach((v: any) => {
  durations[v.id] = v.contentDetails?.duration || "PT0M0S";
});

  const validVideos = (playlistData.items || []).filter((video: any) => {
  const id = video.contentDetails?.videoId;
  const duration = durations[id];
  const isValid = id && video.snippet && getVideoDurationInSeconds(duration) >= 120;
  return isValid;
});

return NextResponse.json({ videos: validVideos });
  } catch (error) {
    console.error("API error in /playlist/[id]:", error);
    return NextResponse.json({ videos: [], error: "Internal server error" }, { status: 500 });
  }
}