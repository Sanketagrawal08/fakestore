import React from "react";

const SortDropdown = ({ sortOption, onSortChange,myStyle }) => {
  return (
    <div className="flex items-center space-x-3">
      <label className=" font-semibold">Sort By:</label>
      <select
        value={sortOption}
        style={myStyle}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 bg-white border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-50 transition duration-300 ease-in-out"
      >
        <option value="default">Default</option>
        <option value="high-to-low">High-Low 💵</option>
        <option value="low-to-high">Low-High 💵</option>
        <option value="popular">Most Popular 💵</option>
      </select>
    </div>
  );
};

export default SortDropdown;
