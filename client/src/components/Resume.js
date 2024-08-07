import React from 'react';
import { Document, Page } from 'react-pdf';
import resumePDF from '../assets/resume.pdf';



function Resume() {
  return (
    <div>
      <Document file={resumePDF}>
        <Page pageNumber={1}/>
      </Document>
    </div>
  );
}

export default Resume;
