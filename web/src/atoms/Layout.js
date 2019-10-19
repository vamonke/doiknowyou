import React from "react";
import { Box } from "rebass";
import { useRouteMatch } from "react-router-dom";

import HomeLink from "./HomeLink";

const Layout = props => {
  const matchHome = useRouteMatch("/");
  return (
    <Box maxWidth={540} mx="auto" p={3}>
      {props.children}
      {!matchHome.isExact &&
        <HomeLink />
      }
    </Box>
  );
};

export default Layout;
