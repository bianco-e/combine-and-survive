import cardsData from './cards.js'
import i18n from './locales/i18n.js'
import { BADGES, STAT_CHANGE_LG, STAT_CHANGE_MD, STAT_CHANGE_SM, IDLE, STAT_CHANGE_XL } from './constants.js'
import { addSourceCardToBoard, addWildAnimalToBoard } from './utils.js'
import Toaster from './components/toaster/index.js'

const spawnChickenCallback = () => {
  setTimeout(() => {
    const CHICKEN_CARD_ID = 54
    const BREAD_CRUMBS_ID = 53
    if (document.getElementById(`card-${BREAD_CRUMBS_ID}`)) {
      addWildAnimalToBoard(CHICKEN_CARD_ID, i18n.t('wildChicken'), BREAD_CRUMBS_ID)
    }
  }, 6500)
}

const addCaveCallback = () => {
  const CAVE_CARD_ID = 66
  addSourceCardToBoard(CAVE_CARD_ID, i18n.t('accessToCave'))
}

const combinations = [
  { combo: [1, 2], result: [13, 35], consumes: [], decrease: null, increase: null },
  { combo: [1, 3], result: [8, 16], consumes: [], decrease: null, increase: null },
  {
    combo: [1, 4],
    result: IDLE,
    consumes: [],
    message: { type: 'warning', i18nKey: 'waterHarm' },
    decrease: { health: STAT_CHANGE_SM },
    increase: { thirst: STAT_CHANGE_SM }
  },
  { combo: [1, 5], result: [7], consumes: [], decrease: null, increase: null },
  {
    combo: [1, 11],
    result: [12],
    consumes: [11],
    decrease: null,
    increase: null,
    badge: 1
  },
  { combo: [1, 13], result: [14], consumes: [13], decrease: null, increase: null },
  {
    combo: [1, 15],
    result: [14],
    consumes: [15],
    message: { type: 'warning', i18nKey: 'waterHarm' },
    decrease: { health: STAT_CHANGE_SM },
    increase: { thirst: STAT_CHANGE_MD }
  },
  { combo: [1, 16], result: [30], consumes: [16], decrease: null, increase: { health: STAT_CHANGE_MD } },
  { combo: [1, 17], result: [14], consumes: [17], decrease: null, increase: { thirst: STAT_CHANGE_XL } },
  { combo: [1, 20], result: [21], consumes: [20], decrease: null, increase: null },
  { combo: [1, 23], result: [62], consumes: [23], decrease: null, increase: { health: STAT_CHANGE_MD } },
  { combo: [1, 24], result: [25], consumes: [24], decrease: null, increase: null },
  {
    combo: [1, 26],
    result: IDLE,
    consumes: [],
    message: { type: 'error', i18nKey: 'bullAttack' },
    decrease: { health: STAT_CHANGE_XL },
    increase: null
  },
  { combo: [1, 40], result: [62], consumes: [40], decrease: null, increase: { health: STAT_CHANGE_MD } },
  {
    combo: [1, 41],
    result: IDLE,
    consumes: [41],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rawMeat' }
  },
  { combo: [1, 42], result: IDLE, consumes: [42], decrease: null, increase: { health: STAT_CHANGE_LG } },
  {
    combo: [1, 43],
    result: [14],
    consumes: [43],
    decrease: null,
    increase: { health: STAT_CHANGE_SM, thirst: STAT_CHANGE_MD }
  },
  {
    combo: [1, 47],
    result: [53],
    consumes: [47],
    decrease: null,
    increase: { health: STAT_CHANGE_MD },
    callback: spawnChickenCallback
  },
  {
    combo: [1, 56],
    result: IDLE,
    consumes: [56],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rawChicken' }
  },
  {
    combo: [1, 57],
    result: IDLE,
    consumes: [57],
    decrease: null,
    increase: { health: STAT_CHANGE_LG }
  },
  {
    combo: [1, 65],
    result: IDLE,
    consumes: [65],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rottenFood' }
  },
  {
    combo: [1, 66],
    result: IDLE,
    consumes: [],
    decrease: null,
    increase: null,
    message: { type: 'error', i18nKey: 'caveDanger' }
  },
  { combo: [2, 15], result: [14, 24], consumes: [15], decrease: null, increase: null },
  { combo: [2, 30], result: [31], consumes: [30], decrease: null, increase: null },
  { combo: [3, 10], result: [19, 36, 64], consumes: [], decrease: null, increase: null },
  { combo: [3, 12], result: [6, 8, 16], consumes: [], decrease: null, increase: null },
  { combo: [3, 60], result: [6, 8, 16], consumes: [], decrease: null, increase: null },
  { combo: [4, 14], result: [15], consumes: [14], decrease: null, increase: null },
  { combo: [4, 5], result: [33], consumes: [], decrease: null, increase: null },
  {
    combo: [4, 22],
    result: IDLE,
    consumes: [],
    message: { type: 'info', i18nKey: 'noBaitMsg' },
    decrease: null,
    increase: null
  },
  { combo: [6, 9], result: [18, 39], consumes: [6], decrease: null, increase: null },
  { combo: [6, 10], result: [37], consumes: [6], decrease: null, increase: null },
  { combo: [7, 7], result: [10], consumes: [], decrease: null, increase: null },
  { combo: [7, 19], result: [20], consumes: [19], decrease: null, increase: null },
  { combo: [8, 8], result: [9], consumes: [], decrease: null, increase: null },
  { combo: [8, 9], result: [39], consumes: [8], decrease: null, increase: null },
  { combo: [8, 10], result: [11], consumes: [8, 10], decrease: null, increase: null },
  { combo: [8, 20], result: [61], consumes: [8, 20], decrease: null, increase: null },
  { combo: [9, 18], result: [39], consumes: [18], decrease: null, increase: null },
  { combo: [64, 21], result: [22], consumes: [64, 21], decrease: null, increase: null },
  {
    combo: [8, 36],
    result: [38],
    consumes: [8, 36],
    decrease: null,
    increase: null,
    callback: addCaveCallback
  },
  { combo: [9, 15], result: [17], consumes: [15], decrease: null, increase: null },
  { combo: [9, 23], result: [40], consumes: [23], decrease: null, increase: null },
  { combo: [9, 33], result: [34], consumes: [33], decrease: null, increase: null },
  { combo: [9, 37], result: [39], consumes: [37], decrease: null, increase: null },
  { combo: [9, 41], result: [42], consumes: [41], decrease: null, increase: null },
  { combo: [9, 24], result: [68], consumes: [9, 24], decrease: null, increase: null },
  { combo: [12, 2], result: [13, 35], consumes: [], decrease: null, increase: null },
  {
    combo: [12, 4],
    result: IDLE,
    consumes: [],
    message: { type: 'warning', i18nKey: 'waterHarm' },
    decrease: { health: STAT_CHANGE_SM },
    increase: { thirst: STAT_CHANGE_SM }
  },
  { combo: [12, 5], result: [7], consumes: [], decrease: null, increase: null },
  { combo: [12, 6], result: [49], consumes: [6], decrease: null, increase: null },
  { combo: [12, 13], result: [14], consumes: [13], decrease: null, increase: null },
  {
    combo: [12, 15],
    result: [14],
    consumes: [15],
    message: { type: 'warning', i18nKey: 'waterHarm' },
    decrease: { health: STAT_CHANGE_SM },
    increase: { thirst: STAT_CHANGE_MD }
  },
  {
    combo: [12, 16],
    result: [30],
    consumes: [16],
    decrease: null,
    increase: { health: STAT_CHANGE_MD }
  },
  {
    combo: [12, 17],
    result: [14],
    consumes: [17],
    decrease: null,
    increase: { thirst: STAT_CHANGE_XL }
  },
  { combo: [12, 20], result: [21], consumes: [20], decrease: null, increase: null },
  {
    combo: [12, 23],
    result: [62],
    consumes: [23],
    decrease: null,
    increase: { health: STAT_CHANGE_MD }
  },
  { combo: [12, 24], result: [25], consumes: [24], decrease: null, increase: null },
  {
    combo: [12, 26],
    result: [27, 28, 41],
    consumes: [26],
    decrease: null,
    increase: null
  },
  {
    combo: [12, 40],
    result: [62],
    consumes: [40],
    decrease: null,
    increase: { health: STAT_CHANGE_MD }
  },
  {
    combo: [12, 41],
    result: IDLE,
    consumes: [41],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rawMeat' }
  },
  {
    combo: [12, 42],
    result: IDLE,
    consumes: [42],
    decrease: null,
    increase: { health: STAT_CHANGE_LG }
  },
  {
    combo: [12, 43],
    result: [14],
    consumes: [43],
    decrease: null,
    increase: { health: STAT_CHANGE_SM, thirst: STAT_CHANGE_MD }
  },
  {
    combo: [12, 47],
    result: [53],
    consumes: [47],
    decrease: null,
    increase: { health: STAT_CHANGE_MD },
    callback: spawnChickenCallback
  },
  {
    combo: [12, 54],
    result: [55, 56],
    consumes: [54],
    decrease: null,
    increase: null
  },
  {
    combo: [12, 56],
    result: IDLE,
    consumes: [56],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rawChicken' }
  },
  {
    combo: [12, 57],
    result: IDLE,
    consumes: [57],
    decrease: null,
    increase: { health: STAT_CHANGE_LG }
  },
  {
    combo: [12, 29],
    result: [60],
    consumes: [29],
    decrease: null,
    increase: null
  },
  {
    combo: [12, 65],
    result: IDLE,
    consumes: [65],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rottenFood' }
  },
  {
    combo: [12, 66],
    result: IDLE,
    consumes: [],
    decrease: null,
    increase: null,
    message: { type: 'error', i18nKey: 'caveDanger' }
  },
  { combo: [15, 31], result: [32, 14], consumes: [15, 31], decrease: null, increase: null },
  { combo: [21, 62], result: [63], consumes: [21, 62], decrease: null, increase: null },
  {
    combo: [17, 19],
    result: [43],
    consumes: [17, 19],
    decrease: null,
    increase: null,
    badge: 4
  },
  { combo: [14, 28], result: [44], consumes: [14, 28], decrease: null, increase: null },
  { combo: [16, 35], result: [65], consumes: [16, 35], decrease: null, increase: null },
  { combo: [30, 44], result: [45], consumes: [30], decrease: null, increase: null },
  { combo: [45, 15], result: [46, 14], consumes: [15, 45], decrease: null, increase: null },
  {
    combo: [46, 9],
    result: [47],
    consumes: [46],
    decrease: null,
    increase: null,
    badge: 3
  },
  { combo: [22, 35], result: [48], consumes: [22, 35], decrease: null, increase: null },
  {
    combo: [48, 4],
    result: [23, 22],
    consumes: [48],
    decrease: null,
    increase: null,
    badge: 2
  },
  { combo: [19, 21], result: [50], consumes: [19, 21], decrease: null, increase: null },
  { combo: [25, 49], result: [51], consumes: [25, 49], decrease: null, increase: null, badge: 5 },
  {
    combo: [18, 15],
    result: [52, 14],
    consumes: [18, 15],
    decrease: null,
    increase: null
  },
  { combo: [9, 56], result: [57], consumes: [56], decrease: null, increase: null },
  { combo: [50, 54], result: [58], consumes: [], decrease: null, increase: null },
  { combo: [52, 55], result: [59], consumes: [52, 55], decrease: null, increase: null, badge: 6 },
  {
    combo: [53, 61],
    result: IDLE,
    consumes: [53, 61],
    message: { type: 'info', i18nKey: 'cleanFloor' },
    decrease: null,
    increase: null
  },
  { combo: [60, 2], result: [13, 35], consumes: [], decrease: null, increase: null },
  {
    combo: [60, 4],
    result: IDLE,
    consumes: [],
    message: { type: 'warning', i18nKey: 'waterHarm' },
    decrease: { health: STAT_CHANGE_SM },
    increase: { thirst: STAT_CHANGE_SM }
  },
  { combo: [60, 5], result: [7], consumes: [], decrease: null, increase: null },
  { combo: [60, 6], result: [49], consumes: [6], decrease: null, increase: null },
  { combo: [60, 13], result: [14], consumes: [13], decrease: null, increase: null },
  {
    combo: [60, 15],
    result: [14],
    consumes: [15],
    message: { type: 'warning', i18nKey: 'waterHarm' },
    decrease: { health: STAT_CHANGE_SM },
    increase: { thirst: STAT_CHANGE_MD }
  },
  {
    combo: [60, 16],
    result: [30],
    consumes: [16],
    decrease: null,
    increase: { health: STAT_CHANGE_MD }
  },
  {
    combo: [60, 17],
    result: [14],
    consumes: [17],
    decrease: null,
    increase: { thirst: STAT_CHANGE_XL }
  },
  { combo: [60, 20], result: [21], consumes: [20], decrease: null, increase: null },
  {
    combo: [60, 23],
    result: [62],
    consumes: [23],
    decrease: null,
    increase: { health: STAT_CHANGE_MD }
  },
  { combo: [60, 24], result: [25], consumes: [24], decrease: null, increase: null },
  {
    combo: [60, 26],
    result: [27, 28, 41],
    consumes: [26],
    decrease: null,
    increase: null
  },
  {
    combo: [60, 40],
    result: [62],
    consumes: [40],
    decrease: null,
    increase: { health: STAT_CHANGE_MD }
  },
  {
    combo: [60, 41],
    result: IDLE,
    consumes: [41],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rawMeat' }
  },
  {
    combo: [60, 42],
    result: IDLE,
    consumes: [42],
    decrease: null,
    increase: { health: STAT_CHANGE_LG }
  },
  {
    combo: [60, 43],
    result: [14],
    consumes: [43],
    decrease: null,
    increase: { health: STAT_CHANGE_SM, thirst: STAT_CHANGE_MD }
  },
  {
    combo: [60, 47],
    result: [53],
    consumes: [47],
    decrease: null,
    increase: { health: STAT_CHANGE_MD },
    callback: spawnChickenCallback
  },
  {
    combo: [60, 54],
    result: [55, 56],
    consumes: [54],
    decrease: null,
    increase: null
  },
  {
    combo: [60, 56],
    result: IDLE,
    consumes: [56],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rawChicken' }
  },
  {
    combo: [60, 57],
    result: IDLE,
    consumes: [57],
    decrease: null,
    increase: { health: STAT_CHANGE_LG }
  },
  {
    combo: [60, 65],
    result: IDLE,
    consumes: [65],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rottenFood' }
  },
  {
    combo: [60, 66],
    result: [67],
    consumes: [],
    decrease: null,
    increase: null,
    badge: 7
  },
  { combo: [63, 27], result: [29], consumes: [27], decrease: null, increase: null },
  { combo: [68, 67], result: [69], consumes: [67], decrease: null, increase: null }
]

export function seeCurrentCombinations(combos = combinations) {
  return combos
    .map(({ combo, result }) => {
      const comboNames = combo.map(id => i18n.t(`cards.${cardsData.find(card => card.id === id)?.key}`)).join(' <> ')
      const resultNames = Array.isArray(result)
        ? result.map(id => i18n.t(`cards.${cardsData.find(card => card.id === id)?.key}`)).join(', ')
        : 'IDLE'
      return `${comboNames} = ${resultNames}`
    })
    .join('<br />')
}

export function seeAllCombinations() {
  return combinations
    .map(({ combo, result, decrease, increase, badge }) => {
      const comboNames = combo.map(id => i18n.t(`cards.${cardsData.find(card => card.id === id)?.key}`)).join(' <> ')
      const resultNames = Array.isArray(result)
        ? result.map(id => i18n.t(`cards.${cardsData.find(card => card.id === id)?.key}`)).join(', ')
        : 'IDLE'
      return `${comboNames} = ${resultNames} ${decrease?.health ? `(- ${decrease.health} ${i18n.t('health')})` : ''} ${
        increase?.health ? `(+ ${increase.health} ${i18n.t('health')})` : ''
      }${decrease?.thirst ? `(- ${decrease.thirst} ${i18n.t('thirst')})` : ''} ${
        increase?.thirst ? `(+ ${increase.thirst} ${i18n.t('thirst')})` : ''
      } ${badge ? `[New badge: ${i18n.t(`badges.types.${BADGES[badge]}.name`)}]` : ''}`
    })
    .join('<br />')
}

export default combinations
