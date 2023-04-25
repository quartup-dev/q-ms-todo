
// import ExtError from '../exceptions/ExtError';
import Task from '../models/task';


class TaskController {

    index = async (req, res) => {
        const genericPagination = require('./genericPagination');
        return genericPagination(req,res,Task)
    }
    show = async (req, res) => {
        try {
            const task = await Task.findById(req.params.id)
            if (!task) {
                throw new ExtError('not found' + req.params.id, 404)
            }
            return res.status(200).json(task);

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    update = async (req, res) => {
        //const ii = await Task.findOne().byKey('auth')
        try {
            const task = await Task.findById(req.params.id)
            if (!req.body.title) {
                return res.status(422).json({ 'error': 'title required' })

            }
            task.title = req.body.title
            task.description = req.body.description
            task.completed = req.body.completed

            task.save()
            return res.status(200).json(task);

        } catch (error) {
            return res.status(500).json({ message: error.message })

        }


    }
    store = async (req, res) => {
        //const ii = await Task.findOne().byKey('auth')
        try {

            const task = {
                title: req.body.title,


            }
            if (req.body.description) {
                task.description = req.body.description
            }
            await Task.create(task)




            return res.status(200).json({ 'task': task });

        } catch (error) {
            return res.status(500).json({ message: error.message })

        }


    }
}
export default new TaskController()
