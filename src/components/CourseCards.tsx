// src/components/CourseCards.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string } };
  };
}

async function fetchYouTubeVideos(): Promise<Video[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const maxResults = 3;

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&maxResults=${maxResults}`,
      { next: { revalidate: 86400 } }
    );
    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error('Failed to fetch YouTube videos:', error);
    return [];
  }
}

const CourseCards = async () => {
  const videos = await fetchYouTubeVideos();

  if (!videos.length) {
    return (
      <section className="py-12 lg:mx-auto text-center">
        <h3 className="text-2xl font-bold mb-6 text-[#418B00]">Explore Course Series</h3>
        <p className="text-gray-500">No videos available at the moment. Please check back later.</p>
      </section>
    );
  }

  return (
    <section className="py-12 lg:mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center text-[#418B00]">Explore Course Series</h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {videos.map((video) => {
          const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;

          return (
            <div
              key={video.id.videoId}
              className="p-4 rounded-xl bg-white flex flex-col items-center text-center"
            >
              <h4 className="text-xl text-[16px] font-medium mb-2 text-[#8B5300]">
                {video.snippet.title.length > 50
                  ? video.snippet.title.slice(0, 50) + '...'
                  : video.snippet.title}
              </h4>
              <div className="relative mb-3">
                <Image
                  src={video.snippet.thumbnails.medium.url}
                  alt={`CSE Guru – ${video.snippet.title}`}
                  width={320}
                  height={180}
                  className="rounded"
                  loading="lazy"
                />
                <Link
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center group"
                  aria-label={`Play ${video.snippet.title}`}
                >
                  <PlayCircle className="h-12 w-12 text-white group-hover:text-[#FFBD33] transition-colors duration-300" />
                </Link>
              </div>
              <p className="text-[13px] text-gray-600 mb-4">
                {video.snippet.description.length > 200
                  ? video.snippet.description.slice(0, 200) + '...'
                  : video.snippet.description}
              </p>
              <Link
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-auto text-black px-4 py-2 rounded font-semibold text-sm bg-[#FFBD33] border border-[#FFBD33] hover:bg-transparent hover:underline"
              >
                Watch on YouTube
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CourseCards;
