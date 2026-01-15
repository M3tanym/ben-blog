import React, {useEffect, useState} from 'react';
import StyledLink from './StyledLink';

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
                console.log(json);
            const reduced = json.tree.reduce((result, page) => {
                if (page.type === 'blob') {
                    if (page.path.startsWith('src/pages/') && page.path.endsWith('.md')) {
                        const name = page.path.split('.')[0].split('/').at(-2);
                        result.push(name);
                    }
                }
                return result;
            }, []);
            console.log(reduced);
            setPages(reduced);
        });
    }, []);

    return (
        <>
            <p>pages:</p>
            <ul>
                {pages.map(page => {
                    return <li key={page}><StyledLink href={'/' + page}>{page}</StyledLink></li>
                })}
            </ul>
        </>
    );
};

export default PageList;
