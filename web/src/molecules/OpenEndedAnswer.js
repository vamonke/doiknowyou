import React, { useState } from "react";
import { Text, Button } from "rebass";
import { Input } from "@rebass/forms";
import { Formik } from "formik";

// function addOrRemove(array, value) {
//   const index = array.indexOf(value);
//   if (index === -1) {
//     array.push(value);
//   } else {
//     array.splice(index, 1);
//   }
// }

const AnswerForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ guess: "" }}
    onSubmit={onSubmit}
    render={props => {
      const { handleSubmit, handleChange, handleBlur, values, dirty } = props;
      return (
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.guess}
            name="guess"
            placeholder="Your guess"
          />
          {dirty &&
            <Button type="submit" width={1}>
              Submit
            </Button>
          }
        </form>
      );
    }}
  />
);

const OpenEndedAnswer = props => {
  const { question, isRecipient, recipientName, handleSubmit } = props;

  const [correntAnswers, setCorrectAnswers] = useState([]);

  const onSubmit = ({ guess }) => {
    console.log(guess);
    handleSubmit(guess);
    // setState({ submitted: true });
  };

  // const handleSelect = event => {
  //   const selected = event.target.name;
  //   addOrRemove(correntAnswers, selected);
  //   setState({ correntAnswers });
  // }

  const guesser = () => {
    if (false) {
      let waitingMsg = "Waiting for other players";
      if (false) {
        // Waiting for options
        waitingMsg = "Waiting for " + recipientName;
      }
      return (
        <div>
          <i>{waitingMsg}</i>
          <hr />
          {"Answers: "}
          {question.options.map(option => (
            <div className="openEndedGuess">{option}</div>
          ))}
        </div>
      );
    }
    return (
      <>
        <Text mb={3}>{`Guess ${recipientName}'s answer`}</Text>
        <AnswerForm onSubmit={onSubmit} />
      </>
    );
  };

  const renderOptions = (option, index) => {
    // const className = correntAnswers.includes(index + '') ? ' selected' : '';
    return (
      <Button
        type="button"
        key={index}
        // onClick={handleSelect}
      >
        {option}
      </Button>
    );
  };

  if (!isRecipient) {
    // Guessing
    return guesser();
  }
  if (true) {
    // Waiting for options
    return <i>Waiting for other players to guess</i>;
  }

  // Options available
  return (
    <div>
      <div>Pick the best guess(es)</div>
      {question.options.map(renderOptions)}
      <hr />
      <button
        type="button"
        className="blueButton"
        disabled={correntAnswers.length === 0}
      >
        Submit
      </button>
    </div>
  );
};

// const formOptions = {
//   mapPropsToValues: props => props,
//   validate,
//   validateOnBlur: false,
//   validateOnChange: false,
//   handleSubmit: async (values, { setSubmitting }) => {
//     const { CurrentQuestion, name, history } = values;
//     const roomNo = await CurrentQuestion(name);
//     setSubmitting(false);
//     history.push("/lobby/" + roomNo);
//   },
//   displayName: "CurrentQuestion"
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     CurrentQuestion: name => dispatch(CurrentQuestion(name))
//   };
// };

export default OpenEndedAnswer;
