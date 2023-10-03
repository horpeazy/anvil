import React , { useState } from "react";

function Sidebar({ onOptionClick }) {
	const [index, setIndex] = useState(1);
	const handleClick = (value, option) => {
		setIndex(value)
		onOptionClick(option);
	}
	return (
		<div className="home-sidebar">
      			<h3>horpeazy</h3>
      			<div className="aside">
	      			<div className="sidebar-group">
		      			<ul>
		      				<li className={index === 1 ? 'active' : ''} onClick={() => handleClick(1, 'recent')}>
		      					<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M1.84998 8.00012C1.84998 4.60349 4.60349 1.84998 8.00012 1.84998C11.3967 1.84998 14.1503 4.60349 14.1503 8.00012C14.1503 11.3967 11.3967 14.1503 8.00012 14.1503C4.60349 14.1503 1.84998 11.3967 1.84998 8.00012ZM8.00012 0.849976C4.0512 0.849976 0.849976 4.0512 0.849976 8.00012C0.849976 11.949 4.0512 15.1503 8.00012 15.1503C11.949 15.1503 15.1503 11.949 15.1503 8.00012C15.1503 4.0512 11.949 0.849976 8.00012 0.849976ZM8.50002 4.66668C8.50002 4.39054 8.27616 4.16668 8.00002 4.16668C7.72388 4.16668 7.50002 4.39054 7.50002 4.66668V8.00001V8.20712L7.64647 8.35357L9.9798 10.6869C10.1751 10.8822 10.4916 10.8822 10.6869 10.6869C10.8822 10.4916 10.8822 10.1751 10.6869 9.97979L8.50002 7.7929V4.66668Z" fill="currentColor"></path></svg>
		      					<span>Recent</span>
		      				</li>
		      				<li className={index === 2 ? 'active' : ''}  onClick={() => handleClick(2, 'shared')}>
		      					<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.28235 2.34219C8.63551 2.12522 9.05174 2 9.4974 2C10.7756 2 11.8118 3.03004 11.8118 4.30065C11.8118 4.91332 11.5709 5.47006 11.1781 5.88235M2 14C2 11.6609 3.89621 9.76471 6.23529 9.76471C8.57438 9.76471 10.4706 11.6609 10.4706 14M9.76471 7.64706C12.1038 7.64706 14 9.54327 14 11.8824M8.28235 5.88235C8.28235 7.24682 7.17623 8.35294 5.81176 8.35294C4.4473 8.35294 3.34118 7.24682 3.34118 5.88235C3.34118 4.51789 4.4473 3.41177 5.81176 3.41177C7.17623 3.41177 8.28235 4.51789 8.28235 5.88235Z" stroke="currentColor" fillOpacity="0" strokeLinecap="round"></path></svg>
		      					<span>Shared with me</span>
		      				</li>
		      			</ul>
	      			</div>
	      			<div className="sidebar-group">
		      			<p>Repositories</p>
		      			<ul>
		      				<li className={index === 3 ? 'active' : ''}  onClick={() => handleClick(3, 'contributions')}>
		      					<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true" ><path d="M8.525 11.5H11.5C12.4917 11.5 13.3229 11.1646 13.9937 10.4938C14.6646 9.82292 15 8.99167 15 8C15 7.00833 14.6646 6.17708 13.9937 5.50625C13.3229 4.83542 12.4917 4.5 11.5 4.5H8.525V5.55H11.5C12.2 5.55 12.7833 5.78333 13.25 6.25C13.7167 6.71667 13.95 7.3 13.95 8C13.95 8.7 13.7167 9.28333 13.25 9.75C12.7833 10.2167 12.2 10.45 11.5 10.45H8.525V11.5ZM10.7125 8.525V7.475H5.2875V8.525H10.7125ZM7.475 11.5V10.45H4.5C3.8 10.45 3.21667 10.2167 2.75 9.75C2.28333 9.28333 2.05 8.7 2.05 8C2.05 7.3 2.28333 6.71667 2.75 6.25C3.21667 5.78333 3.8 5.55 4.5 5.55H7.475V4.5H4.5C3.50833 4.5 2.67708 4.83542 2.00625 5.50625C1.33542 6.17708 1 7.00833 1 8C1 8.99167 1.33542 9.82292 2.00625 10.4938C2.67708 11.1646 3.50833 11.5 4.5 11.5H7.475Z" fill="currentColor"></path></svg>
		      					<span>My contributions</span>
		      				</li>
		      				<li className={index === 4 ? 'active' : ''}  onClick={() => handleClick(4, 'respositories')}>
		      					<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M4.16675 0.833344C3.06218 0.833344 2.16675 1.72877 2.16675 2.83334V13.1667C2.16675 14.2712 3.06218 15.1667 4.16675 15.1667H11.8334C12.938 15.1667 13.8334 14.2712 13.8334 13.1667V2.83334C13.8334 1.72877 12.938 0.833344 11.8334 0.833344H4.16675ZM3.16675 2.83334C3.16675 2.28106 3.61446 1.83334 4.16675 1.83334H7.93335V6.76668L9.60002 5.76668L11.2667 6.76668V1.83334H11.8334C12.3857 1.83334 12.8334 2.28106 12.8334 2.83334V13.1667C12.8334 13.719 12.3857 14.1667 11.8334 14.1667H4.16675C3.61446 14.1667 3.16675 13.719 3.16675 13.1667V2.83334Z" fill="currentColor"></path></svg>
		      					<span>All respositories</span>
		      				</li>
		      			</ul>
	      			</div>
	      			<div className="sidebar-group">
	      				<p>Codespaces</p>
	      				<ul>
	      					<li className={index === 5 ? 'active' : ''}  onClick={() => handleClick(5, 'drafts')}>
	      						<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true"><path d="M13.3334 5.66665H9.10002C9.04479 5.66665 9.00002 5.62187 9.00002 5.56665V1.33331M9.17117 1.33331H4.66669C3.56212 1.33331 2.66669 2.22874 2.66669 3.33331V12.6666C2.66669 13.7712 3.56212 14.6666 4.66669 14.6666H11.3334C12.4379 14.6666 13.3334 13.7712 13.3334 12.6666V5.49704C13.3334 4.96686 13.1228 4.45837 12.7481 4.08333L10.5859 1.91961C10.2108 1.54422 9.70185 1.33331 9.17117 1.33331Z" stroke="currentColor" fillOpacity="0" strokeLinecap="round"></path></svg>
	      						<span>My drafts</span>
	      					</li>
	      					<li className={index === 6 ? 'active' : ''}  onClick={(e) => handleClick(6, 'codespaces')}>
	      						<svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" css="[object Object]" aria-hidden="true"><path d="M14 4.7 8.017 7.997a.034.034 0 0 1-.034 0L2 4.701M8 8v6.666m5.99-3.328-5.982 3.326a.017.017 0 0 1-.016 0L2.01 11.34A.021.021 0 0 1 2 11.32V4.708c0-.008.004-.015.01-.019l5.982-3.353a.017.017 0 0 1 .016 0L13.99 4.69c.006.004.01.011.01.019v6.612a.021.021 0 0 1-.01.019Z" stroke="currentColor" strokeLinejoin="round"></path></svg>
	      						<span>All codespaces</span>
	      					</li>
	      					<li className={index === 7 ? 'active' : ''}  onClick={(e) => handleClick(7, 'deleted')}>
	      						<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true" ><path d="M12.0001 5.33333V12.5C12.0001 13.3284 11.3285 14 10.5001 14H5.50008C4.67165 14 4.00008 13.3284 4.00008 12.5V5.33333M2.66675 4L13.3334 4.00003M10.3334 3.33333V3C10.3334 2.44772 9.8857 2 9.33342 2H6.66675C6.11446 2 5.66675 2.44772 5.66675 3V3.33333" stroke="currentColor" fillOpacity="0" strokeLinecap="round"></path></svg>
	      						<span>Recently deleted</span>
	      					</li>
	      				</ul>
	      			</div>
	      		</div>
      		</div>
	)
}

export default Sidebar;