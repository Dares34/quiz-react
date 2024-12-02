import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")


const Test = () => {
    const sendMessage = () => {
        socket.emit("send_message", {message: "hello"});
    };

    useEffect(() =>{
        socket.on("receive_message", (data) =>{
            alert(data.message);
        });

    }, [socket]);


    return (
        <div>
            <input placeholder='Message...'/>
            <button onClick={sendMessage}>Send Message</button>
            
        </div>
    );
};

export default Test;
