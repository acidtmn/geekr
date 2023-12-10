import { State, fieldsMap, typesMap } from './types'

const initialState: State = {}
fieldsMap.forEach(
  (e: string) =>
    // TODO: fix types
    //@ts-expect-error
    (initialState[e] = {
      data: null,
      fetching: false,
      fetched: false,
      error: null,
    })
)

export default (
  state = initialState,
  { type, payload }: { type: string; payload: { data: never; error?: string } }
): State => {
  const actionHandler = (type: string) => {
    if (type.endsWith('FETCH')) {
      return {
        fetching: true,
        fetched: false,
        error: null,
        data: null,
      }
    } else if (type.endsWith('FULFILLED')) {
      return {
        fetching: false,
        fetched: true,
        error: null,
        data: payload.data,
      }
    } else if (type.endsWith('REJECTED')) {
      return {
        fetching: false,
        fetched: true,
        data: null,
        error: payload.error,
      }
    } else return {}
  }

  const field = fieldsMap[typesMap.findIndex((e) => type.startsWith(e))]
  if (!field) return state

  return Object.assign({}, state, {
    // TODO: fix types
    //@ts-expect-error
    [field]: { ...state[field], ...actionHandler(type) },
  })
}
