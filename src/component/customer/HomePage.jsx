import MultipleItemsCarousel from "../shared/MultiItemCarouse";
import RestaurantCard from "./RestaurantCard";
import { useSelector } from "react-redux";

const HomePage = () => {
  const restaurants = useSelector(state => state.restaurant.restaurants);

  return (
    <div>
      <section className="relative flex flex-col justify-center items-center h-[70vh] lg:h-[70vh]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-40" />
        
        {/* Content */}
        <div className="relative z-10 w-full lg:w-[50vw] text-center">
          <p className="text-gray-300 text-2xl lg:text-7xl font-bold py-5">Kyoka Food</p>
          <p className="text-gray-300 text-xl lg:text-4xl">
            Taste the Convenience: Food, Fast and Delivered.
          </p>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-[10vw] lg:h-[10vw]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(19,19,19,0.15) 15%, rgba(19,19,19,0.35) 29%, rgba(19,19,19,0.58) 44%, #131313 68%, #0D0D0D)'
          }}
        />
      </section>

      <section className="p-10 lg:py-10 lg:px-20">
        <div>
          <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">
            Top Meals
          </p>
          <MultipleItemsCarousel />
        </div>
      </section>

      <section className="px-5 lg:px-20">
        <div>
          <h1 className="text-2xl font-semibold text-gray-400 py-3">
            Order From Our Handpicked Favorites
          </h1>
          <div className="flex flex-wrap items-center justify-around">
            {restaurants.map((item) => (
              <RestaurantCard key={item.restaurantId} data={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;