const express = require('express');
const router = express.Router();
// const imagesCtrl = require('../../controllers/imageCtrl');
const ImageModel = require('../../models/imageModel');

/*---------- Public Routes ----------*/

// router.get('/seeding_images', async function(req,res) {
//     try {
//         await ImageModel.create({
//             url: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/12/Demon-Slayer-2.jpg'
//         })
//         await ImageModel.create({
//             url: 'https://i1.wp.com/butwhythopodcast.com/wp-content/uploads/2020/10/68D0F955-29C3-4EAB-A8C2-E51792460759.jpeg?fit=800%2C447&ssl=1'
//         })
//         await ImageModel.create({
//             url: 'http://games.torrentsnack.com/wp-content/uploads/2016/04/Attack-on-Titan-PS4.jpg'
//         })
//     } catch(error) {
//         res.json({error: 'error'})
//     }
// })

router.get('/allImage', async function(req,res) {
    try {
        let images = await ImageModel.find({})
        res.json(images)
    } catch(err) {
        res.json({error: err})
    }
})
router.get('/allImage/:id', function(req,res) {
  ImageModel.findById(req.params.id).then(function(image) {
    res.status(200).json(image);
  }).catch(function(err) {
    res.status(400).json(err);
  });
})

/*---------- Protected Routes ----------*/




module.exports = router;