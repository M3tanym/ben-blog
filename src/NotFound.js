import React from 'react';
import {Container, Typography} from "@mui/material";

const NotFound = () => {
    return (
        <Container>
            <title>Not Found</title>
            <Typography variant="h4">
                No entry exists by this name ☹️
            </Typography>
        </Container>
    );
};

export default NotFound;
