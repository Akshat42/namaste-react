import { useEffect, useState } from "react";
import { Shimmer } from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [menu, setMenu] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.904757&lng=77.556625&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
    );

    const menuData = await data.json();
    setMenu(menuData.data);
  };

  if (menu === null) {
    return <Shimmer />;
  }
  const { name, cuisines, costForTwoMessage } = menu.cards[0]?.card?.card?.info;
  const dishes =
    menu.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
      ?.itemCards;

  return (
    <div className="menu">
      <div>Restaurant Menu</div>
      <h1>{name}</h1>
      <h3>{cuisines.join(", ")}</h3>
      <h4>{costForTwoMessage}</h4>
      <h2>Menu</h2>
      <ul>
        {dishes.map((dish) => {
          return <li key={dish.card.info.id}>{dish.card.info.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
