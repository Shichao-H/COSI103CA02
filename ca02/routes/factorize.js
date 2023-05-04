const express = require('express');
const router = express.Router();
const {Configuration, OpenAIApi} = require('openai');
require('dotenv').config()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

router.get('/factorization',
  isLoggedIn,
  async(req, res, next) => {
    res.render('factorization');
});

router.post('/factorize', 
  isLoggedIn,
  async(req, res, next) => {
    const polynomial = req.body.polynomial;
  
    // Use OpenAI's GPT to generate the factorization answer
    const result = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: "Factorize the polynomial: " + polynomial,
    });
  const answer = result.data.choices[0].text.trim();
  
  res.render('factorize', {polynomial, answer });
});

module.exports = router;