// ✅ PATCHED: PlaylistGrid.tsx
// - Removed localStorage caching
// - Fetches from /api/playlists
// - Handles loading + error state
// - Displays filtered playlists

"use client";

import { useEffect, useState } from "react";
import YouTubeCard from "@/components/YouTubeCard";

interface Video {
  id?: string | { videoId?: string };
    snippet?: {
      title?: string;
      description?: string;
      thumbnails?: {
        medium?: {
          url: string;
        };
      };
    };
    contentDetails?: {
    duration?: string;
  };
}

interface Playlist {
  id: string;
  title: string;
  videos: Video[];
}

export default function PlaylistGrid() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/playlists");
      const data = await res.json();
      if (data?.playlists) {
        setPlaylists(data.playlists);
      } else {
        setError("No playlists found.");
      }
    } catch (err) {
      console.error("Error fetching playlists:", err);
      setError("Failed to load playlists.");
    } finally {
      setLoading(false);
    }
  };

  fetchPlaylists();
  }, []);

  if (loading) {
    return <div className="text-center text-sm py-6 text-gray-500">Loading playlists...</div>;
  }

  if (error) {
    return <div className="text-center text-sm py-6 text-red-500">{error}</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-12">
      {playlists.map((playlist, index) => (
        <div key={playlist.id} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">{playlist.title}</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {playlist.videos.map((video, i) => (
              <YouTubeCard key={i} video={video} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}