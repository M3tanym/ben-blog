import React from 'react';
import {Container, Typography} from '@mui/material';
import PageList from './PageList';

const Home = () => {
    return (
        <Container>
            <title>Ben's Blog</title>
            <br/>
            <Typography variant={'h4'}>
                Blog Home
            </Typography>
            <Typography variant={'h6'}>
                <p><em>🏗 under construction. check back in a few days (or months)</em> 🤓</p>
            </Typography>
            <PageList/>
        </Container>
    );
};

export default Home;
