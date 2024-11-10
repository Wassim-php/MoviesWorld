const connection = require('../config/database');
class Category{
    constructor(category_id, name){
        this.category_id = category_id;
        this.name = name;
    }
}
module.exports = Category;
