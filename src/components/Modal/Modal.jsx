import "./Modal.css";

const Modal = ({checkResult, resetData, setDisabledAllIcons}) => {
  return (
    <div className="modal_wrapper">
      <p className="result">{checkResult()}</p>
      <button className="button" onClick={resetData}>Play again</button>
      {setDisabledAllIcons(true)}
    </div>
  )
}

export default Modal;