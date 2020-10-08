import React, { useState } from "react";
import { connect } from "react-redux";
import { Flex, Box, Heading, Text, Button } from "rebass";
import Icon from "react-eva-icons";

import { CreateGame, JoinGame } from "../organisms";
import { Modal, GithubLink } from "../atoms";

import { leave } from "../redux/actions";
import { trackButton } from "../analytics";

const Home = () => {
  document.title = "Do I know you?";
  const [mode, setMode] = useState("home");

  const setModeAsHome = () => setMode("home");

  return (
    <>
      <Box variant="orange">
        <Box variant="orange.card">
          <Heading fontSize={[7, 7, 8, 9]} lineHeight="1em">
            Do I
            <br />
            Know
            <br />
            You
            <Text color="yellow" ml={2} sx={{ display: "inline" }}>
              ?
            </Text>
          </Heading>
          <Text mt={3}>
            A game to test how well you really know your friends
          </Text>
        </Box>
      </Box>

      <Box px={[0, 2, 3]}>
        <Box variant="card.bottom" pt={[0, 0]}>
          <Box mb={3} py={24} sx={{ borderBottom: "1px solid #DDD" }}>
            {
              <Flex mx={[-1, -2]}>
                <Box width={1 / 2} px={[1, 2]}>
                  <Button
                    width={1}
                    onClick={trackButton(() => setMode("create"))}
                  >
                    Create Game
                  </Button>
                </Box>
                <Box width={1 / 2} px={[1, 2]}>
                  <Button
                    width={1}
                    onClick={trackButton(() => setMode("join"))}
                  >
                    Join Game
                  </Button>
                </Box>
              </Flex>
            }
            {
              <Modal isOpen={mode === "create"} hide={setModeAsHome}>
                <CreateGame cancel={setModeAsHome} />
              </Modal>
            }
            {
              <Modal isOpen={mode === "join"} hide={setModeAsHome}>
                <JoinGame cancel={setModeAsHome} />
              </Modal>
            }
          </Box>
          <Text lineHeight={["1.6em", "1.8em"]} pb={3}>
            <Flex justifyContent="space-between" pt={2}>
              <Heading fontSize={3} fontWeight="medium">
                How to play
              </Heading>
              <Flex alignItems="center">
                <Icon fill="darkpurple" name="people" size="medium" />
                <Text ml={1} mt="-2px" as="span">
                  2+ players
                </Text>
              </Flex>
            </Flex>
            <Text variant="p">
              Before starting the game, every player writes up to 3 questions to
              add to the question pool.
            </Text>
            <Text variant="p">
              In the game, during your turn, a question is randomly drawn for
              you. You'll answer the question honestly while other players try
              to guess your answer. Whoever guesses correctly wins 1 point.
            </Text>
            <Text variant="p">
              The game ends when there are no remaining questions. The player
              with the highest points wins the game.
            </Text>
          </Text>
        </Box>
      </Box>
      <GithubLink />
    </>
  );
};

const mapDispatchToProps = dispatch => {
  dispatch(leave());
  return {};
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
