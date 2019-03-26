import React from "react";
import PropTypes from "prop-types";

const SelectGroup = ({ label, value, name, options, actionHandler }) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend" style={{ flex: "0 0 40%" }}>
        <label className="input-group-text" style={{ width: "100%" }}>
          {label}
        </label>
      </div>
      <select
        name={name}
        value={value}
        onChange={actionHandler}
        className="form-control"
      >
        <option defaultChecked />
        {options.map(option => {
          return <option key={options.indexOf(option)}>{option}</option>;
        })}
      </select>
    </div>
  );
};

SelectGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  actionHandler: PropTypes.func.isRequired
};

export default SelectGroup;
