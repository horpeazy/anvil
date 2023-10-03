import { useState, useRef } from "react";
import Folder from "./Folder";
import useTraverseTree from "../../Hooks/use-traverse-tree";
import '../../Assets/Styles/filemanager.css';

function FileManager({setContent, explorer, depedencies, updateFolderTreeCallback, updateUpstreamServer}) {
  const explorerData = useRef(explorer)
  const [showSandboxInfo, setShowSandboxInfo] = useState(true);
  const [showDependencies, setShowDependencies] = useState(true);
  const [showFiles, setShowFiles] = useState(true);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (relativePath, item, isFolder) => {
    const finalTree = insertNode(explorerData.current, relativePath, item, isFolder);
    explorerData.current = finalTree;
    updateFolderTreeCallback(finalTree)
  };

  const handleShowSandbox = (e) => {
  	if(showSandboxInfo) {
  		e.target.style.rotate = '270deg';
  		setShowSandboxInfo(false);
  	} else {
  		e.target.style.rotate = '';
  		setShowSandboxInfo(true)
  	}
  }

  const handleShowFiles = (e) => {
  	if(showFiles) {
  		e.target.style.rotate = '270deg';
  		setShowFiles(false);
  	} else {
  		e.target.style.rotate = ''; 
  		setShowFiles(true)
  	}
  }

  const handleShowDependencies = (e) => {
  	if(showDependencies) {
  		e.target.style.rotate = '270deg';
  		setShowDependencies(false);
  	} else {
  		e.target.style.rotate = '';
  		setShowDependencies(true)
  	}
  }

  return (
    <div className="filemanager">
    	<div className="top-icons">
    		<button>
    			<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" ><path clip-rule="evenodd" d="M4.66675 1.83331C3.83832 1.83331 3.16675 2.50488 3.16675 3.33331V12.6666C3.16675 13.4951 3.83832 14.1666 4.66675 14.1666H11.3334C12.1618 14.1666 12.8334 13.4951 12.8334 12.6666V5.41419C12.8334 5.28158 12.7807 5.15441 12.687 5.06064L9.60609 1.97976C9.51232 1.88599 9.38514 1.83331 9.25253 1.83331H4.66675ZM2.16675 3.33331C2.16675 1.9526 3.28604 0.833313 4.66675 0.833313H9.25253C9.65036 0.833313 10.0319 0.991348 10.3132 1.27265L13.3941 4.35353C13.6754 4.63484 13.8334 5.01637 13.8334 5.41419V12.6666C13.8334 14.0474 12.7141 15.1666 11.3334 15.1666H4.66675C3.28604 15.1666 2.16675 14.0474 2.16675 12.6666V3.33331Z" fill="currentColor" fill-rule="evenodd"></path></svg>
    		</button>
    		<button>
    			<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" ><path clip-rule="evenodd" d="M6.83333 1.5C3.88781 1.5 1.5 3.88781 1.5 6.83333C1.5 9.77885 3.88781 12.1667 6.83333 12.1667C8.12611 12.1667 9.31145 11.7067 10.2346 10.9415L13.6466 14.3535C13.8419 14.5487 14.1585 14.5487 14.3537 14.3535C14.549 14.1582 14.549 13.8416 14.3537 13.6464L10.9417 10.2344C11.7068 9.31122 12.1667 8.12598 12.1667 6.83333C12.1667 3.88781 9.77885 1.5 6.83333 1.5ZM2.5 6.83333C2.5 4.4401 4.4401 2.5 6.83333 2.5C9.22657 2.5 11.1667 4.4401 11.1667 6.83333C11.1667 9.22657 9.22657 11.1667 6.83333 11.1667C4.4401 11.1667 2.5 9.22657 2.5 6.83333Z" fill="currentColor" fill-rule="evenodd"></path></svg>
    		</button>
    		<button>
    			<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" ><path clip-rule="evenodd" d="M8.49984 5.33341C8.49984 6.91207 7.34466 8.22092 5.8335 8.46078V14C5.8335 14.2761 5.60964 14.5 5.3335 14.5C5.05735 14.5 4.8335 14.2761 4.8335 14V8.46088C3.32201 8.22129 2.1665 6.9123 2.1665 5.33341C2.1665 3.58451 3.58427 2.16675 5.33317 2.16675C7.08207 2.16675 8.49984 3.58451 8.49984 5.33341ZM3.1665 5.33341C3.1665 4.1368 4.13655 3.16675 5.33317 3.16675C6.52979 3.16675 7.49984 4.1368 7.49984 5.33341C7.49984 6.52721 6.53436 7.4955 5.34163 7.50006L5.3335 7.5L5.32524 7.50007C4.13227 7.49579 3.1665 6.52739 3.1665 5.33341Z" fill="currentColor" fill-rule="evenodd"></path><path clip-rule="evenodd" d="M10.8335 8.20595C9.32201 8.44553 8.1665 9.75453 8.1665 11.3334C8.1665 13.0823 9.58427 14.5001 11.3332 14.5001C13.0821 14.5001 14.4998 13.0823 14.4998 11.3334C14.4998 9.75476 13.3447 8.44591 11.8335 8.20605V6.33325C11.8335 5.50482 11.1619 4.83325 10.3335 4.83325H9.3335C9.05735 4.83325 8.8335 5.05711 8.8335 5.33325C8.8335 5.60939 9.05735 5.83325 9.3335 5.83325H10.3335C10.6096 5.83325 10.8335 6.05711 10.8335 6.33325V8.20595ZM9.1665 11.3334C9.1665 10.1368 10.1366 9.16675 11.3332 9.16675C12.5298 9.16675 13.4998 10.1368 13.4998 11.3334C13.4998 12.53 12.5298 13.5001 11.3332 13.5001C10.1366 13.5001 9.1665 12.53 9.1665 11.3334Z" fill="currentColor" fill-rule="evenodd"></path></svg>
    		</button>
    	</div>
    	<div className="sanbox-info">
    		<div className="sanbox-info-header">
    			<div onClick={(e) => handleShowSandbox(e)}>
    				<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" ><path d="M11 7L8.07071 9.92929C8.03166 9.96834 7.96834 9.96834 7.92929 9.92929L5 7" stroke="currentColor" stroke-linecap="round"></path></svg>
    			</div>
    			<span style={{ display: 'block' }}>Codespace Info</span>
    		</div>
    		{ showSandboxInfo && <div className="sanbox-info-content">
    			<div>
    				<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" ><path d="M2.00358 7.99422C4.73736 3.49867 11.2627 3.49867 13.9965 7.99422C13.9987 7.99778 13.9987 8.00225 13.9965 8.00582C11.2627 12.5014 4.73736 12.5014 2.00358 8.00582C2.00141 8.00225 2.00141 7.99778 2.00358 7.99422Z" stroke="currentColor" stroke-linecap="round"></path><path d="M9.33338 8.00002C9.33338 8.7364 8.73643 9.33335 8.00005 9.33335C7.26367 9.33335 6.66672 8.7364 6.66672 8.00002C6.66672 7.26364 7.26367 6.66669 8.00005 6.66669C8.73643 6.66669 9.33338 7.26364 9.33338 8.00002Z" stroke="currentColor" stroke-linecap="round"></path></svg>
    				<span>0</span>
    			</div>
    			<div>
    				<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" ><path clip-rule="evenodd" d="M9.49951 2.99967C9.49951 1.80306 10.4696 0.833008 11.6662 0.833008C12.8628 0.833008 13.8328 1.80306 13.8328 2.99967C13.8328 4.02414 13.1218 4.88254 12.1663 5.10833V5.6665C12.1663 7.04722 11.0471 8.1665 9.66634 8.1665H6.33301C5.50458 8.1665 4.83301 8.83808 4.83301 9.6665V10.8911C5.78841 11.1169 6.49935 11.9753 6.49935 12.9997C6.49935 14.1963 5.5293 15.1663 4.33268 15.1663C3.13607 15.1663 2.16602 14.1963 2.16602 12.9997C2.16602 11.975 2.87728 11.1165 3.83301 10.8909V5.10844C2.87728 4.88284 2.16602 4.02432 2.16602 2.99967C2.16602 1.80306 3.13607 0.833008 4.33268 0.833008C5.5293 0.833008 6.49935 1.80306 6.49935 2.99967C6.49935 4.02409 5.78841 4.88245 4.83301 5.10829V7.66632C5.25084 7.35248 5.7702 7.1665 6.33301 7.1665H9.66634C10.4948 7.1665 11.1663 6.49493 11.1663 5.6665V5.1084C10.2107 4.88274 9.49951 4.02426 9.49951 2.99967ZM11.6662 1.83301C11.0218 1.83301 10.4995 2.35534 10.4995 2.99967C10.4995 3.64401 11.0218 4.16634 11.6662 4.16634C12.3105 4.16634 12.8328 3.64401 12.8328 2.99967C12.8328 2.35534 12.3105 1.83301 11.6662 1.83301ZM4.32215 11.8331C3.68267 11.8387 3.16602 12.3589 3.16602 12.9997C3.16602 13.644 3.68835 14.1663 4.33268 14.1663C4.97701 14.1663 5.49935 13.644 5.49935 12.9997C5.49935 12.359 4.98294 11.839 4.34367 11.8331L4.33301 11.8332M3.16602 2.99967C3.16602 2.35534 3.68835 1.83301 4.33268 1.83301C4.97701 1.83301 5.49935 2.35534 5.49935 2.99967C5.49935 3.64401 4.97701 4.16634 4.33268 4.16634C3.68835 4.16634 3.16602 3.64401 3.16602 2.99967Z" fill="currentColor" fill-rule="evenodd"></path></svg>
    				<span>0</span>
    			</div>
    			<div>
    				<span className="sandbox-img-wrapper"><img  src="https://avatars.githubusercontent.com/u/95689262?v=4" /></span>
    				<a href="https://codesandbox.io/u/horpeazy" target="_blank" >Iyamu Hope</a>
    			</div>
    		</div> }
    		<div className="sanbox-info-header">
    			<div onClick={(e) => handleShowFiles(e)}>
    				<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" ><path d="M11 7L8.07071 9.92929C8.03166 9.96834 7.96834 9.96834 7.92929 9.92929L5 7" stroke="currentColor" stroke-linecap="round"></path></svg>
    			</div>
    			<span style={{ display: 'block' }}>Files</span>
    		</div>
    	</div>
    	{ showFiles && 
    		<div className="filesmanager-wrapper">
    			<Folder 
    				handleInsertNode={handleInsertNode} 
    				explorer={explorerData.current} 
    				setContent={setContent} 
    				updateUpstreamServer={updateUpstreamServer}
    			/>
    		</div> 
    	}
    	<div className="sanbox-info-header">
			<div onClick={(e) => handleShowDependencies(e)}>
				<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" ><path d="M11 7L8.07071 9.92929C8.03166 9.96834 7.96834 9.96834 7.92929 9.92929L5 7" stroke="currentColor" stroke-linecap="round"></path></svg>
			</div>
			<span style={{ display: 'block' }}>Dependencies</span>
    	</div>
    	{ showDependencies && 
	    	<ul className="dependencies-list">
	    	  {
	    	   depedencies && depedencies.map((depedency) => {
	    	      return (<li>{depedency}</li>)
	    	    })
	    	  }
	    		
	    	</ul> 
	    }
    </div>
  );
}

export default FileManager;
