// File: app/components/PlaylistCard.tsx
import Link from "next/link";

interface PlaylistCardProps {
  playlist: {
    id: string;
    title: string;
    videos: {
      snippet: {
        thumbnails: {
          medium: {
            url: string;
          };
        };
      };
    }[];
  };
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist }) => {
  const fallbackImage = "https://via.placeholder.com/320x180?text=No+Thumbnail";
  const thumbnail = playlist.videos[0]?.snippet.thumbnails.medium.url || fallbackImage;

  return (
    <div className="bg-gradient-to-br from-orange-100 to-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all p-4 space-y-4">
      <h3 className="text-lg font-bold text-center text-gray-900">
        {playlist.title.length > 50 ? playlist.title.slice(0, 47) + "..." : playlist.title}
      </h3>
      <img src={thumbnail} alt={playlist.title} className="w-full h-48 object-cover rounded-md" />
      <div className="flex justify-center">
        <Link
          href={`/trainings/${playlist.id}`}
          className="inline-block bg-purple-800 text-white px-4 py-2 text-sm rounded hover:bg-purple-600 shadow-md"
        >
          View Playlist
        </Link>
      </div>
    </div>
  );
};

export default PlaylistCard;
