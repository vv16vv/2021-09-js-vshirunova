import {City} from "../types"

export const data: Array<City> = [
    {
        name: "Санкт-Петербург",
        country: "Россия",
        forecast: [
            {
                date: new Date(2022, 1, 18),
                state: 'cloudy',
                temperature: 1,
                wind: {
                    force: 4.7,
                    direction: 'SW',
                },
            },
            {
                date: new Date(2022, 1, 19),
                state: 'rainy',
                temperature: 1,
                wind: {
                    force: 4.4,
                    direction: 'S',
                },
            },
            {
                date: new Date(2022, 1, 20),
                state: 'cloudy',
                temperature: -1,
                wind: {
                    force: 5.0,
                    direction: 'SW',
                },
            },
            {
                date: new Date(2022, 1, 21),
                state: 'cloudy',
                temperature: -1,
                wind: {
                    force: 2.0,
                    direction: 'SE',
                },
            },
            {
                date: new Date(2022, 1, 22),
                state: 'snow',
                temperature: -1,
                wind: {
                    force: 0.9,
                    direction: 'N',
                },
            },
            {
                date: new Date(2022, 1, 23),
                state: 'cloudy',
                temperature: -3,
                wind: {
                    force: 1.6,
                    direction: 'W',
                },
            },
            {
                date: new Date(2022, 1, 24),
                state: 'cloudy',
                temperature: +2,
                wind: {
                    force: 2.6,
                    direction: 'SW',
                },
            },
            {
                date: new Date(2022, 1, 25),
                state: 'rainy',
                temperature: +2,
                wind: {
                    force: 4.5,
                    direction: 'S',
                },
            },
            {
                date: new Date(2022, 1, 26),
                state: 'rainy',
                temperature: +2,
                wind: {
                    force: 2.2,
                    direction: 'W',
                },
            },
            {
                date: new Date(2022, 1, 27),
                state: 'cloudy',
                temperature: +3,
                wind: {
                    force: 1.0,
                    direction: 'W',
                },
            },
        ],
    },
    {
        name: "Москва",
        country: "Россия",
        forecast: [
            {
                date: new Date(2022, 1, 18),
                state: 'snow',
                temperature: +2,
                wind: {
                    force: 4.4,
                    direction: 'W',
                },
            },
            {
                date: new Date(2022, 1, 19),
                state: 'rainy',
                temperature: +2,
                wind: {
                    force: 9.3,
                    direction: 'S',
                },
            },
            {
                date: new Date(2022, 1, 20),
                state: 'rainy',
                temperature: +2,
                wind: {
                    force: 7.9,
                    direction: 'W',
                },
            },
            {
                date: new Date(2022, 1, 21),
                state: 'rainy',
                temperature: +3,
                wind: {
                    force: 2.9,
                    direction: 'SW',
                },
            },
            {
                date: new Date(2022, 1, 22),
                state: 'snow',
                temperature: +3,
                wind: {
                    force: 3.0,
                    direction: 'SW',
                },
            },
            {
                date: new Date(2022, 1, 23),
                state: 'rainy',
                temperature: +3,
                wind: {
                    force: 3.2,
                    direction: 'W',
                },
            },
            {
                date: new Date(2022, 1, 24),
                state: 'cloudy',
                temperature: +1,
                wind: {
                    force: 1.2,
                    direction: 'NW',
                },
            },
            {
                date: new Date(2022, 1, 25),
                state: 'cloudy',
                temperature: +2,
                wind: {
                    force: 2.4,
                    direction: 'S',
                },
            },
            {
                date: new Date(2022, 1, 26),
                state: 'cloudy',
                temperature: +2,
                wind: {
                    force: 1.8,
                    direction: 'W',
                },
            },
            {
                date: new Date(2022, 1, 27),
                state: 'rainy',
                temperature: +2,
                wind: {
                    force: 1.0,
                    direction: 'NW',
                },
            },
        ],
    },
    {
        name: "Сочи",
        country: "Россия",
        forecast: [
            {
                date: new Date(2022, 1, 18),
                state: 'cloudy',
                temperature: +12,
                wind: {
                    force: 6.5,
                    direction: 'SE',
                },
            },
            {
                date: new Date(2022, 1, 19),
                state: 'rainy',
                temperature: +8,
                wind: {
                    force: 3.4,
                    direction: 'S',
                },
            },
            {
                date: new Date(2022, 1, 20),
                state: 'cloudy',
                temperature: +10,
                wind: {
                    force: 2.8,
                    direction: 'S',
                },
            },
            {
                date: new Date(2022, 1, 21),
                state: 'rainy',
                temperature: +10,
                wind: {
                    force: 4.1,
                    direction: 'E',
                },
            },
            {
                date: new Date(2022, 1, 22),
                state: 'cloudy',
                temperature: +12,
                wind: {
                    force: 4.1,
                    direction: 'SE',
                },
            },
            {
                date: new Date(2022, 1, 23),
                state: 'cloudy',
                temperature: +12,
                wind: {
                    force: 1.8,
                    direction: 'NW',
                },
            },
            {
                date: new Date(2022, 1, 24),
                state: 'cloudy',
                temperature: +12,
                wind: {
                    force: 1.8,
                    direction: 'NW',
                },
            },
            {
                date: new Date(2022, 1, 25),
                state: 'rainy',
                temperature: +9,
                wind: {
                    force: 3.7,
                    direction: 'SE',
                },
            },
            {
                date: new Date(2022, 1, 26),
                state: 'rainy',
                temperature: +9,
                wind: {
                    force: 2.0,
                    direction: 'SW',
                },
            },
            {
                date: new Date(2022, 1, 27),
                state: 'cloudy',
                temperature: +9,
                wind: {
                    force: 2.9,
                    direction: 'S',
                },
            },
        ],
    },
    {
        name: "Владивосток",
        country: "Россия",
        forecast: [
            {
                date: new Date(2022, 1, 18),
                state: 'sunny',
                temperature: -8,
                wind: {
                    force: 4.5,
                    direction: 'N',
                },
            },
            {
                date: new Date(2022, 1, 19),
                state: 'sunny',
                temperature: -8,
                wind: {
                    force: 4.0,
                    direction: 'N',
                },
            },
            {
                date: new Date(2022, 1, 20),
                state: 'cloudy',
                temperature: -8,
                wind: {
                    force: 7.2,
                    direction: 'N',
                },
            },
            {
                date: new Date(2022, 1, 21),
                state: 'sunny',
                temperature: -8,
                wind: {
                    force: 6.3,
                    direction: 'NW',
                },
            },
            {
                date: new Date(2022, 1, 22),
                state: 'cloudy',
                temperature: -6,
                wind: {
                    force: 5.9,
                    direction: 'NW',
                },
            },
            {
                date: new Date(2022, 1, 23),
                state: 'cloudy',
                temperature: -5,
                wind: {
                    force: 1.3,
                    direction: 'W',
                },
            },
            {
                date: new Date(2022, 1, 24),
                state: 'sunny',
                temperature: 0,
                wind: {
                    force: 2.4,
                    direction: 'SW',
                },
            },
            {
                date: new Date(2022, 1, 25),
                state: 'cloudy',
                temperature: +2,
                wind: {
                    force: 4.7,
                    direction: 'S',
                },
            },
            {
                date: new Date(2022, 1, 26),
                state: 'cloudy',
                temperature: +2,
                wind: {
                    force: 2.3,
                    direction: 'NW',
                },
            },
            {
                date: new Date(2022, 1, 27),
                state: 'cloudy',
                temperature: +1,
                wind: {
                    force: 3.1,
                    direction: 'S',
                },
            },
        ],
    },
]
