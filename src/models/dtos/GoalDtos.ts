export interface ICreateGoalDto {
  title: string
  description: string
  achieved: boolean
}

export interface IEditGoalDto {
  updates: {
    title: string
    description: string
    achieved: boolean
  }
}
