import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Flex, Box, Button } from "rebass";
import { Input } from "@rebass/forms";
import { Field, FieldArray } from "formik";

// Lobby options component
const LobbyQuestionOptions = props => {
  const {
    options,
    questionNo
  } = props;
  const [removable, setRemovable] = useState(false);

  useEffect(() => {
    if (!options || options.length === 2) setRemovable(false);
  }, [options]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FieldArray
      name={`questions[${questionNo}].options`}
      render={arrayHelpers => (
        <>
          {options.map((_, index) => {
            const showDel = options.length > 2 && removable;
            return (
              <Box key={index} variant="relative">
                <Field
                  name={`questions[${questionNo}].options[${index}]`}
                  render={({ field }) => (
                    <Input
                      {...field}
                      sx={showDel && { paddingRight: "48px" }}
                      placeholder={`Option ${index + 1}`}
                    />
                  )}
                />
                {showDel && (
                  <Button
                    variant="inField"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    X
                  </Button>
                )}
              </Box>
            );
          })}

          <Flex justifyContent="center" mt={3}>
            {options.length > 2 && (
              <Button
                variant="link"
                mx={2}
                onClick={() => setRemovable(!removable)}
              >
                {removable ? "Done" : "- Remove option"}
              </Button>
            )}
            {!removable && (
              <Button
                variant="link"
                mx={2}
                onClick={() => arrayHelpers.push("")}
              >
                + Add option
              </Button>
            )}
          </Flex>
        </>
      )}
    />
  );
};

LobbyQuestionOptions.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.string
  ),
  questionNo: PropTypes.number.isRequired
};

export default LobbyQuestionOptions;
