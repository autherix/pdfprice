import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast} from 'react-toastify';
import './styles.css';

import { ImageConfig } from './ImageConfig'; 
import uploadImg from './cloud-upload-regular-240.png';

const FileUploads = props => {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        console.log("New file:", newFile);
        if (newFile) {
            const updatedList = [...fileList, newFile];
            console.log("Updated fileList:", updatedList);
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }
    const submitForm = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        for (let i = 0; i < fileList.length; i++) {
            formData.append('files', fileList[i]);
        }
        if (formData.has('files')) {
            try {
                const response = await fetch('https://backend.myhttpaddress.com/api/user/upload', {
                    method: 'POST',
                    body: formData,
                });
        
                if (response.ok) {
                    toast.success('فایل با موفقیت اپلود شد');
                    const responseData = await response.json();
                    console.log(responseData);
                } else {
                    toast.error('آپلود فایل در چار مشکل شد');
                }
            } catch (error) {
                console.error('An error occurred while uploading the file:', error);
                toast.error('آپلود فایل در چار مشکل شد');
            }
        } else {
           console.log('Error uploading the file');
        }
        
    };
    return (
        <>
         <form>
        <div className="body_content_FileUpload">
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>بکشید و رها کنید</p>
                </div>
                <input type="file" value="" onInput={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                    
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                        <button onClick={submitForm} className='btn btn_file_upload '>آپلود فایل ها</button>
                    </div>
                ) : null
            }
            </div>
            </form>
        </>
    );
}

FileUploads.propTypes = {
    onFileChange: PropTypes.func
}

export default FileUploads;