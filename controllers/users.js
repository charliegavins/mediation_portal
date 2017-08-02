module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete,
  file: usersFile
};

const User = require('../models/user');

function usersFile(req, res) {
   console.log(req.files);
   console.log('fart');
   return res.status(200);
}

function usersIndex(req, res) {
  User
  .find({})
  .populate('case_ID')
  .exec((err, users) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json(users);
  });
}

function usersShow(req, res) {
  User
  .findById(req.params.id)
  .populate('case_ID')
  .exec((err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    return res.status(200).json(user);
  });
}

function usersUpdate(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true },  (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    return res.status(200).json({message: 'user updated', user: user});
  });
}

function usersDelete(req, res) {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    return res.sendStatus(204);
  });
}
