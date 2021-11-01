import React from "react";
import { editUser } from './../../service/getAndSetData';
import "./CartBook.css";
export default function CartBook({
  userDetails,
  updateUserDetails,
  itemDetails
}) {
  const deleteItem = () => {
    let cart = userDetails["cart"];
    let filteredCart = cart.filter((item) => item.id !== itemDetails.id);
    updateUserDetails({
      ...userDetails,
      cart: filteredCart,
      sumItems: userDetails.sumItems - itemDetails.sum,
      sumPrice: userDetails.sumPrice - itemDetails.price * itemDetails.sum
    });
    localStorage.setItem("currUserDetails", JSON.stringify(userDetails));
    editUser(userDetails.id, userDetails);
  };

  let image = require("./../../assets/images/" + itemDetails.picture);
  return (
    <div className='item'>
      <div className="img-txt">
        <div className="num">-{itemDetails.sum}-</div>
        <img src={image.default} alt="img" />
        <p>
          {itemDetails.name} | {itemDetails.author}
        </p>
      </div>
      <p dir="rtl">
        <b>{itemDetails.price} ש"ח</b>
      </p>
      <button onClick={() => deleteItem()}>הסר מהסל</button>
    </div>
  );
}
