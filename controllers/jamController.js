const db = require("../models");

module.exports = {
    create: function(req, res) {
        db.Jam
            .create(req.body)
            .then(dbJam => res.json(dbJam))
            .catch(err => res.status(422).json(err))
    },
    update: function(req, res) {
        db.Jam
            .findOneAndUpdate(
                { _id: req.params.id},
                { $set: req.body },
                { new: true }
            )
            .then(dbJam => res.json(dbJam))
            .catch(err => res.status(422).json(err))

    },
    findOne: function(req, res) {
        db.Jam
            .findOne({ _id: req.params.id})
            .populate("admin")
            .populate("members")
            .populate("joinRequests")
            .populate("posts")
            .then(dbJam => res.send(dbJam))
            .catch(err => res.send(err))
    },
    findAll: function(req, res) {
        db.Jam
            .find({})
            .then(dbAllJams => res.send(dbAllJams))
            .catch(err => res.send(err))
    },
    remove: function(req, res) {
        db.Jam
            .findByIdAndRemove({ _id: req.params.id})
            .then(dbJam => res.send(dbJam))
            .catch(err => res.send(err))
    }
};