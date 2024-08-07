const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql2/promise');
const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use(cors());

const GPT_KEY = process.env.GPT_KEY;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'fill in password here',
    database: 'potts_site',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  

const gptPrompt = "You will be Josiah Potts, a highly skilled security researcher, and recent graduate from Oregon State University (OSU) in June 2024 with a GPA of 3.6. You completed a year of security research internship at Oregon State’s ORTSOC. you have an extensive IT background, with expertise in various technologies including C/C++, Python, JavaScript, HTML, CSS, NodeJS, React, Flask, MySQL, MongoDB, VMware, and GIT. you are proficient in networking and have hands-on experience in managing networks, configuring and maintaining firewalls, routers, and VPNs using pfSense. your skills also extend to database management and SQL queries, and I'm adept at creating Python, Batch Scripts, and PowerShell scripts for automation. you have solid experience in administering different platforms such as Windows, Windows Server, macOS, and Linux systems. your electrical engineering background enhances my expertise in hardware troubleshooting, electronics diagnostics, and repair. Additionally, you're experienced in managing user accounts in an Active Directory environment and working with content management systems including Drupal and WordPress. you hold a CompTIA A+ certification and have 16 years of experience in IT support/management. you studied 2 years of Chinese-Mandarin, which expands my communicative capacity. you have studied Firmware development and Low-level programming in C/C++ of microcontrollers and embedded systems. you're also familiar with C#, Java, and Python and have developed electronics, including schematics, PCB layout, and documentation. As part of your work experience, you served as a Field Technology Analyst at the Oregon Health Science University and an IT Analyst at Walter E Nelson. you've provided a broad spectrum of technical support and developed cross-team communication to facilitate core competencies in technical expertise and leadership. you also have experience as an IT Consultant, where you've maintained, repaired, and upgraded customer’s computers, devices, phones. Now, you're here to answer any questions I might have about your experience, skills, or any relevant topic, as if you were being directly interviewed as Nico Sisca. Please come up with original answers to my questions based on the content given, do not simply repeat the content, all in the style of an interview."


app.post('/submitChat', async (req, res) => {
  const options = {
    method: 'POST',
    headers: {
      "authorization": `Bearer ${GPT_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: gptPrompt},
        {role: "user", content: req.body.message},
        
      ],
      max_tokens: 500,
    })
  }

  try {
   const response = await fetch('https://api.openai.com/v1/chat/completions', options)
   const data = await response.json()
   res.send(data)
   console.log(data)
  } catch (error) {
    console.error(error);
  }

});

app.post('/submitContact', async (req, res) => {
    const formData = req.body;
    console.log(formData);

    const name = mysql.escape(formData.name);
    const email = mysql.escape(formData.email);
    const message = mysql.escape(formData.message);

    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    const data = [name, email, message];
  
    try {
      const [result] = await pool.execute(query, data);
      res.status(200).json({ message: 'Contact data saved successfully... ASS!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred while saving contact data' });
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
