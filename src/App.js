import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OrderPage from "./components/pages/OrderPage";
import InfoPage from "./components/pages/InfoPage";
import EditItem from "./components/orderforms/EditItem";
import Header from "./components/layout/Header";
import AboutPage from "./components/pages/AboutPage";

import "./App.css";
import { Provider } from "./components/contexts/Context";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={InfoPage} />
                <Route exact path="/order" component={OrderPage} />
                <Route exact path="/order/item/edit/:id" component={EditItem} />
                <Route exact path="/about" component={AboutPage} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
