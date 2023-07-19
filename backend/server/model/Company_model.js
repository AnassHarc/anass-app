const mongoose = require('mongoose');

var company = new mongoose.Schema({
    
        companyName: {
          type: String,
          required: true,
          unique: true
        },

        companyAdress: {
            type: String,
          },

        companyPhone: {
            type: Number,
            unique: true
          },
        
        companyWebsite: {
            type: String,
            unique: true
          },

        companycreatedById:{
            type:String,
        },

        companyId: {
          type: String,
          required: true,
          unique: true
        },
        
      },{ collection: 'Companies',  timestamps: true } );
      
const Companydb = mongoose.model('Companydb', company)
module.exports = Companydb;