import React, {useEffect, useState} from 'react';
import StyledLink from './StyledLink';
import {Typography} from "@mui/material";
import {styled} from "@mui/system";
import Box from "@mui/material/Box";

const StyledBox = styled(Box)(
    () => `
    .table-of-contents {
        margin-top: 0.6em;
        margin-bottom: 0.5em;
        text-align: center;
        font-size: 34px;
    }
    
    .page-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.6em;
        font-size: 20px;
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
            let reduced = json.tree.reduce((result, page) => {
                if (page.type === 'blob') {
                    if (page.path.match(/^src\/pages\/\d\d-\d\d-\d\d-.+\.md/)) {
                        const path = page.path.split('.')[0].split('/').at(-2);
                        const ds = path.substring(0, 8);
                        const date = new Date(Number('20' + ds.substring(6, 8)), Number(ds.substring(0, 2)) - 1, Number(ds.substring(3, 5)));
                        const name = path.substring(9).replaceAll('-', ' ');
                        result.push({'path': path, 'name': name, 'date': date});
                    }
                }
                return result;
            }, []);
            reduced = reduced.sort((a, b) => b.date - a.date);
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
                        <span className={'page-date'}>{page.date.toISOString().slice(0, 10)}</span>
                    </li>);
                })}
            </ul>
        </StyledBox>
    );
};

export default PageList;
