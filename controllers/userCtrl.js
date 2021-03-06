const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function update(req, res) {
  const user = await User.findOne({_id: req.params.id})
  user.name = req.body.name
  try {
    await user.save()
  } catch (err) {
    console.log(err)
  }
  return res.json(user)
}

/*----- Helper Functions -----*/
function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}

// Testing Update   

async function getUser(req,res) {
  const user = await User.findOne({_id: req.params.id})
  try {
    return res.json(user)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  signup,
  login,
  update,
  getUser
};