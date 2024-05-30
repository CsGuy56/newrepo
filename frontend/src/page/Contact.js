

import React, { useState } from 'react';

const Contact = () => {
  
    
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log('Form submitted:', formData);
    };
    
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Contact Us</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label} htmlFor="name">Name</label>
          <input
            style={styles.input}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <label style={styles.label} htmlFor="subject">Subject</label>
          <input
            style={styles.input}
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          
          <label style={styles.label} htmlFor="message">Message</label>
          <textarea
            style={styles.textarea}
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          
          <button style={styles.button} type="submit">Submit</button>
        </form>
      </div>

  )
}

const styles = {
container: {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
},
heading: {
  fontSize: '2.5em',
  textAlign: 'center',
  color: '#ff0000',
  marginBottom: '20px',
},
form: {
  display: 'flex',
  flexDirection: 'column',
},
label: {
  fontSize: '1.2em',
  marginBottom: '5px',
},
input: {
  padding: '10px',
  fontSize: '1em',
  marginBottom: '20px',
  borderRadius: '5px',
  border: '1px solid #ccc',
},
textarea: {
  padding: '10px',
  fontSize: '1em',
  marginBottom: '20px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  minHeight: '100px',
},
button: {
  padding: '10px 20px',
  fontSize: '1.2em',
  color: '#fff',
  backgroundColor: '#ff0000',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
},
};

export default Contact;