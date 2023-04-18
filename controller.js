const Joi = require('joi');

const tasks = [
    { id: 1, Name: 'sensor_check', Completed: true, Due_date: Date(Date.now().toString()), Description: 'critical for the accuracy' },
    { id: 2, Name: 'update_software', Completed: false, Due_date: new Date(2029, 5, 24, 11, 33, 0), Description: 'new version needed' },
];


//get all tasks
const get1 = ('/tasks', (_req, res) => {
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].Due_date = new Date(tasks[i].Due_date);
    }
    res.json(tasks).end();
});

//get tasks according to their names
const get2 = ('/tasks/:id', (req, res) => {
    let task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ msg: 'The task with the given id is not found.' });
    res.json(task).end();
});

function validateTask(task) {
    const schema = {
        Name: Joi.string().max(40).required(),
        Due_date: Joi.date().min('3-5-2023').required(),
        Completed: Joi.boolean().required(),
        Description: Joi.string().max(200).required()
    };
    return Joi.validate(task, schema);
}


//add a new task after checking
const post = ('/tasks', (req, res) => {
    const { error } = validateTask(req.body);
    if (error) {
        return res.status(400).json({
            msg: error.details[0].message
        }).end();
    }

    const task = {
        id: tasks.length + 1,
        Name: req.body.Name,
        Completed: req.body.Completed,
        Due_date: req.body.Due_date,
        Description: req.body.Description
    };
    tasks.push(task);
    res.json(task).end();
});

//update a task
const put = ('/tasks/:id', (req, res) => {
    let task = tasks.find(b => b.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ msg: 'The task with the given ID not found.' });

    const { error } = validateTask(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message }).end();

    task.Name = req.body.Name;
    task.Completed = req.body.Completed;
    task.Due_date = req.body.Due_date;
    task.Description = req.body.Description;
    res.json(task).end();
});

//delete a task
const delete_task = ('/tasks/:id', (req, res) => {
    let task = tasks.find(b => b.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ msg: 'The task with the given ID is not found.' });

    const index = tasks.indexOf(task);
    tasks.splice(index, 1);

    res.json(task).end();
});

module.exports = {
    get1,
    get2,
    post,
    put,
    delete_task
};