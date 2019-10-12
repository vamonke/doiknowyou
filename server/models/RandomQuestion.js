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
    usage: {
      type: Number,
      default: 0
    }
  },
  { versionKey: false }
);

const RandomQuestion = model("RandomQuestion", schema);

export const populate = async () => {
  console.log("MongoDB: Populating Question Bank");
  for (const question of questionBank) {
    console.log(question.text);
    await RandomQuestion.create(question);
  }
  console.log("Done!");
};

// export const getOne = RandomQuestion.aggregate.sample(1);

export const getAll = () => RandomQuestion.find();

export const deleteById = id => RandomQuestion.findByIdAndDelete(id);
