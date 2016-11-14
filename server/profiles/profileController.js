const Profile = require('./profileSchema.js');
const Tech = require('../tech/techSchema.js').Tech;
const Project = require('../projects/projectSchema.js');

module.exports = {
  createUser: (req, res, next) => {
    const userInfo = {
      url: req.body.url,
      name: req.body.name,
      type: 'member',
      email: req.body.email
    }

    Profile.create(userInfo)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(400);
      })
  },

  getProfile: (req, res, next) => {
    const id = req.params.profileId;

    Profile.findOne({
      where: {id: id},
      include:[{
        model: Tech,
        attributes: ['id', 'name'],
        through: {attributes: []}
      },
      {
        model: Profile,
        as: 'Member',
        attributes: ['id', 'name', 'url'],
        through: {attributes: []}
      },
      {
        model: Profile,
        as: 'Team',
        attributes: ['id', 'name', 'url'],
        through: {attributes: []}
      },
      {
        model: Project
      }]
    })
      .then((profile) => {
        res.json(profile);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  editUserInfo: (req, res, next) => {
    //Username needs to be changed to authId
    Profile.update(req.body, {where: {url: req.body.url}})
      .then((user, se) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  },

  createTeam: (req, res, next) => {
    const user = req.body.user;
    const team = req.body.team;
    const teamInfo = {
      name: req.body.name,
      url: team,
      email: req.body.email,
      type: 'team'
    }
    Profile.findOne({where: {url: user}})
      .then((user) => {
        user.createTeam(teamInfo)
          .then(() => {
            res.sendStatus(201);
          })
          .catch((err) => {
            res.sendStatus(404);
          });
      });
  },

  editTeamInfo: (req, res, next) => {
    const url = req.body.url;
    Profile.update({email: req.body.email}, {where: {url: url}})
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err)
        res.sendStatus(404);
      })
  },

  deleteTeam: (req, res,next) => {
    const url = req.body.url;
    Profile.destroy({where: {url: url}})
      .then(() => {
        res.sendStatus(200)
      })
      .catch(() => {
        res.sendStatus(404)
      })
  },

  addMember: (req, res, next) => {
    const team = req.body.team;
    const user = req.body.user;
    Profile.findOne({where: {url: user}})
      .then((user) => {
        Profile.findOne({where: {url: team}})
          .then((team) => {
            team.addMember(user)
              .then(() => {
                res.sendStatus(200);
              })
              .catch((err) => {
                res.sendStatus(400);
              });
          });
      });
  },

  removeMember: (req, res, next) => {
    const team = req.body.team;
    const user = req.body.user;
    Profile.findOne({where: {url: user}})
      .then((user) => {
        Profile.findOne({where: {url: team}})
          .then((team) => {
            team.removeMember(user)
              .then(() => {
                res.sendStatus(200);
              })
              .catch((err) => {
                res.sendStatus(400);
              });
          })
      })
  }
};