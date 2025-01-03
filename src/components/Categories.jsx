const Categories = ({
  categories,
  selectedCategory,
  onCategorySelect,
  myStyle,
}) => {
  return (
    <div className="flex justify-center my-4 capitalize ">
      <div className="relative border-2 border-gray-300">
        <select
          style={myStyle}
          className="w-[50vw] px-4 py-2 rounded-md border capitalize border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedCategory}
          onChange={(e) => onCategorySelect(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Categories;
