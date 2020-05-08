export interface ISignUpDto {
  username: string
  email: string
  password: string
}

export interface ILoginDto {
  username: string
  password: string
}

export interface IVerifyDto {
  username: string
  token: string
}
