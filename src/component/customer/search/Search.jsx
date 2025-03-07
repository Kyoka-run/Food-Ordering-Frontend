import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { topMeels } from "../../../data/topMeals";
import { PopularCuisines } from "./PopularCuisines";
import SearchDishCard from "./SearchDishCard";
import { useDispatch, useSelector } from "react-redux";
import { searchMenuItem } from "../../../redux/actions/menuActions";

const Search = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.menu.search);
  const jwt = localStorage.getItem("jwt");

  const handleSearchMenu = (keyword) => {
    dispatch(searchMenuItem({keyword, jwt}));
  };
  
  return (
    <div className="px-5 lg:px-20" data-testid="search-container">
      <div className="relative mt-10">
        <SearchIcon className="absolute top-3.5 left-2" />
        <input
          onChange={(e) => handleSearchMenu(e.target.value)}
          className="py-4 pl-12 w-full rounded-sm"
          type="text"
          placeholder="search food..."
          data-testid="search-input"
        />
      </div>
      <div>
        <h1 className="py-5 text-2xl font-semibold" data-testid="popular-cuisines-title">Popular Cuisines</h1>
        <div className="flex flex-wrap" data-testid="popular-cuisines-container">
          {topMeels.slice(0, 7).map((item, index) => (
            <PopularCuisines 
              image={item.image} 
              title={item.title} 
              key={index}
              data-testid={`cuisine-${index}`}
            />
          ))}
        </div>
      </div>
      <div className="mt-7" data-testid="search-results-container">
        {searchResults.map((item, index) => (
          <SearchDishCard 
            item={item} 
            key={index}
            data-testid={`search-result-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;