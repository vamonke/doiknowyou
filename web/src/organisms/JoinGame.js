import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withFormik, Field } from "formik";
import { Flex, Box, Heading, Button, Text } from "rebass";
import { Input } from "@rebass/forms";

import { joinGame } from "../redux/actions";

const JoinGame = props => {
  const {
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    cancel,
    lobby,
    values
  } = props;

  const [loading, setLoading] = useState(lobby);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? null : (
    <form onSubmit={handleSubmit}>
      {lobby && <Heading fontSize={4}>Room {values.roomNo}</Heading>}
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

      <Box variant={lobby ? "hidden" : "relative"}>
        <Field
          name="roomNo"
          render={({ field }) => (
            <Input
              {...field}
              type="text"
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
)(withRouter(withFormik(formOptions)(JoinGame)));
