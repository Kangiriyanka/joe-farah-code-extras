
interface MissionProps {

    title: string,
    workTime: number,
    restTime: number,
    prepTime: number,
    sets: number,
    clr: string,
  
}


export default function MissionCardV1({ title, workTime, prepTime, sets,clr} : MissionProps) {

        return (

            <div 
            style ={{borderColor: clr}}
            className={`mission-card  border-1 p-2 m-2 border-2  rounded-md shadow-md `}>
                <div className="flex justify-between">
                <h4 className="sex">{title}</h4>
                 {/* We'll format the time next */}
                <span className="total-formatted-seconds"> {(workTime * sets)} seconds</span>
                
                </div>
                <div style = {{borderColor: `${clr}`}}className="w-[100%] border-1 border-r-0 border-b-0 border-l-0  border-dashed h-2 border-top-none"></div>
                {/* We'll format the time next */}
                 <span className="mission-sets"> <i>{sets} sets of {workTime} seconds </i> </span>

            </div>
        )

}