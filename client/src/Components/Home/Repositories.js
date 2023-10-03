import React from "react";
import Loading from "./Loading";
import NODEJS from '../../Assets/Images/nodejs.png';

function Repositories() {
	return (
		<div className="home-content">
			<div className="contributions">
				<span size="6" className="contributions-title">All Repositories</span>
				<div >
					<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="12" height="12" aria-hidden="true" ><path fill-rule="evenodd" clip-rule="evenodd" d="M3.15345 5.93342C3.70285 3.76838 5.66394 2.16669 8.00008 2.16669C10.7615 2.16669 13.0001 4.40526 13.0001 7.16669C13.0001 7.20148 12.9997 7.23619 12.999 7.27083C14.5848 7.51133 15.8001 8.88042 15.8001 10.5334C15.8001 12.3559 14.3226 13.8334 12.5001 13.8334H4.18341C1.96507 13.8334 0.166748 12.035 0.166748 9.81669C0.166748 7.95409 1.43409 6.3884 3.15345 5.93342ZM8.00008 3.16669C6.03852 3.16669 4.40581 4.57914 4.06537 6.44258L4.00276 6.78525L3.65963 6.84525C2.2433 7.0929 1.16675 8.32958 1.16675 9.81669C1.16675 11.4827 2.51736 12.8334 4.18341 12.8334H12.5001C13.7703 12.8334 14.8001 11.8036 14.8001 10.5334C14.8001 9.2631 13.7703 8.23335 12.5001 8.23335L12.4709 8.23353L11.897 8.24063L11.9686 7.67122C11.9894 7.50617 12.0001 7.3378 12.0001 7.16669C12.0001 4.95755 10.2092 3.16669 8.00008 3.16669Z" fill="currentColor"></path></svg>
					<span size="12" >Cloud</span>
				</div>
			</div>
			<p className="intro">
			   Save hours every week by shortening the review cycle and empowering everyone to contribute.<br />
			   Every branch in Repositories is connected to git and has its own sandbox running in a fast microVM.
			</p>
			
		</div>
	)
}

export default Repositories;
