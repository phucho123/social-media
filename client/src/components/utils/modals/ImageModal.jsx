import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleImageModal } from '../../../redux/reducer/modalSlice';

export default function ImageModal() {
    const imageModal = useSelector(state => state.modal.imageModal);
    const imageUrl = imageModal.imageUrl;
    const open = imageModal.open;
    const ratio = window.innerWidth / window.innerHeight;
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(toggleImageModal({
            open: false,
        }))
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='overflow-auto flex items-center justify-center'
            >
                {

                    imageUrl ? <div className={`${ratio > 1 ? 'h-1/2' : 'max-w-[90%]'}  relative rounded-xl`}>
                        <div className='font-bold text-xl flex w-full px-2 justify-end text-red-600 absolute'
                        >
                            <div className='cursor-pointer px-2 rounded-full bg-gray-200' onClick={handleClose}>X</div>
                        </div>
                        <img src={imageUrl} alt="404"
                            className='rounded-lg w-full h-full'
                        />
                    </div> : <div>404</div>
                }
            </Modal>
        </div>
    );
}