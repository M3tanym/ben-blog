import React from 'react';
import {Container} from '@mui/material';
import PageList from './PageList';
import NavBar from "./NavBar";
import {styled} from "@mui/system";

const StyledContainer = styled(Container)(
    () => `
    overflow-x: hidden;
    max-width: 100%;
`);

const Home = () => {
    return (
        <StyledContainer maxWidth={'md'}>
            <title>Ben's Blog</title>
            <NavBar />
            <PageList/>
        </StyledContainer>
    );
};

export default Home;
