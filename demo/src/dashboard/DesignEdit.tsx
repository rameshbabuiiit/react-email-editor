import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import  baseRelativePath from './BasePath';

import EmailEditor, { EditorRef } from '../../../src'; // use react-email-editor instead

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const Bar = styled.div`
  flex: 1;
  background-color: #61dafb;
  color: #000;
  padding: 10px;
  display: flex;
  max-height: 40px;

  h1 {
    flex: 1;
    font-size: 16px;
    text-align: left;
  }

  button {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #000;
    color: #fff;
    border: 0px;
    max-width: 150px;
    cursor: pointer;
  }

  a {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    border: 0px;
    cursor: pointer;
    text-align: right;
    text-decoration: none;
    line-height: 160%;
  }
`;

const DesignEdit = () => {
  const emailEditorRef = useRef<EditorRef | null>(null);

  const saveDesign = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.saveDesign((design) => {
      console.log('saveDesign', design);
      alert('Design JSON has been logged in your developer console.');
    });
  };

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { html } = data;
      console.log('exportHtml', html);
      alert('Output HTML has been logged in your developer console.');
    });
  };

  return (
    <Container>
      <Bar>
        <h1>React Email Editor (Demo)</h1>

        <Link to={`${baseRelativePath}/dashboard`}>Dashboard</Link>
        <button onClick={saveDesign}>Save Design</button>
        <button onClick={exportHtml}>Export HTML</button>
      </Bar>

      <EmailEditor
        ref={emailEditorRef}
        options={{
          version: "latest",
          appearance: {
            theme: "modern_light"
          }
        }}
      />
    </Container>
  );
};

export default DesignEdit;
