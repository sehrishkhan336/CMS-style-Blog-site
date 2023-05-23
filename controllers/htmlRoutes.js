const router = require('express').Router();
// import the Blog model
const withAuth = require('../utils/Auth.js');
const { Blog, User } = require('../models');

router.get('/', async (req, res) => {

    try {
        // create variable (dbRes), that awaits the response of Blog . (get all data)
        const dbRes = await Blog.findAll();
        // const dishes = dishData.map((dish) => dish.get({ plain: true }));
        const blogs = dbRes.map((blog) => blog.get({ plain: true }));

        console.log(blogs);

        res.render('home', { blogs, logged_in: req.session.logged_in });
    }
    catch (err) {
        res.status(503).end();
    }
});


router.get('/blogs/:id', async (req, res) => {

    try {

        const dbRes = await Blog.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'email'],
                },
            ]
        });

        const blog = dbRes.get({ plain: true });
        blog.logged_in = req.session.logged_in;

        console.log(blog);

        res.render('blog', blog);
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
                { model: Blog }
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