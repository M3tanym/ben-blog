import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MarkdownLoader from "./MarkdownLoader";
import Editor from "./Editor";
import Home from "./Home";

const MainRouter = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home {...props}/>}/>
                <Route path="editor" element={<Editor {...props}/>}/>
                <Route path="*" element={<MarkdownLoader {...props}/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;
