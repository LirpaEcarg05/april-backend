const router = require('express').Router();
let User = require('../models/user.model');

// home
router.route('/').get((req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// add
router.route('/add').post((req, res) => {
    const fullname = req.body.fullname;
    const occupation = req.body.occupation;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;

    const newUser = new User({fullname, occupation, email, phonenumber});

    newUser.save()
        .then(user => res.json('New record added.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// details
router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// delete
router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => res.json('Record was deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// update
router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.fullname = req.body.fullname;
            user.occupation = req.body.occupation;
            user.email = req.body.email;
            user.phonenumber = req.body.phonenumber;

            user.save()
                .then(user => res.json("Record was updated."))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;