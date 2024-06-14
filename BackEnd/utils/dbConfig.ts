import { connect } from "mongoose";

const URL: string = "mongodb://localhost:27017/simpleTodoDB";
// const URL: string =
//   "mongodb+srv://tobez:tobez@cluster0.l4hcy57.mongodb.net/simpleTodoDB?retryWrites=true&w=majority&appName=Cluster0";
export const dbConfig = async () => {
  try {
    return await connect(URL)
      .then(() => {
        console.log("DataBase Connected Successfully🌚🌚🌚");
      })
      .catch(() => {
        console.error();
      });
  } catch (error) {
    return error;
  }
};
