const express = require("express");
const app = express();
const { connectToDB } = require('./connect');
const URL = require('./models/url');

const urlRoutes = require('./routes/url');


connectToDB("mongodb://127.0.0.1:27017/short-url")
      .then(() => console.log("connect to db"))
      .catch((err) => console.log(err));

app.use(express.json());
app.use("/url", urlRoutes);
app.get('/:shortId', async (req, res) => {
      const shortId = req.params.shortId;
      const entry = await URL.findOneAndUpdate({ shortId },
            {
                  $push: {
                        visitHistory: { timestamp: Date.now() }

                  }
            }
            
      );

      res.redirect(entry.redirectURL);
});

app.listen(4000, () => console.log("port is listing o 4000"));