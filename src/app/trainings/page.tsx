// File: app/trainings/page.tsx
import TrainingsPageClient from "./TrainingsPageClient";

export const metadata = {
  title: "Training Playlists | CSE Guru",
  description: "Browse our curated training playlists with tutorials and educational content tailored for students and teachers.",
};

export default function TrainingsPage() {
  return <TrainingsPageClient />;
}