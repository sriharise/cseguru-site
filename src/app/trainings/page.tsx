export const metadata = {
  title: "Trainings | CSE Guru",
  description:
    "Explore high-quality computer science video trainings for students and teachers. Curated playlists from CSE Guru YouTube channel.",
  keywords:
    "CSE training videos, computer science courses, YouTube playlists, CSE Guru",
  openGraph: {
    title: "Trainings | CSE Guru",
    description:
      "High-quality curated playlists and trainings for computer science students and educators.",
    type: "website",
  },
};

import TrainingsSection from "./TrainingsSection";

export default function TrainingsPage() {
  return <TrainingsSection />;
}
