import React, { Component } from "react";
import Figure from "../layout/Figure";
import TextInputGroup from "../layout/TextInputGroup";
import SelectGroup from "../layout/SelectGroup";
import Checkbox from "../layout/Checkbox";
import { Consumer } from "../contexts/Context";
import uuid from "uuid";

export default class ItemOrder extends Component {
  state = {
    quantity: "",
    selectedType: "",
    size: "",
    id: uuid.v1(),
    extrasPrice: 0,
    typePrice: 0,
    extras: [
      { name: "Extra Cheese", selected: false },
      { name: "Pepperoni", selected: false },
      { name: "Mushrooms", selected: false },
      { name: "Bacon", selected: false },
      { name: "Olives", selected: false }
    ],
    errors: []
  };

  setSelected = e => {
    switch (e) {
      case "All Garden Vegetarian Sandwich":
        this.setState({ typePrice: 7.5 });
        break;
      case "Big Beef On a Bun Sandwich":
        this.setState({ typePrice: 8.5 });
        break;
      case "Mixed Grill":
      case "Grilled Pork Sandwich":
        this.setState({ typePrice: 9.5 });
        break;
      case "Extra Meaty":
      case "Really Veggy":
      case "Very Cheesy":
        switch (this.state.size) {
          case "S":
            console.log("dsa");
            this.setState({ typePrice: 8.5 });
            console.log(this.state.typePrice);
            break;
          case "M":
            this.setState({ typePrice: 11.5 });
            break;
          case "L":
            this.setState({ typePrice: 14 });
            break;
          case "XL":
            this.setState({ typePrice: 16.5 });
            break;
          default:
            this.setState({ typePrice: 0 });
        }
        break;
      default:
        this.setState({ typePrice: 0 });
    }
    this.setState({ selectedType: e });
  };

  toggleExtra = e => {
    let array = this.state.extras;
    let newElem = e;
    newElem.selected = !newElem.selected;
    array[
      array.findIndex(function(elem) {
        return elem.name === e.name;
      })
    ] = e;
    let p = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i].selected) p += 1.75;
    }
    // array.map(elem => (elem.name === e.name ? newElem : elem));
    this.setState({ extras: array, extrasPrice: p });
  };

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
    if (parseInt(quantity) < 1) {
      this.setState({ errors: { name: "Quantity must more than 0." } });
      return;
    }
    if (size === "" && this.props.sizes !== undefined) {
      this.setState({ errors: { name: "Size is required." } });
      return;
    }

    dispatch({
      type: "ADD_ITEM",
      payload: this.state
    });
    this.clearState();
  };

  actionHandler = e => {
    console.log(e.target.type);
    if (e.target.type === "select-one") {
      switch (this.state.selectedType) {
        case "Extra Meaty":
        case "Really Veggy":
        case "Very Cheesy":
          switch (e.target.value) {
            case "S":
              this.setState({ typePrice: 8.5 });
              break;
            case "M":
              this.setState({ typePrice: 11.5 });
              break;
            case "L":
              this.setState({ typePrice: 14 });
              break;
            case "XL":
              this.setState({ typePrice: 16.5 });
              break;
            default:
              this.setState({ typePrice: 0 });
          }
          break;
        case "Root Beer":
        case "Sprite":
        case "Orange Soda":
        case "Coca Cola":
          switch (e.target.value) {
            case "S":
              this.setState({ typePrice: 1.25 });
              break;
            case "M":
              this.setState({ typePrice: 1.75 });
              break;
            case "L":
              this.setState({ typePrice: 2 });
              break;
            case "XL":
              this.setState({ typePrice: 2.25 });
              break;
            default:
              this.setState({ typePrice: 0 });
          }
          break;
      }
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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
    const { name, images, sizes, hasExtras } = this.props;
    const {
      size,
      selectedType,
      quantity,
      extras,
      errors,
      extrasPrice,
      typePrice
    } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-4">
              <div className="card-header mb-3">
                <h3>{name}</h3>
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
                    {images.map(image => (
                      <div key={images.indexOf(image)}>
                        <Figure
                          image={image}
                          handler={this.setSelected}
                          selectedType={selectedType}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="col-md-4 offset-md-1">
                    {hasExtras
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
                    {sizes !== undefined ? (
                      <SelectGroup
                        name="size"
                        label="Size?"
                        value={size}
                        options={sizes}
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
              <div>
                <h4>
                  $
                  {parseInt(quantity) > 0
                    ? ((extrasPrice + typePrice) * parseInt(quantity)).toFixed(
                        2
                      )
                    : "0.00"}
                </h4>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
