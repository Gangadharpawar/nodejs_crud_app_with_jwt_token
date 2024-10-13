import jwt from "jsonwebtoken";

export function logger(req, res, next) {
  console.log("Request recived on ", req.path);
  next();
}

// export function Deleter(req, res, next) {
//   if (req.method === "DELETE") {
//     console.log("Dangerious delete request", req.path);
//   }
//   next();
// }

export function Deleter(req, res, next) {
  console.log("Dangerious delete request", req.path);
  next();
}

export function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Not Authenticated" });
    return;
  }
  //valid token
  //"Bearer <token>" ->  ["Bearer", "<token>"][1]

  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  try {
    var decodeTokenvalue = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    console.log("token value", decodeTokenvalue);
    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
}
