import React, {useState} from 'react';
import {Container} from "@mui/material";
import {Button} from "@mui/base";

const Valentine = () => {
    const [page, setPage] = useState(0);

    const getPage = () => {
        console.log(page);
        if (page === 0) {
            return (<>
                <Button onClick={() => setPage(1)}>to 1</Button>
            </>);
        }
        else if (page === 1) {
            return (<>
                <Button onClick={() => setPage(0)}>to 0</Button>
            </>);
        }
    }

    return (
        <Container>
            <title>Be Mine</title>
            <p>{page}</p>
            {getPage()}
        </Container>
    );
};

export default Valentine;
