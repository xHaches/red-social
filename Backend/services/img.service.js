const {v2: cloudinary} = require('cloudinary');

class ImgService {

    async newImage({img}) {
        const {tempFilePath} = img;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath, { folder: 'social-network'});
        return secure_url;
    }

    async putImg({img, user}) {
        if(user.dataValues.img) {
            const nameArr = user.img.split('/');
            const name = nameArr[nameArr.length -1];
            const [public_id] = name.split('.');
            cloudinary.uploader.destroy('social-network/'+public_id);
        }
        const secureUrl = await this.newImage(img);
        return secureUrl;
    }
}

module.exports = { ImgService }