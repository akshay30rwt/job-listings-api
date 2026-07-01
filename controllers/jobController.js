const Job = require('../models/Job');

const addJob = async (req, res) => {
    try {
        const { title, company, location, salary } = req.body

        const job = new Recipe({ title, company, location, salary });
        await job.save();

        return res.status(201).json({
            message: 'Job listed successfully',
            job
        });
    }
    catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const getJobsAndSearchByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        
        if(!title) {
            const jobs = await Job.find();
            if(jobs.length === 0) {
                return res.status(404).json({
                    message: 'There are no jobs here'
                });
            }
            return res.status(200).json(jobs);
        }

        const jobs = await Job.find({
            title: {
                $regex: title, 
                $options: 'i'
            }
        });
        if(jobs.length === 0) {
            return res.status(404).json({
                message: `No jobs by the title: ${title}`
            });
        }

        return res.status(200).json(jobs);
    }
    catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id)

        if(!job) {
            return res.status(404).json({
                message: `No job with ID: ${id}`
            });
        }

        return res.status(200).json(job);
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: error.message
        });
    }
}

const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, company, location, salary } = req.body;

        const updatedJob = await Job.findByIdAndUpdate(id, { title, company, location, salary }, { new: true });
        if(!updatedJob) {
            return res.status(404).json({
                message: `No job with ID: ${id}`
            });
        }

        return res.status(200).json({
            message: 'Job updated successfully',
            updatedJob
        });
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: error.message
        });
    }
}

const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedJob = await Job.findByIdAndDelete(id);

        if(!deletedJob) {
            return res.status(404).json({
                message: `No job with ID: ${id}`
            });
        }

        return res.status(200).json({
            message: 'Job deleted successfully',
            deletedJob
        });
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: error.message
        });
    }
}

const getJobsByLocation = async (req, res) => {
    try{
        const { location } = req.params;
        const jobs = await Job.find({
            location: {
                $regex: `^${location}$`,
                $options: 'i'
            }
        });

        if(jobs.length === 0) {
            return res.status(404).json({
                message: `No jobs in ${location}`
            });
        }

        return res.status(200).json(jobs);
    }
    catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const sortJobsBySalary = async (req, res) => {
    try {
        const sortedJobs = await Job.find().sort({
            salary: -1
        });

        if(sortedJobs.length === 0) {
            return res.status(404).json({
                message: 'There are no jobs'
            });
        }

        return res.status(200).json(sortedJobs);
    }
    catch(error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { addJob, getJobsAndSearchByTitle, getJobById, updateJob, deleteJob, getJobsByLocation, sortJobsBySalary }