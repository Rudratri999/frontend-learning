import React from 'react'

const SearchBar = ({ search, setSearch }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search User"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

export default SearchBar