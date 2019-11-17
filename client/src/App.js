import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WrappedLogin from "./pages/Login";
import WrappedSignUp from "./pages/Signup";
import Page from "./pages/Page";
import "antd/dist/antd.css";

class App extends React.Component {
  state = { currentUser: "" };
  setCurrentUser = userid => {
    this.setState({ currentUser: userid });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <WrappedLogin
                currentUser={this.state.currentUser}
                setCurrentUser={this.setCurrentUser}
              />
            )}
          />
          <Route path="/signup" component={WrappedSignUp} />
          <Route
            path="/page"
            component={() => (
              <Page
                currentUser={this.state.currentUser}
                setLogout={this.setCurrentUser}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
