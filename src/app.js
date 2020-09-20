import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Div100vh from 'react-div-100vh';


import { NavBar, Footer, Loading, PrivateRoute } from "./components";
import { HomeView, Profile, ExternalApi, Results } from "./views";
import { useAuth0 } from "@auth0/auth0-react";

import "./app.css";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Div100vh className="vh100">
        <Switch>
          <Route path="/" exact component={HomeView} />
          <Route path="/results" exact component={Results} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/external-api" component={ExternalApi} />
        </Switch>
      </Div100vh>

      {/* <Footer /> */}
    </div>
  );
};

export default App;
