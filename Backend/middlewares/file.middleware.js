


class FileMiddlewares {
    validateFileUploaded (req, res, next) {
        //.img, como se establece en el body
        if(!req.files || Object.keys(req.files).length === 0 || !req.files.img) {
            return res.status(400).json({
                msg: 'Error, no has subido una imagen'
            });
        }
        next();
    }
}

module.exports = FileMiddlewares;