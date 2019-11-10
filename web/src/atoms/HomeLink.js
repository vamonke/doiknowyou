import React from "react";
import { Box, Button } from "rebass";
import history from "../redux/history";

const HomeLink = () => {
  const handleClick = () => {
    if (window.confirm("Exit game?")) history.push("/");
  };
  return (
    <Box my={4} textAlign="center">
      <Button
        variant="link"
        onClick={handleClick}
        sx={{ textDecoration: "underline" }}
      >
        Home
      </Button>
    </Box>
  );
};

export default HomeLink;
