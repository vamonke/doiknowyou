import React from "react";
import { Box, Button, Text } from "rebass";
import { Label, Input } from "@rebass/forms";
import { Formik } from "formik";
import Icon from "react-eva-icons";

const SelectOptionForm = ({ options, handleSubmit, writtenAnswer }) => {
  const onSubmit = values => {
    const answer = Object.keys(values)
      .filter(key => values[key])
      .map(Number);
    if (writtenAnswer) answer.push({ written: writtenAnswer });
    handleSubmit(answer);
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={onSubmit}
      render={props => {
        const { handleSubmit, handleChange, values } = props;
        const noneSelected = !Object.values(values).some(Boolean);
        const hasWritten = !!writtenAnswer;
        const disabled = noneSelected && !hasWritten;
        const noneAllowed = noneSelected && hasWritten;

        return (
          <form onSubmit={handleSubmit}>
            {options.map((option, index) => (
              <Label key={index} sx={{ display: "inline-flex !important" }}>
                <Input type="checkbox" onChange={handleChange} name={index} />
                <Box variant="selectable">
                  {values[index] ? (
                    <Text as="span" mb="-4px" key="icon-check" mr={2}>
                      <Icon
                        fill="#FA7F00"
                        name="checkmark-circle-2"
                        size="large" // small, medium, large, xlarge
                      />
                    </Text>
                  ) : (
                    <Text as="span" mb="-4px" key="icon-circle" mr={2}>
                      <Icon
                        fill="#BBB"
                        name="radio-button-off"
                        size="large" // small, medium, large, xlarge
                      />
                    </Text>
                  )}
                  {option}
                </Box>
              </Label>
            ))}
            <Button
              type="submit"
              width={1}
              key={noneAllowed ? "outline" : "primary"}
              variant={noneAllowed ? "outline" : "primary"}
              disabled={disabled}
              mt={3}
            >
              {noneAllowed ? "None of the above" : "Submit"}
            </Button>
          </form>
        );
      }}
    />
  );
};

export default SelectOptionForm;
