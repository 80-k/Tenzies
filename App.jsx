import { useState } from "react"
import Die from "./components/Die"

const getRandomNumber = (n) => {
    return Math.ceil(Math.random()*n)
}

const initDices = (n) => {
    let dices = []
    for (let i=0; i<n; i++){
        dices.push({
            id: i,
            value: getRandomNumber(n),
            hold: false
        })
    }
    return dices
}

export default function App() {
    const MAX_NUMBER = 10
    const DICE_NUMBER = 10
    const timePenalty = 2.9
    const rollingPenalty = 0.5
    const [randomTarget, setRandomTarget] = useState(getRandomNumber(MAX_NUMBER))
    const [dices, setDices] = useState(initDices(DICE_NUMBER))
    const [score, setScore] = useState(0)
    const [penalty, setPenalty] = useState(0)
    const [startTime, setStartTime] = useState(new Date())
    const [consumedTime, setConsumedTime] = useState(0)
    const [correctAnswer, setCorrectAnswer] = useState(0)
    const [rollCount, setRollCount] = useState(0)
    const [scoreChecking, setScoreChecking] = useState(false)

    const DiceFc = dices.map((dice, idx) => {
        return <Die
                key={idx}
                dice={dice}
                setDices={setDices}/>
    })

    const handleReset = () => {
        setRollCount(0)
        setRandomTarget(getRandomNumber(10))
        setDices(initDices(DICE_NUMBER))
        setStartTime(new Date())
        setConsumedTime(0)
    }

    const handleToGame = () => {
        setScoreChecking(curr => !curr)
    }

    const handleScore = (e) => {
        const now = new Date()
        const diff_ms = now - startTime
        const to_sec= diff_ms / 1000
        setConsumedTime(diff_ms)

        const penalty = (rollCount * rollingPenalty) + (to_sec * timePenalty)
        setPenalty(penalty)
        let correct = 0
        dices.forEach(item => {
            if (item.value == randomTarget && item.hold){
                correct++
            }
        })
        setCorrectAnswer(correct)
        const score = Number((correct * 10) - penalty).toFixed(2)
        console.log(score, penalty)
        setScore(score)
        setScoreChecking(true)
    }

    const handleRoll = () => {
        setRollCount(curr => curr + 1)
        setDices(curr => {
            return curr.map(item=>{
            if (item.hold){
                return item
            } else {
                return {...item, value: getRandomNumber(MAX_NUMBER)}
            }})
        })
    }

    const ScoreBoard = (props) => {
        return (
            <div className="score-board">
                <h5>Max Score: {100}</h5>
                <h5>Correct: {props.correctAnswer}</h5>
                <h5>Consumed Time: {props.consumedTime / 1000} s</h5>
                <h5>Minus Score: {props.penalty}</h5>
                <h1>{props.score}</h1>
                <h5>re-rolled: {props.rollCount}</h5>
                <button onClick={handleToGame}>Back to Game</button>
            </div>
        )
    }

    const handleTarget = () => {
        setRandomTarget(getRandomNumber(10))
    }

    return (
        <main className="main">
            {scoreChecking ?
            <ScoreBoard
                score={score}
                consumedTime={consumedTime}
                rollCount={rollCount}
                correctAnswer={correctAnswer}
                penalty={penalty} /> :
            <>
                <button onClick={handleTarget} className="target-number">{randomTarget}</button>
                <h5>Find Number</h5>
                <section className="dice-container">
                    {DiceFc}
                </section>
                <div className="controller">
                    <button onClick={handleRoll} className="roll">Roll</button>
                    <div>
                        <button onClick={handleScore} className="score">Score</button>
                        <button onClick={handleReset} className="reset">Reset</button>
                    </div>
                </div>
                <pre>Never slip your finger</pre>
            </>
            }
        </main>
    )
}