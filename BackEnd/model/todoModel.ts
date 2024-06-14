import { Document, Schema, Types, model } from "mongoose";

export interface iProps {
  title: string;
  progress: boolean;
  date: string;
  done: boolean;
}

interface iData {
  todo: iProps[];
  progress: iProps[];
  done: iProps[];
}

interface iPropsData extends iProps, Document {}

const todoModel = new Schema<iPropsData>(
  {
    title: {
      type: String,
    },

    progress: {
      type: Boolean,
      default: false,
    },

    done: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model<iPropsData>("todos", todoModel);
