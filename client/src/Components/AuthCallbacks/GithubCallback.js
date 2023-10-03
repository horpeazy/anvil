import React, { useEffect } from 'react';
import Login from '../Login';
import axios from 'axios';

const GithubCallback = () => {
  useEffect(() => {
		const parseQueryString = (url) => {
  		const queryStart = url.indexOf('?') + 1;
  		const queryEnd = url.indexOf('#') !== -1 ? url.indexOf('#') : url.length;
  		const queryString = url.slice(queryStart, queryEnd);
  		const params = {};

  		queryString.split('&').forEach((param) => {
    	const keyValue = param.split('=');
    	const key = decodeURIComponent(keyValue[0]);
    	const value = decodeURIComponent(keyValue[1]);
    	params[key] = value;
  	});

  	return params;
	};

	const currentUrl = window.location.href;
	const queryParams = parseQueryString(currentUrl);
	const code = queryParams.code;

  if (code) {
  axios
    .post('http://localhost:5000/oauth/github/callback', {
      code,
    })
    .then((response) => {
    	if(response.status === 500) {
    		window.location.href = '/login';
    	} else {
    	  const {token} = response.data
        const cookieString = `token=${token};  path=/`;
    	  document.cookie = cookieString;
      	window.location.href = '/';
      }
    })
    .catch((error) => {
      console.error('Error exchanging code for session ID:', error);
      window.location.href = '/login';
    });
}

}, []);


  return (
    <Login active="github" />
  );
};

export default GithubCallback;

