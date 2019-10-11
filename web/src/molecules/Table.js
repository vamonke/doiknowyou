import React from "react";
import { Flex, Box, Text } from "rebass";

const Table = ({ columns, data }) => (
  <Box width={[1, 3 / 4, 2 / 3]}>
    <Flex flexWrap="wrap">
      {data.map((item, index) => {
        return (
          <Box px={2} width={1 / columns}>
            <Text
              p={1}
              style={{
                fontWeight: index < columns ? "bold" : "normal"
              }}
            >
              {item}
            </Text>
          </Box>
        );
      })}
    </Flex>
  </Box>
);

export default Table;
