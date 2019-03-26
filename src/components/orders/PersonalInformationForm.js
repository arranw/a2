import React, { Component } from "react";
import TextInputGroup from "../layout/TextInputGroup";
import { Consumer } from "../contexts/Context";

class PersonalInformationForm extends Component {
  state = {
    firstname: "",
    lastname: "",
    address: "",
    phone: ""
  };

  submitItem = (dispatch, e) => {
    dispatch({
      type: "SET_P_INFO",
      payload: this.state
    });
    this.props.history.push("/order");
  };

  actionHandler = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="col-md-8 offset-2">
              <div className="card">
                <div className="card-header mb-3">
                  <h1>
                    Welcome
                    <br />
                    <small>
                      Please enter some information before continuing.
                    </small>
                  </h1>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <TextInputGroup
                        label="First Name"
                        name="firstname"
                        actionHandler={this.actionHandler}
                      />
                    </div>
                    <div className="col-md-6">
                      <TextInputGroup
                        label="Last Name"
                        name="lastname"
                        actionHandler={this.actionHandler}
                      />
                    </div>
                    <div className="col-md-6">
                      <TextInputGroup
                        label="Address"
                        name="address"
                        actionHandler={this.actionHandler}
                      />
                    </div>
                    <div className="col-md-6">
                      <TextInputGroup
                        label="Phone Number"
                        name="phone"
                        actionHandler={this.actionHandler}
                      />
                    </div>
                    <div className="col-md-4 offset-4">
                      <button
                        className="btn btn-primary form-control"
                        onClick={() => {
                          this.submitItem(dispatch);
                        }}
                      >
                        Continue
                      </button>
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

export default PersonalInformationForm;
