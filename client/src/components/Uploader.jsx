import React from 'react';
import { UploadFile } from '.';
import { useSelector, useDispatch } from 'react-redux';
import { hideUploader } from '../reducers/uploadReducer';

const Uploader = () => {
    const files = useSelector(({upload}) => upload.files);
    const isVisible = useSelector(({upload}) => upload.isVisible);

    const dispatch = useDispatch();

    return ( isVisible &&
        <div className="uploader">
            <div className="uploader__content">
                <div className="uploader__header">
                    <div className="uploader__title">Uploading</div>
                    <button
                        className="uploader__close-btn"
                        onClick={() => dispatch(hideUploader())}
                    >
                        X
                    </button>
                </div>
                { files.map(file => <UploadFile key={file.id} file={file} />) }
            </div>

        </div>
    );
};

export default Uploader;