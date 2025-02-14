import React from 'react';
import {Container} from '@mui/material';
import MarkdownRenderer from './MarkdownRenderer';

const PageRenderer = (props) => {
    return (
        <Container maxWidth={'md'}>
            <h4>This is a Blog Page</h4>
            <div>...nav here...</div>
            <br/>
            <MarkdownRenderer markdown={props.markdown}/>
        </Container>
    );
};

export default PageRenderer;
