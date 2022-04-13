import React from 'react';
import image from '../resources/stacked-peaks-haikei.png';

export const Header = () => {
	return (
		<div className="px-0">
			<img
				src={image}
				style={{ width: '100%', height: '60vh' }}
				alt="Imagen"
			></img>
		</div>
	);
};
