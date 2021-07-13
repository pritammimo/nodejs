const express = require("express");
const {
 getCourses,getCourse,addCourse,updateCourse,deleteCourse
} = require("../controllers/courses");
const router = express.Router({mergeParams:true});

router.route("/").get(getCourses).post(addCourse);
router.route('/:id').put(updateCourse).delete(deleteCourse)
.get(getCourse);


module.exports = router;
