import React from 'react';
import {Container, Typography} from '@mui/material';

const NotFound = (props) => {
    return (
        <Container maxWidth={'md'}>
            <br/>
            <Typography variant={'h5'}>
                No entry exists by this name ({props.title}) ☹️
            </Typography>
        </Container>
    );
};

export default NotFound;
