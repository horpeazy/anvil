import {useState, useEffect} from "react";
import getCookie from "../../Utils/get-cookie";
import Loading from "./Loading";
import Project from "./Project";

function Drafts() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const token = getCookie("token");
    fetch('http://localhost:5000/api/v1/projects/drafts', {
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
			<h1 size="6">My dratfs</h1>
			
			{ !data ? (<>{error ? (<h2 style={{ color: "red" }}>There was an error fetching your drafts.</h2>) : (<Loading />)}</>) :
      		(<>{data.length === 0 ? (<p className="intro">Your drafts will appear here.</p>) : 
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

export default Drafts;
