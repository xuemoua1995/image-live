import React from "react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md px-8 py-3 flex items-center justify-between shadow-md rounded-full mt-4 mx-auto max-w-7xl">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Lanexang Airways" className="h-10" />
      </div>

      {/* Menu */}
      <ul className="flex items-center gap-8 text-gray-700 font-medium">
        <li>ຈອງ ແລະ ຈັດການ</li>
        <li>ສື່ງມາພານເດີມຕ່າງໆ</li>
        <li>ເສັ້ນທາງການບິນ</li>
        <li>ຮັບ deposit</li>
      </ul>

      {/* Right icons */}
      <div className="flex items-center gap-4">
        <span className="text-gray-600">ຕິດຕໍ່ເຮົາ</span>
        <GlobeAltIcon className="w-6 h-6 text-gray-600" />
      </div>
    </nav>
  );
};

export default Navbar;
