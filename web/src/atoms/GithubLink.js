import React from "react";
import { Box, Link, Text } from "rebass";
import Icon from "react-eva-icons";

const GithubLink = () => (
  <Box textAlign="center" color="gray" mb={3}>
    <Link
      display="inline-flex"
      fontSize={0}
      href="https://github.com/vamonke/doiknowyou"
    >
      <Icon fill="#BBB" name="github" size="medium" />
      <Text ml={1} mt="2px" as="span">
        Created by Varick
      </Text>
    </Link>
  </Box>
);

export default GithubLink;
