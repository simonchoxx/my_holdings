import React from 'react';
import image from '../resources/crypto2.jpg';

export const Header = () => {
	return (
		<div className="px-0">
			<img
				src={image}
				style={{ width: '100%', height: '60vh', objectFit: 'cover' }}
				alt="Imagen"
			></img>
		</div>
	);
};
