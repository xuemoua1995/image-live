// src/components/Footer.tsx
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { MdCall, MdOutlineSend } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#0E1A23] text-white text-sm">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        
        {/* Column 1 */}
        <div>
          <h3 className="font-bold mb-3">ຂໍ້ສັກ</h3>
          <ul className="space-y-2">
            <li>ການຮັບປະກັນ</li>
            <li>ສະມັກສະມາຊິກ</li>
            <li>ລາຍຊື່ຜູ້ຖືກອອກ</li>
            <li>ຂໍ້ສະເໜີພິເສດ</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-bold mb-3">ຂໍ້ຄວາມເພີ່ມ</h3>
          <ul className="space-y-2">
            <li>ເກັບການປ້ອງກັນເດັກນ້ອຍ</li>
            <li>ຖວາຍອຸ່ນໃຈຜູ້ພິເສດ</li>
            <li>ພາສາການແມ່ຍິງຕັ້ງຄັນ</li>
            <li>ເກັບການປ້ອງກັນສັດລ້ຽງ</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-bold mb-3">ສະມັກຕົວແທນ</h3>
          <ul className="space-y-2">
            <li>ເຂົ້າສູ່ສະມາຊິກຕົວແທນ</li>
            <li>ສະມັກເປັນຕົວແທນ</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-bold mb-3">ຄໍາສະຫມາຍບິນ</h3>
          <ul className="space-y-2">
            <li>ແນວທາງການແຈ້ງຂໍ້</li>
            <li>ຖວາຍລ່າສຸດ ແລະ ການຍົກເລີກການຈອງ</li>
          </ul>
        </div>

        {/* Column 5 */}
        <div>
          <h3 className="font-bold mb-3">ເສັ້ນທາງການບິນ</h3>
          <ul className="space-y-2">
            <li>ເສັ້ນທາງການບິນຂອງເຮົາ</li>
            <li>ຕາຕະລາງການບິນ</li>
            <li>ເຮືອບິນຂອງພວກເຮົາທີ່ທັນສະໄໝ</li>
            <li>ແຜນທີ່ເສັ້ນທາງການບິນ</li>
          </ul>
        </div>

        {/* Column 6 */}
        <div>
          <h3 className="font-bold mb-3">ຕິດຕໍ່</h3>
          <ul className="space-y-2">
            <li>ຕິດຕໍ່ເຮົາ</li>
            <li>ຄໍາຖາມເລື້ອຍໆ</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 py-6 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <img
          src="/lanexang-logo.png"
          alt="Lanexang Airways Logo"
          className="h-10"
        />

        {/* Social Media */}
        <div className="flex space-x-4 text-lg">
          <FaFacebookF className="hover:text-blue-500 cursor-pointer" />
          <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          <FaTiktok className="hover:text-gray-400 cursor-pointer" />
          <FaWhatsapp className="hover:text-green-500 cursor-pointer" />
        </div>

        {/* Contact */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <MdCall /> <span>Call center: 1556</span>
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineSend />{" "}
            <a href="mailto:customerservices@lxairways.com" className="hover:underline">
              customerservices@lxairways.com
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs py-4 border-t border-gray-700">
        © Copyright 2025 Lanexay Airways International. Developed by Lao IT Dev Co., Ltd.
      </div>
    </footer>
  );
}
