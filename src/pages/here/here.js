import React, {useEffect, useRef, useState} from 'react';
import {Container, Typography} from "@mui/material";
import NavBar from "../../core/NavBar";
import Button from "@mui/material/Button";
import NumberFlow from '@number-flow/react'

const Here = () => {
    const [hereCount, setHereCount] = useState([]);
    const socket = useRef(null);

    useEffect(() => {
        socket.current = new WebSocket("wss://ws.blog.bengillett.com");
        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "here") {
                const count = message.count;
                setHereCount(count);
            }
        };

        socket.current.onopen = () => { queryHereCount() };

        socket.current.onclose = () => { };

        const handleFocus = () => {
            if (!socket.current || socket.current.readyState === WebSocket.CLOSED) {
                socket.current = new WebSocket("wss://ws.blog.bengillett.com");
            }
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                if (!socket.current || socket.current.readyState === WebSocket.CLOSED) {
                    socket.current = new WebSocket("wss://ws.blog.bengillett.com");
                }
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleFocus);

        return () => {
            socket.current.close();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleFocus)
        };
    }, []);



    const queryHereCount = () => {
        if (socket.current && socket.current.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify({"type": "here"}));
        }
    };

    const incrementHereCount = () => {
        socket.current.send(JSON.stringify({"type": "here", "increment": true}));
        setHereCount(hereCount + 1);
    };

    return (
        <Container maxWidth={'md'}>
            <title>You are here 📍</title>
            <NavBar />
            <br />
            <Typography variant="h4" component="h4">You are here 📍</Typography>
            <Typography variant="h5" component="h5">People who were also here: <NumberFlow value={hereCount} /></Typography>
            <br />
            <Button onClick={incrementHereCount}>I am here</Button>
        </Container>
    );
};

export default Here;
