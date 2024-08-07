import React from 'react';
import '../styles/About.css';
import aboutImage from '../assets/about.png';

const About = () => {
    return (
        <div className='about-container'>
            <div className='about-image'>
                <img src={aboutImage} />
            </div>
            <div className='about-content'>
                <h1>Josiah Potts</h1>
                <p>Welcome! I'm Josiah, a security researcher with a strong background in software development and Computer Science. I've journeyed through the tech sphere, tackling roles from IT analyst to engineer, armed with a coding arsenal that includes C/C++, Python, and JavaScript.</p>
                <h2>My Expertise</h2>
                <p>As a security researcher, I specialize in unearthing system vulnerabilities and securing them. I also have extensive software development experience, spanning from web apps to task automation. My belief is strong: technology holds the key to solving real-world issues.</p>
                <h2>Engage</h2>
                <p>I'm open to new challenges and engaging with fellow tech enthusiasts. Don't hesitate to reach out with questions or ideas.</p></div>
        </div>
    );
};

export default About;
