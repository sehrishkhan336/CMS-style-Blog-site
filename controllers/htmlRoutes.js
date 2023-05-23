const router = require('express').Router();
// import the Project model
const withAuth = require('../utils/Auth.js');
const { Project, User } = require('../models');

router.get('/', async (req, res) => {

    try {
        // create variable (dbRes), that awaits the response of Project . (get all data)
        const dbRes = await Project.findAll();
        // const dishes = dishData.map((dish) => dish.get({ plain: true }));
        const projects = dbRes.map((project) => project.get({ plain: true }));

        console.log(projects);

        res.render('home', { projects, logged_in: req.session.logged_in });
    }
    catch (err) {
        res.status(503).end();
    }
});


router.get('/projects/:id', async (req, res) => {

    try {

        const dbRes = await Project.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'email'],
                },
            ]
        });

        const project = dbRes.get({ plain: true });
        project.logged_in = req.session.logged_in;

        console.log(project);

        res.render('project', project);
    }
    catch (err) {
        res.status(503).end();
    }
});

// add route to render login view
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/profile', withAuth, async (req, res) => {
    const dbRes = await User.findByPk(req.session.user_id,
        {
            include: [
                { model: Project }
            ]
        }
    );

    if (!dbRes) {
        return res.redirect('/login');
    }

    // serialize data line 37
    const user = dbRes.get({ plain: true });
    user.logged_in = req.session.logged_in;
    // pass that data to profile

    res.render('profile', user);
});


module.exports = router;