const connection = require('../config/database');
class User{
    constructor(user_id, username, email, password, created_at){
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
    }
}
module.exports = User;