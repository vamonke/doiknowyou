export default {
  breakpoints: ["40em", "52em", "64em"],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    blue: "#07c",
    lightgray: "#f6f6ff",
    green: "#1abc9c"
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    body: "Rubik",
    heading: "Rubik"
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
    small: "0 0 4px rgba(0, 0, 0, .125)",
    large: "0 0 24px rgba(0, 0, 0, .125)"
  },
  variants: {
    card: {
      bg: "white",
      p: 3,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "black"
      // boxShadow: "0 0 24px rgba(0, 0, 0, .125)",
      // borderRadius: 3,
    },
    modal: {
      position: "absolute",
      right: 3,
      left: 3,
      top: 3,
      maxWidth: 540,
      zIndex: 10,
      "&::before": {
        content: "''",
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        borderColor: "black",
        position: "fixed",
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: -1,
      }
    },
    modalBody: {
      zIndex: 1,
      bg: "white",
      p: 3,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "black",
    },
    row: {
      // borderWidth: 1,
      // borderStyle: "solid",
      // borderColor: "black",
      // mx: -3,
      borderBottom: "1px solid black",
      "> *": {
        py: 3
      },
      "&:last-child": {
        border: "none",
        // "> *": {
        //   pb: 0
        // }
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
      width: 100,
      display: "inline-block",
      borderBottom: "2px solid black"
    },
    whiteOverlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: "rgba(255, 255, 255, 0.8)"
    },
  },
  text: {
    error: {
      borderWidth: 1,
      color: "red",
      p: 12,
      position: "absolute",
      right: 0,
      top: "1px"
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
      p: 3,
      fontSize: 3,
      m: -3,
      mb: 3,
    },
    blackSmall: {
      fontWeight: 400,
      bg: "black",
      color: "white",
      py: 2,
      px: 3,
      fontSize: 2,
      m: -3,
      mb: 3,
    },
    subtitle: {
      fontStyle: "italic",
      fontSize: 2
    },
    correct: {
      fontSize: 1,
      letterSpacing: 1,
      backgroundColor: "black",
      color: "white",
      display: "inline-block",
      px: 1,
      py: 1,
      mx: 1
    }
  },
  buttons: {
    primary: {
      cursor: "pointer",
      color: "white",
      bg: "black",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "black",
      borderRadius: 0,
      p: 12,
      outline: "none"
    },
    secondary: {
      cursor: "pointer",
      color: "black",
      bg: "transparent",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "black",
      borderRadius: 0,
      p: 12,
      outline: "none"
    },
    dotted: {
      cursor: "pointer",
      color: "black",
      bg: "transparent",
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: "black",
      borderRadius: 0,
      p: 12,
      outline: "none"
    },
    inField: {
      cursor: "pointer",
      color: "white",
      bg: "black",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "black",
      borderRadius: 0,
      p: 2,
      outline: "none",
      position: "absolute",
      right: 1,
      top: 1,
    },
    link: {
      textDecoration: "underline",
      cursor: "pointer",
      color: "black",
      border: "none",
      borderRadius: 0,
      p: 0,
    }
  },
  input: {},
  forms: {
    input: {
      p: 12,
      my: 8,
      "&:disabled": {
        bg: "#DDD"
      }
    },
    error: {
      borderColor: "red",
      px: 12,
      py: 12,
      my: 8
    },
    select: {
      borderRadius: 0,
      display: "inline-block"
    },
    textarea: {},
    label: {},
    radio: {},
    checkbox: {}
  }
};
