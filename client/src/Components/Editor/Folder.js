import { useState } from "react";
import ContextMenu from './Contextmenu';

function Folder({ handleInsertNode = () => {}, explorer, setContent, updateUpstreamServer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false
  });
  const [menuPosition, setMenuPosition] = useState({x: 0, y: 0})
  const [display, setDisplay] = useState('none');
  const handleContextMenu = (e) => {
    e.preventDefault();
    const menus = document.querySelectorAll('.context-menu');
    menus.forEach(menu => {
      if(menu.style.display === 'block') {
        menu.style.display = 'none'
      }
    })
    const clientX = e.clientX;
    const clientY = e.clientY;
    setMenuPosition({x: clientX, y: clientY});
    
    setDisplay('block');
  }

  const handleCloseMenu = () => {
    setDisplay('none');
  }

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    const menus = document.querySelectorAll('.context-menu');
    menus.forEach(menu => {
      if(menu.style.display === 'block') {
        menu.style.display = 'none'
      }
    })
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(`${explorer.relativePath}/${e.target.value}`, e.target.value, showInput.isFolder);
      updateUpstreamServer(`${explorer.relativePath}/${e.target.value}`, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  window.addEventListener('click', (e) => {
    if(!e.target.classList.contains("context-menu")) {
      handleCloseMenu();
    }
  })


  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div onClick={() => setExpand(!expand)} onContextMenu={handleContextMenu} className="folder">
          <span><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="c-jTwhQQ c-jTwhQQ-idWBbnv-css"><path d="M12.5 13.25H3.5C2.67157 13.25 2 12.5784 2 11.75V5C2 4.17157 2.67157 3.5 3.5 3.5H5.29584C5.59197 3.5 5.88149 3.58766 6.12789 3.75192L7.62211 4.74808C7.86851 4.91234 8.15803 5 8.45416 5H12.5C13.3284 5 14 5.67157 14 6.5V11.75C14 12.5784 13.3284 13.25 12.5 13.25Z" fill="currentColor" stroke="currentColor" stroke-linecap="round"></path></svg> <span>{explorer.name}</span></span>

          <ContextMenu 
           x={menuPosition.x} 
           y={menuPosition.y} 
           handleNewFolder={handleNewFolder}
           display={display}
          />
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
           <span>{showInput.isFolder? 
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="c-jTwhQQ c-jTwhQQ-idWBbnv-css"><path d="M12.5 13.25H3.5C2.67157 13.25 2 12.5784 2 11.75V5C2 4.17157 2.67157 3.5 3.5 3.5H5.29584C5.59197 3.5 5.88149 3.58766 6.12789 3.75192L7.62211 4.74808C7.86851 4.91234 8.15803 5 8.45416 5H12.5C13.3284 5 14 5.67157 14 6.5V11.75C14 12.5784 13.3284 13.25 12.5 13.25Z" fill="currentColor" stroke="currentColor" stroke-linecap="round"></path></svg> : 
           <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="c-jTwhQQ c-jTwhQQ-idWBbnv-css"><path clip-rule="evenodd" d="M4 4.25C4 3.69772 4.44772 3.25 5 3.25H8.25009V6.4C8.25009 6.73137 8.51872 7 8.85009 7H12V12.5C12 13.0523 11.5523 13.5 11 13.5H5C4.44772 13.5 4 13.0523 4 12.5V4.25ZM13 6.50967C13.0001 6.50645 13.0001 6.50323 13.0001 6.5C13.0001 6.49677 13.0001 6.49355 13 6.49033V6.37132C13 5.84089 12.7893 5.33218 12.4142 4.95711L10.2929 2.83579C9.91782 2.46071 9.40911 2.25 8.87868 2.25H8.75009H5C3.89543 2.25 3 3.14543 3 4.25V12.5C3 13.6046 3.89543 14.5 5 14.5H11C12.1046 14.5 13 13.6046 13 12.5V6.50967ZM9.25009 3.32153C9.37464 3.37135 9.48909 3.4462 9.58579 3.54289L11.7071 5.66421C11.8038 5.76093 11.8787 5.87542 11.9285 6H9.25009V3.32153Z" fill="currentColor" fill-rule="evenodd"></path></svg>}</span> 
           <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onKeyDown={onAddFolder}
              onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
              </div>
          )}

          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                key={exp.id}
                explorer={exp}
                setContent={setContent}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file" onClick={() => setContent(explorer)}><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" ><path clip-rule="evenodd" d="M4 4.25C4 3.69772 4.44772 3.25 5 3.25H8.25009V6.4C8.25009 6.73137 8.51872 7 8.85009 7H12V12.5C12 13.0523 11.5523 13.5 11 13.5H5C4.44772 13.5 4 13.0523 4 12.5V4.25ZM13 6.50967C13.0001 6.50645 13.0001 6.50323 13.0001 6.5C13.0001 6.49677 13.0001 6.49355 13 6.49033V6.37132C13 5.84089 12.7893 5.33218 12.4142 4.95711L10.2929 2.83579C9.91782 2.46071 9.40911 2.25 8.87868 2.25H8.75009H5C3.89543 2.25 3 3.14543 3 4.25V12.5C3 13.6046 3.89543 14.5 5 14.5H11C12.1046 14.5 13 13.6046 13 12.5V6.50967ZM9.25009 3.32153C9.37464 3.37135 9.48909 3.4462 9.58579 3.54289L11.7071 5.66421C11.8038 5.76093 11.8787 5.87542 11.9285 6H9.25009V3.32153Z" fill="currentColor" fill-rule="evenodd"></path></svg><span> {explorer.name}</span></span>
  }
}

export default Folder;
