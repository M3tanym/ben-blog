import React, {useMemo} from "react";

import useMediaQuery from '@mui/material/useMediaQuery';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import {SnackbarProvider, useSnackbar} from 'notistack';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import MarkdownLoader from "./MarkdownLoader";
import Editor from "./pages/editor";
import Valentine from "./pages/valentine";

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
    const {enqueueSnackbar} = useSnackbar();
    const produceSnackBar = (message, variant = "error") => enqueueSnackbar(message, {variant: variant});
    const inner = () => {
        if (window.location.host === 'valentine.bengillett.com') {
            return (<Valentine/>);
        }
        return (
            <BrowserRouter produceSnackBar={produceSnackBar} darkMode={darkMode}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<MarkdownLoader/>}/>
                    <Route path="editor" element={<Editor/>}/>
                    <Route path="valentine" element={<Valentine/>}/>
                </Routes>
            </BrowserRouter>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <meta name="theme-color" content={metaTheme}/>
            <CssBaseline/>
            <SnackbarProvider maxSnack={3} preventDuplicate>
                {inner()}
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
