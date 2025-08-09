import React from "react";

const FlightSearch: React.FC = () => {
  return (
    <div className="bg-gray-200 p-6 rounded-2xl max-w-6xl mx-auto -mt-20 relative z-20 shadow-lg">
      {/* Trip type */}
      <div className="flex items-center gap-6 mb-4">
        <label className="flex items-center gap-2">
          <input type="radio" name="trip" defaultChecked /> ໄປ-ກັບ
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="trip" /> ທ່ຽວດຽວ
        </label>
      </div>

      {/* Form grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <select className="p-3 rounded-lg w-full border border-gray-300">
          <option>ເລືອກຕົ້ນທາງ</option>
        </select>
        <select className="p-3 rounded-lg w-full border border-gray-300">
          <option>ເລືອກປາຍທາງ</option>
        </select>
        <input type="date" className="p-3 rounded-lg w-full border border-gray-300" />
        <input type="date" className="p-3 rounded-lg w-full border border-gray-300" />
        <input type="number" placeholder="ຜູ້ໃຫຍ່" className="p-3 rounded-lg w-full border border-gray-300" />
        <button className="bg-red-500 text-white rounded-lg px-6 py-3 hover:bg-red-600">
          ຄົ້ນຫາ
        </button>
      </div>
    </div>
  );
};

export default FlightSearch;
