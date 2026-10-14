export enum CardKey {
  PERSON = 'person',
  DIRT = 'dirt',
  TREE = 'tree',
  RIVER = 'river',
  MOUNTAIN = 'mountain',
  LOG = 'log',
  ROCK = 'rock',
  STICK = 'stick',
  CAMPFIRE = 'campfire',
  SHARPEN_ROCK = 'sharpen-rock',
  AXE = 'axe',
  CLAY = 'clay',
  VESSEL = 'vessel',
  WATER = 'water',
  APPLE = 'apple',
  BOILED_WATER = 'boiled-water',
  COAL = 'coal',
  LEAF = 'leaf',
  LEAF_FIBERS = 'leaf-fibers',
  CORDAGE = 'cordage',
  FISHING_LINE = 'fishing-line',
  FISH = 'fish',
  MUD = 'mud',
  ADOBE_BRICK = 'adobe-brick',
  BULL = 'bull',
  LEATHER = 'leather',
  BONE = 'bone',
  CLOTHES = 'clothes',
  SEEDS = 'seeds',
  SPROUT = 'sprout',
  PLANT = 'plant',
  SAND = 'sand',
  GLASS = 'glass',
  WORM = 'worm',
  SAP = 'sap',
  BARK = 'bark',
  TORCH = 'torch',
  ASHES = 'ashes',
  GRILLED_FISH = 'grilled-fish',
  RAW_MEAT = 'raw-meat',
  COOKED_MEAT = 'cooked-meat',
  HERBAL_TEA = 'herbal-tea',
  MORTAR = 'mortar',
  FLOUR = 'flour',
  DOUGH = 'dough',
  DRIED_PASTA = 'dried-pasta',
  COOKED_PASTA = 'cooked-pasta',
  BREAD = 'bread',
  SANDWICH = 'sandwich',
  BAIT_FISHING_LINE = 'bait-fishing-line',
  WOODEN_PLANKS = 'wooden-planks',
  BASKET = 'basket',
  HUT = 'hut',
  INK = 'ink',
  BREAD_CRUMBS = 'bread-crumbs',
  CHICKEN = 'chicken',
  FEATHER = 'feather',
  RAW_CHICKEN = 'raw-chicken',
  COOKED_CHICKEN = 'cooked-chicken',
  EGGS = 'eggs',
  QUILL = 'quill',
  BRUSH = 'brush',
  FISH_SPINE = 'fish-spine',
  NEEDLE_THREAD = 'needle-thread',
  TREE_THORN = 'tree-thorn',
  ROTTEN_APPLE = 'rotten-apple',
  CAVE = 'cave',
  IRON_ORE = 'iron-ore',
  FURNACE = 'furnace',
  IRON_NUGGET = 'iron-nugget',
  LOOM = 'loom',
  FABRIC = 'fabric',
  PAPER_PULP = 'paper-pulp',
  PAPER = 'paper',
  NOTE = 'note',
  BOOK = 'book',
  LYE = 'lye',
  // person type keys
  PERSON_WITH_TORCH = 'person-with-torch',
  AXEMAN = 'person-axeman',
  AXEMAN_WITH_TORCH = 'person-axeman-with-torch',
  DRESSED_AXEMAN = 'person-dressed-axeman',
  DRESSED_AXEMAN_WITH_TORCH = 'person-dressed-axeman-with-torch'
}

export interface CardData {
  key: CardKey
  image: string
  isInitial?: boolean
  isPerson?: boolean
  isSource?: boolean
  isStation?: boolean
  equipmentId?: 'hand' | 'armor'
  className?: string
}

export interface CardConfig {
  updateDiscoveries: boolean
  isInteractive: boolean
}
