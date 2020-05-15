const express = require('express');
const router = express.Router();
const Loan = require("../../models/loans")
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
      
      const newLoan = await Loan.create(req.body);
      newLoan.save();
      res.send(newLoan);
    } catch (error) {
        console.log(error)
      res.status(500).send(error);
    }
  });

module.exports = router;
