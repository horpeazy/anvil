import React, { useState } from "react";
import withAuthentication from "../Auth/Auth";
import '../../Assets/Styles/home.css';
import Loading from "./Loading";
import Sidebar from './Sidebar';
import Content from './Content';
import Modal from './Modal';

function Home() {
	const [content, setContent] = useState('recent');
	const [showModal, setShowModal] = useState(false);

	const handleContentClick = (option) => {
		setContent(option);
	}
	
	const closeModal = () => {
	  setShowModal(false);
	}

	return (
      <section>
      	<div className="home-nav">
      		<div className="logo-wrapper">
      			<i className="fas fa-sync logo-icon"></i>
      			<i className="fa fa-chevron-down chevron"></i>
      		</div>
      		<button className="create" onClick={() => setShowModal(true)} >
      			<i className="fa fa-plus"></i>
      			<span>Create New Project</span>
      		</button>
      	</div>
      	<div className="home-main">
      		<Sidebar onOptionClick={handleContentClick} />
      		<Content selectedOption={content} />
      	</div>
      	{showModal && <Modal closeModal={closeModal} />}
      </section>
	)
}

export default withAuthentication(Home);
