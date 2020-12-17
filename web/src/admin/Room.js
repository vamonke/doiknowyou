import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Flex, Box, Text } from "rebass";
import moment from "moment-timezone";

import { fetchRoom } from "../redux/actions";

import AdminPlayerList from "./AdminPlayerList";
import { AnsweredQuestion } from "../organisms";

const Room = ({ room, dispatch, match }) => {
  useEffect(() => {
    dispatch(fetchRoom(match.params.id));
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    // _id,
    status = "",
    // timeLimit,
    number,
    createdAt,
    // hostId,
    players,
    questions
  } = room;

  return (
    <>
      <Box variant="card.top.xsmall" maxWidth="none">
        <Flex justifyContent="space-between" alignItems="center">
          Room #{number}
          <Text variant="tag.small" m={0}>
            {status.toUpperCase()}
          </Text>
        </Flex>
      </Box>
      <Card variant="card.bottom" maxWidth="none">
        Created on {moment(createdAt).format("dddd, D MMM YYYY [at] h:mma")}
        <Text variant="tag.small" my={0} bg="grey">
          {moment(createdAt).fromNow()}
        </Text>
      </Card>

      <Box variant="card.top.xsmall" maxWidth="none">
        Players
      </Box>
      <Card variant="card.bottom.small" maxWidth="none">
        {players && players.length > 0 ? (
          <AdminPlayerList players={players} />
        ) : (
          <Text py={3}>No players</Text>
        )}
      </Card>

      <Box variant="card.top.xsmall" maxWidth="none">
        Questions
      </Box>
      <Card variant="card.bottom.small" maxWidth="none">
        {questions && questions.length > 0 ? (
          <Box>
            {questions.map((question, index) => (
              <AnsweredQuestion
                question={question}
                players={players}
                key={index}
              />
            ))}
          </Box>
        ) : (
          <Text py={3}>No questions</Text>
        )}
      </Card>
    </>
  );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Room);
