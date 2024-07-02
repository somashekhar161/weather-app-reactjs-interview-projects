import React from "react";

const SearchInput = ({ Search, handleSearchChange, handleSearch, Loading }) => {
  return (
    <div className=" flex w-full justify-center gap-2 p-2">
      <input
        className="w-4/6 rounded-lg border-4 border-emerald-700 bg-emerald-50 p-4 font-semibold shadow outline-none"
        placeholder="Enter City Name"
        value={Search}
        onChange={handleSearchChange}
      ></input>
      <button
        onClick={handleSearch}
        disabled={Loading}
        className=" bo rder rounded-lg bg-emerald-300 p-2 px-5 text-2xl font-semibold shadow transition-all active:scale-95 active:shadow-none disabled:opacity-35"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
