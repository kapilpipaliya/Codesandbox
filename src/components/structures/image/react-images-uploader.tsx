import * as React from 'react';
import * as ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

export default class MyUploader extends React.Component {
	render() {
		return (
			<ImagesUploader
				url="https://testu1-kapilp.c9users.io/upload"
				optimisticPreviews
				onLoadEnd={(err) => {
					if (err) {
						console.error(err);
					}
				}}
				label="Upload multiple images"
				/>
		);
	}
}