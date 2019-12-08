import React from "react";
import { connect } from "react-redux";
import { Flex, Box, Heading, Text } from "rebass";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

import { fetchRooms } from "../redux/actions";
import { statusColorMapping } from "./utils";

const Rooms = ({ rooms = [], dispatch }) => {
  if (!rooms || rooms.length <= 0) {
    dispatch(fetchRooms());
    return null;
  }

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
          hostId: host
        } = room;
        return (
          <Flex mt={2} key={_id} justifyContent="space-between" variant="row">
            <Box>
              {moment(createdAt).format("DD-MMM-YY h:mma")}
              <Text variant="tag.small" bg="darkpurple">
                {number}
              </Text>
              <Text variant="tag.small" bg={statusColorMapping[status]}>
                {status.toUpperCase()}
              </Text>
              {host ? host.name : "No host"}
            </Box>
            <Link to={`/admin/rooms/${_id}`}>{_id}</Link>
          </Flex>
        );
      })}
    </>
  );
};

const mapStateToProps = (state = {}) => state;

export default connect(mapStateToProps)(Rooms);
