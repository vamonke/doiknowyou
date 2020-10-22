import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withFormik, Field } from "formik";
import { Flex, Box, Button, Text } from "rebass";
import { Input } from "@rebass/forms";

import { HomeLink } from "../atoms";

import { joinGame } from "../redux/actions";

const JoinGameCard = props => {
  const {
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    cancel,
    values
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Box variant="orange">
        <Box variant="orange.card" py={[3, 3, 24, 24]} mt={[2, 2, 3, 4]}>
          <Text fontWeight="medium" fontSize={4} px={2} pt={[1, 1, 0]}>
            Room {values.roomNo}
          </Text>
        </Box>
      </Box>
      <Box px={[0, 2, 3]}>
        <Box variant="card.bottom" pt={3}>
          <Input
            mt={[1, 2, -1]}
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            variant={errors.name ? "error" : "input"}
          />
          {errors.name && <Text variant="error">{errors.name}</Text>}

          <Box variant="hidden">
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

          <Flex mt={24} mx={[-1, -2]}>
            {cancel && (
              <Box width={1 / 2} px={[1, 2]}>
                <Button
                  variant="secondary"
                  type="button"
                  width={1}
                  onClick={cancel}
                >
                  Cancel
                </Button>
              </Box>
            )}
            <Box width={cancel ? 1 / 2 : 1} px={[1, 2]}>
              <Button type="submit" width={1}>
                {isSubmitting ? "-" : "Join Game"}
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>

      <HomeLink />
    </form>
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

    if (match.isExact) {
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
  handleSubmit: async (values, { setSubmitting, setFieldError }) => {
    const { joinGame, name, roomNo } = values;
    try {
      await joinGame(roomNo, name);
    } catch (error) {
      setFieldError("roomNo", error.response.data.error);
    }
    setSubmitting(false);
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
)(withRouter(withFormik(formOptions)(JoinGameCard)));
