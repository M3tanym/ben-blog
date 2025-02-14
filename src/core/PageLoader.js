import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import NotFound from "./NotFound";
import PageRenderer from "./PageRenderer";

const PageLoader = () => {
    const pageName = useParams()['*'];
    const basePath = window.location.host === 'blog.bengillett.com' ?
        'https://raw.githubusercontent.com/M3tanym/ben-blog/refs/heads/main/src/pages/' :
        'http://localhost:8080/src/pages/';
    const markdownPath = basePath + pageName + '.md';
    const [markdownContent, setMarkdownContent] = useState('');
    useEffect(() => {
        fetch(markdownPath)
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                return null;
            }).then(text => setMarkdownContent(text));
    }, [markdownPath]);
    const pageFound = markdownContent != null;
    return (
        <>
            <title>{pageFound ? pageName : 'Not Found'}</title>
            {pageFound ?
                <PageRenderer title={pageName} markdown={markdownContent}/> :
                <NotFound title={pageName}/>}
        </>
    );
};

export default PageLoader;
