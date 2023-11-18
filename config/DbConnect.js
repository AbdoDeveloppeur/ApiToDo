import mongoose from "mongoose";

const URL = process.env.Data_URI;

export const connectDb = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://abdelazizeljazouli378:3WUhYbK5LB6XqHkg@cluster0.xom2d8h.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};
