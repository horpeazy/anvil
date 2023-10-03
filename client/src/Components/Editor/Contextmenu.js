import React from 'react';
import '../../Assets/Styles/contextmenu.css';

function ContextMenu({x, y, handleNewFolder, display }) {
	return (
		<div className="context-menu" style={{ left: `${x+10}px`, top: `${y+10}px`, display }}>
            <ul>
              <li onClick={(e) => handleNewFolder(e, false)}>New File</li>
              <li onClick={(e) => handleNewFolder(e, true)}>New Folder...</li>
            </ul>
         </div>
	)
}

export default ContextMenu;