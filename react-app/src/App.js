import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SideBar from "./components/SideBar";
import FriendDetails from "./components/FriendsDetails";
// import TopBar from "./components/TopBar";
import SplashPage from "./components/SplashPage"
import AllExpenses from "./components/AllExpenses";
import PaymentHistory from "./components/PaymentHistory"
import Footer from "./components/Footer";



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
          <Switch>
            <Route exact path="/" >
              <SplashPage />
            </Route>
            <Route path="/friends/:friendId">
              <FriendDetails />
            </Route>
            <Route path="/all-expenses">
              <AllExpenses />
            </Route>
            <Route path="/payment-history">
              <PaymentHistory />
            </Route>
          </Switch>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
