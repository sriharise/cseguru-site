"use client";
import { useEffect, useState } from "react";
import YouTubeCard from "@/components/YouTubeCard";
import { Play } from "lucide-react";

export default function PlaylistVideosClient({ playlistId }: { playlistId: string }) {
  const [videos, setVideos] = useState<any[]>([]);
  const [playlistTitle, setPlaylistTitle] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(`/api/playlist/${playlistId}`);
      const data = await res.json();
      setVideos(data.videos || []);
    };

    const fetchTitle = async () => {
      const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${apiKey}`
      );
      const data = await res.json();
      const title = data.items?.[0]?.snippet?.title || "Playlist";
      setPlaylistTitle(title);
    };

    fetchVideos();
    fetchTitle();
  }, [playlistId]);

  return (
    <section className="p-6">
        <div className="sticky top-[80px] z-40 bg-white p-2 md:px-6 flex justify-end">
            <a
                href="/trainings"
                className="text-sm text-white font-semibold bg-purple-800 border border-purple-300 px-3 py-1 rounded hover:bg-purple-100 hover:text-purple-800 transition"
            >
                ← Back
            </a>
        </div>
      <h1 className="text-2xl font-bold text-center mb-6">{playlistTitle}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos
          .filter((v) => v && v.snippet)
          .map((video, idx) => (
            <YouTubeCard key={idx} video={video} />
          ))}
      </div>
      {videos.length >= 40 && playlistId && (
        <div className="mt-10 flex justify-center">
            <a
            href={`https://www.youtube.com/playlist?list=${playlistId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow hover:bg-red-700 transition"
            >
            <Play className="w-4 h-4 text-white" />
            View Full Playlist on YouTube
            </a>
        </div>
      )}
    </section>
  );
}
