import {formatTimerString} from "./timehelpers"
import {useState} from "preact/hooks"

interface TimerProps {
    title: string
    workTime: number
    restTime: number
    prepTime: number
    sets: number
    clr: string
}

type TimerStatus = "Ready to Start?" | "Prepping" | "Working" | "Resting"

export default function TimerMenuV1({sets, workTime, title, clr}: TimerProps) {

    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    // prep, work, rest
    const [currentStatus, setCurrentStatus] = useState<TimerStatus>("Ready to Start?")
    const handlePlay = (e) => {
        e.stopPropagation()
        setIsPlaying(prev => !prev)
    }

    




    return (
        <div className="w-[100%] h-[100%] ">

            {/* Title */}
            <div  className="flex flex-col rounded-md p-2" style ={{border: `0.5px dashed ${clr}`}}>
            <span className="timer-title text-center text-sm bold underline"> TO-DO: Changing Times in terms of Phases</span>
            
            {/* Timer  */}
            <span className="time-displayer text-center">
                {formatTimerString(workTime)}
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