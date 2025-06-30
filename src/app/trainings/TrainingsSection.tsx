// File: app/components/TrainingsSection.tsx
"use client";

import { useEffect, useState } from "react";
import YouTubeCard from "./YouTubeCard";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

interface Video {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  contentDetails: {
    duration: string;
  };
}

interface Playlist {
  id: string;
  title: string;
  videos: Video[];
}

const GRADIENTS = [
  "bg-gradient-to-r from-orange-200 to-orange-400",
  "bg-gradient-to-r from-green-200 to-green-400",
  "bg-gradient-to-r from-sky-200 to-sky-400"
];

const TrainingsSection = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const fetchPlaylists = async () => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&maxResults=10&key=${apiKey}`
    );
    const data = await res.json();
    const playlistItems = data.items || [];

    const enrichedPlaylists = await Promise.all(
      playlistItems.map(async (playlist: any) => {
        const playlistId = playlist.id;
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=10&playlistId=${playlistId}&key=${apiKey}`
        );
        const itemsData = await res.json();
        const videoItems = itemsData.items || [];

        const videoIds = videoItems.map((v: any) => v.contentDetails.videoId).join(",");
        const videoDetailsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${apiKey}`
        );
        const videoDetailsData = await videoDetailsRes.json();

        const filteredVideos = videoDetailsData.items.filter((video: Video) => {
          const duration = video.contentDetails.duration;
          const match = duration.match(/PT(\d+)M(\d+)?S?/);
          const minutes = match ? parseInt(match[1]) : 0;
          return minutes >= 2;
        });

        return {
          id: playlistId,
          title: playlist.snippet.title,
          videos: filteredVideos.slice(0, 10),
        };
      })
    );

    const validPlaylists = enrichedPlaylists.filter((playlist) => playlist.videos.length > 0);
    setPlaylists(validPlaylists);
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <section className="space-y-12 p-4">
      {playlists.map((playlist, index) => (
        <div
          key={playlist.id}
          className={`p-6 rounded-xl text-white ${GRADIENTS[index % GRADIENTS.length]}`}
        >
          <h2 className="text-xl font-bold mb-4 text-black text-center">
            {playlist.title.length > 50
              ? playlist.title.slice(0, 47) + "..."
              : playlist.title}
          </h2>
          <Swiper
            spaceBetween={16}
            slidesPerView={1.5}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            navigation
            modules={[Navigation]}
          >
            {playlist.videos.map((video) => (
              <SwiperSlide key={video.id}>
                <YouTubeCard video={video} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </section>
  );
};

export default TrainingsSection;
