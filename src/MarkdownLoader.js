import React, {useEffect, useState} from 'react';
import {Container} from "@mui/material";
import {useParams} from "react-router-dom";
import Markdown from "react-markdown";
import NotFound from "./NotFound";

const MarkdownLoader = () => {
    const pageName = useParams()['*'];
    const basePath = window.location.host === 'blog.bengillett.com' ?
        'https://raw.githubusercontent.com/M3tanym/ben-blog/refs/heads/main/src/pages/' :
        'http://localhost:8080/src/pages/';
    const markdownPath = basePath + pageName + '.md';
    const [fileText, setFileText] = useState('');
    useEffect(() => {
        fetch(markdownPath)
            .then(response => {
                if (response.status === 200) {
                    return response.text();
                }
                return null;
            }).then(text => setFileText(text));
    }, [markdownPath]);

    if (fileText != null) {
        return (
            <Container>
                <title>{pageName}</title>
                <br/>
                <Markdown>{fileText}</Markdown>
            </Container>
        );
    }

    return <NotFound/>;
};

export default MarkdownLoader;
