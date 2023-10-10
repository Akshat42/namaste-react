import { useEffect, useState } from "react";

import RestaurantCard from "./RestaurantCard";
import { Shimmer } from "./Shimmer";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9622536&lng=77.6979885&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    const formattedData =
      json.data.cards[5].card.card.gridElements.infoWithStyle.restaurants.map(
        (res) => {
          return {
            data: {
              id: res.info.id,
              name: res.info.name,
              avgRating: res.info.avgRating,
              cuisines: res.info.cuisines,
              costForTwo: res.info.costForTwo,
              deliveryTime: res.info.sla.deliveryTime,
              cloudinaryImageId: res.info.cloudinaryImageId,
            },
          };
        }
      );
    setRestaurants(formattedData);
    setFilteredRestaurants(formattedData);
  };

  const handleTopButton = () => {
    const filteredRestaurants = restaurants.filter(
      (res) => res.data.avgRating > 4
    );
    setRestaurants(filteredRestaurants);
  };

  const handleSearch = () => {
    const filteredRestaurant = restaurants.filter((res) =>
      res.data.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(filteredRestaurant);
  };

  return (
    <div className="body">
      <div className="container">
        <div>
          <input
            type="text"
            className="searchbox btn"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button className="btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        <button className="btn" onClick={handleTopButton}>
          Top Rated Restaurants
        </button>
      </div>

      <div className="res-container">
        {filteredRestaurants.length ? (
          filteredRestaurants.map((restaurant) => (
            <Link to={`/restaurant/${restaurant.data.id}`}>
              <RestaurantCard key={restaurant.data.id} resData={restaurant} />
            </Link>
          ))
        ) : (
          <Shimmer />
        )}
      </div>
    </div>
  );
};

export default Body;
