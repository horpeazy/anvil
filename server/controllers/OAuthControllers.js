const axios = require('axios');
const User = require('../models/User');
const {encryptData} = require('../utils');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI;
const gitlabClientId = process.env.GITLAB_CLIENT_ID;
const gitlabClientSecret = process.env.GITLAB_CLIENT_SECRET;
const gitlabRedirectUri = process.env.GITLAB_REDIRECT_URI;
const sessionSecret = process.env.SESSION_SECRET;


class AuthController {
  static async postGithub(req, res) {
  	try {
    	const { code } = req.body;

    	const response = await axios.post('https://github.com/login/oauth/access_token', {
      	code,
      	client_id: githubClientId,
      	client_secret: githubClientSecret,
    	}, {
      	headers: {
      	  Accept: 'application/json',
      	},
    	});

    	const { access_token } = response.data;

    	const githubResponse = await axios.get('https://api.github.com/user', {
      	headers: {
      	  Authorization: `token ${access_token}`,
      	},
    	});

    	const userData = githubResponse.data;
    	const { name, login: username, avatar_url: profileImageurl, id: profileId } = userData;

    	let user = await User.findOne({name, profileId})
    	if(!user) {
    		user = await User.create({name, username, profileImageurl, profileId})
    	}
    	const userId = user._id.toString() 
    	const token = jwt.sign({ userId }, sessionSecret, { expiresIn: '24h' });
    	return res.status(200).json({ token });
  	} catch (error) {
    	console.error('Github OAuth callback error:', error);
    	return res.status(500).json({ error: 'OAuth callback failed' });
  	}
  }
  
  static async postGoogle(req, res) {
    try {
      const { code } = req.body;

      const response = await axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: googleRedirectUri,
        grant_type: 'authorization_code',
      });

      const { access_token, id_token } = response.data;

      if (access_token) {
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const userData = userInfoResponse.data;
        const { name, given_name: username, picture: profileImageurl, id: profileId } = userData;

        let user = await User.findOne({ name, profileId });

        if (!user) {
          user = await User.create({ name, username, profileImageurl, profileId });
        }

        const userId = user._id.toString() 
    	  const token = jwt.sign({ userId }, sessionSecret, { expiresIn: '24h' });
    		return res.status(200).json({ token });
      }
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      return res.status(500).json({ error: 'OAuth callback failed' });
    }
  }
  
  static async postGitlab(req, res) {
    try {
      const { code } = req.body;

      const response = await axios.post('https://gitlab.com/oauth/token', {
        client_id: gitlabClientId,
        client_secret: gitlabClientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: gitlabRedirectUri,
      });

      const { access_token, id_token } = response.data;

      if (access_token) {
        const userInfoResponse = await axios.get('https://gitlab.com/api/v4/user', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const userData = userInfoResponse.data;
        const { name, username, avatar_url, id } = userData;

        let user = await User.findOne({ profileId: id });

        if (!user) {
          user = await User.create({ name, username, profileImageurl: avatar_url, profileId: id });
        }

        const userId = user._id.toString() 
    	  const token = jwt.sign({ userId }, sessionSecret, { expiresIn: '24h' });
    		return res.status(200).json({ token });
      }
    } catch (error) {
      console.error('GitLab OAuth callback error:', error);
      return res.status(500).json({ error: 'OAuth callback failed' });
    }
  }
}

module.exports = AuthController;
