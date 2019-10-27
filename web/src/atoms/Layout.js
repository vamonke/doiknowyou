import React from "react";
import PropTypes from "prop-types";
import { Box } from "rebass";
import { useRouteMatch } from "react-router-dom";

import HomeLink from "./HomeLink";

const Layout = ({ children }) => {
  const matchHome = useRouteMatch("/");
  return (
    <Box maxWidth={540} mx="auto" p={[0, 2, 3, 4]} variant="relative">
      {children}
      {!matchHome.isExact &&
        <HomeLink />
      }
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
