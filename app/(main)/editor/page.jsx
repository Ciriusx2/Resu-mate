// pages/latexEditor.js

import React from 'react';

const LatexEditor = () => {
  return (
    <div className='flex items-center flex-col gap-5'>
        <h1 className='text-2xl lg:text-4xl text-white'>Latex Editor</h1>
        <iframe
        src="https://texviewer.herokuapp.com/"
        width="100%"
        height="800px"
        style={{ border: 'none' }}
        title="LaTeX Editor"
        />
    </div>
  );
};

export default LatexEditor;
