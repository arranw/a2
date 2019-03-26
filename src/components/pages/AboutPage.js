import React, { Component } from "react";

export default class AboutPage extends Component {
  render() {
    return (
      <div className="col-md-6 offset-3">
        <div className="card">
          <div className="card-header">
            <h3>About</h3>
          </div>
          <div className="card-body">
            <p>This is my first, fully self-coded React app.</p>
          </div>
        </div>
      </div>
    );
  }
}
