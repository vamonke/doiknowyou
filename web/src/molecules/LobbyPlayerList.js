import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text, Button } from "rebass";
import { Select } from "@rebass/forms";

import { kick, makeHost } from "../redux/client";

const LobbyPlayerList = ({
  players,
  viewerId,
  hostId,
  viewerIsHost,
  dispatch
}) => {
  const [managing, setManaging] = useState(false);
  const onChange = playerId => e => {
    const action = e.target.value;
    if (action === "kick") {
      dispatch(kick(playerId));
    } else if (action === "host") {
      dispatch(makeHost(playerId));
    }
    setManaging(false);
  };

  return (
    <Box px={[2, 2, 3]}>
      <Box variant="orange.card.small">
        <Flex justifyContent="space-between">
          <Text>Players</Text>
          {viewerIsHost && (
            <Button
              type="button"
              color="yellow"
              variant="link"
              fontSize={2}
              p={0}
              onClick={() => setManaging(!managing)}
            >
              {managing ? "Done" : "Manage"}
            </Button>
          )}
        </Flex>
      </Box>
      <Box variant="card.bottom.small" pb={[3, 3]}>
        {players.map((player, index) => {
          const { _id: playerId, name, isReady } = player;
          const isViewer = playerId === viewerId;
          const playerIsHost = playerId === hostId;
          return (
            <Box key={index} variant="row">
              <Flex alignItems="center">
                <Box flexGrow={2}>
                  <Text variant={isViewer ? "bold" : ""} display="inline">
                    {name}
                  </Text>
                  {/* {isViewer && " (you)"*} */}
                  {playerIsHost && <Text variant="tag.small">Host</Text>}
                </Box>

                {viewerIsHost && managing ? (
                  <Select
                    width="130px"
                    name="playerAction"
                    onChange={onChange(playerId)}
                  >
                    <option>{isReady ? "Ready" : "Not Ready"}</option>
                    <option value="kick">Kick</option>
                    <option value="host">Make host</option>
                  </Select>
                ) : (
                  <Box>{isReady ? "Ready" : "Not Ready"}</Box>
                )}
              </Flex>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

LobbyPlayerList.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      hasAnswered: PropTypes.bool
    })
  ),
  viewerId: PropTypes.string.isRequired,
  hostId: PropTypes.string.isRequired,
  viewerIsHost: PropTypes.bool,
  dispatch: PropTypes.func
};

export default LobbyPlayerList;
