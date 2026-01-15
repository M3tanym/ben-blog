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
        <>
            <ul style={{listStyleType: 'none'}}>
                {pages.map(page => {
                    return <li key={page.path}><StyledLink href={'/' + page.path}>{page.date}: {page.name}</StyledLink></li>
                })}
            </ul>
        </>
    );
};

export default PageList;
