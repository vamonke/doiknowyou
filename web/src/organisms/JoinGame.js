import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withFormik, Field } from "formik";
import { Flex, Box, Button, Text } from "rebass";
import { Input } from "@rebass/forms";

import { RedirectToLobby } from "../molecules";
import { joinGame } from "../redux/actions";
import { trackSubmit, trackButton } from "../analytics";

const JoinGame = props => {
  const {
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    cancel
  } = props;

  return (
    <>
      <Box variant="orange.card.small">
        <Box variant="modal.header">Join Game</Box>
      </Box>
      <Box variant="modal.card" pt={[3, 3, 24]}>
        <form onSubmit={handleSubmit}>
          <Box variant="relative">
            <Input
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
              variant={errors.name ? "error" : "input"}
            />
            {errors.name && <Text variant="error">{errors.name}</Text>}
          </Box>

          <Box variant="relative">
            <Field
              name="roomNo"
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Room number"
                  variant={errors.roomNo ? "error" : "input"}
                />
              )}
            />
            {errors.roomNo && <Text variant="error">{errors.roomNo}</Text>}
          </Box>

          <Flex mt={[3, 3, 24]} mx={[-1, -2]}>
            {cancel && (
              <Box width={1 / 2} px={[1, 2]}>
                <Button
                  variant="secondary"
                  type="button"
                  width={1}
                  onClick={trackButton(cancel)}
                >
                  Cancel
                </Button>
              </Box>
            )}
            <Box width={cancel ? 1 / 2 : 1} px={[1, 2]}>
              <Button type="submit" width={1} disabled={isSubmitting}>
                {isSubmitting ? <RedirectToLobby /> : "Join"}
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </>
  );
};

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = ":'(";
  }
  if (!values.roomNo) {
    errors.roomNo = ":'(";
  }
  return errors;
};

const formOptions = {
  mapPropsToValues: props => {
    const { match, history } = props;
    let roomNo = "";

    if (match.isExact && match.path === "/lobby/:roomNo") {
      roomNo = match.params.roomNo;
      const validRoomNo = roomNo.match(/^\d{4}$/) !== null;
      if (!validRoomNo) {
        console.error("Invalid room number in URL");
        return history.push("/");
      }
    }

    return { ...props, roomNo };
  },
  validate,
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: (values, { setSubmitting, setFieldError }) => {
    const { joinGame, name, roomNo } = values;
    trackSubmit("Join game");
    try {
      joinGame(roomNo, name);
    } catch (error) {
      setFieldError("roomNo", error.response.data.error);
      setSubmitting(false);
    }
  },
  displayName: "JoinGame"
};

const mapDispatchToProps = dispatch => {
  return {
    joinGame: (roomNo, name) => dispatch(joinGame(roomNo, name))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withFormik(formOptions)(JoinGame)));
