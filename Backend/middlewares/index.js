


const UserMiddlewares = require('./user.middleware');
const ParamsMiddlewares = require('./params.middleware');
const FileMiddlewares = require('./file.middleware');
const TechnologyMiddlewares = require('./technology.middleware');
const QualificationMiddlewares = require ('./qualification.middleware');
const FriendshipMiddlewares = require ('./friendship.middleware');
const AuthMiddlewares = require ('./auth.middleware');


module.exports = {
    UserMiddlewares,
    ParamsMiddlewares,
    FileMiddlewares,
    TechnologyMiddlewares,
    QualificationMiddlewares,
    FriendshipMiddlewares,
    AuthMiddlewares
}

