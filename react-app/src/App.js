import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SideBar from "./components/SideBar";
import FriendDetails from "./components/FriendsDetails";
import TopBar from "./components/TopBar";
import SplashPage from "./components/SplashPage"
import AllExpenses from "./components/AllExpenses";
import SettledExpenses from "./components/SettledExpenses";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
          <SideBar />
          <TopBar />
          <Switch>
            <Route exact path="/" >
              <SplashPage />
            </Route>
            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path="/friends/:friendId">
              <FriendDetails />
            </Route>
            <Route path="/all-expenses">
              <AllExpenses />
            </Route>
            <Route path="/all-settled-expenses">
              <SettledExpenses />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
