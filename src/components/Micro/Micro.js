import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BsFillMicFill } from "react-icons/bs";
import "tippy.js/dist/tippy.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import styles from "./Micro.module.scss";
import Button from "components/Button/Button";

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "vi-VN";

const cx = classNames.bind(styles);

function Micro({ setSearch }) {
    const [isListening, setIsListening] = useState(false);
    const [modal, setModal] = useState(false);
    const [script, setScript] = useState("");

    const handleClickFinish = () => {
        setSearch(script);

        handleClickCancel();
    };

    const handleClickCancel = () => {
        setModal(false);
        setIsListening(false);

        mic.stop();
        mic.onend = () => {
            console.log("Stopped");
            setScript("");
        };
    };

    useEffect(() => {
        const handleListen = () => {
            if (isListening) {
                mic.start();
                mic.onend = () => {
                    console.log("Stopped");
                    mic.stop();
                    setIsListening(false);
                    setModal(false);
                    setScript("");
                };
                mic.onstart = () => {
                    console.log("Mics on");
                };

                mic.onresult = (e) => {
                    const transcript = Array.from(e.results)
                        .map((result) => result[0])
                        .map((result) => result.transcript)
                        .join("");
                    setScript(transcript);
                    mic.onerror = (e) => {
                        console.log(e.error);
                    };
                };
            }
        };

        handleListen();
    }, [isListening, setSearch]);

    return (
        <>
            <Tippy content="Tìm kiếm bằng giọng nói">
                <div
                    className={cx("wrapper")}
                    onClick={() => {
                        setIsListening(true);
                        setModal(true);
                    }}
                >
                    <BsFillMicFill size={20} />
                </div>
            </Tippy>
            <Modal isOpen={modal} toggle={handleClickCancel}>
                <ModalHeader toggle={handleClickCancel}>
                    Tìm kiếm bằng giọng nói
                </ModalHeader>
                <ModalBody>
                    {script ? (
                        script
                    ) : (
                        <div className={cx("loader")}>
                            <div className={cx("scanner")}>
                                <span>Listening...</span>
                            </div>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button outline onClick={handleClickCancel}>
                        Hủy
                    </Button>
                    <Button primary onClick={handleClickFinish}>
                        Xong
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

Micro.propTypes = {
    setSearch: PropTypes.func.isRequired,
};

export default Micro;
