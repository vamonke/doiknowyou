import React from "react";
import { Box, Text } from "rebass";
import { Label, Input } from "@rebass/forms";
import Icon from "react-eva-icons";

import { capitalize } from "../utils";

const CheckBox = props => {
  const { handleChange, name, isSelected, value, description } = props;
  return (
    <Label name={name}>
      <Input type="radio" onChange={handleChange} name={name} value={value} />
      <Box variant="selectable.block" mt={0} mx={0} mb={3} width={1}>
        <Text mb="-4px" mr={2}>
          {isSelected ? (
            // <Text> wrapper is needed for React to detect a change in key
            <Text key="checkmark-circle-2">
              <Icon fill="#FA7F00" name="checkmark-circle-2" size="large" />
            </Text>
          ) : (
            <Text key="radio-button-off">
              <Icon fill="#BBB" name="radio-button-off" size="large" />
            </Text>
          )}
        </Text>
        <Box>
          <Text
            fontWeight={description ? "medium" : "body"}
            color={isSelected ? "orange" : "darkpurle"}
          >
            {capitalize(value)}
          </Text>
          {description && (
            <Text fontSize={1} pt={1}>
              {description}
            </Text>
          )}
        </Box>
      </Box>
    </Label>
  );
};

export default CheckBox;
