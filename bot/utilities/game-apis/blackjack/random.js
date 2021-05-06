function rand(min, max) {
    max = max + 1;
    max -= min;
    var rnd = Math.floor(Math.random() * max) + min;
    return rnd;
}

module.exports = {
    num: rand
}
