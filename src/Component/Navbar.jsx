import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/pokemon/${search.toLowerCase()}`);
    }
  };

  return (
    <nav>
      <div className='navbar'>
        <img src="https://static.vecteezy.com/system/resources/previews/027/127/571/non_2x/pokemon-logo-pokemon-icon-transparent-free-png.png" alt="" height="40px" width="10%" />
        <form onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search Pokemon..."
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

            <i className="fa-solid fa-magnifying-glass"></i>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
