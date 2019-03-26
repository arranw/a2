import React from "react";

const Checkbox = ({ name, selected, handler }) => {
  return (
    <div
      className="input-group mb-1"
      name={name}
      onClick={() => {
        handler({ name, selected });
      }}
    >
      <div className="input-group-prepend" style={{ flex: "0 0 75%" }}>
        <span
          className="input-group-text"
          style={{ width: "100%" }}
          id="basic-addon2"
        >
          {name}
        </span>
      </div>
      <div
        name={name}
        className={
          selected ? "form-control bg-primary text-light " : "form-control"
        }
      >
        {selected ? <i className="fas fa-sm fa-check" /> : null}
      </div>
    </div>
  );
};

export default Checkbox;
