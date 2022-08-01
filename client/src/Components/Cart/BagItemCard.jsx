import e from "express";
import React from "react";

const BagItemCard = ({ images, title, price, rentPrice }) => {
  const [Type, setType] = useState("Rent");

  return (
    <div className="BagItemCard">
      <div>
        <img src={images[0].url} alt={title} />
      </div>

      <div className="bagitem-info-block">
        <h1 className="truncate">{title}</h1>
        <span>
          <p>Buying Price :</p>
          <p className="text-blue-600 font-semibold">₹ {price}</p>
        </span>
        <span>
          <p>Renting Price :</p>
          <p className="line-through text-red-600 font-semibold">₹ {price}</p>
          <p className="ml-2 text-green-600 font-semibold">
            ₹ {rentPrice} for 7 days
          </p>
        </span>
      </div>

      <div>
        <select value={Type} onChange={(e) => setType(e.target.value)}>
          <option value="Rent">Rent</option>
          <option value="Buy">Buy</option>
        </select>
        <button className="btn bg-yellow-400 text-black font-semibold">
          {Type ? Type : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default BagItemCard;
