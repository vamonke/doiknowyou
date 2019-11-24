import React, { useState } from "react";
import { connect } from "react-redux";
import { Flex, Box, Heading, Text, Button } from "rebass";

import { CreateGame, JoinGame } from "../organisms";
import { Modal } from "../atoms";

import { leave } from "../redux/actions";

const Home = () => {
  document.title = "Do I know you?";
  const [mode, setMode] = useState("home");
  const cancel = () => setMode("home");
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
        </Box>
      </Box>

      <Box px={[0, 2, 3]}>
        <Box variant="card.bottom" pt={[0, 0]}>
          <Box mb={3} py={24} sx={{ borderBottom: "1px solid #DDD" }}>
            {
              <Flex mx={[-1, -2]}>
                <Box width={1 / 2} px={[1, 2]}>
                  <Button width={1} onClick={() => setMode("create")}>
                    Create Game
                  </Button>
                </Box>
                <Box width={1 / 2} px={[1, 2]}>
                  <Button width={1} onClick={() => setMode("join")}>
                    Join Game
                  </Button>
                </Box>
              </Flex>
            }
            {
              <Modal isOpen={mode === "create"} hide={() => setMode("home")}>
                <CreateGame cancel={cancel} />
              </Modal>
            }
            {
              <Modal isOpen={mode === "join"} hide={() => setMode("home")}>
                <JoinGame cancel={cancel} />
              </Modal>
            }
          </Box>
          <Text lineHeight={["1.6em", "1.8em"]} textAlign="justify" pb={3}>
            <Heading fontSize={3} pt={2} fontWeight="medium">
              How to play
            </Heading>
            <Text variant="p">
              Before starting the game, every player writes up to 3 questions to
              add to the question pool.
            </Text>
            <Text variant="p">
              In each player&apos;s turn, he/she draws a random question and
              answers it in secret. Meanwhile, other players will try to guess
              his/her answer. Whoever guesses correctly wins 1 point.
            </Text>
            <Text variant="p">
              The game ends when the question pool is empty. The player with the
              highest points wins the game.
            </Text>
          </Text>
        </Box>
      </Box>
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
