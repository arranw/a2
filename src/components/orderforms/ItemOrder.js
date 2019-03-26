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
    // array.map(elem => (elem.name === e.name ? newElem : elem));
    this.setState({ extras: array });
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
    if (parseInt(quantity) < 0) {
      this.setState({ errors: { name: "Quantity must be positive." } });
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
    const { name, images, sizes, hasExtras } = this.props;
    const { size, selectedType, quantity, extras, errors } = this.state;
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
            </div>
          );
        }}
      </Consumer>
    );
  }
}
