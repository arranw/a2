import React, { Component } from "react";
import PersonalInformationForm from "../orders/PersonalInformationForm";

export default class InfoPage extends Component {
  state = {
    firstname: "",
    lastname: "",
    address: "",
    phone: ""
  };
  render() {
    return (
      <div>
        <PersonalInformationForm
          actionHandler={this.actionHandler}
          history={this.props.history}
        />
      </div>
    );
  }
}
