export interface IHabit {
  id: string
  title: string
  trigger: string
  routine: string
  reward: string
  completed: boolean
  startDateTime: Date
  endDateTime: Date
}
