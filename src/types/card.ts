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
  AXEMAN = 'axeman',
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
  BREAD = 'bread',
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
  DRESSED_AXEMAN = 'dressed-axeman',
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
  LYE = 'lye'
}

export interface CardData {
  key: CardKey
  image: string
  isInitial?: boolean
  isPerson?: boolean
  isSource?: boolean
  isEquippable?: boolean
  className?: string
}

export interface CardConfig {
  updateDiscoveries: boolean
  isInteractive: boolean
}
