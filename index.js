const express = require("express");
const app = express();
const path  = require('path');
const { connectToDB } = require('./connect');
const URL = require('./models/url');
const staticRouter = require('./routes/staticRouter');
const urlRoutes = require('./routes/url');



connectToDB("mongodb://127.0.0.1:27017/short-url")
      .then(() => console.log("connect to db"))
      .catch((err) => console.log(err));


 app.set("view engine","ejs");
 app.set('views', path.resolve("./views"))     

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get("/test" , async (req,res)=>{
  const allurls = await URL.find({});
  return res.render("home",{
      urls : allurls
  })
})


app.use("/url", urlRoutes);
app.use('/',staticRouter)


app.get('/url/:shortId', async (req, res) => {
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