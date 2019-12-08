import React from "react";
import PropTypes from "prop-types";
import { Box, Flex } from "rebass";

const AdminPlayerList = ({ players }) => {
  return (
    <Box>
      {players.map((player, index) => {
        const { score, name } = player;
        return (
          <Flex key={index} variant="row">
            <Box width="30px">{score || "0"}</Box>
            <Box>{name}</Box>
          </Flex>
        );
      })}
    </Box>
  );
};

AdminPlayerList.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      hasAnswered: PropTypes.bool
    })
  ),
  recipientId: PropTypes.string
};

export default AdminPlayerList;
