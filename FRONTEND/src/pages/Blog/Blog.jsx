import React from 'react';

const AboutUsPage = () => {
  const parentContainerStyle = {
    backgroundImage: `url('https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1666008987698.jpg')`, // Replace with your image URL or path
    backgroundSize: 'cover', // Adjust as needed
    backgroundPosition: 'center', // Adjust as needed
    minHeight: '100vh', // Ensures the container covers the viewport height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const contentContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Background color for content container
    padding: '20px', // Adjust as needed
  };

  const headingStyle = {
    fontSize: '36px',
    color: '#333',
  };

  const subHeadingStyle = {
    fontSize: '24px',
    color: '#333',
    marginTop: '20px',
  };

  const paragraphStyle = {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.5',
  };

  const listStyle = {
    listStyleType: 'disc',
    marginLeft: '20px',
    marginTop: '10px',
  };

  const imageStyle = {
    width: '200px',
    marginLeft: '20px',
  };

  return (
    <div style={parentContainerStyle}>
      <div className="container" style={contentContainerStyle}>
        <div className="row">
          <div className="col-md-8">
            <h1 style={headingStyle}><center>About Us</center></h1>
            <p style={paragraphStyle}>
            Welcome to Next-Car, your premier destination for importing the finest vehicles from 
            around the world. With a passion for cars and a commitment to excellence, we have established 
            ourselves as a trusted name in the industry.
          </p>
          <h2 style={subHeadingStyle}>Our Story</h2>
          <p style={paragraphStyle}>
            Next-Car was founded by car enthusiasts who saw a gap in the market for 
            high-quality imported vehicles. Our journey began with a single vision: to make 
            extraordinary cars accessible to everyone.
          </p>
          <p style={paragraphStyle}>
            Over the years, we have cultivated strong relationships with international dealerships 
            and manufacturers, allowing us to source the most sought-after vehicles. We take pride in 
            offering an extensive inventory that includes luxury sedans, exotic sports cars, 
            versatile SUVs, and more.
          </p>
          
          <h2 style={subHeadingStyle}>Why Choose Us?</h2>
          <ul style={listStyle}>
            <li>Unparalleled Selection: Our inventory features a diverse range of cars to suit 
            every taste and preference.</li>
            <li>Quality Assurance: Every vehicle undergoes rigorous inspections to ensure it meets 
            our high standards of quality and performance.</li>
            <li>Expert Team: Our team of automotive experts is dedicated to assisting you at every 
            step of the car buying process.</li>
            <li>Transparent Pricing: We believe in transparent pricing with no hidden fees, ensuring 
            a fair and honest buying experience.</li>
          </ul>
          <h2 style={subHeadingStyle}>Contact Us</h2>
          <p style={paragraphStyle}>
            We invite you to visit our showroom and explore our collection in person. If you have any 
            questions or specific vehicle requests, feel free to reach out to us. We are here to 
            make your dream car a reality.
          </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
