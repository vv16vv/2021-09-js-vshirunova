export type WeatherState = 'cloudy'
  | 'sunny'
  | 'rainy'
  | 'snow'

export type WindDirection = 'N' | 'NW' | 'W' | 'SW' | 'S' | 'SE' | 'E' | 'NE'

export interface Wind {
  force: number
  direction: WindDirection
}

export interface Weather {
  date: Date,
  state: WeatherState,
  temperature: number,
  wind: Wind
}

export interface City {
  name: string,
  country: string,
  forecast: Array<Weather>
}

export interface CityInListProps {
  cityName: string
  country: string
  todayWeather: Weather
}
