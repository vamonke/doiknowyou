import React from "react";
import PropTypes from "prop-types";
import { Flex, Box, Text, Button } from "rebass";
import Icon from "react-eva-icons";

import { capitalize } from "../utils";
import { QUESTIONS_COUNT } from "../constants";

const RoomInfo = props => {
  const {
    roomNo,
    rounds = QUESTIONS_COUNT,
    timeLimit = 0,
    showSettings,
    gameMode = "random"
  } = props;

  const gameModeCapitalized = capitalize(gameMode);
  const durationText = timeLimit > 0 ? `${timeLimit} sec` : "No limit";

  const settings = [
    {
      icon: "sync-outline",
      label: "Rounds",
      textDesktop: `${rounds} rounds`,
      textMobile: rounds
    },
    {
      icon: "question-mark",
      label: "Question type",
      textDesktop: `${gameModeCapitalized} questions`,
      textMobile: gameModeCapitalized
    },
    {
      icon: "clock-outline",
      label: "Guess time",
      textDesktop: durationText,
      textMobile: durationText
    }
  ];

  return (
    <>
      <Box variant="orange">
        <Box variant="orange.card.small">
          <Flex justifyContent="space-between" alignItems="bottom">
            <Text fontWeight="medium" fontSize={3}>
              Room {roomNo}
            </Text>
            {showSettings && (
              <Button
                type="button"
                variant="link"
                color="white"
                fontSize={2}
                onClick={showSettings}
              >
                <Box
                  mb={-1}
                  mr={[1, 1, 2]}
                  sx={{ display: "inline-block", verticalAlign: "-0.4em" }}
                >
                  <Icon
                    fill="#F7CF00"
                    name="settings-2-outline"
                    size="large" // small, medium, large, xlarge
                  />
                </Box>
                Settings
              </Button>
            )}
          </Flex>
        </Box>
      </Box>

      <Box px={[2, 2, 3]} mb={3}>
        <Box
          variant="card.bottom.small"
          mb={0}
          display={["none", "none", "none", "block"]}
        >
          <Flex py={3} justifyContent="space-between">
            {settings.map(({ icon, textDesktop }) => (
              <Box>
                <Box variant="icon" mr={2}>
                  <Icon
                    fill="#F7B500"
                    name={icon}
                    size="large" // small, medium, large, xlarge
                  />
                </Box>
                {textDesktop}
              </Box>
            ))}
          </Flex>
        </Box>
        <Box
          variant="card.bottom.small"
          mb={0}
          display={["block", "block", "block", "none"]}
        >
          <Flex py={3} justifyContent="space-around" alignItems="center">
            {settings.map(({ label, textMobile }, index) => (
              <>
                {index !== 0 && (
                  <Box
                    height={32}
                    sx={{ borderRight: "1px solid", borderColor: "lightgray" }}
                  />
                )}
                <Box variant="col">
                  <Text fontSize={0} pb={1}>
                    {label}
                  </Text>
                  <Text fontWeight="medium">{textMobile}</Text>
                </Box>
              </>
            ))}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

RoomInfo.propTypes = {
  roomNo: PropTypes.number.isRequired,
  playerCount: PropTypes.number.isRequired,
  timeLimit: PropTypes.number.isRequired,
  gameMode: PropTypes.string.isRequired
};

export default RoomInfo;
