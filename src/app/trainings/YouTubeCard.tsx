// File: app/components/YouTubeCard.tsx
"use client";
import { PlayCircle } from "lucide-react";

interface VideoCardProps {
  video: {
    id: string;
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
  const title = video.snippet?.title || "Untitled Video";
  const description = video.snippet?.description || "No description available.";
  const thumbnailUrl = video.snippet?.thumbnails?.medium?.url || "/fallback-thumbnail.jpg";
  const watchDuration = getWatchHours(video.contentDetails?.duration);

  return (
    <div className="bg-white text-black rounded-lg shadow p-5 h-full flex flex-col gap-6 m-4">
      <h3 className="text-md font-bold text-center text-black">
        {title.length > 30 ? title.slice(0, 27) + "..." : title}
      </h3>

      <div className="relative">
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 bg-white bg-opacity-80 rounded-full p-1 hover:opacity-70"
        >
            <img
            src={thumbnailUrl}
            alt={title}
            className="rounded-md w-full"
            />
          
        </a>
        {watchDuration && (
          <div className="text-xs pt-3 text-center  text-orange-500 text-gray-800 bg-white bg-opacity-80 rounded px-2 py-1">
            <PlayCircle className="w-3 h-3 inline" /> {watchDuration}
          </div>
        )}
      </div>

      <p className="text-xs">
        {description.length > 200 ? description.slice(0, 197) + "..." : description}
      </p>

      <a
        href={`https://www.youtube.com/watch?v=${video.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex justify-center items-center text-sm text-white rounded px-3 py-[10px] transition hover:opacity-90"
        style={{ backgroundColor: "#3C2B3E" }}
      >
        <PlayCircle className="w-4 h-4 mr-2" />
        Watch on YouTube
      </a>
    </div>
  );
}
