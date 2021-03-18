const Student = require("../models/student");
const ErrorHandler = require ('../utils/errorHandler');
const catchAsyncErrors = require ('../middleware/catchAsyncErrors');
const APIFeatures = require ('../utils/apiFeatures')

//adding new-admin
exports.newStudent = catchAsyncErrors( async (req, res, next) => {

  
  const student = await Student.create(req.body);

  res.status(201).json({
    success: true,
    student,
  });
});

//all students viewing
exports.getStudents =catchAsyncErrors( async (req, res, next) => {

  const studentsCount = await Student.countDocuments();

  const apiFeatures = new APIFeatures(Student.find(), req.query)
  .search () 


  const students = await apiFeatures.query;

  res.status(200).json({
    success: true,
    studentsCount,
    students
  });
});

//getting single id
exports.getSingleStudent =catchAsyncErrors( async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
return next(new ErrorHandler('Product not found',404 ))  
}

  res.status(200).json({
    success: true,
    message: "Student found",
  });
});

//updating student-admin
exports.updateStudent =catchAsyncErrors( async (req, res, next) => {
  let student = await Student.findById(req.params.id);
  if (!student) {
    return next(new ErrorHandler('Product not found',404 ))  
  }

  student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    student,
  });
});

//deleting
exports.deleteStudent =catchAsyncErrors( async (req, res, next) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        return next(new ErrorHandler('Student not found',404 ))  
    }
    await student.remove();

    res.status(200).json({
        student:true,
        message:'student deleted'
    })
})