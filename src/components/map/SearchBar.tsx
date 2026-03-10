import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [text, setText] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(text);
  }

  return (
    <form onSubmit={onSubmit} className="h-14 flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="수영장 또는 지역을 검색해보세요"
        className="min-w-72 flex-1 p-2 border rounded-lg focus:outline-blue-500" />
      <button
        type="submit"
        className="min-w-16 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        검색
      </button>
    </form>
  )
}

export default SearchBar