import * as React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
const $ = {
  ctrl: 'f6 link dim br2 ba bw1 ph3 pv2 mv2 mr1 dib b--light-gray bg-white light-red',
  fctrl: 'f5 link dim bn dib mid-gray bg-transparent light-red',
};
import isVisible from '../branch';

const getFiles = (field) => (e) => {
  e.preventDefault();
  // eslint-disable-next-line
  alert('see console');
  // eslint-disable-next-line
  console.log(field.name, '>> getFiles', field.files);
};

const createPreview = (file) => {
  // eslint-disable-next-line
  file.preview = window.URL.createObjectURL(file);
  return file.preview;
};

const destroyPreview = (file, field) => (e) => {
  e.preventDefault();
  // eslint-disable-next-line
  window.URL.revokeObjectURL(file.preview);
  // eslint-disable-next-line
  console.log('file.preview', file.preview);
  // Remove file from array
  const index = field.files.indexOf(file);
  action(() => field.files.splice(index, 1))();
};

export default isVisible(observer(({field, multiple = false}) => <div>
  <input
    {...field.bind()}
    multiple={multiple}
    className={$.ctrl}
  />
  <button
    onClick={getFiles(field)}
    className={$.ctrl}
  >
      Get Files
  </button>
  {field.files && field.files.length ? <div>
    <h2>Uploading {field.files.length} files...</h2>
    <div>{field.files.map((file) => <button
      key={file.name}
      onClick={destroyPreview(file, field)}
      className={$.ctrl}
    >
      <img
        className="w-10 h-10"
        src={createPreview(file)}
        alt={file.name}
      />
    </button>)}
    </div>
  </div> : null}
</div>));
