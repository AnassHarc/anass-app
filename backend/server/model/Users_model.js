const mongoose = require('mongoose');
const validator = require('validator');
var User = new mongoose.Schema({
   firstname:{
        type:String,
        required:true,
       },

   lastname:{
        type:String,
        required:true,
       },

   adress:{
        type:String,
        required:false,
       },

   birthday:{
        type:Date,
        required:false,
       }, 

   phone:{
        type:Number,
        required:false,
   },  

   email:{
    type:String,
    required:true,
    unique:true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: 'Invalid email address',
    },
   },

   password:{
    type:String,
    required:false,
    minlength: 4,
   },

   role:{
    type:String,
   },

   createdById:{
    type:String,
   },

   status:{
    type:String,
   },

   companyName:{
    type:String,
   },

   PhotoFileName: {
     type: String,
     required:false
   },
   
   Date_of_Joining: {
     type: Date,
     required: false
   },
   
   employeeId: {
    type: String,
    required: false,
    unique: true
  },
},
{collection:'Users',  timestamps: true } )

const Users=mongoose.model('Users',User)
module.exports = Users;