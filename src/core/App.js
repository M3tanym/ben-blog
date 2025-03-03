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

const themeLight = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: "#ffffff"
        }
    }
});

const themeDark = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: "#0d1116"
        },
        text: {
            primary: "#f0f6fc"
        }
    }
});

const App = () => {
    const darkMode = !useMediaQuery('(prefers-color-scheme: light)');
    const {enqueueSnackbar} = useSnackbar();
    const produceSnackBar = (message, variant = 'error') => enqueueSnackbar(message, {variant: variant});
    const OverrideRouter = () => {
        if (window.location.host === 'valentine.bengillett.com') {
            return (<Valentine/>);
        }
        return (
            <BrowserRouter produceSnackBar={produceSnackBar}>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='*' element={<PageLoader/>}/>
                    <Route path='editor' element={<Editor/>}/>
                    <Route path='valentine' element={<Valentine/>}/>
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
