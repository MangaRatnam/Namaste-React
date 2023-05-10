import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from './Shimmer';
import {Link} from "react-router-dom";

function filterData(searchText, restaurants) {
  const filterData = restaurants.filter((restaurant) =>
    restaurant.data.name.toLowerCase().includes(searchText)
  );
  return filterData;
}


const Body = () => {
  //local state Variable-super powerful
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants,setFilteredRestaurants] = useState(restaurants);
  const [searchText, setSearchText] = useState("");

  //empty dependency arry => callback function will be called after every re-render
  //dependency array[searchText] => once after the intial render + everytime after rerender( my searchText changes)
  useEffect(() => {
    getRestaurants();
  },[]);
  console.log("render..");

  async function getRestaurants(){
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4801969&lng=78.4171028&page_type=DESKTOP_WEB_LISTING");
    const json = await data.json();
    console.log(json?.data?.cards[2]?.data?.data?.cards);
    setRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    
  } 

  console.log("render");

  //not render component(early return)
  if(!restaurants) return null;

  

  return (restaurants.length === 0) ?  <Shimmer/> :(
    <div className="body">
      {
      
        <>
          <input
            className="search-input"
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="filter-btn"
            onClick={() => {
              const filteredData = filterData(searchText, restaurants);
              console.log("hhh..",filteredData);
              setFilteredRestaurants(filteredData);
            }}
          >
            Search
          </button>
        </>
      }
      
      <div className="res-container">
        
        {(filteredRestaurants.length === 0)? <h1>No Results</h1> :filteredRestaurants.map((restaurant) => (
          <Link to={"/RestaurantMenu/"+restaurant.data.id} key={restaurant.data.id}>
          <RestaurantCard  resData={restaurant} />
          </Link>

        ))}
      </div>
    </div>
  );
};
export default Body;
