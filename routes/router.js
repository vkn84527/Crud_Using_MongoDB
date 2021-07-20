const express = require('express')
const { Server } = require('mongodb')
const { db } = require('../models/userschema')
const router = express.Router()
const users = require('../models/userschema')


router.get('/', async (req, res) => {
    try {
        const results = await users.find()
        res.json(results)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const results = await users.findById(req.params.id)
        res.json(results)
    } catch (err) {
        res.send('Error ' + err)
    }
})


router.post('/', async (req, res) => {
    const results = new users({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })

    try {
        const results2 = await results.save()
        console.log("Data Added Successfully")
        res.json(results2)
    } catch (err) {
        console.log(err)
        res.send('Error')
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const results = await users.findById(req.params.id)
        results.phone = req.body.phone
        const results2 = await results.save()
        res.json(results2)
    } catch (err) {
        res.send('Error')
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const _id=req.params.id
        const results = await users.findByIdAndDelete({_id}) //deleteMany //deleteOne
        console.log(`Data ID :- ${_id} Deleted Successfully`)
        res.json(results)
    } catch (err) {
        console.log(err)
        res.send('Error')
    }

})

module.exports = router


