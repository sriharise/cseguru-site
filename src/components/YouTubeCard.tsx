// File: app/components/YouTubeCard.tsx
"use client";
import { PlayCircle } from "lucide-react";

interface VideoCardProps {
  video?: {
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
      videoId?: string;
    };
  };
}

function getWatchHours(duration: string | undefined): string {
  if (!duration) return "";
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";
  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");
  const totalMinutes = hours * 60 + minutes + seconds / 60;
  return `${totalMinutes.toFixed(1)} mins`;
}

export default function YouTubeCard({ video }: VideoCardProps) {
  if (!video || !video.snippet) {
    console.warn("Skipping invalid video:", video);
    return null;
  }

  const title = video.snippet.title || "Untitled Video";
  const thumbnailUrl = video.snippet.thumbnails?.medium?.url || "/fallback-thumbnail.jpg";
  const watchDuration = getWatchHours(video.contentDetails?.duration);

  const videoId = video.contentDetails?.videoId || "";
  if (!videoId) {
    console.warn("Invalid or missing videoId for:", video);
    return null;
  }

const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className="bg-white text-black rounded-lg shadow p-4 h-full flex flex-col gap-4 mb-2.5 mt-3 mx-3">
      <h3 className="text-sm font-semibold text-center text-black">
        {title}
      </h3>

      <div className="relative group">
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={thumbnailUrl}
            alt={title}
            className="rounded-md w-full"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1 group-hover:scale-110 group-hover:opacity-100 transition duration-300">
            <PlayCircle className="w-10 h-10 text-red-600 opacity-80" />
          </div>
        </a>
        {watchDuration && (
          <div className="text-xs pt-2 text-center text-orange-500 bg-white bg-opacity-80 rounded px-2 py-1">
            {watchDuration}
          </div>
        )}
      </div>
    </div>
  );
}
