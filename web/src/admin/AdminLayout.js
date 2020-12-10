import React from "react";
import { Box, Heading, Button } from "rebass";
import { useHistory } from "react-router-dom";

const routeMapping = {
  rooms: "Rooms",
  questionbank: "Question Bank",
  logs: "Logs"
};

const Layout = ({ children }) => {
  const {
    push,
    location: { pathname }
  } = useHistory();
  document.title = "DIKY | Admin";
  return (
    <>
      <Box variant="gradient">
        <Box maxWidth={1024} mx="auto">
          <Heading fontSize={[4, 5]} mt={[-2, -3]} color="white">
            DIKY : Admin
          </Heading>
          <Box pt={2}>
            {Object.keys(routeMapping).map(key => {
              const href = "/admin/" + key;
              const isActive = pathname.includes(href);
              return (
                <Button
                  key={key}
                  variant={isActive ? "tab.active" : "tab"}
                  onClick={() => push(href)}
                >
                  {routeMapping[key]}
                </Button>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box maxWidth={1024} mx="auto" p={[2, 3]}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
