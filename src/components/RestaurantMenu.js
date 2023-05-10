import React from "react";
import { useParams } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const RestaurantMenu = () => {
  const param = useParams();
  const [menuList, setMenuList] = useState();
  const [resDetails, setResDetails] = useState();
  const { id } = param;
  useEffect(() => {
    getMenuDetails();
  }, []);

  async function getMenuDetails() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.3860712&lng=78.3511362&restaurantId=328934&submitAction=ENTER"
    );

    const resData = await data.json();
    let menuData =
      resData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    const results = menuData.filter((obj, index) =>
      obj.card.card.hasOwnProperty("itemCards")
    );
    console.log("filtered data");
    console.log(results);
    // console.log(resData?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
    // console.log(resData?.data?.cards[0]?.card?.card?.info);
    setMenuList(results);
    setResDetails(resData?.data?.cards[0]?.card?.card?.info);
  }
  console.log(param);
  return (
    <div className="res-details">
      <h1>{resDetails?.name}-{id}</h1>
      <div className="img-details">
        <img src={CDN_URL + resDetails?.cloudinaryImageId} />
        </div>
        <div className="menu-list">
        {menuList?.map((obj,index)=>(
          <div key = {index} className="menu-container">
          <h2>{obj?.card?.card?.title}</h2>
          <ul>
           {(obj?.card?.card?.itemCards).map((item)=>(<li key={item?.card?.info?.id}>{item?.card?.info?.name}</li>))} 
            
          </ul>
        </div>

        ))}
        </div>
        
     
    </div>
  );
};

export default RestaurantMenu;
