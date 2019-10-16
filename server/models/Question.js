import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    text: String,
    type: {
      type: String,
      enum: ["mcq", "yesno", "players", "open"],
      default: "mcq"
    },
    options: {
      type: [String],
      default: undefined
    },
    number: Number,
    roomId: String,
    authorId: String,
    round: Number,
    asked: {
      type: Boolean,
      default: false
    },
    recipientId: String,
    correctAnswer: String,
    answeredAt: Date,
    randomQuestionId: String
  },
  { versionKey: false }
);

const Question = model("Question", schema);

export const createMany = (questions, authorId, roomId) => {
  const promises = questions.map(
    ({ randomQuestionId, text, type, options }, number) => {
      const question = {
        text,
        type,
        options,
        number,
        roomId,
        authorId,
        asked: false
      };
      if (randomQuestionId) Object.assign(question, { randomQuestionId });
      return Question.findOneAndUpdate(
        {
          number,
          roomId,
          authorId
        },
        question,
        { upsert: true }
      );
    }
  );
  return Promise.all(promises);
};

export const removeByPlayerId = authorId => Question.deleteMany({ authorId });

export const draw = async (roomId, round) => {
  // randomly get unasked
  console.log(roomId);
  let question = await Question.aggregate([
    [
      { $match: { roomId, asked: false } },
      { $sample: { size: 1 } }
    ]
  ]);
  console.log('QN:', question);
  // if has unasked
  if (question.length > 0) {
    question = question[0];
    //   get next recipient
    //   set qn status, recipient, round
    //   set room current qn
    // else
  }
  //   end game
};

// export const getAll = () => Question.find().select({ usage: 0 });

// export const deleteById = id => Question.findByIdAndDelete(id);
