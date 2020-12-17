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
    asyncError,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    cancel
  } = props;

  const trimValue = onChange => e => {
    // Keep only first 4 digits before passing to onChange handler
    e.target.value = e.target.value.substring(0, 4);
    return onChange(e);
  };

  return (
    <>
      <Box variant="card.top.xsmall">
        <Box variant="modal.header">Join Game</Box>
      </Box>
      <Box variant="modal.card" pt={[3, 3, 24]}>
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Enter your name"
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            variant={errors.name ? "error" : "input"}
          />
          {errors.name && <Text variant="error">{errors.name}</Text>}

          <Field
            name="roomNo"
            render={({ field }) => (
              <Input
                {...field}
                onChange={trimValue(field.onChange)}
                type="number"
                placeholder="Enter 4-digit room number"
                variant={errors.roomNo || asyncError ? "error" : "input"}
              />
            )}
          />

          {errors.roomNo && <Text variant="error">{errors.roomNo}</Text>}

          {asyncError && <Text variant="error">{asyncError}</Text>}

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
  handleSubmit: (values, { setSubmitting }) => {
    const { joinGame, name, roomNo } = values;
    trackSubmit("home", "JoinGame");
    joinGame(roomNo, name, () => setSubmitting(false));
  },
  displayName: "JoinGame"
};

const mapStateToProps = state => {
  const { joinGameError } = state;
  return { asyncError: joinGameError };
};

const mapDispatchToProps = dispatch => ({
  joinGame: (roomNo, name, callback) =>
    dispatch(joinGame(roomNo, name, callback))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withFormik(formOptions)(JoinGame)));
