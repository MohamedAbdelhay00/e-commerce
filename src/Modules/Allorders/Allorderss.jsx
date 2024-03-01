import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Allorderss() {
    let navg = useNavigate();
    useEffect(() => {
        navg('home/allorders');
    }, []);
    return<></>
}