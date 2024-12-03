const Category = require('../Models/Category');
const { initDB } = require('../config/database');
const categoryServices = require('../services/categoryServices');

class categoryController{
    static async findAllCategories(req, res){
        try{
        const results = await categoryServices.findAllCategories();
        return results;
        }catch(error){
            console.error('Error fetching movies: ',error);
        }
    }


    static async findCategoryById(req,res){
        try{
            const result = await categoryServices.findCategoryById(req,res);
            return result;
        }catch(error){
            console.error('ERROR FETCHING USER', error);
        }
        
    }

    static async findCategoryForMovie(req,res){
        try{
           const result = await categoryServices.findCategoryForMovie(req,res);
           return result;
        }catch(error){
            console.error('Error fetching name for movie');
        }
    }


}
module.exports = categoryController;