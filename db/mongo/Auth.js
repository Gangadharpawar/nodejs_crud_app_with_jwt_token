import { getDB } from "./config.js";

export async function createUser(
  first_name,
  last_name,
  dateofbirth,
  mobile,
  email,
  password
) {
  const user = {
    fname: first_name,
    lname: last_name,
    dob: dateofbirth,
    mobile: mobile,
    email: email,
    password: password,
  };
  const db = getDB();
  const Result = await db.collection("users").insertOne(user);
  console.log("Result:", Result);
}

export async function findbyUsername(email) {
  const db = getDB();
  const result = await db.collection("users").findOne({ email: email });
  console.log("result:", result);
  return result;
}
