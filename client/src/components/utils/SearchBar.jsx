import React, { createRef, useEffect, useRef, useState } from 'react'
import TextInput from './TextInput'
import { useForm } from 'react-hook-form'
import { Button, Popover, Typography } from '@mui/material';
import CustomBtn from './CustomBtn';
import SearchIcon from '@mui/icons-material/Search';
import { FaSearch } from "react-icons/fa";
import { apiRequest } from '../../utils/api';
import FriendCard from '../friend/FriendCard';
import { current } from '@reduxjs/toolkit';

const SearchBar = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm(({
        mode: "onChange"
    }));

    const inputRef = useRef(null);

    ////Popover/////

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchUsers, setSearchUsers] = useState([]);
    const [sizeOfSearchInput, setSizeOfSearchInput] = useState(0);

    const handleOpenPopover = (event) => {
        setAnchorEl(inputRef.current);
        if (inputRef.current?.attributes.type.ownerElement.offsetWidth != sizeOfSearchInput) {
            setSizeOfSearchInput(inputRef.current?.attributes.type.ownerElement.offsetWidth);
        }
        console.log(inputRef);
        // setAnchorEl(event.currentTarget)
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    const openPopover = Boolean(anchorEl);

    const onSubmit = async (data) => {
        await handleSearchUser(data.search);
    }


    const handleSearchUser = async (keyword) => {
        if (!keyword) return;
        try {

            const res = await apiRequest({
                url: "/users/search-user",
                data: {
                    keyword
                },
                method: "POST"
            });

            if (res.status == 200) {
                setSearchUsers(res.data);
            } else {
                setSearchUsers([]);
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex items-center '>
            <TextInput
                type={"text"}
                name={"search"}
                placeholder={"Search"}
                register={register("search")}
                styles={"rounded-full w-full bg-gray-100 rounded-r-none h-10"}
                ref={inputRef}
            />
            <CustomBtn label={<div className='bg-blue-600 hover:bg-blue-500 flex justify-center items-center h-10 px-2 rounded-r-full cursor-pointer'
                onClick={handleOpenPopover}>
                <FaSearch size={20} />
            </div>} type={"submit"} />
            <Popover
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <div className={`max-h-[200px] overflow-y-auto no-scrollbar p-2`} style={{ width: `${sizeOfSearchInput}px` }}>
                    {
                        searchUsers.length ? searchUsers.map((user, index) => (
                            <FriendCard friendInfo={user} key={index} />
                        )) : <Typography sx={{ p: 1, cursor: "pointer" }}>No user found</Typography>
                    }
                </div>
            </Popover>
        </form>

    )
}

export default SearchBar