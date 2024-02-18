const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

const authenticateUser = async (email, password) => {
  const user = await db.collection("JWT").findOne({ email });
  if (!user) return false;

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  return passwordMatch ? user : false;
};

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authenticateUser(email, password);
    if (!user)
      return res.status(401).json({ message: "Invalid username or password!" });

    const { _id: id, isVerified, info } = user;

    const token = jwt.sign(
      { id, isVerified, info, email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send("Internal server error. Please try again later.");
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await db.collection("JWT").findOne({ email });

    if (existingUser)
      return res.status(409).json({ message: "Email already to be used" });

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const startingInfo = {
      hairColor: "",
      favoriteFood: "",
      bio: "",
    };

    const result = await db.collection("JWT").insertOne({
      email,
      passwordHash,
      info: startingInfo,
    });
    const { insertedId } = result;

    const payload = {
      id: insertedId,
      email,
      info: startingInfo,
      isVerified: false,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send("Internal server error. Please try again later.");
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { userId } = req.params;

    const { favoriteFood, hairColor, bio } = req.body;
    const updates = { favoriteFood, hairColor, bio };

    if (!authorization)
      return res.status(401).json({ message: "No authorization header sent" });

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err)
        return res.status(401).json({ message: "Unable to verify token" });

      const { id } = decode;
      if (id !== userId)
        return res
          .status(401)
          .json({ message: "Not allowed to update that user's data" });

      const updateUser = await db
        .collection("JWT")
        .findOneAndUpdate(
          { _id: new ObjectId(userId) },
          { $set: { info: updates } },
          { returnDocument: "after" }
        );

      if (!updateUser)
        return res.status(404).json({ message: "User not found" });

      const { email, isVerified, info } = updateUser;

      const newToken = jwt.sign(
        { id, isVerified, info, email },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );

      res.status(200).json({ token: newToken });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
});

module.exports = router;
