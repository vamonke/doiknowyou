import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Flex, Box, Button } from "rebass";
import { Input } from "@rebass/forms";
import { Field, FieldArray } from "formik";
import Icon from "react-eva-icons";

// Lobby options component
const LobbyQuestionOptions = props => {
  const { options, questionNo } = props;
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
                    <Icon
                      fill="white"
                      name="close-outline"
                      size="large" // small, medium, large, xlarge
                    />
                  </Button>
                )}
              </Box>
            );
          })}

          <Flex justifyContent="center" mt={3}>
            {options.length > 2 && (
              <Button
                variant="link"
                color="darkgray"
                mx={2}
                onClick={() => setRemovable(!removable)}
              >
                {removable ? (
                  <>
                    <Box as="span" mb="-3px" key="icon-check">
                      <Icon
                        fill="#FA7F00"
                        name="checkmark"
                        size="large" // small, medium, large, xlarge
                      />
                    </Box>
                    &nbsp;Done
                  </>
                ) : (
                  <>
                    <Box as="span" mb="-3px" key="icon-minus">
                      <Icon
                        fill="#FA7F00"
                        name="minus"
                        size="medium" // small, medium, large, xlarge
                      />
                    </Box>
                    &nbsp;Remove option
                    {/* <Text variant="plus">-</Text>&nbsp; Remove option */}
                  </>
                )}
              </Button>
            )}
            {!removable && (
              <Button
                variant="link"
                color="darkgray"
                mx={2}
                onClick={() => arrayHelpers.push("")}
              >
                <Box as="span" mb="-3px">
                  <Icon
                    fill="#FA7F00"
                    name="plus"
                    size="medium" // small, medium, large, xlarge
                  />
                </Box>
                &nbsp;Add option
                {/* <Text variant="plus">+</Text>&nbsp; Add option */}
              </Button>
            )}
          </Flex>
        </>
      )}
    />
  );
};

LobbyQuestionOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  questionNo: PropTypes.number.isRequired
};

export default LobbyQuestionOptions;
