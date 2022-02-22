import {City, CityInListProps} from "../types"

const CITY_IN_LIST_KEY = "city-in-list-key"

export const putCityInListToStorage = async (data: Array<CityInListProps>) => {
  await global.localStorage.setItem(CITY_IN_LIST_KEY, JSON.stringify(data))
}

export const isCityInListStored = async (): Promise<boolean> => {
  return await global.localStorage.getItem(CITY_IN_LIST_KEY) !== null
}

export const getCityInList = async (): Promise<Array<CityInListProps>> => {
  const data = await global.localStorage.getItem(CITY_IN_LIST_KEY) ?? "[]"
  return JSON.parse(data) as Array<CityInListProps>
}

const getKey = (country: string, city: string): string => {
  return encodeURIComponent(`${country}-${city}`)
}

export const isCityStored = async (country: string, city: string): Promise<boolean> => {
  return await global.localStorage.getItem(getKey(country, city)) !== null
}

export const putCityToStorage = async (city: City) => {
  await global.localStorage.setItem(getKey(city.country, city.name), JSON.stringify(city))
}

export const getCity = async (country: string, city: string): Promise<City> => {
  const dataString = await global.localStorage.getItem(getKey(country, city))
  if (dataString !== null) {
    const data = JSON.parse(dataString)
    for (let weather of data.forecast) {
      if (typeof (weather.date) === "string") {
        weather.date = new Date(Date.parse(weather.date))
      }
    }
    return data as City
  } else {
    return Promise.reject("Cannot parse city data")
  }
}
