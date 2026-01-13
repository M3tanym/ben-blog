import React, {useEffect, useState} from 'react';
import NotFound from './NotFound';
import PageRenderer from './PageRenderer';
import getPagePath from "./PagePath";

const PageLoader = () => {
    const [basePath, pageName] = getPagePath();
    const markdownPath = basePath + pageName + '/' + pageName + '.md';
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
            <title>{pageFound ? pageName + ' | Ben Gillett' : 'Not Found'}</title>
            {pageFound ?
                <PageRenderer title={pageName} markdown={markdownContent}/> :
                <NotFound title={pageName}/>}
        </>
    );
};

export default PageLoader;
