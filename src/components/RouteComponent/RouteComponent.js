import React, { useEffect } from 'react'
import { Route, Switch } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import Menu from '../Menu/Menu'
import BooksList from '../BooksList/BooksList'
import './RouteComponent.css'
import Cart from '../Cart/Cart';
import Home from '../Home/Home';


export default function RouteComponent({ dataBooks, dataUsers, userDetails, updateUserDetails }) {

  useEffect(() => {
    console.log(userDetails)
  }, [userDetails])

  return (
    <BrowserRouter>
      <div className="container-r head-r">
        <p>Books for you</p>
      </div>
      <Menu userDetails={userDetails} updateUserDetails={updateUserDetails} dataUsers={dataUsers} />
      <div>
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route path="/AdultBooks">
            <BooksList type="AdultBooks" userDetails={userDetails} updateUserDetails={updateUserDetails} dataBooks={dataBooks} dataUsers={dataUsers} />
          </Route>
          <Route path="/ChildrenBooks">
            <BooksList type="ChildrenBooks" userDetails={userDetails} updateUserDetails={updateUserDetails} dataBooks={dataBooks} dataUsers={dataUsers} />
          </Route>
          <Route path="/ComicsBooks">
            <BooksList type="ComicsBooks" userDetails={userDetails} updateUserDetails={updateUserDetails} dataBooks={dataBooks} dataUsers={dataUsers} />
          </Route>
          <Route path="/CookingBooks" >
            <BooksList type="CookingBooks" userDetails={userDetails} updateUserDetails={updateUserDetails} dataBooks={dataBooks} dataUsers={dataUsers} />
          </Route>
          <Route path="/Moosar">
            <BooksList type="Moosar" userDetails={userDetails} updateUserDetails={updateUserDetails} dataBooks={dataBooks} dataUsers={dataUsers} />
          </Route>
          <Route path="/Tora">
            <BooksList type="Tora" userDetails={userDetails} updateUserDetails={updateUserDetails} dataBooks={dataBooks} dataUsers={dataUsers} />
          </Route>
          <Route path="/Cart">
            <Cart userDetails={{...userDetails}} updateUserDetails={updateUserDetails} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}