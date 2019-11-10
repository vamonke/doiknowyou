import React from "react";
import PropTypes from "prop-types";
import { Flex, Box, Button } from "rebass";

// Lobby buttons
const LobbyPrevNext = props => {
  const { questionNo, prev, next } = props;
  const firstQuestion = questionNo === 0;
  const lastQuestion = questionNo === 2;

  return (
    <Flex
      mx={-2}
      mt={[3, 3, 3, 24]}
      pt={[3, 3, 20, 24]}
      sx={{ borderTop: "1px solid #DDD" }}
    >
      {firstQuestion ? (
        <Box width={1} px={2}>
          <Button width={1} onClick={next}>
            {"Next >"}
          </Button>
        </Box>
      ) : (
        <>
          <Box width={1 / 2} px={2}>
            <Button variant="secondary" width={1} onClick={prev}>
              {"< Prev"}
            </Button>
          </Box>
          <Box width={1 / 2} px={2}>
            <Button
              width={1}
              onClick={next}
              type={lastQuestion ? "submit" : "button"}
            >
              {lastQuestion ? "Ready" : "Next >"}
            </Button>
          </Box>
        </>
      )}
    </Flex>
  );
};

LobbyPrevNext.propTypes = {
  questionNo: PropTypes.number.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired
};

export default LobbyPrevNext;
