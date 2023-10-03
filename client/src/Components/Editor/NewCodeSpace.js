import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Splitter, { SplitDirection } from '@devbookhq/splitter';
import WebTerminal from './WebTerminal';
import withAuthentication from "../Auth/Auth";
import EditorLoading from "./EditorLoading";
import getCookie from "../../Utils/get-cookie";
import updateFolderTree from "../../Utils/update-tree";
import FileManager from './Filemanager.js';
import Editor from './Editor';
import '../../Assets/Styles/editor.css';

function Codespace({projectId}) {
	const [code, setCode] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const token = useRef(getCookie("token"));
	const projectData = useRef(null);
	const user = useRef(null);
	const activeFile = useRef(null);
	const folderTree = useRef(null);
	const saveRef = useRef(null);
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const template = searchParams.get("template");
	const language = searchParams.get("language");

	const setContent = (file) => {
		setCode(file.content);
		activeFile.current = file.relativePath;
	}
	
	const updateCode = (code) => {
	  setCode(code);
	  folderTree.current = updateFolderTree(folderTree.current, activeFile.current, code);
	}
	
	const updateFolderTreeCallback = (data) => {
	  folderTree.current = data;
	}
	
	const debouncedUpdateCode = useDebounce(updateCode, 100);
	
	const handleSetCode = (newCode) => {
    debouncedUpdateCode(newCode);
  };
	
	function useDebounce(func, delay) {
  	const timeoutRef = useRef(null);

  	const debouncedFunction = (...args) => {
    	clearTimeout(timeoutRef.current);
    	timeoutRef.current = setTimeout(() => {
    	  func(...args);
    	}, delay);
  	};

  	return debouncedFunction;
	}
	
	const handleSave = () => {
    setSaving(true);
	  fetch(`http://localhost:5000/api/v1/project/${projectId}`, {
	    method: "PUT",
	    headers: {
    		'Authorization': `Bearer ${token.current}`,
    		'Content-Type': 'application/json',
  		},
  		body: JSON.stringify({
  			...projectData.current, 
  			files: folderTree.current, 
  			file: {path: activeFile.current, content: code}
  		})
	  })
	  .then(response => {
	  	if(response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
      	window.location.href = "/login";
    	} else {
    	  throw new Error(response.status)
    	} 
	  })
	  .catch((err) => {
      console.error(err);
      alert("Error saving file")
    })
    .finally(() => {
      setSaving(false);
    })
	}
	
	const updateUpstreamServer = (path, isFolder) => {
	  let endpoint;
	  if(isFolder) {
	    endpoint = `http://localhost:5000/api/v1/project/${projectId}/folder`
	  } else {
	    endpoint = `http://localhost:5000/api/v1/project/${projectId}/file`
	  }
	  fetch(endpoint, {
	    method: "PUT",
	    headers: {
    		'Authorization': `Bearer ${token.current}`,
    		'Content-Type': 'application/json',
  		},
  		body: JSON.stringify({
  			...projectData.current, 
  			files: folderTree.current, 
  			file: {path}
  		})
	  })
	  .then(response => {
	  	if(response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
      	window.location.href = "/login";
    	} else {
    	  throw new Error(response.status)
    	} 
	  })
	  .catch((err) => {
      console.error(err);
      alert("Error saving on the server, please refresh page")
    })
    .finally(() => {
      setSaving(false);
    })
	}
	
	useEffect(() => {
    const token = getCookie("token");
    fetch("http://localhost:5000/api/v1/projects/", {
      method: "POST",
      headers: {
    		'Authorization': `Bearer ${token.current}`,
    		'Content-Type': 'application/json',
  		},
      body: JSON.stringify({language, template})
    })
    .then(response => {
      if(response.status === 201) {
        return response.json();
      } else if (response.status === 401) {
      	window.location.href = "/login";
    	} else {
    	  throw new Error(response.status)
    	}  
    })
    .then(data => {
      const { project, user: userData } = data;
      user.current = userData;
      folderTree.current = project.files
      projectData.current = project 
    })
    .catch((err) => {
      console.error(err);
      setError(true)
    })
    .finally(() => {
      setLoading(false);
    })
	}, [])

	const renderCodeSpace = () => {
	  if (loading) {
	    return  (<EditorLoading />)
	  } else if (error) {
	    return (<div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center"}}><h2>Oopss..An error occured</h2></div>)
	  } else {
	    return (
	    	<div className="editor-container">
			<div className="home-nav">
	      		<div className="logo-wrapper">
	      			<i className="fas fa-sync logo-icon"></i>
	      			<i className="fa fa-chevron-down chevron"></i>
	      		</div>
	      		<div className="nav-center">
	      			<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="c-jTwhQQ c-jTwhQQ-idWBbnv-css"><path d="M14 4.69998L8.01676 7.99562C8.00621 8.00143 7.99379 8.00143 7.98324 7.99562L2 4.69998M8 7.99998V14.6666M13.9897 11.3381L8.00838 14.6644C8.00311 14.6674 7.99689 14.6674 7.99162 14.6644L2.01033 11.3381C2.004 11.3346 2 11.3274 2 11.3195L2 4.70712C2 4.69929 2.00397 4.69212 2.01027 4.68859L7.99156 1.33554C7.99687 1.33257 8.00313 1.33257 8.00843 1.33554L13.9897 4.68859C13.996 4.69212 14 4.69929 14 4.70712V11.3195C14 11.3274 13.996 11.3346 13.9897 11.3381Z" stroke="currentColor" stroke-linejoin="round"></path></svg>
	      			<span>Personal / {projectData.current.name}</span>
	      		</div>
	      		<button className="create">
	      			<div  className="image-wrapper">
	      				<div role="button" data-state="closed" >
	      					<span >
	      						<img  src={user.profileImageurl} />
	      					</span>
	      				</div>
	      			</div>
	      			<button type="button" aria-disabled="false" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:ri:" data-state="closed" >
	      				<span >Share</span>
	      		  </button>
	      		</button>
      </div>

			<div className="split-container">
				 <Splitter 
				 	direction={SplitDirection.Horizontal} 
				 	initialSizes={[20, 58, 22]}
				 	minWidths={[20, 20, 20]}
				 >
					<FileManager 
					 setContent={setContent}
					 explorer={projectData.current.files}
					 depedencies={projectData.current.depedencies}
					 updateFolderTreeCallback={updateFolderTreeCallback}
					 updateUpstreamServer={updateUpstreamServer}
					/>
					<Splitter
						direction={SplitDirection.Vertical} 
						initialSizes={[65, 35]}
					>
						<div className="box-content">
								<div className="editor-wrapper-c">
									<Editor 
				        		language={projectData.current.language}
				        		value={code}
				        		onChange={handleSetCode}
				      		/>
				      		{activeFile.current && (
  									!saving ? (
    									<button className="code-save" ref={saveRef} onClick={handleSave}>
      									Save
    									</button>
  									) : (
    									<button className="code-save">Saving...</button>
  									)
									)}
				      	</div>
						</div>
						<div className="terminal-wrapper" >
							<div className="terminal"><WebTerminal /></div>
						</div>
					</Splitter>
					<div className="chatbox">
						<i class="fa fa-comments"></i>
					</div>
				</Splitter>
			</div>
		</div>)
	  }
	}
	
	return renderCodeSpace();
}

export default withAuthentication(Codespace);
