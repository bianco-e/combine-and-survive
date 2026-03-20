export const CARD_KEY = Object.freeze({
  PERSON: 'person',
  DIRT: 'dirt',
  TREE: 'tree',
  RIVER: 'river',
  MOUNTAIN: 'mountain',
  LOG: 'log',
  ROCK: 'rock',
  STICK: 'stick',
  CAMPFIRE: 'campfire',
  SHARPEN_ROCK: 'sharpen-rock',
  AXE: 'axe',
  AXEMAN: 'axeman',
  CLAY: 'clay',
  VESSEL: 'vessel',
  WATER: 'water',
  APPLE: 'apple',
  BOILED_WATER: 'boiled-water',
  COAL: 'coal',
  LEAF: 'leaf',
  LEAF_FIBERS: 'leaf-fibers',
  CORDAGE: 'cordage',
  FISHING_LINE: 'fishing-line',
  FISH: 'fish',
  MUD: 'mud',
  ADOBE_BRICK: 'adobe-brick',
  BULL: 'bull',
  LEATHER: 'leather',
  BONE: 'bone',
  CLOTHES: 'clothes',
  SEEDS: 'seeds',
  SPROUT: 'sprout',
  PLANT: 'plant',
  SAND: 'sand',
  GLASS: 'glass',
  WORM: 'worm',
  SAP: 'sap',
  BARK: 'bark',
  TORCH: 'torch',
  ASHES: 'ashes',
  GRILLED_FISH: 'grilled-fish',
  RAW_MEAT: 'raw-meat',
  COOKED_MEAT: 'cooked-meat',
  HERBAL_TEA: 'herbal-tea',
  MORTAR: 'mortar',
  FLOUR: 'flour',
  DOUGH: 'dough',
  BREAD: 'bread',
  BAIT_FISHING_LINE: 'bait-fishing-line',
  WOODEN_PLANKS: 'wooden-planks',
  BASKET: 'basket',
  HUT: 'hut',
  INK: 'ink',
  BREAD_CRUMBS: 'bread-crumbs',
  CHICKEN: 'chicken',
  FEATHER: 'feather',
  RAW_CHICKEN: 'raw-chicken',
  COOKED_CHICKEN: 'cooked-chicken',
  EGGS: 'eggs',
  QUILL: 'quill',
  DRESSED_AXEMAN: 'dressed-axeman',
  BRUSH: 'brush',
  FISH_SPINE: 'fish-spine',
  NEEDLE_THREAD: 'needle-thread',
  TREE_THORN: 'tree-thorn',
  ROTTEN_APPLE: 'rotten-apple',
  CAVE: 'cave',
  IRON_ORE: 'iron-ore',
  FURNACE: 'furnace',
  IRON_NUGGET: 'iron-nugget',
  LOOM: 'loom',
  FABRIC: 'fabric',
  PAPER_PULP: 'paper-pulp',
  PAPER: 'paper',
  NOTE: 'note',
  BOOK: 'book',
  LYE: 'lye'
})

const cardsData = [
  {
    key: CARD_KEY.PERSON,
    image: '/images/person.webp',
    isInitial: true,
    isPerson: true
  },
  {
    key: CARD_KEY.DIRT,
    image: '/images/dirt.png',
    isInitial: true,
    isSource: true
  },
  {
    key: CARD_KEY.TREE,
    image: '/images/tree.webp',
    isInitial: true,
    isSource: true
  },
  {
    key: CARD_KEY.RIVER,
    image: '/images/river.png',
    isInitial: true,
    isSource: true
  },
  {
    key: CARD_KEY.MOUNTAIN,
    image: '/images/mountain.png',
    isInitial: true,
    isSource: true
  },
  {
    key: CARD_KEY.LOG,
    image: '/images/log.webp'
  },
  {
    key: CARD_KEY.ROCK,
    image: '/images/rock.png'
  },
  {
    key: CARD_KEY.STICK,
    image: '/images/stick.png'
  },
  {
    key: CARD_KEY.CAMPFIRE,
    image: '/images/campfire.png'
  },
  {
    key: CARD_KEY.SHARPEN_ROCK,
    image: '/images/sharpen-rock.png'
  },
  {
    key: CARD_KEY.AXE,
    isEquippable: true,
    image: '/images/axe.png'
  },
  {
    key: CARD_KEY.AXEMAN,
    image: '/images/person_axe.webp',
    isPerson: true
  },
  {
    key: CARD_KEY.CLAY,
    image: '/images/clay.png'
  },
  {
    key: CARD_KEY.VESSEL,
    image: '/images/vessel.webp'
  },
  {
    key: CARD_KEY.WATER,
    image: '/images/water.png'
  },
  {
    key: CARD_KEY.APPLE,
    image: '/images/apple.png'
  },
  {
    key: CARD_KEY.BOILED_WATER,
    image: '/images/boiled-water.png'
  },
  {
    key: CARD_KEY.COAL,
    image: '/images/coal.png'
  },
  {
    key: CARD_KEY.LEAF,
    image: '/images/leaf.png'
  },
  {
    key: CARD_KEY.LEAF_FIBERS,
    image: '/images/leaf-fibers.png'
  },
  {
    key: CARD_KEY.CORDAGE,
    image: '/images/cordage.webp'
  },
  {
    key: CARD_KEY.FISHING_LINE,
    image: '/images/fishing-line.png'
  },
  {
    key: CARD_KEY.FISH,
    image: '/images/fish.png'
  },
  {
    key: CARD_KEY.MUD,
    image: '/images/mud.png'
  },
  {
    key: CARD_KEY.ADOBE_BRICK,
    image: '/images/adobe-brick.png'
  },
  {
    key: CARD_KEY.BULL,
    image: '/images/bull.png'
  },
  {
    key: CARD_KEY.LEATHER,
    image: '/images/leather.png'
  },
  {
    key: CARD_KEY.BONE,
    image: '/images/bone.png'
  },
  {
    key: CARD_KEY.CLOTHES,
    isEquippable: true,
    image: '/images/clothes.png'
  },
  {
    key: CARD_KEY.SEEDS,
    image: '/images/seeds.webp'
  },
  {
    key: CARD_KEY.SPROUT,
    image: '/images/sprout.png'
  },
  {
    key: CARD_KEY.PLANT,
    image: '/images/plant.png'
  },
  {
    key: CARD_KEY.SAND,
    image: '/images/sand.png'
  },
  {
    key: CARD_KEY.GLASS,
    image: '/images/glass.png'
  },
  {
    key: CARD_KEY.WORM,
    image: '/images/worm.png'
  },
  {
    key: CARD_KEY.SAP,
    image: '/images/sap.webp'
  },
  {
    key: CARD_KEY.BARK,
    image: '/images/bark.png'
  },
  {
    key: CARD_KEY.TORCH,
    image: '/images/torch.png'
  },
  {
    key: CARD_KEY.ASHES,
    image: '/images/ashes.webp'
  },
  {
    key: CARD_KEY.GRILLED_FISH,
    image: '/images/grilled-fish.webp'
  },
  {
    key: CARD_KEY.RAW_MEAT,
    image: '/images/raw-meat.webp'
  },
  {
    key: CARD_KEY.COOKED_MEAT,
    image: '/images/cooked-meat.png'
  },
  {
    key: CARD_KEY.HERBAL_TEA,
    image: '/images/herbal-tea.png'
  },
  {
    key: CARD_KEY.MORTAR,
    image: '/images/mortar.png'
  },
  {
    key: CARD_KEY.FLOUR,
    image: '/images/flour.webp'
  },
  {
    key: CARD_KEY.DOUGH,
    image: '/images/dough.webp'
  },
  {
    key: CARD_KEY.BREAD,
    image: '/images/bread.png'
  },
  {
    key: CARD_KEY.BAIT_FISHING_LINE,
    image: '/images/fishing-line-bait.png'
  },
  {
    key: CARD_KEY.WOODEN_PLANKS,
    image: '/images/wooden-planks.png'
  },
  {
    key: CARD_KEY.BASKET,
    image: '/images/basket.webp'
  },
  {
    key: CARD_KEY.HUT,
    image: '/images/hut.png'
  },
  {
    key: CARD_KEY.INK,
    image: '/images/ink.png'
  },
  {
    key: CARD_KEY.BREAD_CRUMBS,
    image: '/images/bread-crumbs.png'
  },
  {
    key: CARD_KEY.CHICKEN,
    image: '/images/chicken.png'
  },
  {
    key: CARD_KEY.FEATHER,
    image: '/images/feather.webp'
  },
  {
    key: CARD_KEY.RAW_CHICKEN,
    image: '/images/raw-chicken.png'
  },
  {
    key: CARD_KEY.COOKED_CHICKEN,
    image: '/images/cooked-chicken.webp'
  },
  {
    key: CARD_KEY.EGGS,
    image: '/images/eggs.webp'
  },
  {
    key: CARD_KEY.QUILL,
    image: '/images/quill.png'
  },
  {
    key: CARD_KEY.DRESSED_AXEMAN,
    image: '/images/person_axe_clothes.webp',
    isPerson: true
  },
  {
    key: CARD_KEY.BRUSH,
    image: '/images/brush.png'
  },
  {
    key: CARD_KEY.FISH_SPINE,
    image: '/images/fish-skeleton.png'
  },
  {
    key: CARD_KEY.NEEDLE_THREAD,
    image: '/images/needle-thread.png'
  },
  {
    key: CARD_KEY.TREE_THORN,
    image: '/images/tree-thorn.webp'
  },
  {
    key: CARD_KEY.ROTTEN_APPLE,
    image: '/images/rotten-apple.png'
  },
  {
    key: CARD_KEY.CAVE,
    image: '/images/cave.webp',
    isSource: true
  },
  {
    key: CARD_KEY.IRON_ORE,
    image: '/images/iron-ore.png'
  },
  {
    key: CARD_KEY.FURNACE,
    image: '/images/furnace.png'
  },
  {
    key: CARD_KEY.IRON_NUGGET,
    image: '/images/iron-nugget.png'
  },
  {
    key: CARD_KEY.LOOM,
    image: '/images/loom.png'
  },
  {
    key: CARD_KEY.FABRIC,
    image: '/images/fabric.png'
  },
  {
    key: CARD_KEY.PAPER_PULP,
    image: '/images/paper-pulp.png'
  },
  {
    key: CARD_KEY.PAPER,
    image: '/images/paper.png'
  },
  {
    key: CARD_KEY.NOTE,
    image: '/images/note.png'
  },
  {
    key: CARD_KEY.BOOK,
    image: '/images/book.png'
  },
  {
    key: CARD_KEY.LYE,
    image: '/images/lye.png'
  }
]

export default cardsData