import React, { Component } from "react";
import ItemOrder from "./ItemOrder";
import { Consumer } from "../contexts/Context";

class FoodOrderForm extends Component {
  state = {
    items: {}
  };

  actionHandler = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <Consumer>
          {value => {
            const { imageset, sizeset } = value;
            return (
              <React.Fragment>
                <ItemOrder
                  name="Pizzas"
                  images={imageset[0]}
                  sizes={sizeset}
                  hasExtras={true}
                />
                <ItemOrder name="Sandwiches" images={imageset[1]} />
                <ItemOrder name="Drinks" images={imageset[2]} sizes={sizeset} />
              </React.Fragment>
            );
          }}
        </Consumer>
      </div>
    );
  }
}

export default FoodOrderForm;
