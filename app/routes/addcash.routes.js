
const { verifyToken } = require("../middleware/auth.js")

module.exports = app => {
    const addingCash = require("../controllers/addingcash.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", verifyToken, addingCash.create);

    // Retrieve all addingCash
    router.get("/", addingCash.findAll);

    // Retrieve all published addingCash
    router.get("/published", addingCash.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", addingCash.findOne);

    // Update a Tutorial with id
    router.put("/:id", addingCash.update);

    // Delete a Tutorial with id
    router.delete("/:id", addingCash.delete);

    // Delete all addingCash
    router.delete("/", addingCash.deleteAll);

    app.use("/api/addingCash", router);
};
