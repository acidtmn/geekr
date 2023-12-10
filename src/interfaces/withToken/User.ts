export interface Badge {
  id: string | number
  title: string
  alias: string
  description: string
  url: null | string
  is_removable: boolean
  is_disabled: boolean
}

export interface UserTag {
  name: string
  count: number
}

export interface UserExtended {
  id: string | number
  birthday: string
  description_html: string
  common_tags: UserTag[]
  login: string
  time_registered: string
  score: number
  fullname: string
  specializm: string
  /** 1 - male, 0 - female */
  sex: '1' | '0'
  rating: number
  time_invited: string
  invited_by_login: string
  contacts: Array<{
    value: string
    title: string
    link: string
  }>
  rating_position: number
  display_children: boolean
  path: string
  geo: {
    country: string
    region: string
    city: string
  }
  counters: {
    posts: string | number
    comments: string | number
    followed: string | number
    followers: string | number
    favorites: string | number
  }
  badges: Badge[]
  avatar: string
  is_readonly: boolean
  is_rc: boolean
  is_subscribed: boolean
}
