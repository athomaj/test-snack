import React from 'react';
//validate email Regex
export default function validateEmail(email){
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexEmail.test(email)
}