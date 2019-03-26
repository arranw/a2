import React, { Component } from "react";
import { Consumer } from "../contexts/Context";
import OrderItem from "../layout/OrderItem";

export default class OrderSummary extends Component {
  state = {
    display: true
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { orderItems, personalInfo } = value;
          return (
            <div className="col-md-3">
              <div
                className="card "
                style={{
                  position: "fixed",
                  right: "5%",
                  bottom: "0",
                  maxHeight: "70%"
                }}
              >
                <div className="card-header">
                  <h3>
                    Order Summary
                    <i
                      onClick={() => {
                        this.setState({ display: !this.state.display });
                      }}
                      style={{ cursor: "pointer" }}
                      className={
                        this.state.display
                          ? "fas fa-minus fa-xs ml-3"
                          : "fas fa-plus fa-xs ml-3"
                      }
                    />
                  </h3>
                  Client Name: {personalInfo.firstname} {personalInfo.lastname}
                  <br />
                  Phone: {personalInfo.phone}
                  <br />
                  Address: {personalInfo.address}
                </div>
                {this.state.display ? (
                  <div className="card-body" style={{ overflowY: "scroll" }}>
                    <ul className="list-group">
                      {orderItems.map(orderItem => (
                        <React.Fragment key={orderItem.id}>
                          <OrderItem orderItem={orderItem} />
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
