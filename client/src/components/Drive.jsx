import React, { useEffect } from 'react';
import { FileList, PopUp, Uploader } from '.'
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from '../actions/file';
import { setCurrentDir } from '../reducers/fileReducer';
import sprite from '../assets/sprite.svg';


const Drive = () => {
    const dispatch = useDispatch();
    const currentDir = useSelector(({files}) => files.currentDir);
    const dirStack = useSelector(({files}) => files.dirStack);
    const loader = useSelector(({app}) => app.loader);

    const [popUpStatus, setPopUpStatus] = React.useState(false);
    const [dragEnter, setDragEnter] = React.useState(false);
    const [sort, setSort] = React.useState('type');

    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDir, sort]);

    function backClickHandler() {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    }

    function fileUploadHandler(e) {
        const files = [...e.target.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    }

    function dragEnterHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(true);
    }

    function dragLeaveHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragEnter(false);
    }

    function onDropHandler(e) {
        e.preventDefault();
        e.stopPropagation();

        let files = [...e.dataTransfer.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));

        setDragEnter(false);
    }

    if (loader === true) {
        return (
            <div className="loader">
                <div className="lds-dual-ring"></div>
            </div>
        )
    }

    return (
        !dragEnter
        ? <div
            className="drive"
            onDrop={onDropHandler}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
        >
            <div className="drive__header">
                <div className="drive-left">

                    { dirStack.length >= 1
                        ? <svg
                            className="drive__icon drive__go-back"
                            onClick={() => backClickHandler()}
                        >
                            <use href={sprite + "#go-back"} />
                        </svg>
                        : '' }

                    <span className="drive__path">Folder</span>

                    <svg
                        className="drive__icon drive__plus-folder"
                        onClick={() => setPopUpStatus(true)}
                    >
                        <use href={sprite + "#plus-folder"} />
                    </svg>

                    <label className="drive__upload-label">
                        <svg
                            className="drive__icon drive__upload-file"
                        >
                            <use href={sprite + "#upload-file"} />
                        </svg>
                        
                        <input
                            type="file"
                            className="drive__upload-input"
                            onChange={(e) => fileUploadHandler(e)}
                            multiple={true}
                        />
                    </label>

                </div>
                
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="drive__select">
                    <option value="type">By type</option>
                    <option value="name">By name</option>
                    <option value="date">By date</option>
                </select>
            </div>
            <FileList />
            
            { popUpStatus
                ? <PopUp currentDir={currentDir} turnOffPopUp={() => setPopUpStatus(false)} />
                : '' }
            
                <Uploader />

        </div>
        : <div
            className="drop-area"
            onDrop={onDropHandler}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
        >
                Drag the files here
        </div>
    );
};

export default Drive;