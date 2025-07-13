import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

const SocialIcons: React.FC = () => {
    return (
        <div className="flex justify-center gap-6 mt-6 text-2xl text-green-700">
            <a href="https://www.instagram.com/cseguru_official/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="https://www.facebook.com/cseguru.official" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><FaFacebookF /></a>
            <a href="https://www.youtube.com/@cseguru" target="_blank" rel="noopener noreferrer" className="hover:text-red-600"><FaYoutube /></a>
        </div>
    )
}

export default SocialIcons;