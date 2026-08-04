import "./missions.css"
import MissionCardV1 from "./MissionCardV1"
import MissionCardV2 from "./MissionCardV2"
import MissionCardV3 from "./MissionCardV3"
import MissionCardV4 from "./MissionCardV4"
import MissionCardV5 from "./MissionCardV5"
import MissionCardV6 from "./MissionCardV6"


interface DashboardProps {
  version: number
}

export default function MissionsDashboard({ version }: DashboardProps) {
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
      title: "Test Session with 2 sets",
      workTime: 5,
      restTime: 5,
      prepTime: 5,
      sets: 2,
      clr: "#6a0cd0",
    },
    {
      id: 5,
      title: "Test Session with 1 set ",
      workTime: 5,
      restTime: 5,
      prepTime: 5,
      sets: 1,
      clr: "#dbe51b",
    },
    {
      id: 6,
      title: "Test Session no Prep",
      workTime: 3,
      restTime: 10,
      sets: 1,
      clr: "#27b2d5",
    },
  ]

  const visibleMissions = missions.filter((mission) => {
    if (version === 1 || version === 2 || version == 3  ) return [1, 2, 3].includes(mission.id)
    if (version === 4 || version == 5 || version == 6 ) return [1, 2, 3,4,5,6].includes(mission.id)
    return false
  })

  return (
    <div>
      <h3>Missions</h3>
      
      <div className="mission-container grid md:grid-cols-2 sm:grid-cols-1">
        {visibleMissions.map((mission) => {
          switch (version) {
            case 1:
              return (
                <MissionCardV1
                  key={mission.id}
                  title={mission.title}
                  workTime={mission.workTime}
                  prepTime={mission.prepTime}
                  restTime={mission.restTime}
                  sets={mission.sets}
                  clr={mission.clr}
                />
              )

            case 2:
              return (
                <MissionCardV2
                  key={mission.id}
                  title={mission.title}
                  workTime={mission.workTime}
                  prepTime={mission.prepTime} 
                  restTime={mission.restTime}
                  sets={mission.sets}
                  clr={mission.clr}
                />
              )

            case 3:
              return (
                <MissionCardV3
                  key={mission.id}
                  title={mission.title}
                  workTime={mission.workTime}
                  restTime={mission.restTime}
                  prepTime={mission.prepTime}
                  sets={mission.sets}
                  clr={mission.clr}
                />
              )

            case 4:
              return (
                <MissionCardV4
                  key={mission.id}
                  title={mission.title}
                  workTime={mission.workTime}
                  restTime={mission.restTime}
                  prepTime={mission.prepTime}
                  sets={mission.sets}
                  clr={mission.clr}
                />
              )

            case 5:
              return (
                <MissionCardV5
                  key={mission.id}
                  title={mission.title}
                  workTime={mission.workTime}
                  restTime={mission.restTime}
                  prepTime={mission.prepTime}
                  sets={mission.sets}
                  clr={mission.clr}
                />
              )

              case 6:
              return (
                <MissionCardV6
                  key={mission.id}
                  title={mission.title}
                  workTime={mission.workTime}
                  restTime={mission.restTime}
                  prepTime={mission.prepTime}
                  sets={mission.sets}
                  clr={mission.clr}
                />
              )

            default:
              return null
          }
        })}
      </div>
    </div>
  )
}