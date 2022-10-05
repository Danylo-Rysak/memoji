import {useState} from 'react'
import Card from "./Card/Card";
import "./Cards.css";
import "./../Modal/Modal.css";
import Modal from "../Modal/Modal";
import {resetTimer} from "../../redux/app-reducer";
import {useDispatch} from "react-redux";

const initialCards = [
    {id: 1, img: '/img/pig.png', stat: ""},
    {id: 2, img: '/img/pig.png', stat: ""},
    {id: 3, img: '/img/mouse.png', stat: ""},
    {id: 4, img: '/img/mouse.png', stat: ""},
    {id: 5, img: '/img/monkey.png', stat: ""},
    {id: 6, img: '/img/monkey.png', stat: ""},
    {id: 7, img: '/img/dog.png', stat: ""},
    {id: 8, img: '/img/dog.png', stat: ""},
    {id: 9, img: '/img/cow.png', stat: ""},
    {id: 10, img: '/img/cow.png', stat: ""},
    {id: 11, img: '/img/cat.png', stat: ""},
    {id: 12, img: '/img/cat.png', stat: ""}
]

function Cards({startTimer, isTimerStarted, convertedTimer, statusWin, statusLoose}) {
    const [icons, setIcons] = useState(initialCards.sort(() => Math.random() - 0.5));

    const [prev, setPrev] = useState(-1);

    const reCode = (current) => {
        icons[current].stat = "correct";
        icons[prev].stat = "correct";
        setIcons([...icons]);
        setPrev(-1);
    }

    const checkIcons = (current) => {
        if (icons[prev].id % 2 !== 0 && icons[current].id === icons[prev].id + 1) {
            reCode(current);
        } else if (icons[prev].id % 2 === 0 && icons[current].id === icons[prev].id - 1) {
            reCode(current);
        } else {
            icons[current].stat = "wrong";
            icons[prev].stat = "wrong";
            setIcons([...icons]);
            setTimeout(() => {
                icons[current].stat = "";
                icons[prev].stat = "";
                setIcons([...icons]);
                setPrev(-1);
            }, 1000)
        }
    }

    let count = 0;
    const [flag, setFlag] = useState(false);
    const countCorrect = () => {
        for (let i = 0; i < icons.length; i++) {
            if (icons[i].stat === "correct") {
                count++;
            }
        }
    }

    const handleClick = (id) => {
        if (!isTimerStarted) {
            startTimer();
        }
        if (prev === -1) {
            icons[id].stat = "active";
            setIcons([...icons]);
            setPrev(id);
        } else {
            checkIcons(id);
        }
        countCorrect();
        if (count === 12) {
            setFlag(true);
        }
    }

    const checkResult = () => {
        if (flag === true) {
            return statusWin;
        } else if (convertedTimer.m === "00" && convertedTimer.s === "00") {
            return statusLoose;
        }
    }

    const dispatch = useDispatch();
    const resetData = () => {
        for (let i = 0; i < icons.length; i++) {
            icons[i].stat = "";
        }
        setPrev(-1);
        setFlag(false);
        dispatch(resetTimer());
    }

    return (
        <div className="container cards_filter">
            {flag === true || convertedTimer.m === "00" && convertedTimer.s === "00" ?
                <Modal checkResult={checkResult} resetData={resetData}/> : null}
            {icons.map((icon, index) => (
                <Card key={index} icon={icon} id={index} count={count} flag={flag} handleClick={handleClick}/>
            ))}
        </div>
    )
}

export default Cards;