const express = require('express');
const router = express.Router();
const Transaction = require("../../models/transactions");
const User = require("../../models/users");
const {
  basic,
  adminOnly,
  getToken
} = require("../../utils/auth");

router.get('/', async (req, res) => {

  try {

    const mySort = { createdAt: -1 }
    const transactions = await Transaction.find({}).sort(mySort)
    res.send(transactions)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

router.get('/total/:userId', async (req, res) => {

    try {
      const transactions = await Transaction.find({ $sum:{$amount}})
      res.send(transactions)
  
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  });

router.get('/:id', async (req, res) => {

  try {
    const transaction = await (await Transaction.findById(req.params.id));
    res.send(transaction)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

router.get('/user/:userId', async (req, res) => {

  try {
    const user = req.body.user
    const transaction = await (await Transaction.find({user: req.params.userId}));
    console.log(req.params.userId)
    console.log(user)
    res.send(transaction)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

router.post("/", async (req, res) => {
  try {

    let transaction = new Transaction({
      ...req.body
    });

    await transaction.save();
      console.log(req.body)
    await User.findByIdAndUpdate(req.body.user._id, {
      $push: {
        transaction: transaction._id
      }
    })


    loan = await Loan.findById(loan._id).populate("user");
    res.send(loan);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const loanEdit = await Exp.findByIdAndUpdate(
      req.params.expId,
      {
        $set: { ...req.body }
      },
      { new: true }
    );
    res.send(editExp);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    
    if (transaction) {
      const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
      res.send({ message: "Transaction Deleted", deletedTransaction });
    } else {
      res.status(401).send("You are not authorized to delete this Loan.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;