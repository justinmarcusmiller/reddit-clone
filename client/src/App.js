import React from "react";
import AppNavBar from "./components/appNavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import SubmissionsList from "./components/submissionsList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import UserSignUp from "./components/userSignUp";
import UserSignIn from "./components/userSignIn";
import "./App.css";
import SubmitPost from "./components/submitPost";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <AppNavBar />
          <Switch>
            <Route path="/submit">
              <SubmitPost />
            </Route>
            <Route path="/sign-up">
              <UserSignUp />
            </Route>
            <Route path="/sign-in">
              <UserSignIn />
            </Route>
            {/* Keep '/' on bottom */}
            <Route path="/">
              <SubmissionsList />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
