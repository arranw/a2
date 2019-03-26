import React, { Component } from "react";
import { Consumer } from "../contexts/Context";
import Figure from "../layout/Figure";
import TextInputGroup from "../layout/TextInputGroup";
import SelectGroup from "../layout/SelectGroup";
import Checkbox from "../layout/Checkbox";
import uuid from "uuid";

export default class EditItem extends Component {
  state = {
    name: "",
    quantity: "",
    selectedType: "",
    size: "",
    id: "",
    extras: [
      { name: "Extra Cheese", selected: false },
      { name: "Pepperoni", selected: false },
      { name: "Mushrooms", selected: false },
      { name: "Bacon", selected: false },
      { name: "Olives", selected: false }
    ],
    errors: []
  };

  names = ["Pizza", "Sandwich", "Drink"];

  componentWillMount() {
    this.loadCurrentItem(this.props.match.params.id, this.context);
  }

  toggleExtra = e => {
    let array = this.state.extras;
    let newElem = e;
    newElem.selected = !newElem.selected;
    array[
      array.findIndex(function(elem) {
        return elem.name === e.name;
      })
    ] = e;
    // array.map(elem => (elem.name === e.name ? newElem : elem));
    this.setState({ extras: array });
  };

  loadCurrentItem(id, value) {
    const { orderItems } = value;
    let currentItem = {};
    for (let i = 0; i < orderItems.length; i++) {
      if (orderItems[i].id === id) {
        currentItem = orderItems[i];
      }
    }
    switch (currentItem.selectedType) {
      case "Extra Meaty":
      case "Really Veggy":
      case "Very Cheesy":
        currentItem.name = "Pizza";
        break;
      case "All Garden Vegetarian Sandwich":
      case "Big Beef On a Bun Sandwich":
      case "Mixed Grill":
      case "Grilled Pork Sandwich":
        currentItem.name = "Sandwich";
        break;
      case "Root Beer":
      case "Sprite":
      case "Orange Soda":
      case "Coca Cola":
        currentItem.name = "Drink";
        break;
      default:
        currentItem.name = "noName";
    }
    this.setState(currentItem);
  }
  submitItem = (dispatch, e) => {
    const { quantity, selectedType, size } = this.state;

    if (selectedType === "") {
      this.setState({ errors: { name: "You must select a type." } });
      return;
    }
    if (quantity === "") {
      this.setState({ errors: { name: "Quantity is required." } });
      return;
    }
    if (parseInt(quantity) < 0) {
      this.setState({ errors: { name: "Quantity must be positive." } });
      return;
    }
    if (size === "" && this.props.sizes !== undefined) {
      this.setState({ errors: { name: "Size is required." } });
      return;
    }

    console.log(this.state);
    dispatch({
      type: "UPDATE_ITEM",
      payload: this.state
    });
    this.clearState();
    this.props.history.push("/order");
  };

  setSelected = e => {
    this.setState({ selectedType: e });
  };

  actionHandler = e => this.setState({ [e.target.name]: e.target.value });

  clearState() {
    let array = [];
    if (this.state.extras !== undefined) {
      array = [
        { name: "Extra Cheese", selected: false },
        { name: "Pepperoni", selected: false },
        { name: "Mushrooms", selected: false },
        { name: "Bacon", selected: false },
        { name: "Olives", selected: false }
      ];
    }
    this.setState({
      quantity: "",
      selectedType: "",
      size: "",
      id: uuid.v1(),
      extras: array,
      errors: []
    });
  }

  render() {
    const { size, selectedType, quantity, extras, errors, name } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch, imageset, sizeset } = value;
          return (
            <div className="col-md-10 offset-1">
              <div className="card">
                <div className="card-header">
                  <h3>Edit Item</h3>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div
                      className="col-md-4 offset-md-1 shadow rounded"
                      style={{
                        overflowY: "scroll",
                        height: "350px"
                      }}
                    >
                      {imageset[this.names.indexOf(name)].map(image => (
                        <div
                          key={imageset[this.names.indexOf(name)].indexOf(
                            image
                          )}
                        >
                          <Figure
                            image={image}
                            handler={this.setSelected}
                            selectedType={selectedType}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="col-md-4 offset-md-1">
                      {this.state.name === "Pizza"
                        ? extras.map(extra => {
                            return (
                              <div
                                className="col-md-10 offset-1"
                                key={extras.indexOf(extra)}
                              >
                                <Checkbox
                                  name={extra.name}
                                  selected={extra.selected}
                                  handler={this.toggleExtra}
                                />
                              </div>
                            );
                          })
                        : null}
                      <TextInputGroup
                        type="number"
                        name="quantity"
                        label="How Many?"
                        value={quantity}
                        actionHandler={this.actionHandler}
                        error={errors.name}
                      />
                      {name === this.names[0] || name === this.names[2] ? (
                        <SelectGroup
                          name="size"
                          label="Size?"
                          value={size}
                          options={sizeset}
                          actionHandler={this.actionHandler}
                          error={errors.name}
                        />
                      ) : null}
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          this.submitItem(dispatch);
                        }}
                      >
                        Add To Order
                      </button>

                      {errors.name !== undefined ? (
                        <div className="text-danger">{errors.name}</div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

EditItem.contextType = Consumer;
