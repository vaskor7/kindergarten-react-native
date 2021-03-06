import { from } from "rxjs"
import { filter, switchMap, flatMap, catchError } from "rxjs/operators"
import { loadRegions } from "../services/api"

export const initialState = {
  loading: false,
  items: [],
  territory: {},
  error: null,
}

export const onTerritoryLoad = (territory) => ({
  type: 'territory/ON_TERRITORY_LOAD',
  territory,
})

export const onRegionsRequest = () => ({
  type: "regions/ON_REGIONS_REQ",
})

export const onRegionsReqSuccess = (regions) => ({
  type: "regions/ON_REGIONS_SUCCESS",
  regions,
})

export const onRegionsReqFail = (error) => ({
  type: "regions/ON_REGIONS_FAIL",
  error,
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "regions/ON_REGIONS_REQ":
      return {
        ...state,
        loading: true,
        error: null,
      }
    case "regions/ON_REGIONS_SUCCESS": {
      console.log("ACTION: ", action.regions)
      return {
        ...state,
        items: action.regions.regions,
        loading: false,
      }
    }
    case "regions/ON_REGIONS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case "territory/ON_TERRITORY_LOAD": {
      console.log("ON_TERRITORY_LOAD: ", action)
      return {
        ...state,
        territory: action.territory,
        loading: false,
        error: action.error,
      }
    }
    default:
      return state
  }
}

export const regionsReqEpic = action$ => action$.pipe(
  filter((action) => action.type === "regions/ON_REGIONS_REQ"),
  switchMap(() => from(loadRegions()).pipe(
    flatMap((response) => from([onRegionsReqSuccess(response.data.data)])),
    catchError((err) => from([onRegionsReqFail(err)]))
  ))
)
