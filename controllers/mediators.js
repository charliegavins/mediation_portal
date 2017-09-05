module.exports = {
  index: mediatorsIndex,
  show: mediatorsShow,
  update: mediatorsUpdate,
  delete: mediatorsDelete,
  new: mediatorsNew
};

const Mediator = require('../models/mediator');
const fs      = require('fs');

function mediatorsIndex(req, res) {
  Mediator
  .find({})
  .exec((err, mediators) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json(mediators);
  });
}

function mediatorsShow(req, res) {
  Mediator
  .findById(req.params.id)
  .exec((err, mediator) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!mediator) return res.status(404).json({ message: 'mediator not found.' });
    return res.status(200).json(mediator);
  });
}

function mediatorsUpdate(req, res) {
  Mediator.findByIdAndUpdate(req.params.id, req.body, { new: true },  (err, mediator) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!mediator) return res.status(404).json({ message: 'mediator not found.' });
    console.log(mediator);
    return res.status(200).json({message: 'mediator updated', mediator: mediator});
  });
}

function mediatorsDelete(req, res) {
  Mediator.findByIdAndRemove(req.params.id, (err, mediator) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!mediator) return res.status(404).json({ message: 'mediator not found.' });
    return res.sendStatus(204);
  });
}

function mediatorsNew(req, res){
  Mediator.create(req.body, (err, mediators) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.', error: err });

    return res.status(201).json({
      message: `Mediator added`, mediator: mediators });
  });
}
