import React from "react";

const Figure = ({ image, handler, selectedType }) => {
  return (
    <React.Fragment>
      <figure
        onClick={() => {
          handler(image.caption);
        }}
        className="figure"
      >
        <img
          style={{ maxWidth: "75%" }}
          src={image.src}
          alt={image.caption}
          className={
            image.caption === selectedType
              ? "rounded figure-img img-fluid shadow-lg bg-blue border border-3 border-primary"
              : "rounded figure-img img-fluid"
          }
        />
        <figcaption className="figure-caption">{image.caption}</figcaption>
      </figure>
    </React.Fragment>
  );
};

export default Figure;
