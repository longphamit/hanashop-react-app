import React, { Component,useEffect } from 'react';

const HomeDefault=()=>{
    useEffect(()=>{
        document.title="Home page"
    },[])
    return (
        <div>
            <h2>Hello default Home</h2>
        </div>
    )
};
export default HomeDefault;