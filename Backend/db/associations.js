const { User, Friendship, Qualification, Technology, } = require("../models");


// Uno a uno

Qualification.hasOne(Technology);
Qualification.hasOne(User);

Qualification.hasOne(Technology, {foreignKey: 'id'});
Technology.belongsTo(Qualification, {foreignKey: 'id_technology'});

Qualification.hasOne(User, {foreignKey: 'id'});
User.belongsTo(Qualification, {foreignKey: 'id_user'});

Friendship.hasOne(User, {foreignKey: 'id'});
User.belongsTo(Friendship, {foreignKey: 'id_friend'});

Friendship.hasOne(User, {foreignKey: 'id'});
User.belongsTo(Friendship, {foreignKey: 'id_user'});