import React from "react";
import '../../Assets/Styles/register.css';
import Logo from '../../Assets/Images/logo.png';

function Register() {
	function createAccount() {
		alert("Account created");
	}
	return (
	    <section className="register-wrapper">
	    	<div className="register-box">
	    		<i className="fas fa-sync logo"></i>
	    		<div>
    		   		<h1>Create Account</h1>
    		   		<p className="register-cta">It's quick and easy</p>
    				<div className='register-btn-wrapper'>
    					<form className="register-form">
    						<div className="form-group">
								<input type="text" placeholder="First Name" />
    							<input type="text" placeholder="Last Name" />
    						</div>
    						<input type="email" placeholder="Email" />
    						<input type="password" placeholder="Password" />
    						<input type="password" placeholder="Re-type password" />
    						<button type="submit" onClick={() => createAccount()}>Register</button>
    					</form>
    					<div className="sign-in">Already have an account? <a href="/login">Sign In</a></div>
    				</div>
	    		</div>
	    		
	    		<p className='register-footer'>
	    			By continuing, you agree to CodeSync Pro <br /> <a href="">Terms Of Service</a>, <a href="">Privacy Policy</a>
	    		</p>
	    	</div>
	    </section>
	)
}

export default Register;