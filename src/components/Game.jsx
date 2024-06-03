/* eslint-disable no-unused-vars */
import { useEffect } from "react"
import { useState } from "react"
import Dice from "./Dice"
import Confetti from 'react-confetti'

const Game = () => {
    const [dices, setDices] = useState([])
    const [winner, setWinner] = useState(false)

    useEffect(() => {
        if (checkWinner()) {
            setWinner(true)
        }
    }, [dices])

    useEffect(() => {
        setUpGame()
    }, [])

    const setUpGame = () => {
        const tempDices = []
        for (let i = 0; i < 10; i++) {
            const randomNumber = Math.ceil(Math.random() * 6)
            const diceItem = { number: randomNumber, checked: false, id: i }
            tempDices.push(diceItem)
        }
        setDices(tempDices)
    }

    const toggle = (id) => {
        setDices(prevDices => {
            return prevDices.map(dice => {
                return dice.id === id ? { ...dice, checked: !dice.checked } : dice
            })
        })
    }

    const onButtonClick = () => {
        if (checkWinner()) {
            setUpGame()
        } else {
            setDices(prevDices => (
                prevDices.map(dice => {
                    const randomNumber = Math.ceil(Math.random() * 6)
                    return dice.checked ? dice : { ...dice, number: randomNumber }
                })
            ))
        }

    }

    const checkWinner = () => {
        // let count = 0;
        // let number = 0
        // dices.forEach(dice => {
        //     if (dice.id === 0) {
        //         number = dice.number
        //     }

        //     if (dice.checked && dice.number === number) {
        //         count++
        //     }
        // })
        // return count

        return dices.every((dice) => {
            return dice.checked && dice.number === dices[0].number
        })
    }

    return (
        <div className="game-box">
            {winner && <Confetti />}
            <div className="box-text">
                <h3>Tenzies</h3>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className="box-content">
                {
                    dices.map((dice, i) => (
                        <Dice
                            key={i}
                            dice={dice}
                            toggle={toggle}
                        />
                    ))
                }
            </div>
            <div className="center">
                <button
                    className="primary-btn"
                    onClick={onButtonClick}
                >
                    {winner ? "New Game" : "Roll"}
                </button>
            </div>
        </div>
    )
}

export default Game