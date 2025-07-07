import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

export const metadata = {
  title: "Contact Us | CSE Guru",
  description:
    "Get in touch with the CSE Guru team. We’d love to hear from students, teachers, and tech enthusiasts.",
};

export default function ContactPage() {
  return (
    <section className="text-gray-800">
      {/* Banner */}
      <div
        className="relative w-full h-[285px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/contactus.png')" }} // You can change this to a contact-specific banner if you generate one
      >
        <div
          className="px-5 py-4 rounded-xl text-center max-w-3xl backdrop-blur-md"
          style={{
            backgroundColor: "rgba(62, 151, 253, 0.2)"
          }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Contact CSE Guru
          </h1>
          <p className="mt-3 text-lg text-white drop-shadow-sm">
            We’re just a click away. Let's connect and grow together!
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-6">
        <p className="text-lg">
          For any inquiries, suggestions, or collaborations, feel free to reach out via email or social media.
        </p>
        <p className="text-md text-gray-600">
          Email us at:{" "}
          <a
            href="mailto:hello@cseguru.com"
            className="text-green-700 underline"
          >
            hello@cseguru.com
          </a>
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-6 text-2xl text-green-700">
          <a
            href="https://www.instagram.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors duration-200"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.facebook.com/yourhandle"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors duration-200"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.youtube.com/@cseguru"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition-colors duration-200"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </section>
  );
}
