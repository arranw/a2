import React, { Component } from "react";
import { Consumer } from "../contexts/Context";
import { Link } from "react-router-dom";

export default class OrderItem extends Component {
  render() {
    const { orderItem } = this.props;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <li className="list-group-item">
              <div>
                <i
                  className="fas fa-times"
                  onClick={() => {
                    dispatch({ type: "DELETE_ITEM", payload: orderItem.id });
                  }}
                  style={{ color: "red", cursor: "pointer", float: "right" }}
                />
                <Link to={`/order/item/edit/${orderItem.id}`}>
                  <i
                    className="fas fa-pencil-alt mr-2"
                    style={{ cursor: "pointer", float: "right" }}
                  />
                </Link>
              </div>
              <span style={{ float: "left" }}>
                {orderItem.quantity}x {orderItem.size} {orderItem.selectedType}
                {orderItem.extras !== undefined ? (
                  <ul>
                    {orderItem.extras.map(extra =>
                      extra.selected ? (
                        <li key={orderItem.extras.indexOf(extra)}>
                          {extra.name}
                        </li>
                      ) : null
                    )}
                  </ul>
                ) : null}
              </span>
            </li>
          );
        }}
      </Consumer>
    );
  }
}
