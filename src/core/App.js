import React, {useMemo} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import {SnackbarProvider, useSnackbar} from 'notistack';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Home';
import Editor from '../pages/editor/editor';
import Valentine from '../pages/valentine/valentine';
import PageLoader from './PageLoader';

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
    const metaTheme = darkMode ? '#121212' : '#ffffff';
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
            <meta name='theme-color' content={metaTheme}/>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <SnackbarProvider maxSnack={3} preventDuplicate>
                    {OverrideRouter()}
                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
};

export default App;
