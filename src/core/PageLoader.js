import React, {useEffect, useState} from 'react';
import NotFound from './NotFound';
import PageRenderer from './PageRenderer';
import getPagePath from "./PagePath";

const PageLoader = () => {
    const [basePath, pageName] = getPagePath();
    const markdownPath = basePath + pageName + '/index.md';
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
            <title>{pageFound ? pageName.substring(8) + ' | Ben Gillett' : 'Not Found'}</title>
            {pageFound ?
                <PageRenderer title={pageName} markdown={markdownContent}/> :
                <NotFound title={pageName}/>}
        </>
    );
};

export default PageLoader;
