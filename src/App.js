import React from "react";
import "./App.css";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Costumers from "./components/costumers.jsx";
import Rentals from "./components/rentals";
import NotFound from "./components/not-found";
import MovieForm from "./components/movieForm";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/movies/:movieId" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/costumers" component={Costumers} />
          <Route path="/rentals" component={Rentals} />
          <Redirect from="/" exact to="/movies" />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
