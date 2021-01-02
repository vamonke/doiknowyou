const theme = {
  breakpoints: ["21em", "24em", "32em", "52em", "64em"],
  fontSizes: [12, 14, 16, 20, 24, 28, 32, 36, 40, 48, 54],
  colors: {
    blue: "#07C",
    lightgray: "#DDD",
    gray: "#BBB",
    darkgray: "#666",
    green: "#1ABC9C",
    darkpurple: "#2C2736",
    purple: "#7F00FF",
    violet: "#5507E0",
    lightpurple: "#8912FF",
    orange: "#FA7F00",
    lightorange: "#FF991A",
    yellow: "#FFCC00",
    darkyellow: "#F7B500",
    red: "#E74C3C"
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    body: "Rubik",
    heading: "Rubik",
    button: "Rubik"
  },
  fontWeights: {
    body: 400,
    medium: 500,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  shadows: {
    small: "0 5px 10px rgba(0, 0, 0, .15)",
    large: "0 10px 25px -10px rgba(0, 0, 0, .25)",
    heavy: "0 10px 50px -10px rgba(0, 0, 0, .5)"
  }
};

const variants = {
  container: {
    maxWidth: 540,
    mx: "auto",
    px: [2, 2, 3],
    boxSizing: "content-box"
  },
  card: {
    bg: "white",
    p: 3,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "darkpurple",
    overflow: "hidden",
    position: "relative",
    borderRadius: 20,
    top: {
      xsmall: {
        mx: "auto",
        bg: "darkpurple",
        color: "white",
        borderRadius: "20px 20px 0 0",
        py: 3,
        px: 24,
        boxShadow: "large",
        fontWeight: "medium"
      },
      large: {
        bg: "darkpurple",
        color: "white",
        borderRadius: "30px 30px 0 0",
        position: "relative",
        pt: [24, 24, 24, 4],
        px: [24, 24, 4, 36],
        pb: [3, 3, 3, 4],
        boxShadow: "large"
      },
      small: {
        bg: "darkpurple",
        color: "white",
        borderRadius: "30px 30px 0 0",
        pb: 3,
        pt: 20,
        px: [24, 24, 24, 4],
        boxShadow: "large",
        fontWeight: "medium",
        fontSize: 3
      }
    },
    bottom: {
      maxWidth: 540,
      position: "relative",
      overflow: "hidden",
      mx: [2, "auto"],
      mb: 4,
      bg: "white",
      color: "darkpurple",
      borderRadius: "0 0 30px 30px",
      p: [3, 3, 24, 4],
      pt: 0,
      boxShadow: "large",
      small: {
        px: 24,
        pt: 24,
        pb: 4,
        mb: 24,
        bg: "white",
        color: "darkpurple",
        borderRadius: "0 0 30px 30px",
        boxShadow: "large"
      },
      xsmall: {
        px: 24,
        pb: 24,
        mb: 24,
        bg: "white",
        color: "darkpurple",
        borderRadius: "0 0 30px 30px",
        boxShadow: "large"
      }
    }
  },
  gradient: {
    background: "linear-gradient(-90deg, rgba(240,152,25,1), rgba(255,81,47,1))"
  },
  modal: {
    position: "fixed",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    overflowY: "scroll",
    my: 0,
    px: [2, 2, 3],
    zIndex: 10,
    body: {
      mx: "auto",
      maxWidth: 540,
      mt: [2, 2, 3],
      mb: 3,
      zIndex: 100,
      boxShadow: "heavy",
      borderRadius: 30
    },
    card: {
      p: [3, 3, 24],
      pt: [3, 3, 3],
      bg: "white",
      borderRadius: "0 0 30px 30px"
    }
  },
  hr: {
    my: 3,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "lightgray"
  },
  row: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "lightgray",
    "> *": {
      py: 3
    },
    "&:last-child": {
      border: "none"
    }
  },
  cell: {
    borderBottom: "1px solid black",
    p: "12px",
    "&:first-child": {
      borderLeft: "1px solid black"
    },
    "&:last-child": {
      borderRight: "1px solid black"
    }
  },
  relative: {
    position: "relative"
  },
  hidden: {
    display: "none"
  },
  bold: {
    fontWeight: 500
  },
  button: {
    textDecoration: "none",
    cursor: "pointer",
    color: "black",
    bg: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 0,
    py: 2,
    px: 3,
    outline: "none",
    display: "inline-block"
  },
  line: {
    width: 80,
    display: "inline-block",
    borderWidth: 0,
    borderBottomWidth: 2,
    borderStyle: "solid",
    borderColor: "white"
  },
  whiteOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 50
  },
  timer: {
    fontWeight: "medium",
    fontSize: 4,
    textAlign: "center",
    lineHeight: "40px",
    height: 40,
    mt: -1,
    mb: -1,
    mx: "auto",
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "yellow"
  },
  link: {
    color: "inherit"
  },
  icon: {
    mb: -1,
    display: "inline-block",
    verticalAlign: "-0.4em"
  },
  selectable: {
    display: "inline-flex",
    alignItems: "center",
    bg: "transparent",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "gray",
    borderRadius: 16,
    pl: 12,
    pr: 15,
    py: "10px",
    mt: 1,
    mx: 2,
    mb: 2,
    outline: "none",
    // "&::before": {
    //   content: "'✔'",
    //   display: "inline-block",
    //   backgroundColor: "white",
    //   border: "1px solid black",
    //   color: "white",
    //   width: 16,
    //   height: 16,
    //   fontSize: 0,
    //   textAlign: "center",
    //   verticalAlign: "text-bottom",
    //   mr: 2
    // },
    "input:checked + &": {
      borderColor: "orange"
      // "&::before": {
      //   backgroundColor: "black",
      //   color: "white"
      // }
    },
    block: {
      display: "flex",
      alignItems: "center",
      bg: "transparent",
      borderWidth: 1.5,
      borderStyle: "solid",
      borderColor: "gray",
      borderRadius: 21,
      outline: "none",
      p: "12px",
      mt: 0,
      mx: 0,
      mb: 3,
      "input:checked + &": {
        borderColor: "orange"
      }
    }
  }
};

const text = {
  error: {
    borderWidth: 1,
    color: "red",
    mt: -2,
    mb: 2
  },
  p: {
    mt: 3,
    lineHeight: 1.6
  },
  bold: {
    fontWeight: 500
  },
  underline: {
    borderBottom: "1px solid black"
  },
  black: {
    bg: "black",
    color: "white",
    fontSize: 3,
    py: 2,
    px: 3,
    m: -3,
    mb: 3,
    small: {
      fontWeight: 400,
      bg: "darkpurple",
      color: "white",
      fontSize: 2,
      py: 2,
      px: 3,
      m: -3,
      mb: 3
    }
  },
  subtitle: {
    fontStyle: "italic",
    fontSize: 2
  },
  correct: {
    fontSize: "10pt",
    // letterSpacing: 1,
    borderRadius: 6,
    bg: "green",
    color: "white",
    display: "inline-block",
    px: 1,
    py: 1,
    ml: 2,
    mb: "2px"
  },
  tag: {
    display: "inline-block",
    color: "darkpurple",
    bg: "white",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "gray",
    borderRadius: 16,
    px: 3,
    py: 2,
    m: 1,
    large: {
      display: "inline-block",
      bg: "darkyellow",
      color: "white",
      borderRadius: 24,
      px: 24,
      py: 3,
      mr: 3,
      fontSize: 5,
      verticalAlign: 1
    },
    small: {
      display: "inline",
      bg: "darkyellow",
      color: "white",
      borderRadius: "5px",
      p: "6px",
      mx: 2,
      fontSize: "10pt",
      verticalAlign: 1
    },
    xsmall: {
      display: "inline",
      bg: "darkyellow",
      color: "white",
      borderRadius: "5px",
      py: "3px",
      px: "6px",
      ml: 2,
      fontSize: "8pt",
      verticalAlign: 1
    }
  },
  plus: {
    display: "inline",
    color: "orange",
    fontSize: 3,
    fontWeight: "medium"
  }
};

const buttons = {
  primary: {
    fontFamily: "button",
    cursor: "pointer",
    color: "white",
    bg: "orange",
    // boxShadow: "small",
    background: "linear-gradient(90deg, #F09819, #FF512F)",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "orange",
    borderRadius: 21,
    p: 16,
    outline: "none",
    transition: "0.3s",
    "&:disabled": {
      bg: "lightgray",
      background: "#DDD",
      borderColor: "lightgray",
      cursor: "not-allowed",
      transition: "0.3s",
      "&:hover": {
        bg: "gray",
        borderColor: "gray"
      }
    },
    "&:hover": {
      bg: "darkpurple",
      background: "darkpurple",
      transition: "0.3s"
    }
  },
  secondary: {
    cursor: "pointer",
    fontFamily: "button",
    color: "white",
    bg: "darkgray",
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 21,
    borderWidth: 0,
    p: 16,
    outline: "none",
    "&:disabled": {
      bg: "grey",
      borderColor: "grey",
      cursor: "not-allowed"
    }
  },
  inField: {
    cursor: "pointer",
    color: "white",
    bg: "red",
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 5,
    height: 30,
    width: 30,
    p: 0,
    pt: "2px",
    textAlign: "center",
    outline: "none",
    position: "absolute",
    right: ["6px", "10px"],
    top: ["6px", "10px"]
  },
  link: {
    cursor: "pointer",
    fontFamily: "button",
    color: "darkpurple",
    bg: "transparent",
    border: "none",
    borderRadius: 0,
    p: 0,
    display: "inline-flex",
    alignItems: "center"
  },
  settings: {
    fontFamily: "button",
    cursor: "pointer",
    color: "white",
    bg: "darkpurple",
    border: "none",
    borderRadius: 18,
    pt: 2,
    pb: "6px",
    textAlign: "center",
    display: "inline-flex",
    alignItems: "center"
  },
  black: {
    cursor: "pointer",
    fontFamily: "button",
    color: "white",
    bg: "darkpurple",
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 21,
    borderWidth: 0,
    p: 16
  },
  blackTag: {
    cursor: "pointer",
    fontFamily: "button",
    color: "darkyellow",
    bg: "#17141D",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 10,
    py: 2,
    px: 3,
    flexGrow: "2",
    mx: 1,
    mt: 2,
    outline: "none"
  },
  icon: {
    ml: [2, 3],
    p: 0,
    background: "transparent",
    borderWidth: "1.5px",
    borderStyle: "solid",
    borderColor: "lightgrey",
    borderRadius: "10px",
    height: 32,
    width: 32,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  },
  tab: {
    display: "inline-block",
    bg: "transparent",
    color: "white",
    fontFamily: "button",
    borderRadius: "5px 5px 0 0",
    fontWeight: "medium",
    textDecoration: "none",
    cursor: "pointer",
    px: 0,
    mr: 3,
    py: 2,
    active: {
      display: "inline-block",
      bg: "darkpurple",
      color: "white",
      border: "none",
      borderRadius: "5px 5px 0 0",
      fontWeight: "medium",
      textDecoration: "none",
      cursor: "pointer",
      px: [2, 3],
      mr: 3,
      py: 2
    }
  },
  selected: {
    cursor: "pointer",
    fontFamily: "button",
    color: "white",
    bg: "transparent",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "orange",
    borderRadius: 16,
    p: 12,
    mt: 3,
    outline: "none"
  },
  option: {
    cursor: "pointer",
    color: "darkpurple",
    bg: "white",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "orange",
    borderRadius: 16,
    fontFamily: "button",
    p: 12,
    mt: 3,
    outline: "none",
    black: {
      cursor: "pointer",
      color: "darkpurple",
      bg: "white",
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "darkpurple",
      borderRadius: 16,
      fontFamily: "button",
      p: 12,
      mt: 3,
      outline: "none",
      solid: {
        cursor: "pointer",
        color: "white",
        bg: "darkpurple",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "darkpurple",
        borderRadius: 16,
        fontFamily: "button",
        p: 12,
        mt: 3,
        outline: "none"
      }
    }
  },
  outline: {
    fontFamily: "button",
    cursor: "pointer",
    color: "purple",
    bg: "white",
    // boxShadow: "small",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "orange",
    borderRadius: 21,
    p: 14,
    outline: "none",
    transition: "0.3s"
  }
};

const input = {
  fontFamily: "button"
};

const forms = {
  input: {
    p: [10, 15],
    mb: 3,
    borderColor: "gray",
    borderWidth: 1.5,
    borderRadius: 10,
    transition: "border-color 300ms",
    "&:focus": {
      borderColor: "orange",
      transition: "border-color 300ms"
    },
    "&:disabled": {
      bg: "lightgray"
    },
    "&[type=radio]": {
      border: "none"
    }
  },
  error: {
    p: [10, 15],
    mb: 3,
    borderColor: "red",
    borderWidth: 1.5,
    borderRadius: 10
  },
  select: {
    p: [10, 15],
    borderColor: "gray",
    borderWidth: 1.5,
    borderRadius: 10,
    display: "inline-block",
    small: {
      py: 8,
      px: 12,
      borderColor: "gray",
      borderWidth: 1.5,
      borderRadius: 10,
      display: "inline-block"
    }
  },
  textarea: {
    p: [10, 15],
    mt: 2,
    minHeight: 100,
    borderColor: "gray",
    borderWidth: 1.5,
    borderRadius: 10,
    transition: "border-color 300ms",
    fontFamily: "inherit",
    "&:focus": {
      borderColor: "darkyellow",
      transition: "border-color 300ms"
    },
    "&:disabled": {
      bg: "gray"
    },
    "&[type=radio]": {
      border: "none"
    }
  },
  label: {
    width: "auto",
    "& input": {
      display: "none"
    }
  },
  radio: {
    color: "black"
  },
  checkbox: {}
};

export default {
  ...theme,
  variants,
  text,
  buttons,
  input,
  forms
};
