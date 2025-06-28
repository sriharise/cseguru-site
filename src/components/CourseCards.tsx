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
      <section className="py-12 max-w-[1000px] lg:mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-6">Explore Course Series</h3>
        <p className="text-gray-500">No videos available at the moment. Please check back later.</p>
      </section>
    );
  }

  return (
    <section className="py-12 max-w-[1000px] lg:mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-center">Explore Course Series</h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {videos.map((video) => {
          const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;

          return (
            <div
              key={video.id.videoId}
              className="border p-4 rounded-xl shadow hover:shadow-md transition bg-white"
            >
              <div className="relative">
                <Image $1 loading="lazy" />
                <Link href={videoUrl} target="_blank" rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <PlayCircle className="$1" aria-label={`Play ${video.snippet.title}`} />
                </Link>
              </div>
              <h4 className="text-lg font-bold mb-2 text-[#3C2B3E]">
                {video.snippet.title.length > 50
                  ? video.snippet.title.slice(0, 50) + '...'
                  : video.snippet.title}
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                {video.snippet.description.length > 80
                  ? video.snippet.description.slice(0, 80) + '...'
                  : video.snippet.description}
              </p>
              <Link href={videoUrl} target="_blank" rel="noopener noreferrer"
                className="inline-block mt-auto bg-[#FFBD33] text-black px-4 py-2 rounded font-semibold hover:underline text-sm"
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