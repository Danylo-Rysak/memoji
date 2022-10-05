const SET_TIMER = "SET-TIMER";
const COUNT_DOWN = "COUNT-DOWN";
const RESET_TIMER = "RESET-TIMER";

const initialState = {
  timeout: 5,
  timer: null,
  convertedTimer: {m: "01", s: "00"},
  isTimerStarted: false,
  statusWin: "You are win",
  statusLoose: "You are loose"
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TIMER:
      return {
        ...state,
        timer: {
          m: Math.floor(state.timeout / 60),
          s: state.timeout % 60
        }
      }
    case COUNT_DOWN: {
      const changeTime = (time) => {
        if (time.s > 0) {
          return {...time, s: time.s - 1}
        } else if (time.s === 0 && time.m > 0) {
          return {m: time.m - 1, s: 59}
        } else return time
      }
      const convertTimer = (timer) => {
        return {
          m: timer.m.toString().length === 1 ? `0${timer.m}` : `${timer.m}`,
          s: timer.s.toString().length === 1 ? `0${timer.s}` : `${timer.s}`
        }
      }
      return {
        ...state,
        timer: changeTime(state.timer),
        convertedTimer: convertTimer(state.timer),
        isTimerStarted: true
      }
    }
    case RESET_TIMER: {
      return {
        ...state,
        timer: {
          m: Math.floor(state.timeout / 60),
          s: state.timeout % 60
        },
        convertedTimer: initialState.convertedTimer,
        isTimerStarted: initialState.isTimerStarted,
      }
    }
    default:
      return state;
  }
}

export const setTimer = () => ({type: SET_TIMER});
export const countDown = (timer) => ({type: COUNT_DOWN, timer});
export const resetTimer = () => ({type: RESET_TIMER});

export default appReducer;