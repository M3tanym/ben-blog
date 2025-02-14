import React, {useEffect, useState} from 'react';
import StyledLink from "./StyledLink";

const PageList = () => {
    const [pages, setPages] = useState([]);
    useEffect(() => {
        fetch('https://api.github.com/repos/M3tanym/ben-blog/git/trees/2f86375dd342941c812c3f5cad8906cd5624b55b')
            .then(response => {
                if (!response.ok) {
                    throw new Error("error fetching pages: " + response.status);
                }
                return response.json();
            }).then(json => {
                const reduced = json.tree.reduce((result, page) => {
                    if (page.type === 'blob') {
                        result.push(page.path.split('.')[0]);
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
