const userServices = require('../services/userServices');
const connection = require('../config/database');
class UserController{
    async getAllUser(req, res){
        try{
            const users = await userServices.getAllUsers();
            res.json(users);
        }catch(e){
            console.error('Error fetching user'+e);
            res.status(500).json({message: e});
        }
    }
    async getUserById(req,res){
       try{
        const user_id = parseInt(req.params.id);
        const user = await userServices.getUserById(user_id);
        res.json(user);
       }catch(e){
        console.log('Error fetching user: ',e);
        res.status(500).send({message: e});
       }
    }
    async createUser(req,res){
        try{
        const{username,email,password,confirm_password} = req.body;
        if (!username || !email || !password || password !== confirm_password) {
            return res.status(400).json({ message: 'Please fill all fields correctly.' });
        }
        const newUser = await userServices.createUser({username,email,password});
        req.session.userId = newUser.user_id; 
        res.redirect('/');
        }catch(e){
            console.error('Error fetching user'+e);
            res.status(500).send({message: e});
        }
    }

    async updateUser(req,res){
        try{
            const id = req.query.id;
        const{name,email,password} = req.body;
        const updateUser = await userServices.updateUser(id,{name,email,password});
        res.status(201).json(updateUser);
        }catch(e){
            console.error('Error fetching user'+e);
            res.status(500).send({message: e});
        }
    }
    async login(req,res){
        const {email, password} = req.body;
        try{
            const user = await userServices.authenticateUser(email,password);
            if(user){
                req.session.userId = user.user_id;
                res.redirect('/');
            }else{
                return res.status(401).render('users/login.ejs', {title: 'Movies World' ,errorMessage: 'Invalid email or password' });            }

        }catch(error){
            console.error("Error logging in: ", error);
            res.render('login', { error: 'An error occurred, please try again.' });     
           }
    }
    async logout(req,res){
       req.session.destroy((err)=>{
        if(err){
            console.error('Error logging out');

        }
        res.redirect('/');
       });
    }
}
module.exports = new UserController();