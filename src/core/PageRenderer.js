import React from 'react';
import {Container} from '@mui/material';
import MarkdownRenderer from './MarkdownRenderer';
import NavBar from './NavBar';
import {styled} from "@mui/system";

const StyledContainer = styled(Container)(
    () => `
    overflow-x: hidden;
    max-width: 100%;
`);

const PageRenderer = (props) => {
    return (
        <StyledContainer maxWidth={'md'}>
            <NavBar />
            <MarkdownRenderer markdown={props.markdown}/>
        </StyledContainer>
    );
};

export default PageRenderer;
