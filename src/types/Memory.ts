export type CasePicture = {
  fruit: string
  path: string
}

export type SelectedCasePicture = CasePicture & {
  key: number
}

export type GameState = 'STARTING' | 'END'

export type Game = {
  id: number
  essais: number
  score: number
  created_at: string
  updated_at: string
}