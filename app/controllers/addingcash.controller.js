const db = require("../models");
const AddingCash = db.addingCash;
const Op = db.Sequelize.Op;

// Create and Save a new AddingCash
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.date || !req.body.amount) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a AddingCash
    const addingCashData = {
        name: req.body.name,
        Date: req.body.data,
        amount: req.body.amount
    };

    // Save AddingCash in the database
    AddingCash.create(addingCashData)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the AddingCash."
            });
        });
};

// Retrieve all AddingCashs from the database.
exports.findAll = (req, res) => {
    const NAME = req.query.name;
    var condition = NAME ? { name: { [Op.iLike]: `%${NAME}%` } } : null;

    AddingCash.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving AddingCashs."
            });
        });
};

// Find a single AddingCash with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    AddingCash.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find AddingCash with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving AddingCash with id=" + id
            });
        });
};

// Update a AddingCash by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    AddingCash.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "AddingCash was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update AddingCash with id=${id}. Maybe AddingCash was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating AddingCash with id=" + id
            });
        });
};

// Delete a AddingCash with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    AddingCash.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "AddingCash was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete AddingCash with id=${id}. Maybe AddingCash was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete AddingCash with id=" + id
            });
        });
};

// Delete all AddingCashs from the database.
exports.deleteAll = (req, res) => {
    AddingCash.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} AddingCashs were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all AddingCashs."
            });
        });
};

// find all published AddingCash
exports.findAllPublished = (req, res) => {
    AddingCash.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving AddingCashs."
            });
        });
};
