const ContactBanner: React.FC = () => {
    return (
      <div className="relative w-full h-[285px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/contactus.png')" }}>
        <div className="px-5 py-4 rounded-xl text-center max-w-3xl backdrop-blur-md" style={{ backgroundColor: "rgba(62, 151, 253, 0.2)" }}>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Contact CSE Guru</h1>
          <p className="mt-3 text-lg text-white drop-shadow-sm">We’re just a click away. Let's connect and grow together!</p>
        </div>
      </div>
    )
}

export default ContactBanner;