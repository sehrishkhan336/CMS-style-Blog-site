// function called withAuth
    function withAuth(req, res, next) {
        if (req.session.logged_in) {
            next()
        } else {
            res.redirect('/login');
        };
    };
// export function withAuth

module.exports = withAuth;