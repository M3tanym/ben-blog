import React, {useEffect, useRef, useState} from 'react';
import {Container, Typography} from "@mui/material";
import NavBar from "../../core/NavBar";
import Button from "@mui/material/Button";
import NumberFlow from '@number-flow/react'
import {styled} from "@mui/system";
import {grey} from "@mui/material/colors";

const Here = () => {
    const [hereCount, setHereCount] = useState(null);
    const [tempCount, setTempCount] = useState(0);
    const socket = useRef(null);

    const StyledButton = styled(Button)(
        ({theme}) => `
            color: ${theme.palette.mode === 'dark' ? 'white' : 'black'};
            background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
    `);

    useEffect(() => {
        const interval = setInterval(() => {
            if (hereCount) {
                clearInterval(interval);
                return;
            }
            setTempCount(tempCount => tempCount + 1);
        }, 100);
        return () => clearInterval(interval);
    }, [hereCount]);

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
            <title>You are Here 📍</title>
            <NavBar/>
            <br/>
            <br/>
            <Typography variant="h6" component="h6">You are Here 📍 People who were also here: <NumberFlow format={{ minimumIntegerDigits: 5, useGrouping: false }} value={hereCount ?? tempCount}/>.</Typography>
            <br/>
            <StyledButton onClick={incrementHereCount}>I am here</StyledButton>
        </Container>
    );
};

export default Here;
