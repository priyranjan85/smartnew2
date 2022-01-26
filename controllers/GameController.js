const Game = require('../models/Game')

const getTotal = ( data ) => {
  let total = 0
  data.map(element => {
    total += element.payout
  });

  return total
}

exports.saveWinnerData = async (req, res) => {
  const { address } = req.body
  console.log(req.body)

  const current_day = new Date().toISOString().slice(0, 10)
  let user = await Game.findOne({ 
    address ,
    date: current_day
  });

  if (!user) {
    const newWinner = new Game({
      address: req.body.address,
      payout: req.body.payout,
      date: current_day
    });

    await newWinner.save().then(result => console.log(result))
  } else {
    await Game.findOneAndUpdate({ 
      address,
      date: current_day,
    }, {
      $set: { payout: user.payout + req.body.payout }
    })
  }

  const top_winners = await Game.find()
  .sort({payout: -1})
  .limit(5)

  const total_winners = await Game.find()
  const total_payout = getTotal(total_winners)

  res.json({
    'top_winners': top_winners,
    'total_payout': total_payout
  });
}

exports.getTotalPayout = async (req, res) => {
  const total_winners = await Game.find()
  const total_payout = getTotal(total_winners)

  res.json({'total_payout': total_payout})
}

exports.getTopWinners = async (req, res) => {
  const current_day = new Date().toISOString().slice(0, 10)

  const top_winners = await Game.find({date: current_day})
  .sort({payout: -1})
  .limit(5)

  res.json({'top_winners': top_winners})
}