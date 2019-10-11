import React, { useState } from "react";
import { Flex, Box, Text, Button } from "rebass";
import { Textarea, Input } from "@rebass/forms";

const placeholderMapping = [
  'Write a question to get to know other players (Hint: press "Random")',
  "You can choose different types of answers for your question",
  "You may leave a question blank too!"
];

// Lobby question and options component
const Question = ({ questionNo, prev, next }) => {
  const firstQuestion = questionNo === 0;
  const lastQuestion = questionNo === 2;
  // constructor(props) {
  //   super(props);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.nextQuestion = this.nextQuestion.bind(this);
  //   this.prevQuestion = this.prevQuestion.bind(this);
  //   this.addOption = this.addOption.bind(this);
  //   this.removeOption = this.removeOption.bind(this);
  //   this.optionField = this.optionField.bind(this);
  //   this.renderButtons = this.renderButtons.bind(this);
  //   this.setOptionType = this.setOptionType.bind(this);
  //   this.generateQuestion = this.generateQuestion.bind(this);
  //   this.state = {
  //     question: '',
  //     format: 'mcq',
  //     options: ['', '']
  //   };
  // }

  // const setOptionType = type => {
  //   let options = [];
  //   let format;
  //   if (type === 0) { // Custom
  //     format = 'mcq';
  //     options = ['', ''];
  //   } else if (type === 1) { // Yes/No
  //     format = 'mcq';
  //     options = ['Yes', 'No'];
  //   } else if (type === 2) { // True/False
  //     format = 'mcq';
  //     options = ['True', 'False'];
  //   } else if (type === 3) { // Players
  //     format = 'players';
  //     options = [];
  //   } else if (type === 4) { // Open-Ended
  //     format = 'open';
  //     options = [];
  //   }
  //   this.setState({ format, options });
  // }

  // const optionField = (_, optionNo) => {
  //   return (
  //     <div key={optionNo} className="paddingBottom">
  //       <input
  //         type="text"
  //         placeholder={`Option  ${optionNo + 1}`}
  //         value={this.state.options[optionNo]}
  //         name={optionNo.toString()}
  //         onChange={this.handleChange}
  //       />
  //     </div>
  //   );
  // }

  // prevQuestion() {
  //   this.props.changeQuestion(this.props.questionNo, this.state, false);
  // }

  // nextQuestion() {
  //   const qna = {
  //     question: this.state.question,
  //     format: this.state.format,
  //     options: this.state.options.filter(String)
  //   };
  //   this.props.changeQuestion(this.props.questionNo, qna, true);
  // }

  // handleChange(event) {
  //   const field = event.target.name;
  //   const { value } = event.target;
  //   if (field === 'question') {
  //     this.setState({ question: value });
  //   } else {
  //     const { options } = this.state;
  //     options[field] = value;
  //     this.setState({ options: options });
  //   }
  // }

  // addOption() {
  //   this.setState({
  //     options: this.state.options.concat([''])
  //   });
  // }

  // removeOption() {
  //   this.state.options.pop();
  //   this.setState({
  //     options: this.state.options
  //   });
  // }

  // generateQuestion() {
  //   const qna = questionBank[Math.floor(Math.random() * questionBank.length)];
  //   if (Array.isArray(qna.options)) {
  //     qna.format = 'mcq';
  //     this.setState(qna);
  //   } else if (qna.options === 'players') {
  //     this.setState({
  //       question: qna.question,
  //       format: 'players',
  //       options: []
  //     });
  //   } else if (qna.options === 'open') {
  //     this.setState({
  //       question: qna.question,
  //       format: 'open',
  //       options: []
  //     });
  //   }
  // }

  // renderButtons() {
  //   const { questionNo } = this.props;
  //   if (questionNo === 0) {
  //     return (
  //       <button type="button" className="greenButton" onClick={this.nextQuestion}>
  //         {'Next '}
  //         <Glyph icon="chevron-right" />
  //       </button>
  //     );
  //   } else if (questionNo === 2) {
  //     return (
  //       <Row>
  //         <Col xs="1/2">
  //           <button type="button" className="whiteButton" onClick={this.prevQuestion}>
  //             <Glyph icon="chevron-left" />
  //             {' Previous'}
  //           </button>
  //         </Col>
  //         <Col xs="1/2">
  //           <button type="button" className="greenButton" onClick={this.nextQuestion}>
  //             {'Ready ' }
  //             <Glyph icon="check" />
  //           </button>
  //         </Col>
  //       </Row>
  //     );
  //   }
  //   return (
  //     <Row>
  //       <Col xs="1/2">
  //         <button type="button" className="whiteButton" onClick={this.prevQuestion}>
  //           <Glyph icon="chevron-left" />
  //           {' Previous'}
  //         </button>
  //       </Col>
  //       <Col xs="1/2">
  //         <button type="button" className="greenButton" onClick={this.nextQuestion}>
  //           {'Next '}
  //           <Glyph icon="chevron-right" />
  //         </button>
  //       </Col>
  //     </Row>
  //   );
  // }

  return (
    <>
      <Flex mt={3}>
        <Box width={1 / 2} px={1} variant="bold">
          {`Question ${questionNo + 1} of 3`}
        </Box>
        <Box width={1 / 2} px={1} textAlign="right">
          Random
        </Box>
      </Flex>

      <Textarea
        variant="input"
        sx={{ resize: "vertical" }}
        placeholder={placeholderMapping[questionNo]}
        name="question"
      />

      <Flex mt={3}>
        <Box width={1 / 2} px={1} variant="bold">
          Options
        </Box>
        <Box width={1 / 2} px={1} textAlign="right">
          +
        </Box>
      </Flex>
      <Input placeholder="Option 1" name="0" />
      <Input placeholder="Option 2" name="1" />
      <Button variant="dotted" width={1}>
        Add option
      </Button>
      <Flex mx={-1} mt={3}>
        {firstQuestion ? (
          <Box width={1} px={1}>
            <Button width={1} onClick={next}>
              {"Next >"}
            </Button>
          </Box>
        ) : (
          <>
            <Box width={1 / 2} px={1}>
              <Button variant="secondary" width={1} onClick={prev}>
                {"< Prev"}
              </Button>
            </Box>
            <Box width={1 / 2} px={1}>
              <Button width={1} onClick={next}>
                {lastQuestion ? "Ready" : "Next >"}
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </>
  );
};

export default Question;
