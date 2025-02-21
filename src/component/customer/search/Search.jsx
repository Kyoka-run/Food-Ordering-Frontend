import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { topMeels } from "../../../data/topMeals";
import { PopularCuisines } from "./PopularCuisines";
import SearchDishCard from "./SearchDishCard";
import { useDispatch, useSelector } from "react-redux";
import { searchMenuItem } from "../../../redux/actions/menuActions";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((store) => store.menu);
  const jwt = localStorage.getItem("jwt")

  const handleSearchMenu = (keyword) => {
    dispatch(searchMenuItem({keyword, jwt }));
  };
  
  return (
    <div className="px-5 lg:px-20">
      <div className="relative mt-10">
        <SearchIcon className="absolute top-3.5 left-2" />
        <input
          onChange={(e) => handleSearchMenu(e.target.value)}
          className="py-4 pl-12 w-full rounded-sm"
          type="text"
          placeholder="search food..."
        />
      </div>
      <div>
        <h1 className="py-5 text-2xl font-semibold">Popular Cuisines</h1>
        <div className="flex flex-wrap ">
          {topMeels.slice(0, 7).map((item, index) => (
            <PopularCuisines image={item.image} title={item.title} key={index}/>
          ))}
        </div>
      </div>
      <div className=" mt-7">
        {search.map((item, index) => (
          <SearchDishCard item={item} key={index}/>
        ))}
      </div>
    </div>
  );
};

export default Search;
