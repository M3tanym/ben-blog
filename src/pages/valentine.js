import React, {useState} from 'react';
import {Container} from "@mui/material";
import Button from '@mui/material/Button';
import {Grid} from "@mui/system";
import "./valentine/Valentine.css"

const Valentine = () => {
    const [page, setPage] = useState(0);

    const letterPage = () => {
        return (
            <div className="wrapper">
                <div className="lid one"></div>
                <div className="lid two"></div>
                <div className="envelope"></div>
                <div className="letter">
                    <button onClick={() => {setPage(1);}}>Open</button>
                </div>
            </div>
        );
    };

    const questionPage = () => {
        return (
            <Container>
                <Grid
                    container
                    direction={"column"}
                    alignContent={"center"}
                    alignItems={"center"}
                    spacing={2}
                    className="main"
                >
                    <Grid item>
                        <div className="fancy">Will you be my Valentine? 💘</div>
                        <Button onClick={() => setPage(1)}>Yes</Button>
                        <Button onClick={() => setPage(1)}>No</Button>
                    </Grid>
                </Grid>
            </Container>
        );
    };

    const getPage = () => {
        if (page === 0) {
            return letterPage();
        } else if (page === 1) {
            return questionPage();
        }
    }

    return (
        <>
            <title>Be Mine? 💘</title>
            {getPage()}
        </>
    );
};

export default Valentine;
