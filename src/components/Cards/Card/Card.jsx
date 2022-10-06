import "./../Cards.css";

const Card = ({icon, id, handleClick, disabled, handleClickedIcon}) => {
  const iconClass = icon.stat ? " active " + icon.stat : ""

  return (
    <div>
      <div className={`card ${iconClass} ${disabled && "disabled"}`} onClick={() => {
        handleClick(id);
        handleClickedIcon(icon);
      }}>
        <img src={icon.img} alt="icon"/>
      </div>
    </div>
  )
}

export default Card