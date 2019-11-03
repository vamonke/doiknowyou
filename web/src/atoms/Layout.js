import React from "react";
import PropTypes from "prop-types";
import { Box } from "rebass";
import HomeLink from "./HomeLink";

const Layout = ({ location, children }) => {
  const isHome = location.pathname === "/";
  return (
    <Box maxWidth={540} mx="auto" p={[0, 2, 3, 4]} variant="relative">
      {children}
      {!isHome && <HomeLink />}
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default Layout;
