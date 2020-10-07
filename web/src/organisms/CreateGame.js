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
          {/* <Text fontWeight="medium" pb={2}>
            Name
          </Text> */}
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

          {/* <Flex justifyContent="space-between" mx={[-1, -2]}>
            <Box width={1 / 2} px={[1, 2]}>
              <Text fontWeight="medium" pb={2}>
                Time limit
              </Text>
              <Select name="timeLimit">
                <option value="0">No limit</option>
                <option value="10">10s</option>
              </Select>
            </Box>
            <Box width={1 / 2} px={[1, 2]}>
              <Text fontWeight="medium" pb={2}>
                Game format
              </Text>
              <Select name="theme">
                <option value="default">Default</option>
                <option value="trial">Trial</option>
              </Select>
            </Box>
          </Flex> */}

          <Flex
            mt={[3, 3, 24]}
            mx={[-1, -2]}
            // pt={[3, 3, 24]}
            // sx={{ borderTop: "1px solid #DDD" }}
          >
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
  handleSubmit: (values, { setSubmitting }) => {
    const { createGame, name } = values;
    trackSubmit("Create game");
    try {
      createGame(name);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
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
