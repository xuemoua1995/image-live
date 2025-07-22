import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 w-full pt-20">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* หัวหน้า Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-blue-500 pb-2 inline-block">GS1 Laos</h3>
            <div className="space-y-3">
              <Link href="#" className="block hover:text-blue-400 transition-colors">
                About Us
              </Link>
              <Link href="#" className="block hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="block hover:text-blue-400 transition-colors">
                Terms and Conditions
              </Link>
            </div>
          </div>

          {/* ผู้ตาราม Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-blue-500 pb-2 inline-block">Certificate Training Course</h3>
            <div className="space-y-3">
              <Link href="#" className="block hover:text-blue-400 transition-colors">
                Get A Barcode
              </Link>
              <Link href="#" className="block hover:text-blue-400 transition-colors">
                Global Standards
              </Link>
              <Link href="#" className="block hover:text-blue-400 transition-colors">
                Our Services
              </Link>
            </div>
          </div>

          {/* Job Posting Inquiry Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-blue-500 pb-2 inline-block">
              Job Posting Inquiry
            </h3>
            <div className="space-y-3 text-sm">
              <p>(+856) 56781108</p>
              <p>Mon - Sat : 8:00am - 5:00pm</p>
              <p>Email: ziongroupsole@163.com</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-blue-500 pb-2 inline-block">
              Job Posting Inquiry
            </h3>
            <div className="space-y-3 text-sm">
              <p>(+856) 56781108</p>
              <p>Mon - Sat : 8:00am - 5:00pm</p>
              <p>Email: ziongroupsole@163.com</p>
            </div>
          </div>

          {/* Apply on the go Section */}
          {/* <div className="space-y-4 lg:col-span-2">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Apply on the go</h3>
              <p className="text-sm text-gray-300 mb-4">Get real-time updates on our App</p>
              <div className=" flex flex-row justify-between items-center space-x-4">
                <Link href="#" className="block">
                  <div className="bg-black rounded-lg p-3 flex items-center space-x-3 hover:bg-gray-700 transition-colors">
                    <Image
                      src="/public/images/play store.png"
                      alt="Google Play"
                      width={24}
                      height={24}
                      className="rounded"
                    />
                    <div>
                      <p className="text-xs text-gray-300">GET IT ON</p>
                      <p className="text-sm font-semibold">Google Play</p>
                    </div>
                  </div>
                </Link>
                <Link href="#" className="block">
                  <div className="bg-black rounded-lg p-3 flex items-center space-x-3 hover:bg-gray-700 transition-colors">
                    <Image
                      src="/public/images/app store.jpeg"
                      alt="App Store"
                      width={24}
                      height={24}
                      className="rounded"
                    />
                    <div>
                      <p className="text-xs text-gray-300">Download on the</p>
                      <p className="text-sm font-semibold">App Store</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div> */}
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400 text-center">
            Copyright © Zion Group Sole Co., Ltd. |  Souphanouvong Road, Wattay Village, Sikhottabong District, Vientiane Capital (Laos PDR).
          </p>
        </div>
      </div>
    </footer>
  )
}
