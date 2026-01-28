import React, {useEffect, useState} from 'react';
import StyledLink from './StyledLink';
import {Typography} from "@mui/material";
import {styled} from "@mui/system";
import Box from "@mui/material/Box";

const StyledBox = styled(Box)(
    () => `
    .table-of-contents {
        margin-top: 0.6em;
        margin-bottom: 0.4em;
        text-align: center;
    }
    
    .page-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.6em;
    }
    
    .page-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .page-name:after {
        content: " .........................................................................................................................................................................................................................................................................................";
    }
    
    .page-date {
        flex-shrink: 0;
    }
    
    & p, & li, & span, & table, & h1, & h2, & h3, & h4, & h5, & h6 {
        font-family: "Source Serif 4", Georgia, Cambria, "Times New Roman", Times, serif;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
    
    & ul {
        list-style-type: none;
        padding-inline-start: 0px;
        margin: 0;
        text-decoration-skip-ink: none;
    }
`);

const PageList = () => {
    const [pages, setPages] = useState([]);
    useEffect(() => {
        fetch('https://api.github.com/repos/M3tanym/ben-blog/git/trees/main?recursive=true')
            .then(response => {
                if (!response.ok) {
                    throw new Error('error fetching pages: ' + response.status);
                }
                return response.json();
            }).then(json => {
            const reduced = json.tree.reduce((result, page) => {
                if (page.type === 'blob') {
                    if (page.path.startsWith('src/pages/') && page.path.endsWith('.md') && page.path.match(/\d\d-\d\d-\d\d-.+/) ) {
                        const path = page.path.split('.')[0].split('/').at(-2);
                        const date = path.substring(0, 8);
                        const name = path.substring(9).replace('-', ' ');
                        result.push({'path': path, 'name': name, 'date': date});
                    }
                }
                return result;
            }, []);
            setPages(reduced);
        });
    }, []);

    return (
        <StyledBox>
            <Typography component="h4" variant="h4" className={'table-of-contents'}>Table of Contents</Typography>
            <ul>
                {pages.map(page => {
                    return (
                    <li key={page.path} className={'page-item'}>
                        <span className={'page-name'}><StyledLink href={'/' + page.path}>{page.name}</StyledLink></span>
                        <span className={'page-date'}>{page.date}</span>
                    </li>);
                })}
            </ul>
        </StyledBox>
    );
};

export default PageList;
