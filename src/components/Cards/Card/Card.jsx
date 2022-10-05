import "./../Cards.css";

const Card = ({icon, id, handleClick}) => {
    const iconClass = icon.stat ? " active " + icon.stat : ""

    return (
        <div>
            <div className={"card" + iconClass} onClick={() => handleClick(id)}>
                <img src={icon.img} alt="icon"/>
            </div>
        </div>
    )
}

export default Card