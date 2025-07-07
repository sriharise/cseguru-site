"use client";
import PlaylistVideosClient from "./PlaylistVideosClient";

export default function PlaylistPageWrapper({ playlistId }: { playlistId: string }) {
  return <PlaylistVideosClient playlistId={playlistId} />;
}
