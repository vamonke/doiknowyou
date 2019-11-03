import React from "react";
import { Card, Flex, Box, Heading, Text, Button } from "rebass";

import QuestionBank from "./QuestionBank";

const Admin = () => {
  document.title = "DIKY | Admin";
  return (
    <>
      <Box backgroundColor="black" color="white">
        <Box maxWidth={1024} mx="auto">
          <Heading fontSize={[4, 5]} pt={[2, 3]} px={2}>
            DIKY : Admin
          </Heading>
          <Box pt={2}>
            <Text variant="nav">Rooms</Text>
            <Text variant="nav.active">Question Bank</Text>
          </Box>
        </Box>
      </Box>
      <Box maxWidth={1024} mx="auto" p={[2, 3]}>
        <QuestionBank />
      </Box>
    </>
  );
};

export default Admin;
