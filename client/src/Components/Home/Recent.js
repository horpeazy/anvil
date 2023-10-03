import React, {useState, useEffect} from "react";
import axios from "axios";
import Loading from "./Loading";
import Project from "./Project";
import getCookie from "../../Utils/get-cookie";
import NODEJS from '../../Assets/Images/nodejs.png';

function Recent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const token = getCookie("token");
    fetch('http://localhost:5000/api/v1/projects/recent', {
  		method: 'GET',
  		headers: {
    		'Authorization': `Bearer ${token}`
  		}
		})
  		.then(response => {
    		if (response.status === 200) {
    		  return response.json()
    		} else if (response.status === 401) {
      		window.location.href = "/login";
    		} else {
    		  throw new Error(response.status)
    		}
  		})
  		.then(data => {
  		  if (data.length > 0) {
      			setData(data);
    		} else {
      		setData([]);
    		}
  		})
  		.catch(err => {
    		console.error(err);
    		setError(true);
  		});
  }, []);
	return (
		<div className="home-content">
      			<h1>Recent</h1>
      			<div className="create-workspace">
      				<button><svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" css="[object Object]" aria-hidden="true"><path d="M14 4.7 8.017 7.997a.034.034 0 0 1-.034 0L2 4.701M8 8v6.666m5.99-3.328-5.982 3.326a.017.017 0 0 1-.016 0L2.01 11.34A.021.021 0 0 1 2 11.32V4.708c0-.008.004-.015.01-.019l5.982-3.353a.017.017 0 0 1 .016 0L13.99 4.69c.006.004.01.011.01.019v6.612a.021.021 0 0 1-.01.019Z" stroke="currentColor" stroke-linejoin="round"></path></svg> New sandbox</button>
      				<button ><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="sc-bdnylx eoHNwX"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.00004 1.33337C4.31671 1.33337 1.33337 4.39217 1.33337 8.16867C1.33337 11.1933 3.24171 13.748 5.89171 14.6537C6.22504 14.7135 6.35004 14.5084 6.35004 14.329C6.35004 14.1666 6.34171 13.6284 6.34171 13.0559C4.66671 13.372 4.23337 12.6372 4.10004 12.2528C4.02504 12.0562 3.70004 11.4496 3.41671 11.2873C3.18337 11.1591 2.85004 10.843 3.40837 10.8344C3.93337 10.8259 4.30837 11.33 4.43337 11.535C5.03337 12.5689 5.99171 12.2784 6.37504 12.099C6.43337 11.6547 6.60837 11.3556 6.80004 11.1847C5.31671 11.0139 3.76671 10.4243 3.76671 7.80981C3.76671 7.06648 4.02504 6.4513 4.45004 5.97283C4.38337 5.80195 4.15004 5.10133 4.51671 4.16148C4.51671 4.16148 5.07504 3.98205 6.35004 4.86209C6.88337 4.7083 7.45004 4.6314 8.01671 4.6314C8.58337 4.6314 9.15004 4.7083 9.68337 4.86209C10.9584 3.97351 11.5167 4.16148 11.5167 4.16148C11.8834 5.10133 11.65 5.80195 11.5834 5.97283C12.0084 6.4513 12.2667 7.05793 12.2667 7.80981C12.2667 10.4329 10.7084 11.0139 9.22504 11.1847C9.46671 11.3983 9.67504 11.8085 9.67504 12.4493C9.67504 13.3635 9.66671 14.0983 9.66671 14.329C9.66671 14.5084 9.79171 14.722 10.125 14.6537C11.4485 14.1956 12.5985 13.3235 13.4132 12.1602C14.228 10.9968 14.6664 9.60083 14.6667 8.16867C14.6667 4.39217 11.6834 1.33337 8.00004 1.33337Z" fill="currentColor"></path></svg> Import repository</button>
      				<button ><svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true" class="sc-bdnylx eoHNwX"><path fill="currentColor" fill-rule="evenodd" d="M2.2 12a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 0 0-3.6 0ZM4 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM10.2 12a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 0 0-3.6 0ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM6.2 4a1.8 1.8 0 1 0 3.6 0 1.8 1.8 0 0 0-3.6 0ZM8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" clip-rule="evenodd"></path></svg> Create pro workspace</button>
      			</div>
      			{ !data ? (<>{error ? (<h2 style={{ color: "red" }}>There was an error fetching your recent projects.</h2>) : (<Loading />)}</>) :
      				(<><h2>Pick up where you left off</h2>
      			<ul>
      				{data.map(project => {
      					return (<Project 
      						_id={project._id} 
      						name={project.name} 
      						language={project.language} 
      						createdAt={project.createdAt} 
      					/>)
      				})}
      			</ul>

      			<h2>Start from a template</h2>

      			<ul className="templates">
      					<li >
      					<button title="NodeJS" type="button" >
      						<div direction="vertical" className="template-vertical">
      							<div className="first">
      								<img src={NODEJS} alt="Node (TS)" width="20" height="20" />
      								<span aria-expanded="false">
      									<div>
      										<div className="svg-wrapper">
      											<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="12" height="12" aria-hidden="true" class="sc-bdnylx eoHNwX"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.15345 5.93342C3.70285 3.76838 5.66394 2.16669 8.00008 2.16669C10.7615 2.16669 13.0001 4.40526 13.0001 7.16669C13.0001 7.20148 12.9997 7.23619 12.999 7.27083C14.5848 7.51133 15.8001 8.88042 15.8001 10.5334C15.8001 12.3559 14.3226 13.8334 12.5001 13.8334H4.18341C1.96507 13.8334 0.166748 12.035 0.166748 9.81669C0.166748 7.95409 1.43409 6.3884 3.15345 5.93342ZM8.00008 3.16669C6.03852 3.16669 4.40581 4.57914 4.06537 6.44258L4.00276 6.78525L3.65963 6.84525C2.2433 7.0929 1.16675 8.32958 1.16675 9.81669C1.16675 11.4827 2.51736 12.8334 4.18341 12.8334H12.5001C13.7703 12.8334 14.8001 11.8036 14.8001 10.5334C14.8001 9.2631 13.7703 8.23335 12.5001 8.23335L12.4709 8.23353L11.897 8.24063L11.9686 7.67122C11.9894 7.50617 12.0001 7.3378 12.0001 7.16669C12.0001 4.95755 10.2092 3.16669 8.00008 3.16669Z" fill="currentColor"></path></svg>
      											<span size="12" class="sc-bdnylx sc-gtssRu gDXMLZ GRtQm">Cloud</span>
      										</div>
      									</div>
      								</span>
      							</div>
      							<div direction="vertical" className="second">
      								<span size="13" className="template-name">React (Vite + TS)</span>
      								<div >
      									<span size="2" className="span-wrapper">
      										<span >by </span>
      										Anvil
      									</span>
      								</div>
      							</div>
      						</div>
      					</button>
      				</li>

      			</ul>
      			</>)}
      			
      		</div>
	)
}

export default Recent;
