const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: req.body.prompt,
        model: "text-davinci-003",
        max_tokens: 50,
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data.choices[0].text.trim();
    res.json({ data });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the code." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
