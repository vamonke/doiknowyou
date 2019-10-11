import React from "react";
import { Box } from "rebass";

const Layout = props => {
  return (
    <Box maxWidth={540} mx="auto" p={3}>
      {props.children}
    </Box>
  );
};

export default Layout;
