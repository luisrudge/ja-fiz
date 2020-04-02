import React from "react";
import Button from "./Button";

const IconButton = ({ iconUrl, iconAlt, ...props }) => {
  return (
    <Button {...props}>
      <img src={iconUrl} alt="" />
    </Button>
  );
};

export default IconButton;
