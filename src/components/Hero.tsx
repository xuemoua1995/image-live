import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      className="relative w-full h-[600px] bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-600/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h2 className="text-3xl font-bold mb-2">
          ເພາະການເດີນທາງຂອງທ່ານເປັນແຮງບັນດານໃຈ
        </h2>
        <p className="italic text-xl mb-4">Fly with inspiration</p>
        <p className="text-lg flex items-center gap-2">
          📞 <span className="font-bold text-2xl">1556</span> Lanexang Airways International
        </p>
        <div className="flex gap-4 mt-4">
          <img src="/facebook-icon.png" alt="Facebook" className="w-6 h-6" />
          <img src="/instagram-icon.png" alt="Instagram" className="w-6 h-6" />
          <img src="/tiktok-icon.png" alt="Tiktok" className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
