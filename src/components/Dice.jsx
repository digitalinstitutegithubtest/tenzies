/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


const Dice = ({ dice, toggle }) => {
    return (
        <button
            className={`btn ${dice.checked ? 'green' : 'white'}`}
            onClick={() => toggle(dice.id)}
        >
            {dice.number}
        </button>
    )
}

export default Dice