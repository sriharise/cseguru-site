export const metadata = {
  title: "About Us | CSE Guru",
  description:
    "Learn about CSE Guru — an educational platform dedicated to simplifying computer science for students and teachers. Discover our mission, vision, and story.",
  keywords: [
    "CSE Guru",
    "About CSE Guru",
    "Computer Science Education",
    "Teaching Technology",
    "CS Tutorials",
    "Learning Platform India",
    "EdTech Tamil Nadu",
  ],
  openGraph: {
    title: "About Us | CSE Guru",
    description:
      "CSE Guru is an educational platform dedicated to simplifying computer science for students and teachers. Learn about our mission and journey.",
    url: "https://www.cseguru.com/about",
    siteName: "CSE Guru",
    images: [
      {
        url: "https://www.cseguru.com/aboutus.png",
        width: 900,
        height: 285,
        alt: "About CSE Guru Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | CSE Guru",
    description:
      "Simplifying computer science education for students and teachers. Learn about CSE Guru’s story and values.",
    images: ["https://www.cseguru.com/aboutus.png"],
  },
};


export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Banner */}
      <section
  className="relative w-full h-[285px] bg-cover bg-center shadow-md"
  style={{ backgroundImage: "url('/aboutus.png')" }}
>
  <div className="absolute inset-0 flex items-center justify-center">
    <div
      className="px-5 py-4 rounded-xl text-center max-w-3xl backdrop-blur-xs"
      style={{
        backgroundColor: "rgba(59, 189, 4, 0.5)", // semi-transparent dark glass
      }}
    >
      <h1 className="text-4xl md:text-5xl text-gray-800 font-bold drop-shadow-sm">
        About CSE Guru
      </h1>
      <p className="mt-3 text-lg text-gray-800 drop-shadow-xs">
        Spark curiosity. Simplify learning. Empower future tech minds.
      </p>
    </div>
  </div>
</section>


      {/* About Content */}
      <section className="max-w-5xl mx-auto px-4 py-12 space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-700">Empowering the Next Generation of Tech Minds</h2>
          <p>
            At <strong>CSE Guru</strong>, we believe in making computer science education <em>simple, accessible, and impactful</em>.
            Whether you're a student just starting out or a teacher looking for reliable resources, we’re here to help you succeed.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-green-700">🎓 What We Do</h3>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>Curate high-quality, topic-based computer science tutorials</li>
            <li>Break down complex subjects into bite-sized lessons</li>
            <li>Provide study materials, tips, and insights from experienced educators</li>
            <li>Continuously evolve based on your feedback</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-green-700">🧑‍🏫 Why We Do It</h3>
          <p>
            Our goal is to <strong>simplify learning</strong>—not just for passing exams, but for building confidence and long-term understanding.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-green-700">📺 Where It Started</h3>
          <p>
            CSE Guru began as a passion project by a teacher–technologist couple. What started as a humble YouTube channel has become
            a learning hub, thanks to your support.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-green-700">👥 Who Is It For</h3>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>College and school students in CS/IT</li>
            <li>Teachers seeking quality reference content</li>
            <li>Anyone curious about technology and coding</li>
          </ul>
        </div>

        <div className="text-center pt-6">
          <p className="text-lg font-medium text-green-800">Let’s grow together. Subscribe. Share. Spark Curiosity with <strong>CSE Guru</strong>! 🚀</p>
        </div>
      </section>
    </div>
  );
}