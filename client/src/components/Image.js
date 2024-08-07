import React from 'react';
import avatar from '../assets/avatar.png';

const CardPage = () => {
  const images = [avatar, 'image2.jpg', 'image3.jpg']; // An array of image URLs

  return (
    <div className="card-page">
      {images.map((image, index) => (
        <div key={index} className="card-container">
          <img src={image} alt={`Card ${index + 1}`} className="card-image" />
          <div className="card-content">
            {/* Add card content such as title, description, etc. */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardPage;
