import React, {useEffect, useState} from 'react';
import StyledLink from "./StyledLink";

const PageList = () => {
    const [pages, setPages] = useState([]);
    useEffect(() => {
        fetch('https://api.github.com/repos/M3tanym/ben-blog/git/trees/main?recursive=true')
            .then(response => {
                if (!response.ok) {
                    throw new Error("error fetching pages: " + response.status);
                }
                return response.json();
            }).then(json => {
                const reduced = json.tree.reduce((result, page) => {
                    if (page.type === 'blob') {
                        const base = page.path.substring(0, 10);
                        if (base === 'src/pages/') {
                            const path = page.path.substring(10);
                            if (!path.includes('/')) {
                                const name = path.split('.')[0];
                                result.push(name);
                            }
                        }
                    }
                    return result;
                }, []);
                setPages(reduced);
        });
    }, []);

    return (
        <>
            <p>pages:</p>
            <ul>
                { pages.map(page => {return <li key={page}><StyledLink href={'/' + page}>{page}</StyledLink></li>}) }
            </ul>

        </>
    );
};

export default PageList;
