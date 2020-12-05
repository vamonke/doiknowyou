import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Flex, Box, Text, Button } from "rebass";
import Icon from "react-eva-icons";

import { capitalize } from "../utils";
import { QUESTIONS_COUNT } from "../constants";
import { startGame } from "../redux/client";

const GameInfo = props => {
  const {
    playerCount,
    roomNo,
    rounds = QUESTIONS_COUNT,
    timeLimit,
    showSettings,
    gameMode,
    isHost,
    startGame
  } = props;

  const insufficientPlayers = playerCount < 2;
  const gameModeCapitalized = capitalize(gameMode) || "-";
  const durationText = timeLimit > 0 ? `${timeLimit} sec` : "No limit";
  const showStartButton = isHost && gameMode === "random";

  const settings = [
    {
      icon: "sync-outline",
      label: "Rounds",
      textDesktop: `${rounds} rounds`,
      text: rounds
    },
    {
      icon: "question-mark",
      label: "Question type",
      textDesktop: `${gameModeCapitalized} questions`,
      text: gameModeCapitalized
    },
    {
      icon: "clock-outline",
      label: "Guess time",
      textDesktop: durationText,
      text: durationText
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
            {isHost && (
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

      <Box px={[2, 2, 3]}>
        <Box variant="card.bottom" mx={0} pt={[0, 0, 0, 0]}>
          <Flex
            mt={[3, 3, 3, 24]}
            justifyContent={["space-around", "space-around", "space-between"]}
            alignItems="center"
          >
            {settings.map(({ label, text }, index) => (
              <React.Fragment key={index}>
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
                  <Text fontWeight="medium">{text}</Text>
                </Box>
              </React.Fragment>
            ))}
          </Flex>

          {/* <Box mt={2} variant="hr" /> */}

          {showStartButton && (
            <Button
              mt={[3, 3, 3, 24]}
              width={1}
              variant="primary"
              type="button"
              onClick={startGame}
              disabled={insufficientPlayers}
            >
              Start game
            </Button>
          )}

          {insufficientPlayers && (
            <Text variant="subtitle" mt={3} textAlign="center">
              More players needed
            </Text>
          )}
        </Box>
      </Box>
    </>
  );
};

GameInfo.propTypes = {
  roomNo: PropTypes.number.isRequired,
  playerCount: PropTypes.number.isRequired,
  timeLimit: PropTypes.number.isRequired,
  gameMode: PropTypes.string.isRequired,
  playerCount: PropTypes.number.isRequired,
  roomNo: PropTypes.number.isRequired,
  rounds: PropTypes.number,
  isHost: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(startGame())
});

export default connect(
  null,
  mapDispatchToProps
)(GameInfo);
