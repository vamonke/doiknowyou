import React, { useState } from "react";
import { connect } from "react-redux";
import { Flex, Box, Heading, Text, Button } from "rebass";
import Icon from "react-eva-icons";

import { CreateGame, JoinGame } from "../organisms";
import { Modal, GithubLink } from "../atoms";
// import { QUESTIONS_COUNT } from "../constants";

import { leave } from "../redux/actions";
import { trackButton } from "../analytics";

const Home = () => {
  document.title = "Do I know you?";
  const [mode, setMode] = useState("home");

  const setModeAsHome = () => setMode("home");

  return (
    <>
      <Box variant="gradient" pt={[3, 4]}>
        <Box variant="container">
          <Box variant="card.top.large">
            <Heading fontSize={[7, 7, 9, 10]} lineHeight="1em">
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
      </Box>

      <Box variant="container">
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
              One person sits in the "the hot seat" each round and has to answer
              a question about themself.
            </Text>
            <Text variant="p">
              Meanwhile, the other players have to try to guess the answer of
              the player in the hot seat.
            </Text>
            <Text variant="p">
              Whoever guesses correctly wins 1 point. The player with the
              highest points wins the game.
            </Text>
          </Text>
        </Box>
      </Box>
      <GithubLink />
    </>
  );
};

const mapDispatchToProps = dispatch => {
  // TODO: use useEffect
  dispatch(leave());
  return {};
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
