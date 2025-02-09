import React, {useMemo} from "react";

import useMediaQuery from '@mui/material/useMediaQuery';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import {SnackbarProvider, useSnackbar} from 'notistack';
import MainRouter from "./MainRouter";

const LoadApp = props => {
    const {enqueueSnackbar} = useSnackbar();
    const produceSnackBar = (message, variant = "error") => enqueueSnackbar(message, {variant: variant});
    return <MainRouter produceSnackBar={produceSnackBar} {...props}/>;
};

const App = () => {
    const darkMode = !useMediaQuery('(prefers-color-scheme: light)');
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: darkMode ? 'dark' : 'light',
                },
            }),
        [darkMode],
    );
    const metaTheme = darkMode ? "#303030" : "#fafafa";

    return (
        <ThemeProvider theme={theme}>
            <meta name="theme-color" content={metaTheme}/>
            <CssBaseline/>
            <SnackbarProvider maxSnack={3} preventDuplicate>
                <LoadApp darkMode={darkMode}/>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
