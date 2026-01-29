import React, {useEffect, useRef, useState} from 'react';
import {Container, Typography} from "@mui/material";
import NavBar from "../../core/NavBar";
import Button from "@mui/material/Button";
import NumberFlow from '@number-flow/react'

const Here = () => {
    const [hereCount, setHereCount] = useState([]);
    const socket = useRef(null);

    useEffect(() => {
        const connect = () => {
            socket.current = new WebSocket("wss://ws.blog.bengillett.com");
            socket.current.onopen = () => { queryHereCount() };
            socket.current.onclose = () => { };
            socket.current.onerror = () => { };
            socket.current.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.type === "here") {
                    const count = message.count;
                    setHereCount(count);
                }
            };
        }

        const handleFocus = () => {
            if (!socket.current || socket.current.readyState === WebSocket.CLOSED) {
                connect();
            }
        }

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                handleFocus();
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('focus', handleFocus);
        window.addEventListener('online', handleFocus);

        connect();

        return () => {
            socket.current.close();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('online', handleFocus);
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
            <br />
            <Typography variant="h6" component="h6">people who were also here: <NumberFlow format={{ minimumIntegerDigits: 4, useGrouping: false }} value={hereCount} /></Typography>
            <br />
            <Button onClick={incrementHereCount}>I am here</Button>
        </Container>
    );
};

export default Here;
