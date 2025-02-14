import React from 'react';
import {Container, Typography} from "@mui/material";

const NotFound = (props) => {
    return (
        <Container maxWidth={'md'}>
            <Typography variant="h4">
                No entry exists by this name ({props.title}) ☹️
            </Typography>
        </Container>
    );
};

export default NotFound;
