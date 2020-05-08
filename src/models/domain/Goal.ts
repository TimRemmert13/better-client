import { IHabit } from './Habit'

export interface IGoal {
  id: string
  title: string
  description?: string
  user: string
  achieved: false
  created: Date
  habits: IHabit[]
}
