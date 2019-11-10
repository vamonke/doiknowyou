import React from "react";
import PropTypes from "prop-types";
import { Flex, Box, Text } from "rebass";
import { Select } from "@rebass/forms";
import { Field } from "formik";

const LobbySelectOptions = props => {
  const { questionNo, handleChange, setFieldValue } = props;

  const setOptionType = event => {
    const type = event.target.value;
    let options = ["", ""];

    if (type === "mcq") {
      options = ["", ""];
    } else if (type === "yesno") {
      options = ["Yes", "No"];
    } else if (type === "players" || type === "open") {
      options = undefined;
    }

    setFieldValue(`questions[${questionNo}].options`, options);
    handleChange(event);
  };

  return (
    <Flex justifyContent="space-between">
      <Text fontWeight="medium" py={2}>
        Options
      </Text>
      <Field
        name={`questions[${questionNo}].type`}
        render={({ field }) => (
          <Box width={150}>
            <Select
              {...field}
              name={`questions[${questionNo}].type`}
              onChange={setOptionType}
            >
              <option value="mcq">Custom</option>
              <option value="yesno">Yes/No</option>
              <option value="players">Players</option>
              <option value="open">Open-ended</option>
            </Select>
          </Box>
        )}
      />
    </Flex>
  );
};

LobbySelectOptions.propTypes = {
  questionNo: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired
};

export default LobbySelectOptions;
