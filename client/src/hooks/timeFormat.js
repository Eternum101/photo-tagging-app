export function formatTime(time) {
  time = Number(time);

  if (time < 60) {
    return `${time} seconds`;
  }
  
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  
  return `${minutes} minutes ${seconds} seconds`;
}
