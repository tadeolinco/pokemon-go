exports.index = (req, res) => {
    res.sendFile('views/index.html', { root: __dirname + '/..' });
}

exports.login = (req, res) => {
    if (req.session && req.session.username) {
        res.redirect('/');
    } else {
        res.sendFile('views/login.html', { root: __dirname + '/..' });
    }
}

