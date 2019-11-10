import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Flex, Box, Button, Text } from "rebass";
import { Input } from "@rebass/forms";
import { withFormik } from "formik";

import { createGame } from "../redux/actions";

const CreateGame = props => {
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

      <Flex mx={[-1, -2]}>
        <Box width={1 / 2} px={[1, 2]}>
          <Button variant="secondary" type="button" width={1} onClick={cancel}>
            Cancel
          </Button>
        </Box>
        <Box width={1 / 2} px={[1, 2]}>
          <Button type="submit" width={1}>
            {isSubmitting ? "-" : "Create Game"}
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
  return errors;
};

const formOptions = {
  mapPropsToValues: props => props,
  validate,
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: async (values, { setSubmitting }) => {
    const { createGame, name, history } = values;
    const roomNo = await createGame(name);
    setSubmitting(false);
    history.push("/lobby/" + roomNo);
  },
  displayName: "CreateGame"
};

const mapDispatchToProps = dispatch => {
  return {
    createGame: name => dispatch(createGame(name))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(withFormik(formOptions)(CreateGame)));
