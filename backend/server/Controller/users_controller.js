const Users = require("../model/Users_model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const uuid = require('uuid');
var stringify = require('json-stringify-safe');
const saltRounds = 10;

exports.getUser=(req,res)=>{
    Users.findById(req.user.id)
           //.select('-password')
           .then((user)=>{res.json(user)})
  }

exports.CreateUser = (req,res)=>{
    if(!req.body){
      res.status(404).send({message:"Fields cannot be Empty!"||err.message});
      return
    }
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
     const newUser = new Users({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      adress:req.body.adress,
      birthday:req.body.birthday,
      phone:req.body.phone,
      email:req.body.email,
      password:hash,
      role:"admin",
      createdById:req.params._id,
      status:"confirmed",
      employeeId : uuid.v4().slice(0, 4)
    })
    newUser.save()
         .then((data)=>{
          jwt.sign(
          {id:data.id},
          process.env.JWT_SECRET,
          {expiresIn:'24h'},
          (err,token)=>{
              if(err) throw err;
               res.status(201)
                   .json({token,data})
          })
         })
         .catch((err)=>{
          res.status(500).json({ message: 'Error while creating User'||err.message });
      });
  });

}

exports.UserLogin = async (req, res) => {
    const {email, password} = req.body;
    try {
      const foundUser = await Users.findOne({ email: email });
      const isMatch = await bcrypt.compare(password,foundUser.password) || password === foundUser.password;
      console.log("Is Match :", isMatch);
      if(isMatch) {
        jwt.sign(
            {id:foundUser.id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'},
            (err,token)=>{
                if(err) throw err;
                 res.status(200)
                     .json({token,foundUser})
                    })
      }else{
    res.status(401).json('Invalid credentials.');
    }   
    } catch (error) {
      res.status(500).json('Internal server error.'||error.message);
    }
  };
/*
exports.CreateEmployee = (req,res)=>{
    console.log("REQUEST :", req.body);
    console.log("PARAMS:", req.params);
    console.log("RESPONSE :", res.error);
    if(!req.body){
      res.status(404).send({message:"Fields cannot be Empty!"||err.message});
      return
    }
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
     const newUser = new Users({
      EmployeeId: uuid.v4().slice(0, 4),
      firstname:req.body.firstname ? req.body.firstname : "",
      lastname:req.body.lastname ? req.body.lastname : "",
      adress:req.body.adress ? req.body.lastname : "",
      birthday:req.body.birthday ? req.body.birthday : "",
      phone:req.body.phone ? req.body.phone : "",
      email:req.body.email,
      Date_of_Joining:req.body.Date_of_Joining,
      password:hash,
      role:"employee",
      createdById: req.body.createdById ? req.body.createdById : "",
      status:"waiting",
      companyName:req.body.companyName,
      PhotoFileName: req.body.PhotoFileName? req.body.PhotoFileName : "",
    });
    newUser.save()
         .then()
         .catch((err)=>{
          res.status(500).json({ message: 'Error while creating Employee'||err.message });
      });
  });

}; 
*/
exports.CreateEmployee = async (req, res) => {
  const {firstname,lastname,adress,birthday,phone,email,status,role,
    createdById,companyName,Date_of_Joining,PhotoFileName} = req.body;
  if (!firstname&& !lastname && !email && !createdById) {
    return res.status(400).json({ message: 'Content cannot be empty!' });
  }
try{
  bcrypt.hash(req.body.password, saltRounds, function(err, hash){
          const employee = new Users({
            firstname,
            lastname,
            adress,
            birthday,
            phone,
            email,
            password : hash,
            role,
            status,
            createdById,
            companyName,
            Date_of_Joining,
            PhotoFileName,
            employeeId : uuid.v4().slice(0, 4)
          });
        const data = employee.save().then((data)=>{
          jwt.sign(
          {id:data.id},
          process.env.JWT_SECRET,
          {expiresIn:'24h'},
          (err,token)=>{
              if(err) throw err;
              res.status(201)
                  .json({token,data})
              })
            })
     res.status(201).json(data);
    })  
 }catch(err)  {
     res.status(500).json({ message: 'Error adding Employee to database' });
   }
}

exports.UpdateEmployee = async (req,res)=>{
    if(!req.body){
        return res
             .status(404)
             .send({message:err.message ||`Error while updating the data cannot be empty`});
     }
    try{  
      const id =req.params.id;
        const data = await Users.findByIdAndUpdate(id, req.body);
        if(data){
          res.json(stringify(data));
        } else{
          res.status(404).send({message:err.message ||`cannot update Employee with identified id ${id} or maybe user not found!`});
        }
    }catch(err){
    res.status(500).send({message: err.message || `error updating Employee information`});
     }
    }

exports.deleteEmployee = async (req,res)=>{
     try{  
   const id = req.params.id
   const data = await Users.findByIdAndDelete(id)
      if(!data){
         res.status(404).send({message:`Cannot delete Employee with id ${id} maybe id is wrong!`});
         }else{
        res.json({message:`Employee was deleted successfully!`});
         }
      }catch(err){
         res.status(500).send({message:`Could not delete Employee with id ${id}`});
           }
    }

exports.getAllEmployee= async (req,res)=>{
            try{  
            const employee = await Users.find({});
               res.json(employee);
            }catch(err){
               res.status(500).send({message:err.message||`Error while retrieving Employee information`})
              }
    }