const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./htmlRoutes');

// import our html routes
router.use(htmlRoutes);
router.use('/api', apiRoutes);
// 'use' html routes, don't prepend anything


module.exports = router;
