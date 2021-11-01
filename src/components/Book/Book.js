import React, { useEffect, useState } from "react";
import "./Book.css";
import { editUser } from "./../../service/getAndSetData";

export default function Book({
  itemDetails,
  type,
  userDetails,
  updateUserDetails,
  seterrorOccurred,
}) {

  const [num, setnum] = useState(0)

  const getSum = () => {
    //check if this item in the cart yet if so update numInCart
    let result = 0
    userDetails.cart.map((item) => {
      if (item.id === itemDetails.id) {
        result = item.sum
      }
    });
    return result
  };

  const saveDetails = async (detailsToUpdate) =>{
    updateUserDetails(detailsToUpdate)
    localStorage.setItem("currUserDetails", JSON.stringify(detailsToUpdate));
    await editUser(userDetails.id, userDetails);
  }

  useEffect(() => {
    setnum(getSum())
  }, [userDetails.fullName])

  const updateCart = async (action) => {
    let tempCart = userDetails.cart;
    let sumItems = userDetails.sumItems;
    let sumPrice = userDetails.sumPrice;
    switch (action) {
      case 'add':
        if (userDetails.id === "") {
          seterrorOccurred((val) => val + 1);
        }
        else {
          setnum(val => val + 1)
          let newItem = itemDetails;
          newItem.category = type;
          newItem.sum = 1;
          tempCart.push(newItem);
          sumItems += 1;
          sumPrice += itemDetails.price
        }
        break;
      case 'plus':
        setnum(val => val + 1)
        sumPrice += itemDetails.price
        sumItems += 1
        tempCart.forEach((item) => {
          if (item.id === itemDetails.id) {
            item.sum += 1;
          }
        });
        break;

      case 'minus':
        setnum(val => val - 1)
        sumPrice -= itemDetails.price
        sumItems -= 1;
        if (itemDetails.sum === 1) {
          tempCart = tempCart.filter((item) => item.id !== itemDetails.id);
        }
        else {
          tempCart.forEach((item) => {
            if (item.id === itemDetails.id) {
              item.sum -= 1;
            }
          });
        }
    }
    await saveDetails({
      ...userDetails,
      cart: tempCart,
      sumItems: sumItems,
      sumPrice: sumPrice
    })
  }

  let image = require("./../../assets/images/" + itemDetails.picture);

  return (
    <div className="item">
      <div className="img-num-r">
        <img src={image.default} alt="img" />
      </div>
      <p>
        {itemDetails.name} | {itemDetails.author}
      </p>
      <p dir="rtl">
        <b>{itemDetails.price} ש"ח</b>
      </p>
      { num === 0 && (
        <button
          className="cart-btn"
          onClick={() => { updateCart('add') }}
        >
          <div>
            <i className="fas fa-shopping-cart"></i>
            <p>הוספה לסל</p>
          </div>
        </button>
      )}
      {num > 0 && (
        <div>
          <div className="row">
            <div className="col-md">
              <button className="addIncriseBtn" onClick={() => updateCart('plus')}>
                +
              </button>
            </div>
            <div className="col-md">
              <p className="myp">{num}</p>
            </div>
            <div className="col-md">
              <button className="addIncriseBtn" onClick={() => updateCart('minus')}>
                -
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
