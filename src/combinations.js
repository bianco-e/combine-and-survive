import { CARD_KEY } from './cards.js'
import i18n from './i18n.js'
import {
  BADGES,
  STAT_CHANGE_LG,
  STAT_CHANGE_MD,
  STAT_CHANGE_SM,
  IDLE,
  STAT_CHANGE_XL,
  STAT_CHANGE_XXL
} from './constants.js'
import { addSourceCardToBoard, addWildAnimalToBoard } from './utils.js'

const spawnChickenCallback = () => {
  setTimeout(() => {
    if (document.getElementById(`card-${CARD_KEY.BREAD_CRUMBS}`)) {
      addWildAnimalToBoard(CARD_KEY.CHICKEN, i18n.t('wildChicken'), CARD_KEY.BREAD_CRUMBS)
    }
  }, 6500)
}

const addCaveCallback = () => {
  addSourceCardToBoard(CARD_KEY.CAVE, i18n.t('accessToCave'))
}

const combinations = [
  { combo: [CARD_KEY.PERSON, CARD_KEY.DIRT], result: [CARD_KEY.CLAY, CARD_KEY.WORM], consumes: [], decrease: null, increase: null },
  { combo: [CARD_KEY.PERSON, CARD_KEY.TREE], result: [CARD_KEY.STICK, CARD_KEY.APPLE], consumes: [], decrease: null, increase: null },
  {
    combo: [CARD_KEY.PERSON, CARD_KEY.RIVER],
    result: IDLE,
    consumes: [],
    message: { type: 'warning', i18nKey: 'waterHarm' },
    decrease: { health: STAT_CHANGE_SM },
    increase: { thirst: STAT_CHANGE_SM }
  },
  { combo: [CARD_KEY.PERSON, CARD_KEY.MOUNTAIN], result: [CARD_KEY.ROCK], consumes: [], decrease: null, increase: null },
  {
    combo: [CARD_KEY.PERSON, CARD_KEY.AXE],
    result: [CARD_KEY.AXEMAN],
    consumes: [CARD_KEY.AXE],
    decrease: null,
    increase: null,
    badge: 1
  },
  { combo: [CARD_KEY.PERSON, CARD_KEY.CLAY], result: [CARD_KEY.VESSEL], consumes: [CARD_KEY.CLAY], decrease: null, increase: null },
  {
    combo: [CARD_KEY.PERSON, CARD_KEY.WATER],
    result: [CARD_KEY.VESSEL],
    consumes: [CARD_KEY.WATER],
    message: { type: 'warning', i18nKey: 'waterHarm' },
    decrease: { health: STAT_CHANGE_SM },
    increase: { thirst: STAT_CHANGE_MD }
  },
  { combo: [CARD_KEY.PERSON, CARD_KEY.APPLE], result: [CARD_KEY.SEEDS], consumes: [CARD_KEY.APPLE], decrease: null, increase: { health: STAT_CHANGE_MD } },
  { combo: [CARD_KEY.PERSON, CARD_KEY.BOILED_WATER], result: [CARD_KEY.VESSEL], consumes: [CARD_KEY.BOILED_WATER], decrease: null, increase: { thirst: STAT_CHANGE_XXL } },
  { combo: [CARD_KEY.PERSON, CARD_KEY.LEAF_FIBERS], result: [CARD_KEY.CORDAGE], consumes: [CARD_KEY.LEAF_FIBERS], decrease: null, increase: null },
  { combo: [CARD_KEY.PERSON, CARD_KEY.FISH], result: [CARD_KEY.FISH_SPINE], consumes: [CARD_KEY.FISH], decrease: null, increase: { health: STAT_CHANGE_MD } },
  { combo: [CARD_KEY.PERSON, CARD_KEY.MUD], result: [CARD_KEY.ADOBE_BRICK], consumes: [CARD_KEY.MUD], decrease: null, increase: null },
  {
    combo: [CARD_KEY.PERSON, CARD_KEY.BULL],
    result: IDLE,
    consumes: [],
    message: { type: 'error', i18nKey: 'bullAttack' },
    decrease: { health: STAT_CHANGE_XL },
    increase: null
  },
  { combo: [CARD_KEY.PERSON, CARD_KEY.GRILLED_FISH], result: [CARD_KEY.FISH_SPINE], consumes: [CARD_KEY.GRILLED_FISH], decrease: null, increase: { health: STAT_CHANGE_MD } },
  {
    combo: [CARD_KEY.PERSON, CARD_KEY.RAW_MEAT],
    result: IDLE,
    consumes: [CARD_KEY.RAW_MEAT],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rawMeat' }
  },
  { combo: [CARD_KEY.PERSON, CARD_KEY.COOKED_MEAT], result: IDLE, consumes: [CARD_KEY.COOKED_MEAT], decrease: null, increase: { health: STAT_CHANGE_LG } },
  {
    combo: [CARD_KEY.PERSON, CARD_KEY.HERBAL_TEA],
    result: [CARD_KEY.VESSEL],
    consumes: [CARD_KEY.HERBAL_TEA],
    decrease: null,
    increase: { health: STAT_CHANGE_SM, thirst: STAT_CHANGE_MD }
  },
  {
    combo: [CARD_KEY.PERSON, CARD_KEY.BREAD],
    result: [CARD_KEY.BREAD_CRUMBS],
    consumes: [CARD_KEY.BREAD],
    decrease: null,
    increase: { health: STAT_CHANGE_MD },
    callback: spawnChickenCallback
  },
  {
    combo: [CARD_KEY.PERSON, CARD_KEY.RAW_CHICKEN],
    result: IDLE,
    consumes: [CARD_KEY.RAW_CHICKEN],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rawChicken' }
  },
  {
    combo: [CARD_KEY.PERSON, CARD_KEY.COOKED_CHICKEN],
    result: IDLE,
    consumes: [CARD_KEY.COOKED_CHICKEN],
    decrease: null,
    increase: { health: STAT_CHANGE_LG }
  },
  {
    combo: [CARD_KEY.PERSON, CARD_KEY.ROTTEN_APPLE],
    result: IDLE,
    consumes: [CARD_KEY.ROTTEN_APPLE],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rottenFood' }
  },
  {
    combo: [CARD_KEY.PERSON, CARD_KEY.CAVE],
    result: IDLE,
    consumes: [],
    decrease: null,
    increase: null,
    message: { type: 'error', i18nKey: 'caveDanger' }
  },
  { combo: [CARD_KEY.PERSON, CARD_KEY.PAPER_PULP], result: [CARD_KEY.PAPER], consumes: [CARD_KEY.PAPER_PULP], decrease: null, increase: null },
  { combo: [CARD_KEY.DIRT, CARD_KEY.WATER], result: [CARD_KEY.VESSEL, CARD_KEY.MUD], consumes: [CARD_KEY.WATER], decrease: null, increase: null },
  { combo: [CARD_KEY.DIRT, CARD_KEY.BOILED_WATER], result: [CARD_KEY.VESSEL, CARD_KEY.MUD], consumes: [CARD_KEY.BOILED_WATER], decrease: null, increase: null },
  { combo: [CARD_KEY.DIRT, CARD_KEY.SEEDS], result: [CARD_KEY.SPROUT], consumes: [CARD_KEY.SEEDS], decrease: null, increase: null },
  { combo: [CARD_KEY.TREE, CARD_KEY.SHARPEN_ROCK], result: [CARD_KEY.LEAF, CARD_KEY.SAP, CARD_KEY.TREE_THORN], consumes: [], decrease: null, increase: null },
  { combo: [CARD_KEY.TREE, CARD_KEY.AXEMAN], result: [CARD_KEY.LOG, CARD_KEY.STICK, CARD_KEY.APPLE], consumes: [], decrease: null, increase: null },
  { combo: [CARD_KEY.TREE, CARD_KEY.DRESSED_AXEMAN], result: [CARD_KEY.LOG, CARD_KEY.STICK, CARD_KEY.APPLE], consumes: [], decrease: null, increase: null },
  { combo: [CARD_KEY.RIVER, CARD_KEY.VESSEL], result: [CARD_KEY.WATER], consumes: [CARD_KEY.VESSEL], decrease: null, increase: null },
  { combo: [CARD_KEY.RIVER, CARD_KEY.MOUNTAIN], result: [CARD_KEY.SAND], consumes: [], decrease: null, increase: null },
  {
    combo: [CARD_KEY.RIVER, CARD_KEY.FISHING_LINE],
    result: IDLE,
    consumes: [],
    message: { type: 'info', i18nKey: 'noBaitMsg' },
    decrease: null,
    increase: null
  },
  { combo: [CARD_KEY.LOG, CARD_KEY.CAMPFIRE], result: [CARD_KEY.COAL, CARD_KEY.ASHES], consumes: [CARD_KEY.LOG], decrease: null, increase: null },
  { combo: [CARD_KEY.LOG, CARD_KEY.SHARPEN_ROCK], result: [CARD_KEY.BARK], consumes: [CARD_KEY.LOG], decrease: null, increase: null },
  { combo: [CARD_KEY.ROCK, CARD_KEY.ROCK], result: [CARD_KEY.SHARPEN_ROCK], consumes: [], decrease: null, increase: null },
  { combo: [CARD_KEY.ROCK, CARD_KEY.LEAF], result: [CARD_KEY.LEAF_FIBERS], consumes: [CARD_KEY.LEAF], decrease: null, increase: null },
  { combo: [CARD_KEY.STICK, CARD_KEY.STICK], result: [CARD_KEY.CAMPFIRE], consumes: [], decrease: null, increase: null },
  { combo: [CARD_KEY.STICK, CARD_KEY.CAMPFIRE], result: [CARD_KEY.ASHES], consumes: [CARD_KEY.STICK], decrease: null, increase: null },
  { combo: [CARD_KEY.STICK, CARD_KEY.SHARPEN_ROCK], result: [CARD_KEY.AXE], consumes: [CARD_KEY.STICK, CARD_KEY.SHARPEN_ROCK], decrease: null, increase: null },
  { combo: [CARD_KEY.STICK, CARD_KEY.LEAF_FIBERS], result: [CARD_KEY.BRUSH], consumes: [CARD_KEY.STICK, CARD_KEY.LEAF_FIBERS], decrease: null, increase: null },
  { combo: [CARD_KEY.CAMPFIRE, CARD_KEY.COAL], result: [CARD_KEY.ASHES], consumes: [CARD_KEY.COAL], decrease: null, increase: null },
  { combo: [CARD_KEY.CAMPFIRE, CARD_KEY.TREE_THORN], result: [CARD_KEY.ASHES], consumes: [CARD_KEY.TREE_THORN], decrease: null, increase: null },
  { combo: [CARD_KEY.TREE_THORN, CARD_KEY.CORDAGE], result: [CARD_KEY.FISHING_LINE], consumes: [CARD_KEY.TREE_THORN, CARD_KEY.CORDAGE], decrease: null, increase: null },
  {
    combo: [CARD_KEY.STICK, CARD_KEY.SAP],
    result: [CARD_KEY.TORCH],
    consumes: [CARD_KEY.STICK, CARD_KEY.SAP],
    decrease: null,
    increase: null,
    callback: addCaveCallback
  },
  { combo: [CARD_KEY.CAMPFIRE, CARD_KEY.WATER], result: [CARD_KEY.BOILED_WATER], consumes: [CARD_KEY.WATER], decrease: null, increase: null },
  { combo: [CARD_KEY.CAMPFIRE, CARD_KEY.FISH], result: [CARD_KEY.GRILLED_FISH], consumes: [CARD_KEY.FISH], decrease: null, increase: null },
  { combo: [CARD_KEY.CAMPFIRE, CARD_KEY.SAND], result: [CARD_KEY.GLASS], consumes: [CARD_KEY.SAND], decrease: null, increase: null },
  { combo: [CARD_KEY.CAMPFIRE, CARD_KEY.BARK], result: [CARD_KEY.ASHES], consumes: [CARD_KEY.BARK], decrease: null, increase: null },
  { combo: [CARD_KEY.CAMPFIRE, CARD_KEY.RAW_MEAT], result: [CARD_KEY.COOKED_MEAT], consumes: [CARD_KEY.RAW_MEAT], decrease: null, increase: null },
  { combo: [CARD_KEY.CAMPFIRE, CARD_KEY.MUD], result: [CARD_KEY.FURNACE], consumes: [CARD_KEY.CAMPFIRE, CARD_KEY.MUD], decrease: null, increase: null },
  { combo: [CARD_KEY.AXEMAN, CARD_KEY.DIRT], result: [CARD_KEY.CLAY, CARD_KEY.WORM], consumes: [], decrease: null, increase: null },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.RIVER],
    result: IDLE,
    consumes: [],
    message: { type: 'warning', i18nKey: 'waterHarm' },
    decrease: { health: STAT_CHANGE_SM },
    increase: { thirst: STAT_CHANGE_SM }
  },
  { combo: [CARD_KEY.AXEMAN, CARD_KEY.MOUNTAIN], result: [CARD_KEY.ROCK], consumes: [], decrease: null, increase: null },
  { combo: [CARD_KEY.AXEMAN, CARD_KEY.LOG], result: [CARD_KEY.WOODEN_PLANKS], consumes: [CARD_KEY.LOG], decrease: null, increase: null },
  { combo: [CARD_KEY.AXEMAN, CARD_KEY.CLAY], result: [CARD_KEY.VESSEL], consumes: [CARD_KEY.CLAY], decrease: null, increase: null },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.WATER],
    result: [CARD_KEY.VESSEL],
    consumes: [CARD_KEY.WATER],
    message: { type: 'warning', i18nKey: 'waterHarm' },
    decrease: { health: STAT_CHANGE_SM },
    increase: { thirst: STAT_CHANGE_MD }
  },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.APPLE],
    result: [CARD_KEY.SEEDS],
    consumes: [CARD_KEY.APPLE],
    decrease: null,
    increase: { health: STAT_CHANGE_MD }
  },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.BOILED_WATER],
    result: [CARD_KEY.VESSEL],
    consumes: [CARD_KEY.BOILED_WATER],
    decrease: null,
    increase: { thirst: STAT_CHANGE_XXL }
  },
  { combo: [CARD_KEY.AXEMAN, CARD_KEY.LEAF_FIBERS], result: [CARD_KEY.CORDAGE], consumes: [CARD_KEY.LEAF_FIBERS], decrease: null, increase: null },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.FISH],
    result: [CARD_KEY.FISH_SPINE],
    consumes: [CARD_KEY.FISH],
    decrease: null,
    increase: { health: STAT_CHANGE_MD }
  },
  { combo: [CARD_KEY.AXEMAN, CARD_KEY.MUD], result: [CARD_KEY.ADOBE_BRICK], consumes: [CARD_KEY.MUD], decrease: null, increase: null },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.BULL],
    result: [CARD_KEY.LEATHER, CARD_KEY.BONE, CARD_KEY.RAW_MEAT],
    consumes: [CARD_KEY.BULL],
    decrease: null,
    increase: null
  },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.GRILLED_FISH],
    result: [CARD_KEY.FISH_SPINE],
    consumes: [CARD_KEY.GRILLED_FISH],
    decrease: null,
    increase: { health: STAT_CHANGE_MD }
  },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.RAW_MEAT],
    result: IDLE,
    consumes: [CARD_KEY.RAW_MEAT],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rawMeat' }
  },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.COOKED_MEAT],
    result: IDLE,
    consumes: [CARD_KEY.COOKED_MEAT],
    decrease: null,
    increase: { health: STAT_CHANGE_LG }
  },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.HERBAL_TEA],
    result: [CARD_KEY.VESSEL],
    consumes: [CARD_KEY.HERBAL_TEA],
    decrease: null,
    increase: { health: STAT_CHANGE_SM, thirst: STAT_CHANGE_MD }
  },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.BREAD],
    result: [CARD_KEY.BREAD_CRUMBS],
    consumes: [CARD_KEY.BREAD],
    decrease: null,
    increase: { health: STAT_CHANGE_MD },
    callback: spawnChickenCallback
  },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.CHICKEN],
    result: [CARD_KEY.FEATHER, CARD_KEY.RAW_CHICKEN],
    consumes: [CARD_KEY.CHICKEN],
    decrease: null,
    increase: null
  },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.RAW_CHICKEN],
    result: IDLE,
    consumes: [CARD_KEY.RAW_CHICKEN],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rawChicken' }
  },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.COOKED_CHICKEN],
    result: IDLE,
    consumes: [CARD_KEY.COOKED_CHICKEN],
    decrease: null,
    increase: { health: STAT_CHANGE_LG }
  },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.CLOTHES],
    result: [CARD_KEY.DRESSED_AXEMAN],
    consumes: [CARD_KEY.CLOTHES],
    decrease: null,
    increase: null
  },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.ROTTEN_APPLE],
    result: IDLE,
    consumes: [CARD_KEY.ROTTEN_APPLE],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rottenFood' }
  },
  {
    combo: [CARD_KEY.AXEMAN, CARD_KEY.CAVE],
    result: IDLE,
    consumes: [],
    decrease: null,
    increase: null,
    message: { type: 'error', i18nKey: 'caveDanger' }
  },
  { combo: [CARD_KEY.AXEMAN, CARD_KEY.PAPER_PULP], result: [CARD_KEY.PAPER], consumes: [CARD_KEY.PAPER_PULP], decrease: null, increase: null },
  { combo: [CARD_KEY.WATER, CARD_KEY.SPROUT], result: [CARD_KEY.PLANT, CARD_KEY.VESSEL], consumes: [CARD_KEY.WATER, CARD_KEY.SPROUT], decrease: null, increase: null },
  { combo: [CARD_KEY.CORDAGE, CARD_KEY.FISH_SPINE], result: [CARD_KEY.NEEDLE_THREAD], consumes: [CARD_KEY.CORDAGE, CARD_KEY.FISH_SPINE], decrease: null, increase: null },
  { combo: [CARD_KEY.CORDAGE, CARD_KEY.WOODEN_PLANKS], result: [CARD_KEY.LOOM], consumes: [CARD_KEY.CORDAGE, CARD_KEY.WOODEN_PLANKS], decrease: null, increase: null },
  { combo: [CARD_KEY.CORDAGE, CARD_KEY.LOOM], result: [CARD_KEY.FABRIC], consumes: [CARD_KEY.CORDAGE], decrease: null, increase: null },
  {
    combo: [CARD_KEY.BOILED_WATER, CARD_KEY.LEAF],
    result: [CARD_KEY.HERBAL_TEA],
    consumes: [CARD_KEY.BOILED_WATER, CARD_KEY.LEAF],
    decrease: null,
    increase: null,
    badge: 4
  },
  { combo: [CARD_KEY.WATER, CARD_KEY.ASHES], result: [CARD_KEY.LYE], consumes: [CARD_KEY.WATER, CARD_KEY.ASHES], decrease: null, increase: null },
  { combo: [CARD_KEY.BOILED_WATER, CARD_KEY.ASHES], result: [CARD_KEY.LYE], consumes: [CARD_KEY.BOILED_WATER, CARD_KEY.ASHES], decrease: null, increase: null },
  { combo: [CARD_KEY.VESSEL, CARD_KEY.BONE], result: [CARD_KEY.MORTAR], consumes: [CARD_KEY.VESSEL, CARD_KEY.BONE], decrease: null, increase: null },
  { combo: [CARD_KEY.APPLE, CARD_KEY.WORM], result: [CARD_KEY.ROTTEN_APPLE], consumes: [CARD_KEY.APPLE, CARD_KEY.WORM], decrease: null, increase: null },
  { combo: [CARD_KEY.SEEDS, CARD_KEY.MORTAR], result: [CARD_KEY.FLOUR], consumes: [CARD_KEY.SEEDS], decrease: null, increase: null },
  { combo: [CARD_KEY.FLOUR, CARD_KEY.WATER], result: [CARD_KEY.DOUGH, CARD_KEY.VESSEL], consumes: [CARD_KEY.WATER, CARD_KEY.FLOUR], decrease: null, increase: null },
  { combo: [CARD_KEY.FLOUR, CARD_KEY.BOILED_WATER], result: [CARD_KEY.DOUGH, CARD_KEY.VESSEL], consumes: [CARD_KEY.BOILED_WATER, CARD_KEY.FLOUR], decrease: null, increase: null },
  {
    combo: [CARD_KEY.DOUGH, CARD_KEY.CAMPFIRE],
    result: [CARD_KEY.BREAD],
    consumes: [CARD_KEY.DOUGH],
    decrease: null,
    increase: null,
    badge: 3
  },
  { combo: [CARD_KEY.FISHING_LINE, CARD_KEY.WORM], result: [CARD_KEY.BAIT_FISHING_LINE], consumes: [CARD_KEY.FISHING_LINE, CARD_KEY.WORM], decrease: null, increase: null },
  {
    combo: [CARD_KEY.BAIT_FISHING_LINE, CARD_KEY.RIVER],
    result: [CARD_KEY.FISH, CARD_KEY.FISHING_LINE],
    consumes: [CARD_KEY.BAIT_FISHING_LINE],
    decrease: null,
    increase: null,
    badge: 2
  },
  { combo: [CARD_KEY.LEAF, CARD_KEY.CORDAGE], result: [CARD_KEY.BASKET], consumes: [CARD_KEY.LEAF, CARD_KEY.CORDAGE], decrease: null, increase: null },
  { combo: [CARD_KEY.LEAF_FIBERS, CARD_KEY.WATER], result: [CARD_KEY.PAPER_PULP, CARD_KEY.VESSEL], consumes: [CARD_KEY.LEAF_FIBERS, CARD_KEY.WATER], decrease: null, increase: null },
  { combo: [CARD_KEY.LEAF_FIBERS, CARD_KEY.BOILED_WATER], result: [CARD_KEY.PAPER_PULP, CARD_KEY.VESSEL], consumes: [CARD_KEY.LEAF_FIBERS, CARD_KEY.BOILED_WATER], decrease: null, increase: null },
  { combo: [CARD_KEY.ADOBE_BRICK, CARD_KEY.WOODEN_PLANKS], result: [CARD_KEY.HUT], consumes: [CARD_KEY.ADOBE_BRICK, CARD_KEY.WOODEN_PLANKS], decrease: null, increase: null, badge: 5 },
  {
    combo: [CARD_KEY.COAL, CARD_KEY.WATER],
    result: [CARD_KEY.INK, CARD_KEY.VESSEL],
    consumes: [CARD_KEY.COAL, CARD_KEY.WATER],
    decrease: null,
    increase: null
  },
  { combo: [CARD_KEY.CAMPFIRE, CARD_KEY.RAW_CHICKEN], result: [CARD_KEY.COOKED_CHICKEN], consumes: [CARD_KEY.RAW_CHICKEN], decrease: null, increase: null },
  { combo: [CARD_KEY.BASKET, CARD_KEY.CHICKEN], result: [CARD_KEY.EGGS], consumes: [], decrease: null, increase: null },
  { combo: [CARD_KEY.INK, CARD_KEY.FEATHER], result: [CARD_KEY.QUILL], consumes: [CARD_KEY.INK, CARD_KEY.FEATHER], decrease: null, increase: null },
  {
    combo: [CARD_KEY.BREAD_CRUMBS, CARD_KEY.BRUSH],
    result: IDLE,
    consumes: [CARD_KEY.BREAD_CRUMBS, CARD_KEY.BRUSH],
    message: { type: 'info', i18nKey: 'cleanFloor' },
    decrease: null,
    increase: null
  },
  { combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.DIRT], result: [CARD_KEY.CLAY, CARD_KEY.WORM], consumes: [], decrease: null, increase: null },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.RIVER],
    result: IDLE,
    consumes: [],
    message: { type: 'warning', i18nKey: 'waterHarm' },
    decrease: { health: STAT_CHANGE_SM },
    increase: { thirst: STAT_CHANGE_SM }
  },
  { combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.MOUNTAIN], result: [CARD_KEY.ROCK], consumes: [], decrease: null, increase: null },
  { combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.LOG], result: [CARD_KEY.WOODEN_PLANKS], consumes: [CARD_KEY.LOG], decrease: null, increase: null },
  { combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.CLAY], result: [CARD_KEY.VESSEL], consumes: [CARD_KEY.CLAY], decrease: null, increase: null },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.WATER],
    result: [CARD_KEY.VESSEL],
    consumes: [CARD_KEY.WATER],
    message: { type: 'warning', i18nKey: 'waterHarm' },
    decrease: { health: STAT_CHANGE_SM },
    increase: { thirst: STAT_CHANGE_MD }
  },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.APPLE],
    result: [CARD_KEY.SEEDS],
    consumes: [CARD_KEY.APPLE],
    decrease: null,
    increase: { health: STAT_CHANGE_MD }
  },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.BOILED_WATER],
    result: [CARD_KEY.VESSEL],
    consumes: [CARD_KEY.BOILED_WATER],
    decrease: null,
    increase: { thirst: STAT_CHANGE_XXL }
  },
  { combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.LEAF_FIBERS], result: [CARD_KEY.CORDAGE], consumes: [CARD_KEY.LEAF_FIBERS], decrease: null, increase: null },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.FISH],
    result: [CARD_KEY.FISH_SPINE],
    consumes: [CARD_KEY.FISH],
    decrease: null,
    increase: { health: STAT_CHANGE_MD }
  },
  { combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.MUD], result: [CARD_KEY.ADOBE_BRICK], consumes: [CARD_KEY.MUD], decrease: null, increase: null },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.BULL],
    result: [CARD_KEY.LEATHER, CARD_KEY.BONE, CARD_KEY.RAW_MEAT],
    consumes: [CARD_KEY.BULL],
    decrease: null,
    increase: null
  },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.GRILLED_FISH],
    result: [CARD_KEY.FISH_SPINE],
    consumes: [CARD_KEY.GRILLED_FISH],
    decrease: null,
    increase: { health: STAT_CHANGE_MD }
  },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.RAW_MEAT],
    result: IDLE,
    consumes: [CARD_KEY.RAW_MEAT],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rawMeat' }
  },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.COOKED_MEAT],
    result: IDLE,
    consumes: [CARD_KEY.COOKED_MEAT],
    decrease: null,
    increase: { health: STAT_CHANGE_LG }
  },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.HERBAL_TEA],
    result: [CARD_KEY.VESSEL],
    consumes: [CARD_KEY.HERBAL_TEA],
    decrease: null,
    increase: { health: STAT_CHANGE_SM, thirst: STAT_CHANGE_MD }
  },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.BREAD],
    result: [CARD_KEY.BREAD_CRUMBS],
    consumes: [CARD_KEY.BREAD],
    decrease: null,
    increase: { health: STAT_CHANGE_MD },
    callback: spawnChickenCallback
  },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.CHICKEN],
    result: [CARD_KEY.FEATHER, CARD_KEY.RAW_CHICKEN],
    consumes: [CARD_KEY.CHICKEN],
    decrease: null,
    increase: null
  },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.RAW_CHICKEN],
    result: IDLE,
    consumes: [CARD_KEY.RAW_CHICKEN],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rawChicken' }
  },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.COOKED_CHICKEN],
    result: IDLE,
    consumes: [CARD_KEY.COOKED_CHICKEN],
    decrease: null,
    increase: { health: STAT_CHANGE_LG }
  },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.ROTTEN_APPLE],
    result: IDLE,
    consumes: [CARD_KEY.ROTTEN_APPLE],
    decrease: { health: STAT_CHANGE_MD },
    increase: null,
    message: { type: 'error', i18nKey: 'rottenFood' }
  },
  {
    combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.CAVE],
    result: [CARD_KEY.IRON_ORE],
    consumes: [],
    decrease: null,
    increase: null,
    badge: 7
  },
  { combo: [CARD_KEY.DRESSED_AXEMAN, CARD_KEY.PAPER_PULP], result: [CARD_KEY.PAPER], consumes: [CARD_KEY.PAPER_PULP], decrease: null, increase: null },
  { combo: [CARD_KEY.NEEDLE_THREAD, CARD_KEY.LEATHER], result: [CARD_KEY.CLOTHES], consumes: [CARD_KEY.LEATHER], decrease: null, increase: null },
  { combo: [CARD_KEY.FURNACE, CARD_KEY.IRON_ORE], result: [CARD_KEY.IRON_NUGGET], consumes: [CARD_KEY.IRON_ORE], decrease: null, increase: null },
  { combo: [CARD_KEY.FABRIC, CARD_KEY.NEEDLE_THREAD], result: [CARD_KEY.CLOTHES], consumes: [CARD_KEY.FABRIC], decrease: null, increase: null },
  { combo: [CARD_KEY.PAPER, CARD_KEY.QUILL], result: [CARD_KEY.NOTE], consumes: [CARD_KEY.PAPER], decrease: null, increase: null, badge: 6 },
  { combo: [CARD_KEY.PAPER, CARD_KEY.QUILL], result: [CARD_KEY.NOTE], consumes: [CARD_KEY.PAPER], decrease: null, increase: null },
  { combo: [CARD_KEY.PAPER, CARD_KEY.LEATHER], result: [CARD_KEY.BOOK], consumes: [CARD_KEY.PAPER, CARD_KEY.LEATHER], decrease: null, increase: null },
  { combo: [CARD_KEY.NOTE, CARD_KEY.LEATHER], result: [CARD_KEY.BOOK], consumes: [CARD_KEY.NOTE, CARD_KEY.LEATHER], decrease: null, increase: null }
]

export function seeCurrentCombinations(combos = combinations) {
  return combos
    .map(({ combo, result }) => {
      const comboNames = combo.map(cardKey => i18n.t(`cards.${cardKey}`)).join(' <> ')
      const resultNames = Array.isArray(result)
        ? result.map(cardKey => i18n.t(`cards.${cardKey}`)).join(', ')
        : 'IDLE'
      return `${comboNames} = ${resultNames}`
    })
    .join('<br />')
}

export function seeAllCombinations() {
  return combinations
    .map(({ combo, result, decrease, increase, badge }) => {
      const comboNames = combo.map(cardKey => i18n.t(`cards.${cardKey}`)).join(' <> ')
      const resultNames = Array.isArray(result)
        ? result.map(cardKey => i18n.t(`cards.${cardKey}`)).join(', ')
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
