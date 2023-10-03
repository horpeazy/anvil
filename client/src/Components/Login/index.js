import React, {useState} from 'react';
import '../../Assets/Styles/login.css';
import Loading from './Loading';
import Logo from '../../Assets/Images/logo.png';

function Login({active}) {
	const [useEmail, setUseEmail] = useState(false);
	
	const githubClientId = '2e944c962e7fa8117455'; 
  const githubRedirectUri = 'http://localhost:3000/login/github/cb';
  const githubScope = 'user';
  
  const googleClientId = '383421579436-g85020v5ebf80b21j6a0daffd48g13t1.apps.googleusercontent.com';
  const googleRedirectUri = 'http://localhost:3000/login/google/cb';
  const googleScope = 'profile email';
  
  const gitlabClientId = '53c7cd28746583e2a7628eb4d7008f0df206b8cc3c30f7b31fde082dd755860b';
  const gitlabScope = 'read_user';
  const gitlabRedirectUri = 'http://localhost:3000/login/gitlab/cb';

  
  const handleGithubOAuth = () => {
  	const githubUrl = 'https://github.com/login/oauth/authorize'
		const githubOAuthUrl = `
			${githubUrl}?client_id=${githubClientId}&scope=${githubScope}&redirect_uri=${githubRedirectUri}
		`;
  	window.location.href = githubOAuthUrl;
	};

	const handleGoogleOAuth = () => {
  	const googleUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  	const googleOAuthUrl = `
  		${googleUrl}?client_id=${googleClientId}&scope=${googleScope}&redirect_uri=${googleRedirectUri}&response_type=code
  	`;
  	window.location.href = googleOAuthUrl;
  };
  
  const handleGitlabOAuth = () => {
  	const gitlabUrl = 'https://gitlab.com/oauth/authorize';
 		const gitlabOAuthUrl = `
    	${gitlabUrl}?client_id=${gitlabClientId}&scope=${gitlabScope}&redirect_uri=${gitlabRedirectUri}&response_type=code
  	`;
  	window.location.href = gitlabOAuthUrl;
};



  
	function submitForm() {
		alert("form submitted");
	}
	return (
    <section className="login-wrapper">
    	<div className="login-box">
    		<i className="fas fa-sync logo"></i>
    		{useEmail ? 
    		   <div>
    		   		<h1>Sign in with Email</h1>
    				<div className='login-btn-wrapper'>
    					<form className="login-form">
    						<input type="email" placeholder="Email" />
    						<input type="password" placeholder="Password" />
    						<button type="submit" onClick={() => submitForm()}>Sign In</button>
    					</form>
    					<div className="create-account">Don't have an account? <a href="/register">Create Account</a></div>
    				</div>
    				<button className='alt-login' onClick={() => setUseEmail(!useEmail)}>
    					Not Email? Sign in
    				</button>
    			</div> 
    			:
    		  	<div>
    		  		<h1>Sign in to <br /> Anvil</h1>
    		  		<p>Login or register to start building your projects today.</p>
    				<div className='login-btn-wrapper'>
    			    
    					{ active === "github" ? 
    			    	<button className="github-btn" onClick={handleGithubOAuth}>
    							<Loading />
    						</button> :
    						<button className="github-btn" onClick={handleGithubOAuth}>
    							<i className="fab fa-github"></i>Sign in with GitHub	
    						</button> 
    					}
    					<div class="login-flex-btn">
    					{ active === "google" ? 
    						<button onClick={handleGoogleOAuth}>
    						 <Loading />
    						</button> :
    			    	<button onClick={handleGoogleOAuth}>
    							<i className="fab fa-google"></i>Sign in with Google
    						</button>
    					}
    					{ active === "gitlab" ? 
    						<button onClick={handleGitlabOAuth}>
    							<Loading />
    						</button> :
    			    	<button onClick={handleGitlabOAuth}>
    							<i className="fab fa-gitlab"></i>Sign in with GitLab
    						</button>
    					}
    					</div>
    				</div>
    				<button className='alt-login' onClick={() => setUseEmail(!useEmail)}>
    					Sign in with Email
    				</button>
    		  	</div> 
    		}
    		
    		<p className='login-footer'>
    			By continuing, you agree to CodeSync Pro <br /> <a href="">Terms Of Service</a>, <a href="">Privacy Policy</a>
    		</p>
    	</div>
    </section>
	)
}

export default Login;
