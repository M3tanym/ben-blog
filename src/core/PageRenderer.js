import React from 'react';
import {Container} from '@mui/material';
import MarkdownRenderer from './MarkdownRenderer';
import {styled} from "@mui/system";

const StyledContainer = styled(Container)(
    () => `
    overflow-x: hidden;
    max-width: 100%;
`);

const PageRenderer = (props) => {
    return (
        <StyledContainer maxWidth={'md'}>
            <h4>This is a Blog Page</h4>
            <div>...nav here...</div>
            <br/>
            <MarkdownRenderer markdown={props.markdown}/>
        </StyledContainer>
    );
};

export default PageRenderer;
