import React, { useEffect} from "react";
import CartBook from "../CartBook/CartBook";

import "./Cart.css";
export default function Cart({ userDetails, updateUserDetails }) {


  useEffect(() => {
    console.log(userDetails)
  }, [userDetails])

  return (
    <div className="cart-container-r">
      {userDetails.sumPrice !== 0 &&
        <div>
          <div className="info">
            <h4 dir='rtl'>סה"כ לתשלום:</h4>
            <h3 dir='rtl'>{userDetails.sumPrice} ש"ח</h3>
            <div className="forPay"><b>{"התשלום במזומן בעת קבלת המוצר"}</b></div>
          </div>
          <div className="cart-grid">
            {userDetails.cart.map((item) => (
              <CartBook
                itemDetails={item}
                updateUserDetails={updateUserDetails}
                userDetails={userDetails}
              />
            ))}
          </div>
        </div>}

      {userDetails.sumPrice === 0 &&
      <div className="empty-cart-r">
        <h1 dir='rtl'>בנתיים עוד אין לך ספרים בסל...</h1>
      </div>
      }

    </div>
  );
}
