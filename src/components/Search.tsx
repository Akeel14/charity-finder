import axios from "axios";
import React, { useState, useEffect } from "react";

interface Charity {
  logoUrl: string;
  coverImageUrl: string;
  name: string;
  description: string;
  ein: string;
  tags: string[];
}

interface SearchProps {
  setCharities: React.Dispatch<React.SetStateAction<Charity[]>>;
}

interface CharityResponse {
  nonprofits: Charity[];
}

const Search: React.FC<SearchProps> = ({ setCharities }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Charity[]>([]);

  const fetchCharities = async (url: string) => {
    const response = await axios.get<CharityResponse>(url);
    console.log(response.data);
    return response.data.nonprofits;
  };

  const handleSearch = async () => {
    const charities = await fetchCharities(
      `https://partners.every.org/v0.2/search/${searchTerm}?apiKey=pk_live_2caf310116284beb94a622637fa432d0`
    );
    setCharities(charities);
  };

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const fetchSuggestions = async () => {
        const nonprofits = await fetchCharities(
          `https://partners.every.org/v0.2/search/${searchTerm}?apiKey=pk_live_2caf310116284beb94a622637fa432d0`
        );
        setSuggestions(nonprofits);
      };

      void fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSuggestionClick = (charity: Charity) => {
    setSearchTerm(charity.name);
    setCharities([charity]);
    setSuggestions([]);
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search for charities"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => {
            handleSearch().catch((err) => console.error(err));
          }}
        >
          Search
        </button>
      </div>
      {suggestions.length > 0 && (
        <div className="dropdown-menu show" style={{ display: "block" }}>
          {suggestions.map((charity) => (
            <button
              key={charity.ein}
              className="dropdown-item"
              onClick={() => handleSuggestionClick(charity)}
            >
              {charity.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
