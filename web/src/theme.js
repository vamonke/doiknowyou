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
    heading: 700,
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
        "> *": {
          pb: 0
        }
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
    }
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
      fontWeight: 700
    },
    underline: {
      borderBottom: "1px solid black"
    },
    black: {
      bg: "black",
      color: "white",
      p: 3
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
    }
  },
  input: {},
  forms: {
    input: {
      // borderRadius: 7,
      px: 12,
      py: 12,
      my: 8
    },
    error: {
      borderColor: "red",
      px: 12,
      py: 12,
      my: 8
    },
    select: {
      borderRadius: 9999
    },
    textarea: {},
    label: {},
    radio: {},
    checkbox: {}
  }
};
