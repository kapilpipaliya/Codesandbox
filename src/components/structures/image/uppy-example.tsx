/* eslint-disable */
import * as React from 'react';
import { pure, compose, lifecycle, withProps } from 'recompose';
import { inject } from 'mobx-react';

import * as Uppy from 'uppy/dist/uppy.min.js';

// import { Dashboard, DashboardModal, DragDrop, ProgressBar } from 'uppy/lib/react';
import * as Dashboard from 'uppy/lib/react/Dashboard';
// import * as DashboardModal from 'uppy/lib/react/DashboardModal';
// import * as DragDrop from 'uppy/lib/react/DragDrop';
import * as ProgressBar from 'uppy/lib/react/ProgressBar';

//https://github.com/erikdahlstrand/shrine-rails-example/blob/master/app/assets/javascripts/application

class UppyExample extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      showInlineDashboard: false,
      open: false
    };
    this.handleModalClick = this.handleModalClick.bind(this);
  }

  componentWillMount () {
    this.uppy = new Uppy.Core({ autoProceed: false })
      // .use(Uppy.Tus, { endpoint: sce_endpoint })
      .use(Uppy.XHRUpload, {
        endpoint: this.props.ConstrainsStore.image_endpoint, // Shrine's upload endpoint
        fieldName: 'file',
        // headers: { 'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').content }
      })
      .use(Uppy.GoogleDrive, { host: 'https://server.uppy.io' })
      .run();

    // Fired when all uploads are complete.
    this.uppy.on('complete', (result) => {
        const url = result.successful[0].uploadURL;
        console.log(url);
        // store.dispatch({
        //   type: SET_USER_AVATAR_URL,
        //   payload: { url: url }
        // })
      });
      
    // Fired each time a single upload is complete.
    const uppy = this.uppy;
    this.uppy.on('upload-success', (fileId, data, uploadURL) => {
      // retrieve uppy's file object (`file.data` contains the actual JavaScript File object)
      console.log(fileId, data);
      var file = uppy.getFile(fileId);
  
      // show image preview
      // imagePreview.src = file.preview
  
      if (this.props.ConstrainsStore.uploadServer == 's3') {
        // construct uploaded file data in the format that Shrine expects
        var uploadedFileData = JSON.stringify({
          id: file.meta.key.match(/^cache\/(.+)/)[1], // remove the Shrine storage prefix
          storage: 'cache',
          metadata: {
            size:      file.size,
            filename:  file.name,
            mime_type: file.type,
          }
        });
      } else {
        var uploadedFileData = JSON.stringify(data);
      }
  
      // set hidden field value to the uploaded file data so that it's submitted with the form as the attachment
      // var hiddenInput = document.getElementById(fileInput.dataset.uploadResultElement)
      // hiddenInput.value = uploadedFileData
    });
      
  }

  componentWillUnmount () {
    this.uppy.close();
  }

  handleModalClick () {
    this.setState({
      open: !this.state.open
    });
  }

  render () {
    const { showInlineDashboard } = this.state;
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={showInlineDashboard}
            onChange={(event) => {
              this.setState({
                showInlineDashboard: event.target.checked
              });
            }}
          />
          Upload Images
        </label>
        {showInlineDashboard && (
          <Dashboard
            uppy={this.uppy}
            // plugins={['GoogleDrive']}
          />
        )}
        <ProgressBar
          uppy={this.uppy}
        />
      </div>
    );
  }
}

export default compose(
  inject('ConstrainsStore'),
)(UppyExample);
/*
  render () {
    const { showInlineDashboard } = this.state
    return (
      <div>
        <h2>Inline Dashboard</h2>
        <label>
          <input
            type="checkbox"
            checked={showInlineDashboard}
            onChange={(event) => {
              this.setState({
                showInlineDashboard: event.target.checked
              })
            }}
          />
          Show Dashboard
        </label>
        {showInlineDashboard && (
          <Dashboard
            uppy={this.uppy}
            // plugins={['GoogleDrive']}
          />
        )}

        <h2>Modal Dashboard</h2>
        <div>
          <button onClick={this.handleModalClick}>
            {this.state.open ? 'Close dashboard' : 'Open dashboard'}
          </button>
          <DashboardModal
            uppy={this.uppy2}
            open={this.state.open}
            onRequestClose={() => this.setState({ open: false })}
          />
        </div>

        <h2>Drag Drop Area</h2>
        <DragDrop
          uppy={this.uppy}
          locale={{
            strings: {
              chooseFile: 'Boop a file',
              orDragDrop: 'or yoink it here'
            }
          }}
        />

        <h2>Progress Bar</h2>
        <ProgressBar
          uppy={this.uppy}
        />
      </div>
    )
  }
*/