// import React from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { Box, Text } from "rebass";

// import { joinRoom } from "../redux/client";
// import history from "../redux/history";

// import { HomeLink } from "../atoms";

// const Join = props => {
//   const { room, viewer, players } = props;
//   const { _id: viewerId } = viewer;
//   joinRoom(viewer);

//   if (
//     viewer._id &&
//     room._id &&
//     players.length > 0 &&
//     players.find(player => player._id === viewerId)
//   ) {
//     console.log("Joining room");
//     history.push(`/lobby/${room.number}`);
//   }

//   return (
//     <Box textAlign="center">
//       <Box variant="orange">
//         <Box variant="orange.card">
//           <Text> </Text>
//         </Box>
//       </Box>
//       <Box variant="card.bottom">
//         <div className="loader" />
//       </Box>
//       <HomeLink />
//     </Box>
//   );
// };

// Join.propTypes = {
//   room: PropTypes.shape({
//     _id: PropTypes.string,
//     number: PropTypes.number
//   }),
//   viewer: PropTypes.shape({
//     _id: PropTypes.string
//   })
// };

// const mapStateToProps = (state = {}) => {
//   const players = Object.values(state.players);
//   const viewer = { ...state.viewer, ...state.players[state.viewer._id] };
//   return { ...state, players, viewer };
// };

// export default connect(mapStateToProps)(Join);
