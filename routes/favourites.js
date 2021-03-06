const router = require("express").Router();
const { myFavourites, removeFavourite } = require('../helpers/database_helper'); 
const cookieSession = require('cookie-session');

module.exports = db => {
  
  router.get('/', function(req, res, next) {
  
    const userId = req.session.userId;
    console.log("reqbody!!", req.body)
    console.log("reqsess!!", req.session.userId)

    myFavourites(db, userId)
    .then(favourites => {
      //const favourite = {activityID: activity.id, userID: userId}
      console.log(favourites)
      // createFavourites(db, favourite)

      // console.log("reqbody: ", req.body) <-- activity without id
      // console.log("activity: ", activity) <-- activity with id
      
      // if (!user) {
      //   return res.status(400).json({
      //     status: 'error',
      //     error: 'req body cannot be empty',
      //   });
      // }
      return res.send(favourites);
    })
    .catch(e => {
      return res.send(e)
    });
  });

  // delete a favourite or update it??
  router.post('/', function(req, res, next) {
      const userID = req.session;
      const favouriteId = req.body.id
      console.log("req.bod", req.body.id)
      console.log("reqsess", req.session.userId)
      removeFavourite(db, favouriteId) 
      .then( () => {
        res.status(204).send("successfully delted!")
      })
    .catch(e => {
      return res.send(e)
    });
  })

  return router;
  
};