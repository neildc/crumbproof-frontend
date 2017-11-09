import React from 'react';
import Dropzone from 'react-dropzone';

export default function renderDropzone(field) {
  const file = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={(acceptedFiles, e) => {
          acceptedFiles.forEach((file) => {
              const reader = new FileReader();
              reader.onload = () => {
                  const fileAsBase64String = reader.result;
                  field.input.onChange(fileAsBase64String);
              };
              reader.onabort = () => console.log('file reading was aborted');
              reader.onerror = () => console.log('file reading has failed');

              reader.readAsDataURL(file);
          });
          }
        }
      >
        <div>Upload your crumb shot!</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {file && (
        <div>
          <img src={file} alt="" style={{ width: '100%' }} />
          {file.name}
        </div>
      )}
    </div>
  );
}
