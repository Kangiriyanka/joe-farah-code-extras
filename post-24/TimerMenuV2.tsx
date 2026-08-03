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

type TimerPhase = "Ready to Start?" | "Prepping" | "Working" | "Resting"

export default function TimerMenuV2({sets, prepTime, restTime, workTime, title, clr}: TimerProps) {

    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    // prep, work, rest
    const [currentPhase, setCurrentPhase] = useState<TimerPhase>("Ready to Start?")
    const [setsRemaining, setSetsRemaining] = useState<number>(sets)
    const [timeLeft, setTimeLeft] = useState(prepTime ? prepTime : workTime)

    const handlePlay = (e) => {
        e.stopPropagation()
        setIsPlaying(prev => !prev)

    }

    useEffect(() => {


     const interval = setInterval(() => {

        setTimeLeft(prev => prev -1)
     },1000)

     return () => clearInterval(interval)


    }, [isPlaying])

    // useEffect for handling phase changes.
    useEffect(() => {

        if (setsRemaining == 0) return
        if (timeLeft !=0  ) return;
        

        switch (currentPhase) {

            case "Prepping":
                setCurrentPhase("Working")
                setTimeLeft(workTime)
                break;

    

            case "Working":
                setCurrentPhase("Resting")
                setTimeLeft(restTime)
                setSetsRemaining(prev => prev -1)
                break;

            case "Resting": 
                setCurrentPhase("Working")
                setTimeLeft(workTime)
                break;

        }

        }, [timeLeft])



    return (
        <div className="w-[100%] h-[100%] ">

            {/* Title */}
            <div  className="flex flex-col rounded-md p-2" style ={{border: `0.5px dashed ${clr}`}}>
            <span className="timer-title text-center text-sm bold underline">  {currentPhase} </span>
            
            {/* Timer  */}
            <span className="time-displayer text-center">
                { formatTimerString(timeLeft)}
            </span>

            <div className="timer-btns-box">

                
                <button
                
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
                <i>Remaining sets: {sets}</i>
            </div>
            </div>

        </div>
    )
}