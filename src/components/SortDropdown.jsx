import React from "react";

const SortDropdown = ({ sortOption, onSortChange,myStyle }) => {
  return (
    <div className="flex items-center  border-gray-400 border-2">
      <label id="select2" className=" font-semibold px-2">Sort By:</label>
      <select
       id="sele"
        value={sortOption}
        style={myStyle}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-50"
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
