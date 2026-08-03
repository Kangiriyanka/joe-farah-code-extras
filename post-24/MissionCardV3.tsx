
import {formatMissionTime} from "./timehelpers"
import TimerMenuV1 from "./TimerMenuV1"
import {useState} from "preact/hooks"

interface MissionProps {

    title: string,
    workTime: number,
    restTime: number,
    prepTime: number,
    sets: number,
    clr: string,
}

export default function MissionCardV3({ title, workTime, restTime, prepTime, sets,clr} : MissionProps) {

    const [isTapped, setIsTapped] = useState<boolean>(false)
    const showTimerMenu = () => {
        setIsTapped(prev => !prev)
    }

  


    return (
  <div 
            style ={{borderColor: clr}}
            onClick = {showTimerMenu}
            className={`mission-card   p-2 m-2 border-2  rounded-md shadow-md cursor-pointer`}>


                {!isTapped ? (
                <div>
                <div className="flex justify-between items-start">
                <h4> {title} </h4>
                               <span className="total-formatted-seconds"> {formatMissionTime(workTime * sets)}</span>
               
                </div>
                                <div style = {{borderColor: `${clr}`}}className="w-[100%] border-1 border-r-0 border-b-0 border-l-0  border-dashed h-2 border-top-none"></div>

                
                 <span className="mission-sets italic"> {sets} set{sets > 1 ? "s" : ""} {formatMissionTime(workTime)}  </span>
                </div>
                ) : (

                 <TimerMenuV1 title ={title} workTime ={workTime} restTime={restTime} prepTime = {prepTime} sets= {sets} clr={clr}/>
            
                )
                
                }

            </div>

    )

}