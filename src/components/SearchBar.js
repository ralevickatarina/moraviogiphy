import './SearchBar.css';
import React, {useState} from 'react'

function SearchBar({onSearch, onClear}) {

  const [searchInput, setSearchInput] = useState("");
  
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onClear();
      if (searchInput !== "") onSearch(searchInput);
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [onSearch, onClear, searchInput]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <form className="SearchBar">
    <input autoComplete="off" type="text" className="SearchBarInput" placeholder="Search Giphy" onChange={handleChange} value={searchInput} />
    </form> 
  );
}

export default SearchBar;
