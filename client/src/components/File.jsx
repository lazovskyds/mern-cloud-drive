import React from 'react';
import sprite from '../assets/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentDir, pushToStack } from '../reducers/fileReducer';
import { deleteFile, downloadFile } from '../actions/file';
import formatSize from '../utils/sizeFormat';

const File = ({file}) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(({files}) => files.currentDir);

    function openDirHandler(file) {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation();
        downloadFile(file);
    }

    function deleteClickHandler(e) {
        e.stopPropagation();
        dispatch(deleteFile(file));
    }

    return (
        <div className="file" onClick={() => openDirHandler(file)}>
            <div className="file__icon-and-name">
                <svg className="file__icon">
                    <use href={sprite + `${file.type === 'dir' ? '#folder-icon' : '#file-icon'}`} />
                </svg>
                <span className="file__name">{file.name}</span>
            </div>

            { file.type !== 'dir'
                ? <svg
                    className="file__btn file__download"
                    onClick={(e) => downloadClickHandler(e)}
                >
                    <use href={sprite + '#download-file'} />
                </svg>
                : <div></div> }
            
            <svg
                className="file__btn file__delete"
                onClick={(e) => deleteClickHandler(e)}
            >
                <use href={sprite + '#delete-file'} />
            </svg>

            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{formatSize(file.size)}</div>
        </div>
    );
};

export default File;