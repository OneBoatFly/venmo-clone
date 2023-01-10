import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/session';
import './ProfileImage.css';

export default function ProfileImage({ setShowModal }) {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState('');

    const validFileType = (file) => {
        const validTypes = ['image/webp', 'image/png', 'image/jpeg', "image/jpg"];
        return validTypes.includes(file.type)
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        if (!validFileType(e.dataTransfer.files[0])) {
            setError('File type not allowed.')
            return;
        }

        setError('');
        setImage(e.dataTransfer.files[0]);
        setImagePreview(URL.createObjectURL(e.dataTransfer.files[0]));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validFileType(image)) return;

        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        // fetch('/api/images', {method: 'DELETE'})
        //     .then(async (res) => {
        //         console.log('result', res)

        //         if (res.ok) {
                    
        //         }
        //     })

        const res = await fetch('/api/images', {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            const data = await res.json();
            dispatch(setUser(data.user));

            setImageLoading(false);
            setShowModal(false);
        } else {
            setImageLoading(false);
            setError('An error occurred. Please try again.');
        }
    }

    return (
        <div className='profile-image-upload-modal'>
            <span className='drag-drop-title'>Drag your profile picture here</span>
            <span className='drag-drop-comment' >Accepts .webp, .png, .jpeg or .jpg only.</span>
            <form onSubmit={handleSubmit}>
                <div
                    className='drag-and-drap-wrapper'
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    >
                    {imagePreview.length > 0 ?
                        <div className='profile-image-preview-div'>
                            <img src={imagePreview} alt='' className='profile-image-preview-div' />
                        </div>
                        : 
                        <div className='profile-image-preview-div'>
                            <i className="fa-regular fa-user"></i>
                        </div>
                    }
                    <input
                        id='image-add-photo'
                        type='file'
                        accept="image/webp image/png image/jpeg image/jpg"
                    />
                </div>
                <div className="profile-image-upload-button-div">
                    <button type="submit">Save</button>
                </div>
            </form>

            {(imageLoading) && <span className='profile-image-upload-loading-span'>Loading...</span>}

            {error.length > 0 &&
                <div className='auth-error-div'>
                    <span>{error}</span>
                </div>
            }
        </div>
    )
}
