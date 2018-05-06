const express = require('express');
const circles = require('./models/circles');
const router = express.Router();

router.get('/', (req, res, next) => {
    circles.getAllCircles((data)=>{
        res.json(data);
    })
});

router.put('/', (req, res, next) => {
    circles.UpdateCircle( req.body, (data) => {
        res.json(data);
    });
});

router.post('/', (req, res, next) => {
    circles.SaveCircle( req.body, (data) => {
        res.json(data);
    });
});

router.delete('/:id', (req, res, next) => {
    circles.DeleteCircle(req.params.id, (data) => {
        res.json(data);
    });
});

module.exports = router;