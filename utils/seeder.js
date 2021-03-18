const Student = require("../models/student");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const students = require("../data/students");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedStudents = async () => {
  try {

    await Student.deleteMany();
    console.log('Students log deleted')

    await Student.insertMany(students)
    console.log('Added students')

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedStudents()