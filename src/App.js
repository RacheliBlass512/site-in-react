import React, { useEffect, useState } from "react";
import {getData} from './service/getAndSetData'
import "./App.css";
import RouteComponent from "./components/RouteComponent/RouteComponent.js";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [dataBooks, setdataBooks] = useState(null);
  const [dataUsers, setdataUsers] = useState(null);
  const [userDetails, setuserDetails] = useState(
    localStorage.currUserDetails === undefined
      ? {
          id: "",
          fullName: "",
          email: "",
          password: "",
          cart: [],
          sumItems: 0,
          sumPrice: 0,
        }
      : JSON.parse(localStorage.getItem("currUserDetails"))
  );
  const f1 = (details) => {
    setuserDetails(details);
  };

  useEffect(async () => {
     setdataUsers(await getData('users'));
  }, [userDetails.fullName]);

  useEffect(async() => {
     setdataBooks(await getData('books'));
  }, [])
  
  return (
    <div className="App">
      {dataBooks != null && dataUsers != null && (
        <RouteComponent
          dataBooks={dataBooks}
          dataUsers={dataUsers}
          userDetails={userDetails}
          updateUserDetails={f1}
        />
      )}
    </div>
  );
}

export default App;
