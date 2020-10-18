import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Flex, Box, Heading, Text } from "rebass";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

import { fetchRooms } from "../redux/actions";
import { statusColorMapping } from "./utils";

const ghostEmoji = (
  <>
    <span role="img" aria-label="ghost">
      👻
    </span>
    No host
  </>
);

const Rooms = ({ rooms = [], dispatch }) => {
  // if (!rooms || rooms.length <= 0) {
  //   dispatch(fetchRooms());
  //   return null;
  // }

  useEffect(() => {
    dispatch(fetchRooms());
  }, [fetchRooms]);

  const timestamp = createdAt => {
    const timestamp = moment(createdAt);
    return (
      <Box>
        <Text variant="tag.small" bg="darkpurple">
          {timestamp.fromNow()}
        </Text>
        {timestamp.format("DD MMM h:mma")}
      </Box>
    );
  };

  return (
    <>
      <Heading>{rooms.length} rooms</Heading>

      {/* <Input
        name="search"
        type="text"
        placeholder="Search"
        // onChange={onChange}
        my={3}
      /> */}

      {rooms.map(room => {
        const {
          _id,
          status,
          // timeLimit,
          number,
          createdAt,
          host,
          creator
        } = room;
        return (
          <Flex mt={2} key={_id} justifyContent="space-between" variant="row">
            <Box>
              <Text variant="tag.small" bg="blue" mr={0}>
                <Link to={`/admin/rooms/${_id}`}>#{number}</Link>
              </Text>
              <Text variant="tag.small" bg={statusColorMapping[status]}>
                {status.toUpperCase()}
              </Text>
              {host ? host.name : creator ? creator.name : ghostEmoji}
            </Box>
            <Text>{timestamp(createdAt)}</Text>
          </Flex>
        );
      })}
    </>
  );
};

const mapStateToProps = (state = {}) => state;

export default connect(mapStateToProps)(Rooms);
