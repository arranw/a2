import React from "react";
import PropTypes from "prop-types";

const TextInputGroup = ({
  label,
  type,
  value,
  name,
  placeholder,
  actionHandler,
  error
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend" style={{ flex: "0 0 40%" }}>
        <label className="input-group-text" style={{ width: "100%" }}>
          {label}
        </label>
      </div>
      <input
        min="0"
        type={type}
        name={name}
        value={value}
        onChange={actionHandler}
        placeholder={placeholder}
        className="form-control"
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  actionHandler: PropTypes.func.isRequired
};

TextInputGroup.defaultProps = {
  type: "text"
};

export default TextInputGroup;
