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
  let statusCode = "";

  if (type === "random" && participants == "random") {
    try {
      const response = await axios.get(`${url}/random`);
      const result = response.data;
      statusCode = response.status;

      res.render("index.ejs", {
        response: result,
      });

    } catch(error) {
      console.error("Fialed to make request:", error.message);

      if (statusCode === 429) {
        res.render("index.ejs", {
          error: "Ooops! Server down, refresh.",
        });
      } else {
        res.render("index.ejs", {
          error: "No activities meet your search criteria",
        });
      }
    }
  }
  else if (type !== "random" && participants === "random") {
    try {
      const response = await axios.get(`${url}/filter?type=${type}`);
      const result = response.data;
      statusCode = response.status;

      res.render("index.ejs", {
        response: result[Math.floor(Math.random() * result.length)],
      });
    } catch (error) {
      console.error("Fialed to make request:", error.message);

      if (statusCode === 429) {
        res.render("index.ejs", {
          error: "Ooops! Server down, refresh.",
        });
      } else {
        res.render("index.ejs", {
          error: "No activities meet your search criteria",
        });
      }
    }
  } 
  else if (type === "random" && participants !== "random") {
    try {
      const response = await axios.get(`${url}/filter?participants=${participants}`);
      const result = response.data;
      statusCode = response.status;

      res.render("index.ejs", {
        response: result[Math.floor(Math.random() * result.length)],
      });
    } catch (error) {
      console.error("Fialed to make request:", error.message);

      if (statusCode === 429) {
        res.render("index.ejs", {
          error: "Ooops! Server down, refresh.",
        });
      } else {
        res.render("index.ejs", {
          error: "No activities meet your search criteria",
        });
      }
    }
  }
  else {

    try {
      const response = await axios.get(`${url}/filter?type=${type}&participants=${participants}`);
      const result = response.data;
      statusCode = response.status;

      res.render("index.ejs", {
        response: result[Math.floor(Math.random() * result.length)],
      });
  
    } catch (error) {
      console.error("Fialed to make request:", error.message);

      if (statusCode === 429) {
        res.render("index.ejs", {
          error: "Ooops! Server down, refresh.",
        });
      } else {
        res.render("index.ejs", {
          error: "No activities meet your search criteria",
        });
      }
    }
   
  }
  
});  

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
