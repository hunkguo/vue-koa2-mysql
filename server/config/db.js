

const Sequelize = require('sequelize');

const Todolist = new Sequelize('mysql://root:ghlhj2891@127.0.0.1/vue_demo',{define: {
    timestamps: false
}
})

module.exports = {
    Todolist
}
