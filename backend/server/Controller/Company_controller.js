const Companydb = require('../model/Company_model');
const uuid = require('uuid');

exports.getAllCompanies=async(req,res)=>{
    try{
   const company = await Companydb.find({});
      res.json(company);
    }
    catch(err){
      res.status(500).send({message:err.message||`Error while retrieving Company information`})
     };
  }

exports.createCompany = async (req,res)=>{
    if(!req.body){
      res.status(400).send({message:'Content cannot be empty!'});
      return
  }
  try{
  const company = new Companydb({
        companyId: uuid.v4().slice(0,4),
        companycreatedById:req.body.companycreatedById,
        companyName:req.body.companyName,
        companyAdress:req.body.companyAdress,
        companyPhone:req.body.companyPhone,
        companyWebsite:req.body.companyWebsite,
      })
  const data = await company.save()
            res.status(201).json(data);
    }   
        catch(err){
        res.status(500).send('Error adding company to database');
        }
}

exports.UpdateCompany = async (req,res)=>{
    if(!req.body){
      return res
           .status(404)
           .send({message:err.message ||`Error while updating the data cannot be empty`});
   }
   try{
    const id =req.params.id;
  const data = await Companydb.findByIdAndUpdate(id,req.body);
    if(!data){
        res.status(404).send({message:err.message ||`cannot update Company with identified id ${id} or maybe user not found!`});
    } else{
        res.json(data);
    }
  }
  catch(err){
  res.status(500).send({message: err.message || `error updating Company information`});
   }
  }

  exports.deleteCompany = async (req,res)=>{
    
    try{
    const id = req.params.id
   const data= await Companydb.findByIdAndDelete(id)
      if(!data){
          res.status(404).send({message:`Cannot delete Company with id ${id} maybe id is wrong!`});
      }else{
          res.json({message:`Company was deleted successfully!`});
      }
    }
     catch(err){
      res.status(500).send({message:`Could not delete Company with id ${id}`});
     }
    
  }