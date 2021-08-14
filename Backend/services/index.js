const { ImgService } = require("./img.service");
const { UserService } = require("./user.service");
const { TechnologyService } = require("./technology.service")
const { QualificationService } = require("./qualification.service");
const { FriendshipService } = require("./friendship.service");
const { JWTService } = require('./jwt.service');
const AuthService = require('./auth.service');

module.exports = {
    ImgService,
    UserService,
    TechnologyService,
    QualificationService,
    FriendshipService,
    JWTService,
    AuthService
}