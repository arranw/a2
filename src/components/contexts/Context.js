import React, { Component } from "react";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_P_INFO":
      return {
        ...state,
        personalInfo: action.payload
      };
    case "DELETE_ITEM":
      return {
        ...state,
        orderItems: state.orderItems.filter(
          order => order.id !== action.payload
        )
      };
    case "ADD_ITEM":
      return {
        ...state,
        orderItems: [...state.orderItems, action.payload]
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        orderItems: state.orderItems.map(item =>
          item.id === action.payload.id ? (item = action.payload) : item
        )
      };
    default:
      return state;
  }
};

const images = [
  [
    {
      src: "/pics/meat.png",
      caption: "Extra Meaty"
    },
    {
      src: "/pics/veggy.png",
      caption: "Really Veggy"
    },
    {
      src: "/pics/cheese.png",
      caption: "Very Cheesy"
    }
  ],
  [
    {
      src: "/pics/sw1.png",
      caption: "All Garden Vegetarian Sandwich"
    },
    {
      src: "/pics/sw2.png",
      caption: "Big Beef On a Bun Sandwich"
    },
    {
      src: "/pics/sw3.png",
      caption: "Mixed Grill"
    },
    {
      src: "/pics/sw4.png",
      caption: "Grilled Pork Sandwich"
    }
  ],
  [
    {
      src: "/pics/drink1.png",
      caption: "Root Beer"
    },
    {
      src: "/pics/drink2.png",
      caption: "Sprite"
    },
    {
      src: "/pics/drink3.png",
      caption: "Orange Soda"
    },
    {
      src: "/pics/drink4.png",
      caption: "Coca Cola"
    }
  ]
];
const sizes = ["S", "M", "L", "XL"];

export class Provider extends Component {
  state = {
    personalInfo: {
      firstname: "",
      lastname: "",
      address: "",
      phone: ""
    },
    orderItems: [],
    imageset: images,
    sizeset: sizes,

    dispatch: action => this.setState(state => reducer(state, action))
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
