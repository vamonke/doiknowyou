import React, { useState } from "react";
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

  const [message, setMessage] = useState("");

  const insufficientPlayers = playerCount < 2;
  const gameModeCapitalized = capitalize(gameMode) || "-";
  const durationText = timeLimit > 0 ? `${timeLimit} sec` : "No limit";
  const showStartButton = isHost && gameMode === "random";

  const showMessage = () => setMessage("At least 2 players needed");
  const onClick = insufficientPlayers ? showMessage : startGame;

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
      <Box variant="orange" px={[0, 0, 0, 0]}>
        <Box variant="container">
          <Box variant="card.top.xsmall">
            <Flex justifyContent="space-between" alignItems="center">
              Room {roomNo}
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
                    mr={1}
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
      </Box>

      <Box variant="container">
        <Box variant="card.bottom.xsmall" pb={1}>
          <Flex py={3} justifyContent={"space-between"} alignItems="center">
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

          {showStartButton && (
            <Button
              mt={1}
              mb={3}
              width={1}
              variant="primary"
              type="button"
              onClick={onClick}
              // disabled={insufficientPlayers}
            >
              Start game
            </Button>
          )}

          {insufficientPlayers && message && (
            <Text
              variant="subtitle"
              textAlign="center"
              fontSize={1}
              mt={-2}
              mb={1}
            >
              {message}
            </Text>
          )}
        </Box>
      </Box>
    </>
  );
};

GameInfo.propTypes = {
  gameMode: PropTypes.string.isRequired,
  isHost: PropTypes.bool.isRequired,
  playerCount: PropTypes.number.isRequired,
  roomNo: PropTypes.number.isRequired,
  rounds: PropTypes.number,
  timeLimit: PropTypes.number.isRequired
};

const mapDispatchToProps = dispatch => ({
  startGame: () => dispatch(startGame())
});

export default connect(
  null,
  mapDispatchToProps
)(GameInfo);
