import PlaylistVideosClient from "./PlaylistVideosClient";

export const dynamic = "force-dynamic"; // Optional: for fresh fetch every time

export async function generateMetadata(
  { params }: { params: { id: string } }
) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId = params.id;

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${apiKey}`
    );
    const data = await res.json();
    const title = data?.items?.[0]?.snippet?.title || "Playlist";

    return {
      title: `${title} | CSE Guru Trainings`,
      description: `Watch training videos from the playlist: ${title}`,
    };
  } catch {
    return {
      title: "CSE Guru Trainings",
      description: "Explore our educational video playlists.",
    };
  }
}

export default function Page({ params }: { params: { id: string } }) {
  return <PlaylistVideosClient playlistId={params.id} />;
}
