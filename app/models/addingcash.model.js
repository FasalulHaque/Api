module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("addingcash", {
        name: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        }
    });

    return Tutorial;
};


