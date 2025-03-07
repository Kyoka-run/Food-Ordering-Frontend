import { useDispatch } from "react-redux";
import { searchMenuItem } from "../../../redux/actions/menuActions";

export const PopularCuisines = ({ image, title }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleClick = () => {
    dispatch(searchMenuItem({ keyword: title, jwt }));
  };

  return (
    <div 
      className="px-3 flex flex-col justify-center items-center cursor-pointer hover:scale-110 active:scale-95"
      onClick={handleClick}
      data-testid={`cuisine-item-${title.toLowerCase()}`}
    >
      <img
        className="w-16 h-16 lg:w-32 lg:h-32 rounded-full object-cover object-center"
        src={image}
        alt={title}
        data-testid={`cuisine-image-${title.toLowerCase()}`}
      />
      <span 
        className="py-2 font-semibold text-l text-gray-600"
        data-testid={`cuisine-title-${title.toLowerCase()}`}
      >
        {title.length > 8 ? title.substring(0,7) + "..." : title}
      </span>
    </div>
  );
};