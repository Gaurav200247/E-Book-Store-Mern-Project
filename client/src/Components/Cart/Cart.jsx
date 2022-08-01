import React, { useEffect, useState } from "react";
import "./Cart.css";
import BagItemCard from "./BagItemCard.jsx";

const Cart = () => {
  let myCart = [];

  if (localStorage.getItem("mycart")) {
    myCart = JSON.parse(localStorage.getItem("mycart"));
    console.log(myCart);
  }

  return (
    <div className="Cart">
      <h1>My Bag</h1>

      {myCart.length === 0 ? (
        <div className="empty-bag">
          <h1>Your Bag Is Empty !!</h1>
        </div>
      ) : (
        <div className="bag-container">
          {myCart.map((item) => {
            return <BagItemCard key={item._id} {...item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Cart;
