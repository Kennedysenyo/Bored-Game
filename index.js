import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const url = "https://bored-api.appbrewery.com";


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/search", async (req, res) => {
  console.log(req.body)
  let response = ""
  const type = req.body.type;
  const participants = req.body.participants;

  if (type === "random" && participants == "random") {
    response = await axios.get(`${url}/random`);

    console.log(response.data);
    res.render("index.ejs", {
      response: response.data,
    });
  }
  else {
    console.log(`${url}/filter?type=${type}&participants=${participants}`);
    response = await axios.get(`${url}/filter?type=${type}&participants=${participants}`);

 
    console.log(response.data);
    res.render("index.ejs", {
      response: response.data,
    });
  }
  
});  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
