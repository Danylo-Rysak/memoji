import "./Timer.css";
import {useDispatch, useSelector} from "react-redux";
import {countDown, setTimer} from "../../redux/app-reducer";
import {useEffect} from "react";
import Cards from "../Cards/Cards";

const Timer = () => {
    const state = useSelector((state) => state.timerData);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setTimer());
    }, [])

    const startTimer = () => {
        dispatch(countDown());
        let intervalId = setInterval(() => {
            dispatch(countDown());
        }, 1000)

        setTimeout(() => {
            clearInterval(intervalId)
        }, state.timeout * 1000)
    }

    if (state.timer === null) {
        return null;
    }

    return (
        <div>
            <Cards isTimerStarted={state.isTimerStarted} startTimer={startTimer}
                   convertedTimer={state.convertedTimer} statusWin={state.statusWin}
                   statusLoose={state.statusLoose}/>
            {state.convertedTimer && <p className="timer">{state.convertedTimer.m}:{state.convertedTimer.s}</p>}
        </div>
    )
}

export default Timer;