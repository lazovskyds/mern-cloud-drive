import React from 'react';
import { File } from '.';
import { useSelector } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const FileList = () => {
    const files = useSelector(({files}) => files.files);

    if (files.length === 0) {
        return <div style={{padding: '15px'}}>Files not found</div>
    }

    return (
        <div className="file-list">
            <div className="file-list__header">
                <div className="file-list__title">Name</div>
                <div className="file-list__title">Download</div>
                <div className="file-list__title">Delete</div>
                <div className="file-list__title">Date</div>
                <div className="file-list__title">Size</div>
            </div>
            
            <TransitionGroup>
                {files.map(file => 
                    <CSSTransition
                        key={file._id}
                        timeout={5000}
                        classNames={'file'}
                        exit={false}
                    >
                        <File file={file} />
                    </CSSTransition>
                )}
                
            </TransitionGroup>
        </div>
    );
};

export default FileList;