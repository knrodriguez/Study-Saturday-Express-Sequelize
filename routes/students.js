const router = require('express').Router();
const { render } = require('../app');
const Student = require('../db/models/student');

router.get('/', async (req,res,next) => {
    try {
        const students = await Student.findAll();
        res.send(students);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req,res,next) => {
    try {
        const student = await Student.create(req.body)
        res.status(201).send(student);
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req,res,next) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if(!student){
            res.status(404).send('Student Not Found')
        } else {
            res.send(student);
        }
    } catch (error) {
        next(error);
    }
})

router.put('/:id', async (req,res,next) => {
    try {
        const updatedStudentInfo = await Student.update(req.body,{
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        })
        if(updatedStudentInfo[1]){
            res.send(updatedStudentInfo[1])
        } else{
            res.status(404).send('Student Not Found')
        }
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req,res,next) => {
    try {
        await Student.destroy({
            where: {id: req.params.id}})
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
})

module.exports = router;
