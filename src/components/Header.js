import React from 'react';
import image from '../resources/image1.jpg';

export const Header = () => {
	return (
		<div className="px-0">
			<img
				src={image}
				style={{ width: '100%', height: '50vh' }}
				alt="Imagen"
			></img>
		</div>
	);
};
