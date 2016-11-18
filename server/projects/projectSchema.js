const Sequelize = require('sequelize');
const db = new Sequelize('sushi', 'root', '');

const Project = db.define('Project', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT('long'),
    allowNull: false
  },
  views: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  thumbnail: {
    type: Sequelize.STRING,
    defaultValue: './client/app/assets/thumbnail.png'
  },
  deploy: Sequelize.STRING,
  github: Sequelize.STRING,
  contribute: Sequelize.BOOLEAN,
  progress: {
    type: Sequelize.ENUM,
    values: ['Completed', 'In Progress', 'Abandonded']
  }
});

module.exports = Project;