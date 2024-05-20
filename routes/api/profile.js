//about profiles

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
// const User = require('../../models/User');
// const Post = require('../../models/Post');

//---------------------------------testing that these are work

// @route GET api/profile
// @desc Test route
// @access Public

// router.get('/', (req, res) => res.send('profile route'));

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id, //It searches for a profile document where the user field matches the authenticated user's ID (req.user.id).
    }).populate('user', ['name', 'avatar']); //This method is used to populate the user field of the profile document with data from the User collection. Instead of just the user ID, it retrieves the entire User document.

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  auth,
  check('status', 'Status is required').notEmpty(),
  check('skills', 'Skills is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
    //   ...rest
    } = req.body;

    //build the profile object
    const profileFields = {};
    profileFields.user=req.user.id;
    if(company) profileFields.company=company;
    if(website) profileFields.website=website;
    if(location) profileFields.location=location;
    if(bio) profileFields.bio=bio;
    if(status) profileFields.status=status;
    if(githubusername) profileFields.githubusername=githubusername;
    if(skills){
        profileFields.skills=skills.split(',').map(skill=>skill.trim());
    } 

//build social object
profileFields.social={};

if (youtube) profileFields.youtube = youtube;
if (twitter) profileFields.twitter = twitter;
if (facebook) profileFields.facebook = facebook;
if (linkedin) profileFields.linkedin = linkedin;
if (instagram) profileFields.instagram = instagram;

try{
    let profile= await Profile.findOne({user:req.user.id});

    if(profile){
        //update
        let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

       return res.json(profile);
    }
    //create
    profile = new Profile(profileFields);
     
    await profile.save();
    res.json(profile);

}catch(err){
console.error(err.message);
res.status(500).send("Server error");
}
    // build a profile
    // const profileFields = {
    //   user: req.user.id,
    //   website:
    //     website && website !== ''
    //       ? normalize(website, { forceHttps: true })
    //       : '',
    //   skills: Array.isArray(skills)
    //     ? skills
    //     : skills.split(',').map((skill) => ' ' + skill.trim()),
    //   ...rest
    // };

    // Build socialFields object
    // const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    // for (const [key, value] of Object.entries(socialFields)) {
    //   if (value && value.length > 0)
    //     socialFields[key] = normalize(value, { forceHttps: true });
    // }
    // add to profileFields
    // profileFields.social = socialFields;
   
  }
);

module.exports = router;