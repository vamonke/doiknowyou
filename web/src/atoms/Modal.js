import React from "react";
import PropTypes from "prop-types";
import { Box, Card } from "rebass";
import { motion } from "framer-motion";

const backDrop = {
  position: "fixed",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  zIndex: 1,
  backgroundColor: "black"
};

const display = {
  open: {
    display: "block",
    transition: { duration: 0 }
  },
  closed: {
    display: "none",
    transition: { when: "afterChildren" }
  }
};

const backdrop = {
  open: {
    opacity: 0.75
  },
  closed: {
    opacity: 0,
    transition: { delay: 0.2 }
  }
};

const content = {
  open: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.3 }
  },
  closed: {
    y: -500,
    opacity: 0,
    transition: { duration: 0.5, ease: "anticipate" }
  }
};

const Modal = props => {
  const { isOpen, hide, children } = props;
  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={display}
    >
      <motion.div style={backDrop} variants={backdrop} onClick={hide} />
      <Card variant="modal">
        <motion.div variants={content}>
          <Box variant="modalBody">{children}</Box>
        </motion.div>
      </Card>
    </motion.div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  room: PropTypes.shape({
    timeLimit: PropTypes.number
  }),
  hide: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Modal;
