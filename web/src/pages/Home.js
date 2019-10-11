import React, { useState } from "react";
import { connect } from "react-redux";
import { Card, Flex, Box, Text, Button } from "rebass";

import CreateGame from "../organisms/CreateGame";
import JoinGame from "../organisms/JoinGame";

import { reset } from "../redux/actions";

const Home = () => {
  const [mode, setMode] = useState("home");
  const cancel = () => setMode("home");
  return (
    <Card>
      <Text fontSize={4} fontWeight="bold" textAlign="center" mb={3}>
        Do I know you?
      </Text>

      {mode === "home" && (
        <Flex mx={-1}>
          <Box width={1 / 2} px={1}>
            <Button width={1} onClick={() => setMode("create")}>
              Create Game
            </Button>
          </Box>
          <Box width={1 / 2} px={1}>
            <Button width={1} onClick={() => setMode("join")}>
              Join Game
            </Button>
          </Box>
        </Flex>
      )}

      {mode === "create" && <CreateGame cancel={cancel} />}
      {mode === "join" && <JoinGame cancel={cancel} />}

      <Text variant="p">
        Before starting the game, every player will write down up to 3 questions
        to add to the question pool.
      </Text>
      <Text variant="p">
        In each player's turn, he/she will randomly draw a question and answer
        it in secret. Meanwhile, other players will try to guess his/her answer.
        Whoever has the correct guess wins 1 point.
      </Text>
      <Text variant="p">
        Questions will not be repeated and the game ends when the question pool
        is empty. The player with the highest points wins the game.
      </Text>
    </Card>
  );
};

const mapDispatchToProps = dispatch => {
  dispatch(reset());
  return {};
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
