const express = require('express');
const router = express.Router();
const Loan = require("../../models/loans");
const User = require("../../models/users");
const { basic, adminOnly, getToken } = require("../../utils/auth");

router.get('/', async (req, res) => {
    
    try {
        const loans = await Loan.find({})
        res.send(loans)
      
  } catch (error) {
      console.log(error)
      res.send(error)
  }
});

router.get('/:id', async (req, res) => {
    
    try {
        const loan = await Loan.findById(req.params.id)
        res.send(loan)
      
  } catch (error) {
      console.log(error)
      res.send(error)
  }
});

router.post("/", async (req, res) => {
    try {
      
      let loan = await Loan.create({...req.body});
        
        await User.findByIdAndUpdate(req.user._id, { $push: { loans: loan._id } })
        console.log(req.user)
      //loan.save();
      loan = await Loan.findById(loan._id).populate("agent");
      res.send(loan);
    } catch (error) {
        console.log(error)
      res.status(500).send(error);
    }
  });

module.exports = router;
