import { Schema, model } from "mongoose";
import * as Player from "./Player";

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
      default: []
    },
    number: Number,
    roomId: String,
    authorId: String,
    round: Number,
    status: {
      type: String,
      enum: ["unasked", "asking", "asked"],
      default: "unasked"
    },
    recipientId: String,
    correctAnswer: {
      type: [Number],
      default: []
    },
    answeredAt: Date,
    randomQuestionId: String,
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Answer"
      }
    ],
    isClosed: Boolean
  },
  { versionKey: false }
);

const Question = model("Question", schema);

export const createMany = (questions, authorId, roomId) => {
  const promises = questions.map(
    ({ randomQuestionId, text, type, options = [] }, number) => {
      const question = {
        text,
        type,
        options,
        number,
        roomId,
        authorId,
        status: "unasked"
      };
      if (randomQuestionId) Object.assign(question, { randomQuestionId });
      return Question.findOneAndUpdate({ number, roomId, authorId }, question, {
        upsert: true
      });
    }
  );
  return Promise.all(promises);
};

export const removeByPlayerId = authorId => Question.deleteMany({ authorId });

export const draw = async (roomId, round, currentRecipientId) => {
  // randomly get unasked
  const unasked = await Question.aggregate([
    [{ $match: { roomId, status: "unasked" } }, { $sample: { size: 1 } }]
  ]);
  // if has unasked
  if (unasked && unasked.length > 0) {
    const id = unasked[0]._id;
    // get next recipient
    const recipientId = await Player.getNextRecipientId(
      roomId,
      currentRecipientId
    );

    const update = { status: "asking", recipientId, round };
    if (unasked[0].type === "players") {
      const players = await Player.findByRoom(roomId);
      update.options = players.map(player => player.name);
    }

    // set question status, recipient, round
    const drawn = await Question.findByIdAndUpdate(id, update, { new: true });
    return drawn;
  } else {
    // end game
    return false;
  }
};

export const addOption = async (answer, id) => {
  // insert open-ended option
  const question = await Question.findByIdAndUpdate(
    id,
    { $push: { options: answer } },
    { new: true, lean: true }
  );
  const optionIndex = question.options.findIndex(option => option === answer); // get answer index
  return optionIndex;
};

export const getCurrentQuestionInRoom = roomId =>
  Question.findOne(
    { roomId, status: "asking" },
    { correctAnswer: 1, recipientId: 1, type: 1 }
  ).lean();

export const getCurrentQuestionInRoomFull = roomId =>
  Question.findOne({ roomId, status: "asking" }).lean();

export const setCorrectAnswer = (id, correctAnswer) =>
  Question.findByIdAndUpdate(
    id,
    { correctAnswer },
    {
      new: true,
      select: { correctAnswer: 1, recipientId: 1, type: 1 }
    }
  ).lean();

export const openToRecipient = id => 
  Question.findByIdAndUpdate(
    id,
    { isClosed: true },
    {
      new: true,
      select: { isClosed: 1, options: 1, type: 1 },
      lean: true
    }
  );

export const complete = (id, answers) =>
  Question.findByIdAndUpdate(
    id,
    { status: "asked", answers },
    {
      new: true,
      select: {
        text: 1,
        type: 1,
        options: 1,
        round: 1,
        status: 1,
        recipientId: 1,
        correctAnswer: 1,
        answers: 1
      }
    }
  )
    .populate("answers", { option: 1, playerId: 1 })
    .lean();

export const findAsked = roomId =>
  Question.find({ roomId, status: "asked" })
    .select({
      text: 1,
      type: 1,
      options: 1,
      round: 1,
      status: 1,
      recipientId: 1,
      correctAnswer: 1,
      answers: 1
    })
    .sort({ round: "desc" })
    .populate("answers", { option: 1, playerId: 1 })
    .lean();

export const findById = id => Question.findById(id);

// export const deleteById = id => Question.findByIdAndDelete(id);
