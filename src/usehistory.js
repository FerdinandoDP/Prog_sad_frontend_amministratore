import React from "react";
import {useNavigate} from 'react-router-dom';

export const Change_path = (path) => {
    const history = useNavigate();
    history(path);
};