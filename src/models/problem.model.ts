import mongoose from "mongoose";

export interface ITestCase {
  input: string;
  output: string;
}

export interface IProblem extends Document {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  createdAt: Date;
  updatedAt: Date;
  editorials: string;
  testCases: ITestCase[];
}

const testSchema = new mongoose.Schema<ITestCase>({
  input: {
    type: String,
    required: [true, "Input is required"],
    trim: true,
  },
  output: {
    type: String,
    required: [true, "Output is required"],
    trim: true,
  },
});

const problemSchema = new mongoose.Schema<IProblem>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: [100, "Title must not exceed more than 100 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    editorials: {
      type: String,
      trim: true,
    },
    testCases: [testSchema],
  },
  {
    timestamps: true,
  },
);

const updateProblemSchema = new mongoose.Schema<IProblem>(
  {
    title: {
      type: String,
      maxLength: [100, "Title must not exceed more than 100 characters"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
    editorials: {
      type: String,
      trim: true,
    },
    testCases: [testSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, record) => {
        const { _id, ...rest } = record;
        return { id: _id.toString(), ...rest };
      },
    },
  },
);

problemSchema.index({ title: 1 }, { unique: true });
problemSchema.index({ difficulty: 1 });

export const Problem = mongoose.model<IProblem>("Problem", problemSchema);
export const UpdateProblem = mongoose.model<IProblem>(
  "UpdateProblem",
  updateProblemSchema,
);
