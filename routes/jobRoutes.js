const express = require('express');
const router = express.Router();

const { addJob, getJobsAndSearchByTitle, getJobById, updateJob, deleteJob, getJobsByLocation, sortJobsBySalary } = require('../controllers/jobController');

router.post('/', addJob);
router.get('/', getJobsAndSearchByTitle);
router.get('/filter/:location', getJobsByLocation);
router.get('/sorted/salary', sortJobsBySalary);
router.get('/:id', getJobById);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;