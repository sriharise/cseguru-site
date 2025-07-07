// File: app/trainings/TrainingsPageClient.tsx
"use client";

import { useEffect, useState } from "react";
import PlaylistCard from "./PlaylistCard";

interface Playlist {
  id: string;
  title: string;
  videos: any[];
}

const fetchPlaylists = async (): Promise<Playlist[]> => {
  try {
    const res = await fetch("/api/playlists");
    const data = await res.json();
    return data.playlists || [];
  } catch {
    return [];
  }
};

export default function TrainingsPageClient() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlaylists().then(setPlaylists);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      visibleCount < playlists.length &&
      !loading
    ) {
      setLoading(true);
      setTimeout(() => {
        setVisibleCount((prev) => prev + 6);
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, playlists.length, loading]);

  return (
    <section className="p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-purple-800">Explore Our Video Playlists</h1>
        <p className="text-gray-600 mt-2">
          Curated tutorials and training videos categorized by subject for students and teachers.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {playlists.slice(0, visibleCount).map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>

      {loading && (
        <p className="text-center mt-6 text-sm text-gray-500">Loading more playlists...</p>
      )}
    </section>
  );
}
