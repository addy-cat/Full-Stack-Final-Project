module.exports = class User{
    constructor(user, socket){
        this.user = user;
        this.socket = socket;
        this.image = null;
    }

    setImage(image){
        this.image = image;
    }
}