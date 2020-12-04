import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Flex, Box, Button, Text } from "rebass";
import { Label, Select } from "@rebass/forms";

import { CheckBox } from "../atoms";
import { hostSettings } from "../redux/client";

const gameModes = [
  {
    value: "random",
    description: "Questions are randomly generated"
  },
  {
    value: "custom",
    description: "Players write their own questions"
  }
];

const settingsMap = [
  // { name: "gameMode", label: "Question Type", value: "Random" },
  // {
  //   name: "rounds",
  //   label: "Rounds",
  //   options: [1, 2, 3, 4, 5],
  //   optionFormat: Number,
  // },
  {
    name: "timeLimit",
    label: "Guessing time",
    options: [0, 10, 20, 30],
    optionFormat: option => (option === 0 ? "No limit" : option + " sec")
  }
];

const Settings = ({ room, hide, updateSettings }) => {
  const onChange = formatter => e => {
    const { name, value } = e.target;
    const settings = { [name]: formatter(value) };
    updateSettings(settings);
  };

  return (
    <>
      <Box variant="orange.card.small">
        <Box variant="modal.header">Game Settings</Box>
      </Box>

      <Box variant="modal.card">
        <Text fontWeight="medium" mb={3} mt={0}>
          Question type
        </Text>

        {gameModes.map(({ value, description }) => (
          <CheckBox
            key={value}
            isSelected={room.gameMode === value}
            handleChange={onChange(String)}
            name="gameMode"
            description={description}
            value={value}
          />
        ))}

        <Box variant="hr" mt={2} />

        {settingsMap.map(({ label, name, options, optionFormat }) => {
          return (
            <Flex
              justifyContent="space-between"
              alignItems="center"
              // variant="row"
              key={name}
            >
              <Label htmlFor={name} fontWeight="medium">
                {label}
              </Label>
              <Select
                width={128}
                name={name}
                onChange={onChange(Number)}
                defaultValue={room[name]}
              >
                {options.map(option => (
                  <option key={option} value={option}>
                    {optionFormat(option)}
                  </option>
                ))}
              </Select>
            </Flex>
          );
        })}

        <Box variant="hr" mb={0} />

        <Button onClick={hide} width={1} mt={24}>
          Done
        </Button>
      </Box>
    </>
  );
};

Settings.propTypes = {
  isOpen: PropTypes.bool,
  room: PropTypes.shape({
    timeLimit: PropTypes.number
  }),
  hide: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  updateSettings: settings => dispatch(hostSettings(settings))
});

export default connect(
  null,
  mapDispatchToProps
)(Settings);
