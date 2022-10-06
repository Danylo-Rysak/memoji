import {useEffect, useState} from 'react'
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
];

const Cards = ({startTimer, isTimerStarted, convertedTimer, statusWin, statusLoose}) => {
  const [icons, setIcons] = useState(initialCards.sort(() => Math.random() - 0.5));
  const [disabledIcon, setDisabledIcon] = useState(null);
  const [disabledAllIcons, setDisabledAllIcons] = useState(false);
  const [clickedIcons, setClickedIcons] = useState([]);
  const [prev, setPrev] = useState(-1);
  const [intervalId, setIntervalId] = useState(null);
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    handleDisabled(clickedIcons[0]);
    if (clickedIcons.length !== 0) {
      if ((clickedIcons[0].stat === "correct" && clickedIcons[1].stat === "correct") || (clickedIcons[0].stat === "wrong" && clickedIcons[1].stat === "wrong")) {
        setTimeout(() => {
          setDisabledAllIcons(false);
          setDisabledIcon(null);
          setClickedIcons([]);
        }, 1000)
      }
    }
  }, [clickedIcons]);

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
  const countCorrect = () => {
    for (let i = 0; i < icons.length; i++) {
      if (icons[i].stat === "correct") {
        count++;
      }
    }
  }

  const handleClick = (id) => {
    if (!isTimerStarted) {
      setIntervalId(startTimer());
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

  const handleClickedIcon = (clickedIcon) => {
    setClickedIcons(prevState => [...prevState, clickedIcon]);
  }

  const handleDisabled = (clickedIcon) => {
    if (clickedIcons.length === 1) {
      setDisabledIcon(clickedIcon.id);
    } else if (clickedIcons.length > 1) {
      setDisabledAllIcons(true);
    }
  }

  const checkResult = () => {
    if (flag === true) {
      return statusWin;
    } else if (convertedTimer.m === "00" && convertedTimer.s === "00") {
      return statusLoose;
    }
  }

  const stopTimer = (intervalId) => {
    clearInterval(intervalId);
  }

  const resetData = () => {
    for (let i = 0; i < icons.length; i++) {
      icons[i].stat = "";
    }
    setPrev(-1);
    setFlag(false);
    dispatch(resetTimer());
    stopTimer(intervalId);
    setDisabledAllIcons(false);
  }

  return (
    <div className="container cards_filter">
      {flag === true || convertedTimer.m === "00" && convertedTimer.s === "00" ?
        <Modal checkResult={checkResult} resetData={resetData} setDisabledAllIcons={setDisabledAllIcons}/> : null}
      {icons.map((icon, index) => (
        <Card disabled={disabledIcon === icon.id || disabledAllIcons} key={index} icon={icon} clickedId={icon.id}
              id={index} count={count} flag={flag} handleClick={handleClick} handleClickedIcon={handleClickedIcon}/>
      ))}
    </div>
  )
}

export default Cards;