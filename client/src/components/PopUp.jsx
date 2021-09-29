import React from 'react';
import { Input } from '.';
import { useDispatch } from 'react-redux';
import { createDir } from '../actions/file';


const PopUp = ({turnOffPopUp, currentDir}) => {
    const [dirName, setDirName] = React.useState('');
    const dispatch = useDispatch();

    const handlePopUp = () => {
        if (dirName.length > 0) {
            turnOffPopUp();
            dispatch(createDir(currentDir, dirName));
        }
    }

    return (
        <div className="pop-up pop-up_disabled" onClick={turnOffPopUp}>
            <div className="pop-up__content" onClick={(e) => e.stopPropagation()}>
                <div className="pop-up__header">
                    <div className="pop-up__title">Create new folder</div>
                    <button className="pop-up__close-btn" onClick={turnOffPopUp}>X</button>
                </div>
                <Input type="text" placeholder="Min: length = 1" value={dirName} setValue={setDirName} />
                <button className="pop-up__create-btn" onClick={handlePopUp}>Create</button>
            </div>
        </div>
    );
};

export default PopUp;