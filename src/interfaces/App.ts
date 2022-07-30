export interface AppState {
    user: string
    reload: boolean
    moods: Mood[]
  }
  
  export interface Mood {
    id?: number
    name?: string
    categories?: string
    price?: number
  }