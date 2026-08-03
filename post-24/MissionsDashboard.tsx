
import "./missions.css"
import MissionCardV1 from "./MissionCardV1"
import MissionCardV2 from "./MissionCardV2"
import MissionCardV3 from "./MissionCardV3"
import MissionCardV4 from "./MissionCardV4"

interface DashboardProps {
  version: number
}
export default function MissionsDashboard( {version}: DashboardProps) {

 const missions = [
    {
    id: 1,
    title: "Quick Coding",
    workTime: 600,
    restTime: 60,
    prepTime: 120,
    sets: 2,
    clr: "#52c22d",
  },
  {
    id: 2,
    title: "Stretching",
    workTime: 30,
    restTime: 15,
    prepTime: 60,
    sets: 3,
   
    clr: "#2a5ece",
  },
  {
    id: 3,
    title: "Music Session",
    workTime: 1200,
    restTime: 300,
    prepTime: 0,
    sets: 3,
    clr: "#c41c13",
  },

   {
    id: 4,
    title: "Short Test Session",
    workTime: 10,
    restTime: 10,
    prepTime: 10,
    sets: 3,
    clr: "#6a0cd0",
  },
];


    return (

      <div>
      
       <h3> Missions</h3>
        <div className="mission-container grid md:grid-cols-2 sm:grid-cols-1">
            {missions.map((mission) => {

                    switch (version) {

                      case 1: return (
                        <MissionCardV1
                
                      title = {mission.title}
                      workTime = {mission.workTime}
                      prepTime = {mission.prepTime}
                      restTime = {mission.restTime}
                      sets = {mission.sets}
                      clr = {mission.clr}
                      />
                      )

                      case 2: return (

                        <MissionCardV2
         
                      title = {mission.title}
                      workTime = {mission.workTime}
                      restTime = {mission.restTime}
                      sets = {mission.sets}
                      clr = {mission.clr}
                      />
                      )

                      case 3: return (

                        <MissionCardV3
              
                      title = {mission.title}
                      workTime = {mission.workTime}
                      restTime = {mission.restTime}
                      prepTime= {mission.prepTime}
                      sets = {mission.sets}
                      clr = {mission.clr}
                      />
                      )

                      case 4: return (

                        <MissionCardV4
              
                      title = {mission.title}
                      workTime = {mission.workTime}
                      restTime = {mission.restTime}
                      prepTime= {mission.prepTime}
                      sets = {mission.sets}
                      clr = {mission.clr}
                      />
                      )
                    }

                    })}
       

        </div>
        </div>
    )
}