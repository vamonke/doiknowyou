import React from "react";
import { Button } from "rebass";
import Icon from "react-eva-icons";

const IconButton = ({ icon, onClick, color = "#F7CF00", size = "xlarge" }) => {
  return (
    <Button onClick={onClick} variant="icon" key={icon} mr={-2}>
      <Icon
        fill={color}
        name={icon}
        size={size} // small, medium, large, xlarge
      />
    </Button>
  );
};

export default IconButton;
