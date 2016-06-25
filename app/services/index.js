module.exports = function(app, q) {
    require('./user')(app, q);
    require('./social')(app, q);
    require('./aes')(app, q);
    require('./checkSessionToken')(app, q);
    require('./session')(app, q);
};
