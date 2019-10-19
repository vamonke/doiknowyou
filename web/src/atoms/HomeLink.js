import React from "react";
import { Box, Button } from "rebass";
import { useHistory } from "react-router-dom";

const HomeLink = () => {  
  const history = useHistory();
  const handleClick = () => {
    if (window.confirm("Exit game?"))
      history.push("/");
  }
  return (
    <Box mt={4} textAlign="center">
      <Button variant="link" onClick={handleClick}>Home</Button>
    </Box>
  );
};

export default HomeLink;
