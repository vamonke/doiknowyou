import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withFormik } from "formik";
import { Flex, Box, Button, Text } from "rebass";
import { Input } from "@rebass/forms";

import { joinGame } from "../redux/actions";

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
    <form onSubmit={handleSubmit}>
      <Box sx={{ position: "relative" }}>
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

      <Box sx={{ position: "relative" }}>
        <Input
          name="roomNo"
          type="text"
          placeholder="Room number"
          onChange={handleChange}
          onBlur={handleBlur}
          variant={errors.roomNo ? "error" : "input"}
        />
        {errors.roomNo && <Text variant="error">{errors.roomNo}</Text>}
      </Box>

      <Flex mx={-1}>
        <Box width={1 / 2} px={1}>
          <Button variant="secondary" type="button" width={1} onClick={cancel}>
            Cancel
          </Button>
        </Box>
        <Box width={1 / 2} px={1}>
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
  mapPropsToValues: props => props,
  validate,
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: async (values, { setSubmitting }) => {
    const { joinGame, name, roomNo, history } = values;
    await joinGame(roomNo, name);
    setSubmitting(false);
    history.push("/lobby/" + roomNo);
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
