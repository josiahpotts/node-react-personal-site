import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showWarning, setShowWarning] = useState(false);
  const [missingFields, setMissingFields] = useState([])

  const handleWarning = () => {
    setShowWarning(true)
    setTimeout(() => {
      setShowWarning(false)
    }, 3000)
  }

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missing = []
    if (formData.name == '') missing.push('name')
    if (formData.email == '') missing.push('email')
    if (formData.message == '') missing.push('message')

    if (missing.length > 0) {
      setMissingFields(missing)
      console.log("You are missing: "+ missingFields);
      handleWarning()
    }
    else {
      fetch('http://localhost:5001/submitContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data); // Response from the Express backend
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      // Reset form fields
      setFormData({ email: '', name: '', message: '' });
    }
  };

  return (
    <div className='contact-container'>
      {showWarning && (
        <div className="formWarning">
          <div className="warning">
            <h4>Whoa! You're missing:</h4>
            {missingFields.map((field) => (
              <p key={field}>{field}</p>
            )
            )}
          </div>
        </div>
      )}
      <h1>Contact Me</h1>
      <p>You can reach me at <a href='mailto: josiahpotts2022@gmail.com'>josiahpotts2022@gmail.com</a> or leave a message below!</p>
      <div className='formy'>

        <form id="contactForm" onSubmit={handleSubmit}>
          <div className="contact-author">
            <label>
              Name:
              <input id='name' type="text" value={formData.name} placeholder='Mr. Anderson' onChange={handleInputChange} />
            </label>
            <label>
              Email:
              <input id='email' type="email" value={formData.email} placeholder='guy@cool.com' onChange={handleInputChange} />
            </label>
          </div>
          <br />
          <label>
            AI Autocomplete  
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            Message: 
            <textarea id='message' value={formData.message} placeholder='Hey your Website SUCKS!' onChange={handleInputChange} />
          </label>
          <Button type="submit" variant='primary'>Submit</Button>
        </form>
      </div>

    </div>
  );
};

export default Contact;
