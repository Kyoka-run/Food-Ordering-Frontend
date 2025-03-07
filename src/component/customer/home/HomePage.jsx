import React from "react";
import MultipleItemsCarousel from "./MultiItemCarouse";
import RestaurantCard from "../restaurant/RestaurantCard";
import { useSelector } from "react-redux";

const HomePage = () => {
  const restaurants = useSelector(state => state.restaurant.restaurants);

  return (
    <div data-testid="homepage-container">
      <section 
        className="relative flex flex-col justify-center items-center h-[60vh]"
        data-testid="hero-section"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/958547/pexels-photo-958547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
          }}
          data-testid="hero-background"
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-30" />
        
        {/* Content */}
        <div className="relative z-10 w-full lg:w-[50vw] text-center">
          <p className="text-gray-100 text-4xl lg:text-6xl font-bold py-5" data-testid="hero-title">
            Kyoka Food
          </p>
          <p className="text-gray-100 text-2xl lg:text-xl" data-testid="hero-subtitle">
            Taste Food Fast and Delivered!
          </p>
        </div>
      </section>

      <section className="p-5 lg:px-20" data-testid="top-meals-section">
        <div>
          <p className="text-2xl font-semibold text-gray-600 py-3 pb-10">
            Top Meals
          </p>
          <MultipleItemsCarousel />
        </div>
      </section>

      <section className="px-5 lg:px-20" data-testid="restaurants-section">
        <div>
          <h1 className="text-2xl font-semibold text-gray-600">
            Order From Our Handpicked Favorites
          </h1>
          <div className="flex flex-wrap items-center justify-around" data-testid="restaurants-grid">
            {restaurants.map((item) => (
              <RestaurantCard key={item.restaurantId} data={item} data-testid={`restaurant-card-${item.restaurantId}`} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;