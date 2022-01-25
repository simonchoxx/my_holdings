import React from 'react';
import { Image } from 'react-bootstrap';
import image from '../assets/image1.jpg';

export const Header = () => {
	return (
		<div className="px-0">
			<Image src={image} style={{ width: '100%', height: '50vh' }} />
		</div>
	);
};
