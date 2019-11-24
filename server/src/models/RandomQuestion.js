import { Schema, model } from "mongoose";
import { questionBank } from "./questionBank.json";

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
    disabled: {
      type: Boolean,
      default: false
    },
    usage: {
      type: Number,
      default: 0
    },
    tags: {
      type: [String],
      default: ["general"]
    }
  },
  { versionKey: false }
);

const RandomQuestion = model("RandomQuestion", schema);

export const populate = async () => {
  console.log("MongoDB: Emptying question bank");
  const deleted = await RandomQuestion.deleteMany({});
  console.log("MongoDB: Removed", deleted.deletedCount , "questions");
  
  console.log("MongoDB: Populating question bank");
  for (const question of questionBank) {
    // console.log(question.text);
    await RandomQuestion.create(question);
  }
  console.log("MongoDB: Inserted", questionBank.length , "questions");
};

// export const getOne = RandomQuestion.aggregate.sample(1);

export const getAll = () => RandomQuestion.find();

export const getAllowed = () => RandomQuestion.find({ disabled: { $ne: true } });

export const toggleDisabled = async id => {
  const randomQuestion = await RandomQuestion.findById(id);
  randomQuestion.disabled = !randomQuestion.disabled;
  await randomQuestion.save();
  return randomQuestion;
};

export const deleteById = id => RandomQuestion.findByIdAndDelete(id);
