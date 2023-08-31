const shortid = require("shortid");
const URL = require('../models/url');



const handeGenrateNewShortURL = async (req,res)=>{
      const body = req.body;
      if(!body.url)return res.status(400).json({error : 'url is required'});
  const shortID  = shortid();
  await URL.create({
      shortId : shortID,
      redirectURL :  body.url,
      visitHistory : []
  })
  return res.json({id : shortID});
}

const handelGetAnalytics = async (req,res)=>{
   const shortId = req.params.shortId;
   const result = await URL.findOne( { shortId } )

   return res.json({totalclicks : result.visitHistory.length, analytics : result.visitHistory})
}

module.exports = { handeGenrateNewShortURL , handelGetAnalytics }; 