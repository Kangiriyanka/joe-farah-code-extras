export  function formatMissionTime(totalSeconds: number) {
  // Extract the hour component
  const rawHours = totalSeconds / 3600
  const flooredHours = Math.floor(rawHours)
  // Remove the hours from the seconds and get the minutes
  const secondsWithoutHours = totalSeconds % 3600
  const rawMinutes = secondsWithoutHours / 60
  const flooredMinutes = Math.floor(rawMinutes)
  // Extract the second component
  const remainingSeconds = totalSeconds % 60
  const components = []

  if (flooredHours > 0) {
    components.push(`${flooredHours} hour${flooredHours > 1 ? "s" : ""}`)
  }


  if (flooredMinutes > 0) {
    components.push(`${flooredMinutes} minute${flooredMinutes > 1 ? "s" : ""}`)
  
  }


  if (remainingSeconds > 0) {
    components.push(`${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`)
  }



  switch (components.length) {
    case 1:
      return `${components[0]}`
    case 2:
      return `${components[0]} and ${components[1]}`
    case 3:
      return `${components[0]}, ${components[1]} and ${components[2]}`
  }

}



export function formatTimerString(totalSeconds: number) {
  const flooredHours = Math.floor(totalSeconds / 3600)
  const secondsWithoutHours = totalSeconds % 3600
  const flooredMinutes = Math.floor(secondsWithoutHours/60)
  const remainingSeconds = totalSeconds % 60
  return `${(flooredHours.toString()).padStart(2,"0")}:${(flooredMinutes.toString()).padStart(2,"0")}:${(remainingSeconds.toString()).padStart(2,"0")}
  `
}

