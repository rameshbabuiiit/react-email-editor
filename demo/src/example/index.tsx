import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSave, FaFileDownload, FaFileUpload, FaEye, FaEyeSlash, FaFileCode, FaTrash } from 'react-icons/fa';

import packageJson from '../../../package.json';
import EmailEditor, { EditorRef, EmailEditorProps } from '../../../src'; // use react-email-editor instead
import sample from './sample.json';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  background-color: #282c34; /* Bar background color */
  color: #fff; /* Text color */
  padding: 10px;
  max-height: 40px;

  h1 {
    flex: 1;
    font-size: 20px;
    text-align: center;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin-left: 5px;
    font-size: 15px;
    font-weight: bold;
    background-color:rgb(49, 69, 100); /* Updated icon background color */
    color:rgb(255, 255, 255); /* Updated icon text color */
    border: 0px;
    max-width: 40px;
    max-height: 40px;
    cursor: pointer;
    position: relative;
  
      &:hover {
        background-color: rgb(37, 175, 78); }

    &:hover::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #000;
      color: #fff;
      padding: 5px;
      border-radius: 3px;
      font-size: 12px;
      white-space: nowrap;
    }
  }

  input[type="file"] {
    display: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const Example = () => {
  const emailEditorRef = useRef<EditorRef | null>(null);
  const [preview, setPreview] = useState(false);

  const saveDesign = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.saveDesign((design) => {
      console.log('saveDesign', design);
      alert('Design JSON has been logged in your developer console.');
    });
  };

  const saveDesignToLocalStorage = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.saveDesign((design) => {
      localStorage.setItem('savedDesign', JSON.stringify(design));
      alert('Design JSON has been saved to local storage.');
    });
  };

  const loadDesignFromLocalStorage = () => {
    const savedDesign = localStorage.getItem('savedDesign');
    if (savedDesign) {
      const unlayer = emailEditorRef.current?.editor;
      unlayer?.loadDesign(JSON.parse(savedDesign));
    }
  };

  const deleteDesignFromLocalStorage = () => {
    localStorage.removeItem('savedDesign');
    alert('Design JSON has been deleted from local storage.');
    const unlayer = emailEditorRef.current?.editor;
      unlayer?.loadBlank( {backgroundColor: '#e7e7e7',});
  };

  useEffect(() => {
    loadDesignFromLocalStorage();
  }, []);

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);
      alert('Output HTML has been logged in your developer console.');
    });
  };

  const downloadDesign = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.saveDesign((design) => {
      const blob = new Blob([JSON.stringify(design)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'design.json';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const downloadHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { html } = data;
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'design.html';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const loadDesign = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const design = JSON.parse(e.target.result as string);
      const unlayer = emailEditorRef.current?.editor;
      unlayer?.loadDesign(design);
    };
    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput')?.click();
  };

  const togglePreview = () => {
    const unlayer = emailEditorRef.current?.editor;

    if (preview) {
      unlayer?.hidePreview();
      setPreview(false);
    } else {
      unlayer?.showPreview('desktop');
      setPreview(true);
    }
  };

  const onDesignLoad = (data) => {
    console.log('onDesignLoad', data);
  };

  const onLoad: EmailEditorProps['onLoad'] = (unlayer) => {

    console.log('onLoad', unlayer);
    unlayer.addEventListener('design:loaded', onDesignLoad);

    const savedDesign = localStorage.getItem('savedDesign');
    if (savedDesign) {
      unlayer.loadDesign(JSON.parse(savedDesign));
    } else {
      unlayer.loadDesign(sample);
    }

  };

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    console.log('onReady', unlayer);
  };

  return (
    <Container>
      <Bar>
        <h1>React Email Editor</h1>

        <ButtonGroup>
          <button onClick={togglePreview} data-tooltip={preview ? 'Hide Preview' : 'Show Preview'}>
            {preview ? <FaEyeSlash /> : <FaEye />}
          </button>
          <button onClick={downloadHtml} data-tooltip="Export HTML">
            <FaFileCode />
          </button>
        </ButtonGroup>

        <ButtonGroup>
          <button onClick={saveDesignToLocalStorage} data-tooltip="Save Draft">
            <FaSave />
          </button>
          <button onClick={deleteDesignFromLocalStorage} data-tooltip="Delete Draft">
            <FaTrash />
          </button>
        </ButtonGroup>

        <ButtonGroup>
          <button onClick={downloadDesign} data-tooltip="Export Design">
            <FaFileDownload />
          </button>
          <button onClick={triggerFileInput} data-tooltip="Import Design">
            <FaFileUpload />
          </button>
        </ButtonGroup>

        <input id="fileInput" type="file" accept="application/json" onChange={loadDesign} />
      </Bar>

      <React.StrictMode>
        <EmailEditor
          ref={emailEditorRef}
          onLoad={onLoad}
          onReady={onReady}
          options={{
            version: "latest",            
            appearance: {
              theme: "modern_light",
            }
          }}
        />
      </React.StrictMode>
    </Container>
  );
};

export default Example;
