import React from 'react';

const GoogleMap = () => {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7122.157702746943!2d83.3459982935791!3d26.80561779999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s81%2C%20Nehru%20Complex%2C%20Vikash%20Nagar%2C%20Bargadwa%2C%20Gorakhpur%2C%20Uttar%20Pradesh-273007!5e0!3m2!1sen!2sin!4v1777968752762!5m2!1sen!2sin"
        width="100%" 
        height="450" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;