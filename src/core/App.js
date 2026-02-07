import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import {SnackbarProvider, useSnackbar} from 'notistack';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Home';
import Editor from '../pages/editor/editor';
import Valentine from '../pages/valentine/valentine';
import PageLoader from './PageLoader';
import {grey} from "@mui/material/colors";
import Here from "../pages/here/here";

const themeLight = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: "#ffffff",
        },
        text: {
            primary: "#242424",
        },
        primary: {
            main: grey[300],
        },
    }
});

const themeDark = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: "#121212",
        },
        text: {
            primary: "rgba(255, 255, 255, 0.87)",
        },
    }
});

const App = () => {
    const darkMode = !useMediaQuery('(prefers-color-scheme: light)');
    const {enqueueSnackbar} = useSnackbar();
    const produceSnackBar = (message, variant = 'error') => enqueueSnackbar(message, {variant: variant});
    const OverrideRouter = () => {
        if (window.location.host.includes('valentine.bengillett.com')) {
            return (<Valentine/>);
        }
        return (
            <BrowserRouter produceSnackBar={produceSnackBar}>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='*' element={<PageLoader/>}/>
                    <Route path='editor' element={<Editor/>}/>
                    <Route path='valentine' element={<Valentine/>}/>
                    <Route path='here' element={<Here/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
    return (
        <>
            <meta name='theme-color' content={'background.default'}/>
            <ThemeProvider theme={darkMode ? themeDark : themeLight}>
                <CssBaseline/>
                <SnackbarProvider maxSnack={3} preventDuplicate>
                    {OverrideRouter()}
                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
};

export default App;
