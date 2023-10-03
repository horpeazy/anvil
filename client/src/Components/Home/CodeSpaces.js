import {useState, useEffect} from "react";
import getCookie from "../../Utils/get-cookie";
import Loading from "./Loading";
import Project from "./Project";

function CodeSpaces() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const token = getCookie("token");
    fetch('http://localhost:5000/api/v1/projects/', {
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
      		<h1>All codespaces</h1>
      		<ul style={{ marginBottom: "30px" }}>
	      		<button direction="vertical" className="new-codespace">
	      			<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" color="#999999" ><path d="M1.33333 7.49994C1.05719 7.49994 0.833328 7.7238 0.833328 7.99994C0.833328 8.27609 1.05719 8.49994 1.33333 8.49994V7.49994ZM14.6667 8.49994C14.9428 8.49994 15.1667 8.27609 15.1667 7.99994C15.1667 7.7238 14.9428 7.49994 14.6667 7.49994V8.49994ZM8.49993 1.33334C8.49993 1.0572 8.27607 0.833344 7.99993 0.833344C7.72379 0.833344 7.49993 1.0572 7.49993 1.33334H8.49993ZM7.49993 14.6667C7.49993 14.9428 7.72379 15.1667 7.99993 15.1667C8.27607 15.1667 8.49993 14.9428 8.49993 14.6667H7.49993ZM1.33333 8.49994H14.6667V7.49994H1.33333V8.49994ZM7.49993 1.33334V14.6667H8.49993V1.33334H7.49993Z" fill="currentColor"></path></svg>
	      			<div direction="vertical">
	      				<span color="#EBEBEB" size="13" >New Codespace</span>
	      			</div>
	      		</button>
      		</ul>
      		{ !data ? (<>{error ? (<h2 style={{ color: "red" }}>There was an error fetching your codespace.</h2>) : (<Loading />)}</>) :
      		(<>{data.length === 0 ? (<></>) : 
      			<ul>
      				{data.map(project => {
      					return (<Project 
      						_id={project._id} 
      						name={project.name} 
      						language={project.language} 
      						createdAt={project.createdAt} 
      					/> )
      				})}
      			</ul>
      		}</>)}
      		
      	</div>
	)
}

export default CodeSpaces;
