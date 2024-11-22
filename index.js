import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const url = "https://bored-api.appbrewery.com";


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${url}/random`);
    const result = response.data;

    res.render("index.ejs", {
      response: result,
    });
  } catch (error) {
    console.error("Fialed to make request:", error.message);

    res.render("index.ejs", {
      error: "Ooops! Server down, refresh.",
    });
  }
});


app.post("/search", async (req, res) => {
  const type = req.body.type;
  const participants = req.body.participants;

  try {
    const response = await axios.get(`${url}/filter?type=${type}&participants=${participants}`);
    const result = response.data;

    res.render("index.ejs", {
      response: result[Math.floor(Math.random() * result.length)],
    });

  } catch (error) {
    console.error("Fialed to make request:", error.message);

    if (error.status === 404) {
      res.render("index.ejs", {
        error: "No activities meet your search criteria",
      });
    } else {
      res.render("index.ejs", {
        error: "Ooops! Server down, refresh.",
      });
    }
  }
   
});  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
