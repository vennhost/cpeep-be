const express = require('express');
const router = express.Router();
const Loan = require("../../models/loans");
const User = require("../../models/users");
const {
  basic,
  adminOnly,
  getToken
} = require("../../utils/auth");

router.get('/', async (req, res) => {

  try {

    const mySort = { createdAt: -1 }
    const loans = await Loan.find({}).sort(mySort)
    res.send(loans)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

router.get('/:id', async (req, res) => {

  try {
    const loan = await (await Loan.findById(req.params.id));
    res.send(loan)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

router.get('/user/:userId', async (req, res) => {

  try {
    const user = req.body.user
    const loan = await (await Loan.find({user: req.params.userId}));
    console.log(req.params.userId)
    console.log(user)
    res.send(loan)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

router.get('/totals', async (req, res) => {

  try {
    const loans = await Loan.aggregate(
      [{
        $group : {
            
            total : {
                $sum : "$amount"
            }
        }
    }],callback
    )
    res.send(loans)

  } catch (error) {
    console.log(error)
    res.send(error)
  }
});

router.post("/", async (req, res) => {
  try {

    let loan = new Loan({
      ...req.body
    });

    await loan.save();
      console.log(req.body)
    await User.findByIdAndUpdate(req.body.user._id, {
      $push: {
        loans: loan._id
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
    const loanEdit = await Loan.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body }
      },
      { new: true }
    );
    res.send(loanEdit);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    
    if (loan) {
      const deletedLoan = await Loan.findByIdAndDelete(req.params.id);
      res.send({ message: "Loan Deleted", deletedLoan });
    } else {
      res.status(401).send("You are not authorized to delete this Loan.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;