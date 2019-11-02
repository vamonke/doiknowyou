import React from "react";
import PropTypes from "prop-types";
import { Flex, Box, Card, Heading, Button, Text } from "rebass";
import { motion } from "framer-motion";

import { hostSettings } from "../redux/client";

const durations = [0, 15, 30, 60];

const backDrop = {
  position: "fixed",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 1,
  backgroundColor: "black"
};

const variants = {
  open: {
    display: "block",
    transition: { duration: 0 }
  },
  closed: {
    display: "none",
    transition: { when: "afterChildren" }
  }
};

const backdropVariants = {
  open: {
    opacity: 0.75
  },
  closed: {
    opacity: 0,
    transition: { delay: 0.2 }
  }
};

const modalVariants = {
  open: {
    y: 0,
    transition: { delay: 0.2 }
  },
  closed: {
    y: -300,
    transition: { ease: "anticipate" }
  }
};

const QuestionResults = ({ isOpen, room, hide, dispatch }) => {
  const { timeLimit = 0 } = room;
  const onClick = timeLimit => {
    const settings = { timeLimit };
    dispatch(hostSettings(settings));
  };
  const onHide = hide;
  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={variants}
    >
      <motion.div style={backDrop} variants={backdropVariants} onClick={hide} />
      <Card variant="modal">
        <motion.div variants={modalVariants}>
          <Box variant="modalBody">
            <Heading variant="black">Game Settings</Heading>

            <Text fontWeight="medium" mb={3}>
              Question time limit
            </Text>

            <Flex sx={{ borderRight: "1px solid black" }}>
              {durations.map((duration, index) => (
                <Button
                  key={index}
                  variant={timeLimit === duration ? "primary" : "secondary"}
                  onClick={() => onClick(duration)}
                  flexGrow={1}
                  sx={{ borderRight: "none" }}
                >
                  {duration === 0 ? "No limit" : duration + "s"}
                </Button>
              ))}
            </Flex>

            {timeLimit !== 0 && (
              <Text textAlign="center" mt={3}>
                Excludes open-ended questions
              </Text>
            )}

            <Button onClick={onHide} width={1} mt={3}>
              Done
            </Button>
          </Box>
        </motion.div>
      </Card>
    </motion.div>
  );
};

QuestionResults.propTypes = {
  isOpen: PropTypes.bool,
  room: PropTypes.shape({
    timeLimit: PropTypes.number
  }),
  hide: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default QuestionResults;
