const router = require('express').Router();
const { User } = require('../../models');

// Posts the newly created User and saves their user id 
router.post('/', async (req, res) => {
  try {
    const data = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.logged_in = true;
      res.status(200).json(data);
    });
  } catch(err) {
    res.status(400).json(err);
  }
});

// Login post checking whether or not the user put in the right username and password
router.post('/login', async (req, res) => {
  try {
    const data = await User.findOne({ where: { username: req.body.username } });
    if (!data) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password! Please try again later!' });
      return;
    }
    const validPassword = await data.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: `Incorrect username or password! Please try again later!` });
      return;
    }
    req.session.save(() => {
      req.session.user_id = data.id;
      req.session.username = data.username;
      req.session.logged_in = true;
      res.json({ user: data, message: 'Congratulations! You are now logged in!' });
    });
  } catch(err) {
    res.status(400).json(err);
  }
});

// Logout post destroying the user's session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
