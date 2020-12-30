import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Flex, Text, Button } from "rebass";
import { Select } from "@rebass/forms";

import { InviteLink } from "../atoms";
import { kick, makeHost } from "../redux/client";

const LobbyPlayerList = props => {
  const {
    players,
    viewerId,
    hostId,
    viewerIsHost,
    dispatch,
    gameMode,
    showInvite
    // roomNo,
  } = props;

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

  const playerState = isReady => {
    if (gameMode === "random") return "";
    return isReady ? "Ready" : "Not Ready";
  };

  return (
    <Box variant="container">
      <Box variant="card.top.xsmall">
        <Flex justifyContent="space-between">
          <Text>Players ({players.length})</Text>
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
      <Box variant="card.bottom.xsmall" pb={1}>
        {players.map((player, index) => {
          const { _id: playerId, name, isReady, disconnected } = player;
          const isViewer = playerId === viewerId;
          const playerIsHost = playerId === hostId;
          return (
            <Box key={index} variant="row">
              <Flex alignItems="center">
                <Box flexGrow={2}>
                  <Text variant={isViewer ? "bold" : ""} display="inline">
                    {name}
                  </Text>
                  {/* {isViewer && " (you)"} */}
                  {disconnected && (
                    <Text variant="tag.small" bg="gray">
                      Away
                    </Text>
                  )}
                  {playerIsHost && <Text variant="tag.small">Host</Text>}
                </Box>

                {viewerIsHost && managing ? (
                  <Select
                    width="130px"
                    name="playerAction"
                    onChange={onChange(playerId)}
                  >
                    <option>{playerState(isReady)}</option>
                    <option value="kick">Kick</option>
                    <option value="host">Make host</option>
                  </Select>
                ) : (
                  playerState(isReady)
                )}
              </Flex>
            </Box>
          );
        })}
        {showInvite && <InviteLink />}
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
