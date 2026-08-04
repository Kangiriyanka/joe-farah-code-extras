import {formatMissionTime} from "./timehelpers" 
import {useState, useRef} from "preact/hooks";

export default function TimeFormatter() {


  const [totalSeconds, setTotalSeconds] = useState<number>(1)

  // Extract the hour component
  const rawHours = totalSeconds / 3600
  const flooredHours = Math.floor(rawHours) 


  // Remove the hours from the seconds and get the minutes
  const secondsWithoutHours = totalSeconds % 3600 
  const rawMinutes = secondsWithoutHours / 60
  const flooredMinutes = Math.floor(secondsWithoutHours / 60)

  // Extract the second component
  const seconds = totalSeconds % 60



  return (

    <div>

      <p style={{fontSize: "1.2rem"}}>Seconds to H/M/S components</p>
      <br/>

      <div className="flex justify-center items-center gap-3 mb-3">
        <label className="text-lg" for="seconds">Enter the total amount of seconds:</label>
        <input
          id="secondsInput"
          type="number"
          className="border-1 p-1 rounded-md"
          name="secondsInput"
          min="3"
          max="86400"
          onChange={e => {

            const value = Number(e.target.value)
            if (value <= 86400 && value >=1) {
              setTotalSeconds(value)
            }

          }}
        />
      </div>

      <div className="grid md:grid-cols-3  gap-7  p-3">

       
        <div className="flex flex-col text-center border-2 rounded-md p-1">
          <span>rawHours</span>
          {rawHours}
        </div>

        <div className="flex flex-col text-center border-2 rounded-md border-[#308f4d] rounded-md p-1">
          <span > flooredHours</span>
          {flooredHours}
        </div>

        <div className="flex flex-col text-center border-2 rounded-md p-1">
          <span>secondsWithoutHours</span>
          {secondsWithoutHours}
        </div>

        <div className="flex flex-col text-center border-2 rounded-md p-1">
          <span>rawMinutes</span>
          {rawMinutes}
        </div>


        <div className="flex flex-col text-center border-2 rounded-md border-[#308f4d] rounded-md p-1">
          <span> flooredMinutes</span>
          {flooredMinutes}
        </div>

        <div className="flex flex-col text-center border-2 rounded-md border-[#308f4d] rounded-md p-1">
          <span >remainingSeconds</span>
          {seconds}
        </div>
      </div>

      <div className="text-xl text-center mt-3 ">
        Formatted Time: {formatMissionTime(totalSeconds)}
      </div>

      <br/>

    </div>

  )
}