import { IDLE } from './utils'
import cardsData from './cards.js'

const WATER_MSG = 'Water straight from the river will quench your thirst but may harm you'

const combinations = [
  { combo: [1, 2], result: [13], consumes: [], message: null, decrease: null, increase: null },
  { combo: [1, 3], result: [8, 16], consumes: [], message: null, decrease: null, increase: null },
  {
    combo: [1, 4],
    result: IDLE,
    consumes: [],
    message: { type: 'info', content: WATER_MSG },
    decrease: { health: 5 },
    increase: { thirst: 5 }
  },
  { combo: [1, 5], result: [7], consumes: [], message: null, decrease: null, increase: null },
  {
    combo: [1, 11],
    result: [12],
    consumes: [],
    message: {
      type: 'success',
      content: 'You are an Axeman now'
    },
    decrease: null,
    increase: null
  },
  { combo: [1, 13], result: [14], consumes: [], message: null, decrease: null, increase: null },
  {
    combo: [1, 15],
    result: IDLE,
    consumes: [15],
    message: { type: 'info', content: WATER_MSG },
    decrease: { health: 5 },
    increase: { thirst: 10 }
  },
  { combo: [1, 16], result: [30], consumes: [16], message: null, decrease: null, increase: { health: 10 } },
  { combo: [1, 17], result: IDLE, consumes: [17], message: null, decrease: null, increase: { thirst: 10 } },
  { combo: [1, 20], result: [21], consumes: [], message: null, decrease: null, increase: null },
  { combo: [1, 23], result: IDLE, consumes: [23], message: null, decrease: null, increase: { health: 15 } },
  { combo: [1, 24], result: [25], consumes: [], message: null, decrease: null, increase: null },
  {
    combo: [1, 26],
    result: IDLE,
    consumes: [],
    message: { type: 'error', content: 'You cannot kill a bull with your hands' },
    decrease: { health: 20 },
    increase: null
  },
  { combo: [2, 15], result: [24], consumes: [], message: null, decrease: null, increase: null },
  { combo: [2, 30], result: [31], consumes: [], message: null, decrease: null, increase: null },
  { combo: [3, 12], result: [6, 8, 16], consumes: [], message: null, decrease: null, increase: null },
  { combo: [3, 10], result: [19], consumes: [], message: null, decrease: null, increase: null },
  { combo: [4, 14], result: [15], consumes: [], message: null, decrease: null, increase: null },
  { combo: [4, 22], result: [23], consumes: [], message: null, decrease: null, increase: null },
  { combo: [6, 9], result: [18], consumes: [], message: null, decrease: null, increase: null },
  { combo: [7, 7], result: [10], consumes: [], message: null, decrease: null, increase: null },
  { combo: [7, 19], result: [20], consumes: [], message: null, decrease: null, increase: null },
  { combo: [8, 8], result: [9], consumes: [], message: null, decrease: null, increase: null },
  { combo: [8, 10], result: [11], consumes: [], message: null, decrease: null, increase: null },
  { combo: [8, 21], result: [22], consumes: [], message: null, decrease: null, increase: null },
  { combo: [9, 15], result: [17], consumes: [], message: null, decrease: null, increase: null },
  { combo: [12, 2], result: [13], consumes: [], message: null, decrease: null, increase: null },
  { combo: [12, 3], result: [8, 16], consumes: [], message: null, decrease: null, increase: null },
  {
    combo: [12, 4],
    result: IDLE,
    consumes: [],
    message: { type: 'info', content: WATER_MSG },
    decrease: { health: 5 },
    increase: { thirst: 5 }
  },
  { combo: [12, 5], result: [7], consumes: [], message: null, decrease: null, increase: null },
  { combo: [12, 13], result: [14], consumes: [], message: null, decrease: null, increase: null },
  {
    combo: [12, 15],
    result: IDLE,
    consumes: [15],
    message: { type: 'info', content: WATER_MSG },
    decrease: { health: 5 },
    increase: { thirst: 10 }
  },
  { combo: [12, 16], result: [30], consumes: [16], message: null, decrease: null, increase: { health: 10 } },
  { combo: [12, 17], result: IDLE, consumes: [17], message: null, decrease: null, increase: { thirst: 10 } },
  { combo: [12, 20], result: [21], consumes: [], message: null, decrease: null, increase: null },
  { combo: [12, 23], result: IDLE, consumes: [23], message: null, decrease: null, increase: { health: 15 } },
  { combo: [12, 24], result: [25], consumes: [], message: null, decrease: null, increase: null },
  { combo: [12, 26], result: [27, 28], consumes: [26], message: null, decrease: null, increase: null },
  { combo: [21, 27], result: [29], consumes: [], message: null, decrease: null, increase: null }
]

export function seeCurrentCombinations() {
  return combinations.map(({ combo, result }) => {
    const comboNames = combo.map(id => cardsData.find(card => card.id === id)?.name).join(' + ')
    const resultNames = Array.isArray(result)
      ? result.map(id => cardsData.find(card => card.id === id)?.name).join(', ')
      : 'IDLE'
    return `${comboNames} = ${resultNames}`
  })
}

export default combinations
