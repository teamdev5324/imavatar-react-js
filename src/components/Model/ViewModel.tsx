import React, { ReactNode } from 'react';
import Modal from 'react-bootstrap/Modal';

interface ViewModelProps {
	show: boolean;
	children: ReactNode
}
const ViewModel: React.FC<ViewModelProps> = ({show, children}) => {


  return <Modal
		show={show}
		backdrop="static"
		keyboard={false}
	>
		{/*<Modal.Header closeButton>*/}
		{/*	<Modal.Title>Modal title</Modal.Title>*/}
		{/*</Modal.Header>*/}
		<Modal.Body>
			{children}
		</Modal.Body>
	</Modal>
}

export default ViewModel;