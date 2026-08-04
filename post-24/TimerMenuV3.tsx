import {formatTimerString} from "./timehelpers"
import {useState, useEffect} from "preact/hooks"

interface TimerProps {
    title: string
    workTime: number
    restTime: number
    prepTime: number
    sets: number
    clr: string
}

type TimerPhase = "Starting in..." | "Working" | "Resting" | "Finished"

export default function TimerMenuV3({sets, prepTime, restTime, workTime, clr}: TimerProps) {

    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    // prep, work, rest
    const [currentPhase, setCurrentPhase] = useState<TimerPhase>(prepTime ? "Starting in..." : "Working")
    const [remainingSets, setRemainingSets] = useState<number>(sets)
    const [timeLeft, setTimeLeft] = useState(prepTime ? prepTime : workTime)

    const handlePlay = (e: MouseEvent) => {
        e.stopPropagation()
        setIsPlaying(prev => !prev)

    }

    const resetTimer = (e: MouseEvent) => {
        e.stopPropagation()
        setCurrentPhase(prepTime ? "Starting in..." : "Working")
        setTimeLeft(prepTime ? prepTime : workTime)
        setIsPlaying(false)
    }
    // useEffect for handling countdowns
    useEffect(() => {
        // Guard for the initial effect
        if (!isPlaying) return;

     const timer = setInterval(() => {
        // Guard for the initial effect


        setTimeLeft(prev => prev -1)
     }, 1000)

     return () => clearInterval(timer)


    }, [isPlaying])

    // useEffect for handling phase changes.
    useEffect(() => {

     // Edge case: the last work phase
     if (remainingSets == 0) {

            setCurrentPhase("Finished")
            setIsPlaying(false)
            const timeout = setTimeout( () => {
                setCurrentPhase(prepTime ? "Starting in..." : "Working")
                setTimeLeft(prepTime ? prepTime : workTime)
                setIsPlaying(false)
                setRemainingSets(sets)
            }, 2000)

            return () => clearTimeout(timeout)
      }

    if (timeLeft != 0) return;

    switch (currentPhase) {

        case "Starting in...":
            setCurrentPhase("Working")
            setTimeLeft(workTime)
            break

        case "Working":
            setCurrentPhase("Resting")
            setTimeLeft(restTime)
            setRemainingSets(prev => prev - 1)
            break;

        case "Resting": 
            setCurrentPhase("Working")
            setTimeLeft(workTime)
            break;

    }

}, [timeLeft])



    return (
        <div className="relative">

            {currentPhase == "Finished" && (

                    <div 
                    style ={{backgroundColor: `${clr}`}}
                    className=" flex items-center rounded-md justify-center m-auto z-2 absolute h-[100%] w-[100%]  text-5xl"> 
                        Well done
                    </div>


            ) 
            }

            {/* Title */}
            <div  className="flex flex-col rounded-md p-2" style ={{border: `0.5px dashed ${clr}`}}>
            <span className="phase-title text-center text-sm bold ">  {currentPhase} </span>
            
            {/* Timer  */}
            <span className="time-displayer text-center">
                { formatTimerString(timeLeft)}
            </span>

            <div className="timer-btns-box">

                
                <button
                onClick = {(e) => resetTimer(e)}
                >

                    <img
                        className="p-1"
                        width={45}
                        height={50}
                        src="/images/replay.svg"
                        alt="Replay"
                    />
                </button>

               
                    <button
                     onClick= {(e) => handlePlay(e)}>
                        {isPlaying ? (
                        <img
                            className="p-1"
                            width={45}
                            height={50}
                            src="/images/pause.svg"
                            alt="Pause"
                        />
                        ) :  <img
                            className="p-1"
                            width={45}
                            height={50}
                            src="/images/play.svg"
                            alt="Play"
                        />}
                    </button>
             
                 
              

            </div>

            <div className="remaining-sets">
                <i>Remaining sets: {remainingSets}</i>
            </div>
            </div>

        </div>
    )
}