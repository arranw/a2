import React, { Component } from "react";
import FoodOrderForm from "../orderforms/FoodOrderForm";

class OrderForm extends Component {
  actionHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <form>
          <div className="row">
            <div className="col-md-9 mb-3">
              <h1 className="display-4 mb-4">City Delicatessen Order Page</h1>
              <FoodOrderForm actionHandler={this.actionHandler} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default OrderForm;
