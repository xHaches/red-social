const { User, Friendship, Qualification, Technology, } = require("../models");


// Uno a uno


// Qualification.hasOne(Technology, {foreignKey: 'id'});
// Technology.belongsTo(Qualification, {foreignKey: 'id_technology'});

// Qualification.hasOne(User, {foreignKey: 'id'});



Friendship.hasOne(User, {foreignKey: 'id'});

Friendship.hasOne(User, {foreignKey: 'id'});
