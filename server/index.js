// server.js (backend)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type"], // Explicitly allow the header
  }),
);

mongoose
  .connect(
    "mongodb+srv://cowstock:dLepuw25LYtSSgyY@test.zdvcc3k.mongodb.net/?appName=Test",
    {},
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

const accountSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
}, { collection: 'accounts' });
const account = mongoose.model("account", accountSchema, "accounts");
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/login", async function (req, res) {
  const { username, password } = req.body;

  const user =  await account.findOne({ username: username });

  if (user && password === user.password) {
    console.log(user.role);
    res.json({ success: true , role: user.role});
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});
