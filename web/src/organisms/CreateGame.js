import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Flex, Box, Button, Text } from "rebass";
import { Input } from "@rebass/forms";
import { withFormik } from "formik";

import { RedirectToLobby } from "../molecules";
import { createGame } from "../redux/actions";
import { trackSubmit, trackButton } from "../analytics";

const CreateGame = props => {
  const {
    errors,
    asyncError,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    cancel
  } = props;

  return (
    <>
      <Box variant="orange.card.small">
        <Box variant="modal.header">Create Game</Box>
      </Box>
      <Box variant="modal.card" pt={[3, 3, 24]}>
        <form onSubmit={handleSubmit}>
          {/* <Label htmlFor="name" fontWeight="medium" pb={2}>
            Name
          </Label> */}
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

          {asyncError && <Text variant="error">{asyncError}</Text>}

          <Flex mt={[3, 3, 24]} mx={[-1, -2]}>
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
            <Box width={1 / 2} px={[1, 2]}>
              <Button type="submit" width={1} disabled={isSubmitting}>
                {isSubmitting ? <RedirectToLobby /> : "Create"}
              </Button>
            </Box>
          </Flex>

          {/* <Button mt={[3, 3, 24]} type="submit" width={1}>
            {isSubmitting ? <RedirectToLobby /> : "Create"}
          </Button> */}
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
  return errors;
};

const formOptions = {
  mapPropsToValues: props => props,
  validate,
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: async (values, { setSubmitting }) => {
    const { createGame, name } = values;
    trackSubmit("home", "CreateGame");
    await createGame(name);
    setSubmitting(false);
  },
  displayName: "CreateGame"
};

const mapStateToProps = state => {
  const { createGameError } = state;
  return { asyncError: createGameError };
};

const mapDispatchToProps = dispatch => ({
  createGame: name => dispatch(createGame(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withFormik(formOptions)(CreateGame)));
