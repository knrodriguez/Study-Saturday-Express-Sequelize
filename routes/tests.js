const router = require('express').Router();
const Student = require('../db/models/student');
const Test = require('../db/models/test');

router.get('/', async (req,res,next) => {
    try {
        const tests = await Test.findAll();
        res.send(tests);
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async (req,res,next) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if(!test) res.status(404).send('Test Not Found');
        else res.send(test);
    } catch (error) {
        next(error)
    }
})

router.post('/student/:studentId', async (req,res,next) => {
    try {
        const student = await Student.findByPk(req.params.studentId);
        const test = await Test.create(req.body);
        await test.setStudent(student);
        res.status(201).send(test)
        
        //Alternative Method
        // let test = await Test.create({
        //     ...req.body,
        //     studentId: req.params.studentId
        // })
        // res.status(201).send(test)
      } catch (err) {
        next(err)
      }
})

router.delete('/:id', async (req,res,next) => {
    try {
        await Test.destroy({where: {id: req.params.id}});
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
