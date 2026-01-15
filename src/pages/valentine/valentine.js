import React, {useState} from 'react';
import Button from '@mui/material/Button';
import './valentine.css'
import Sheep from './sheep.svg';
import {useTheme} from '@mui/material/styles';

const Valentine = () => {
    const [page, setPage] = useState(0);
    const [fontSize, setFontSize] = useState(20);
    const theme = useTheme();
    const darkMode = theme.palette.mode === 'dark';
    const imageFilter = darkMode ? 'invert(100%)' : '';
    const oops = [
        'Whoops, I think you meant to click yes!',
        'Oops, did you click the wrong one?',
        'Are you sure??'
    ];

    function getOops() {
        return oops[Math.floor(Math.random() * oops.length)];
    }

    const letterPage = () => {
        return (
            <div className="wrapper">
                <div className="lid one"></div>
                <div className="lid two"></div>
                <div className="envelope"></div>
                <div className="letter">
                    <button onClick={() => {
                        setPage(1);
                    }}>✨ open ✨
                    </button>
                </div>
            </div>
        );
    }

    const yayPage = () => {
        return (
            <div className="main">
                <br/>
                <br/>
                <div className="fancy">Yay!! 💘💖🥰</div>
                <br/>
                <p>I love you!!</p>
                <img src={Sheep} alt={"valentines day sheep"} style={{width: "100vw", filter: imageFilter}}/>
            </div>
        );
    };
    const questionPage = () => {
        return (
            <div className="main">
                <div className="fancy">Will you be my Valentine?</div>
                <br/>
                <center>
                    <h2>🥺 👉👈</h2>
                </center>
                <center>
                    <Button className="button" style={{fontSize: fontSize}} size="large" color="secondary"
                            variant="contained"
                            onClick={() => setPage(2)}>Yes 🥰</Button>
                    <Button className="button" size="large" color="secondary" variant="contained"
                            onClick={() => {
                                alert(getOops());
                                setFontSize(fontSize + 10);
                            }}>No 🥺</Button>
                </center>

                <div className="container">
                    <div className="mainTulip tulip">
                        <div className="stem">
                            <div className="tulipHead">
                                <div className="tulipHair lightTulip lightTulip-1"></div>
                                <div className="tulipHair darkTulip darkTulip-1"></div>
                                <div className="tulipHair lightTulip lightTulip-2"></div>
                                <div className="tulipHair darkTulip darkTulip-2"></div>
                                <div className="tulipHair lightTulip lightTulip-3"></div>
                                <div className="tulipFace">
                                    <div className="leftEye tulipEyes"></div>
                                    <div className="rightEye tulipEyes"></div>
                                    <div className="tulipSmile"></div>
                                    <div className="leftBlush tulipBlush"></div>
                                    <div className="rightBlush tulipBlush"></div>
                                </div>
                            </div>
                            <div className="rightTulipLeaf tulipLeaf leaf"></div>
                            <div className="leftTulipLeaf tulipLeaf leaf"></div>
                            <div className="rightStemLeaf stemLeaf leaf"></div>
                            <div className="leftStemLeaf stemLeaf leaf"></div>
                        </div>
                    </div>
                    <div className="leftBabyTulip tulip">
                        <div className="stem">
                            <div className="tulipHead">
                                <div className="tulipHair lightTulip lightTulip-1"></div>
                                <div className="tulipHair darkTulip darkTulip-1"></div>
                                <div className="tulipHair lightTulip lightTulip-2"></div>
                                <div className="tulipHair darkTulip darkTulip-2"></div>
                                <div className="tulipHair lightTulip lightTulip-3"></div>
                                <div className="tulipFace">
                                    <div className="leftEye tulipEyes"></div>
                                    <div className="rightEye tulipEyes"></div>
                                    <div className="tulipSmile"></div>
                                    <div className="leftBlush tulipBlush"></div>
                                    <div className="rightBlush tulipBlush"></div>
                                </div>
                            </div>
                            <div className="rightTulipLeaf tulipLeaf leaf"></div>
                            <div className="leftTulipLeaf tulipLeaf leaf"></div>
                            <div className="rightStemLeaf stemLeaf leaf"></div>
                            <div className="leftStemLeaf stemLeaf leaf"></div>
                        </div>
                    </div>
                    <div className="rightBabyTulip tulip">
                        <div className="stem">
                            <div className="tulipHead">
                                <div className="tulipHair lightTulip lightTulip-1"></div>
                                <div className="tulipHair darkTulip darkTulip-1"></div>
                                <div className="tulipHair lightTulip lightTulip-2"></div>
                                <div className="tulipHair darkTulip darkTulip-2"></div>
                                <div className="tulipHair lightTulip lightTulip-3"></div>
                                <div className="tulipFace">
                                    <div className="leftEye tulipEyes"></div>
                                    <div className="rightEye tulipEyes"></div>
                                    <div className="tulipSmile"></div>
                                    <div className="leftBlush tulipBlush"></div>
                                    <div className="rightBlush tulipBlush"></div>
                                </div>
                            </div>
                            <div className="rightTulipLeaf tulipLeaf leaf"></div>
                            <div className="leftTulipLeaf tulipLeaf leaf"></div>
                            <div className="rightStemLeaf stemLeaf leaf"></div>
                            <div className="leftStemLeaf stemLeaf leaf"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const getPage = () => {
        if (page === 0) {
            return letterPage();
        } else if (page === 1) {
            return questionPage();
        } else if (page === 2) {
            return yayPage();
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
