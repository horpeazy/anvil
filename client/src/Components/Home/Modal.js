import { useState } from "react";
import Template from "./Template";
import ImportRepo from "./ImportRepo";

function Modal({closeModal}) {
  const [active, setActive] = useState("template");
  
  return (
  	<div className="modal-wrapper">
  		<div className="modal">
  			<div className="modal-header">
  				<span>NEW</span>
  				<button type="button" onClick={() => closeModal()}><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true" ><path fill-rule="evenodd" clip-rule="evenodd" d="M2.64645 2.64645C2.84171 2.45118 3.15829 2.45118 3.35355 2.64645L8 7.29289L12.6464 2.64645C12.8417 2.45118 13.1583 2.45118 13.3536 2.64645C13.5488 2.84171 13.5488 3.15829 13.3536 3.35355L8.70711 8L13.3536 12.6464C13.5488 12.8417 13.5488 13.1583 13.3536 13.3536C13.1583 13.5488 12.8417 13.5488 12.6464 13.3536L8 8.70711L3.35355 13.3536C3.15829 13.5488 2.84171 13.5488 2.64645 13.3536C2.45118 13.1583 2.45118 12.8417 2.64645 12.6464L7.29289 8L2.64645 3.35355C2.45118 3.15829 2.45118 2.84171 2.64645 2.64645Z" fill="currentColor"></path></svg></button>
  			</div>
  			<div className="modal-body">
  				<div className="modal-sidebar">
  					<div>
  					  <button class={ active === "template" ? 'active' : '' } onClick={() => setActive("template")}>Quick Start</button>
  					  <button class={ active === "import" ? 'active' : '' } onClick={() => setActive("import")}>Import repository</button>
  					</div>
  				</div>
  				<div className="modal-content">
  					<div>
  						{active === "template" ? 
  						  (<>
  						    <h2>Start from a template</h2>
  						    <div className="template-grid">
  						  		<Template 
  						  	  icon={(<svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H32V32H0V0Z" fill="#F7DF1E"></path><path d="M8.41397 26.7415L10.8628 25.2595C11.3353 26.0972 11.765 26.8059 12.7959 26.8059C13.784 26.8059 14.407 26.4193 14.407 24.9158V14.6911H17.4142V24.9584C17.4142 28.073 15.5885 29.4907 12.9248 29.4907C10.5192 29.4907 9.12274 28.2448 8.41392 26.7413" fill="black"></path><path d="M19.0476 26.4193L21.4962 25.0016C22.1408 26.0542 22.9785 26.8275 24.4606 26.8275C25.7066 26.8275 26.5011 26.2045 26.5011 25.3452C26.5011 24.3142 25.6849 23.949 24.3102 23.3477L23.5586 23.0253C21.3889 22.1018 19.9497 20.9419 19.9497 18.4931C19.9497 16.2376 21.6681 14.5191 24.3532 14.5191C26.265 14.5191 27.6397 15.1851 28.6277 16.925L26.2863 18.4286C25.7708 17.505 25.2124 17.1399 24.3533 17.1399C23.4726 17.1399 22.914 17.6984 22.914 18.4286C22.914 19.3308 23.4726 19.696 24.7612 20.2546L25.513 20.5767C28.0692 21.6723 29.5084 22.7892 29.5084 25.3023C29.5084 28.009 27.3819 29.491 24.5251 29.491C21.7326 29.491 19.9282 28.1593 19.0477 26.4193" fill="black"></path></svg>)}
  						  	  language="javascript"
  						  	  template="javascript"
  						  	/>
  						  		<Template 
  						  	  icon={(<svg width="20" height="20" viewBox="0 0 32 32" fill="yellow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4.1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8.1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3.1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z"/></svg>)}
  						  	  language="python"
  						  	  template="python"
  						  	/> 	
  						  </div>
  						  </>) : 
  						(<ImportRepo />)}				
  					</div>
  				</div>
  			</div>
  		</div>
  	</div>
  )
}

export default Modal;
