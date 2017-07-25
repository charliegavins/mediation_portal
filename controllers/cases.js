module.exports = {
  index: casesIndex,
  show: casesShow,
  update: casesUpdate,
  delete: casesDelete,
  new: casesNew
};

const Case = require('../models/case');

function casesIndex(req, res) {
  Case
  .find({})
  .populate(['partnerA', 'partnerB'])
  .exec((err, cases) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json(cases);
  });
}

function casesShow(req, res) {
  Case.findById(req.params.id)
  .populate(['partnerA', 'partnerB'])
  .exec((err, cases) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!cases) return res.status(404).json({ message: 'Case  not found.' });
    return res.status(200).json(cases);
  });
}

function casesUpdate(req, res) {
  Case.findByIdAndUpdate(req.params.id, req.body.case, { new: true },  (err, cases) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!cases) return res.status(404).json({ message: 'case not found.' });
    return res.status(200).json(cases);
  });
}

function casesDelete(req, res) {
  Case.findByIdAndRemove(req.params.id, (err, cases) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!cases) return res.status(404).json({ message: 'case not found.' });
    return res.sendStatus(204);
  });
}

function casesNew(req, res){
  Case.create(req.body, (err, cases) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.', error: err });

    return res.status(201).json({
      message: `Case added`, case: cases });
  });
}
