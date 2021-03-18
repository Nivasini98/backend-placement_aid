const express = require('express');
const router = express.Router();

const {getStudents, 
    newStudent, 
    getSingleStudent, 
    updateStudent, 
    deleteStudent } = require('../controllers/studentController');

    const { isAuthenticatedUser, authorizeRoles} = require ('../middleware/auth')


router.route('/students').get( getStudents);
router.route('/student/:id').get(getSingleStudent);


router.route('/student/new').post(isAuthenticatedUser, authorizeRoles('admin'), newStudent);

router.route('/admin/student/:id')
.put(isAuthenticatedUser, authorizeRoles('admin'), getSingleStudent)
.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteStudent);


module.exports = router;