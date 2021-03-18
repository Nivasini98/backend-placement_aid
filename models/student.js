const mongoose = require ('mongoose')

const studentSchema = new  mongoose.Schema({
  name : {
      type:String,
      required:[true,'enter name'],
      trim:true,
      maxlength : 100
  },
  rollno:{
      type:Number,
      required:true,
      trim:true,
      maxlength:100
  }
})

module.exports=mongoose.model('Student',studentSchema);