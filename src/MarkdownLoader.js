import React from 'react';
import {Container, Typography} from "@mui/material";

const MarkdownLoader = (props) => {
    console.log("!");
    console.log(props);
    return (
        <Container>
            <title>Markdown Loader</title>
            <Typography variant="h5">
                Markdown Loader
            </Typography>
        </Container>
    );
};

export default MarkdownLoader;
