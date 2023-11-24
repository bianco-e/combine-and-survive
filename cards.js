import { IDLE } from './utils.js'

const cards = [
  {
    name: 'Person',
    image: '/public/images/person.png',
    id: 1,
    isPerson: true,
    combinations: {
      11: [12],
      15: IDLE,
      16: [30],
      17: IDLE,
      23: IDLE
    }
  },
  {
    name: 'Dirt',
    id: 2,
    image: '/public/images/dirt.jpg',
    isInitial: true,
    combinations: {
      1: [13],
      15: [24],
      30: [31]
    }
  },
  {
    name: 'Tree',
    id: 3,
    image: '/public/images/tree.webp',
    isInitial: true,
    combinations: {
      1: [8, 16],
      12: [6, 8, 16],
      10: [19]
    }
  },
  {
    name: 'River',
    id: 4,
    image: '/public/images/river.png',
    isInitial: true,
    combinations: {
      14: [15],
      22: [23]
    }
  },
  {
    name: 'Mountain',
    id: 5,
    image: '/public/images/mountain.png',
    isInitial: true,
    combinations: {
      1: [7]
    }
  },
  {
    name: 'Log',
    id: 6,
    image: '/public/images/log.webp',
    combinations: {}
  },
  {
    name: 'Rock',
    id: 7,
    image: '/public/images/rock.png',
    combinations: {
      7: [10]
    }
  },
  {
    name: 'Stick',
    id: 8,
    image: '/public/images/stick.png',
    combinations: {
      8: [9],
      10: [11],
      21: [22]
    }
  },
  {
    name: 'Campfire',
    id: 9,
    image: '/public/images/campfire.png',
    combinations: {
      15: [17],
      6: [18]
    }
  },
  {
    name: 'Sharpen Rock',
    id: 10,
    image: '/public/images/sharpen-rock.jpeg',
    combinations: {
      8: [11]
    }
  },
  {
    name: 'Axe',
    id: 11,
    image: '/public/images/axe.png',
    combinations: {}
  },
  {
    name: 'Axeman',
    id: 12,
    image: '/public/images/axeman.png',
    combinations: {
      26: [27, 28],
      16: [30]
    },
    isPerson: true
  },
  {
    name: 'Clay',
    id: 13,
    image: '/public/images/clay.jpeg',
    combinations: {
      1: [14]
    }
  },
  {
    name: 'Pottery',
    id: 14,
    image: '/public/images/pottery.webp',
    combinations: {}
  },
  {
    name: 'Water',
    id: 15,
    decrease: {
      health: 5
    },
    increase: {
      thirst: 10
    },
    singleUse: true,
    image: '/public/images/water.png',
    combinations: {
      1: IDLE,
      2: [24]
    }
  },
  {
    name: 'Apple',
    id: 16,
    increase: {
      health: 10
    },
    singleUse: true,
    image: '/public/images/apple.png',
    combinations: {
      1: [30]
    }
  },
  {
    name: 'Boiled Water',
    id: 17,
    increase: {
      thirst: 20
    },
    singleUse: true,
    image: '/public/images/boiled-water.png',
    combinations: {
      1: IDLE
    }
  },
  {
    name: 'Charcoal',
    id: 18,
    image: '/public/images/charcoal.png',
    combinations: {}
  },
  {
    name: 'Leaf',
    id: 19,
    image: '/public/images/leaf.png',
    combinations: {
      1: [20]
    }
  },
  {
    name: 'Leaf Fibers',
    id: 20,
    image: '/public/images/leaf-fibers.png',
    combinations: {
      1: [21]
    }
  },
  {
    name: 'Cordage',
    id: 21,
    image: '/public/images/cordage.webp',
    combinations: {
      8: [22],
      27: [29]
    }
  },
  {
    name: 'Fishing Rod',
    id: 22,
    image: '/public/images/fishing-rod.png',
    combinations: {}
  },
  {
    name: 'Fish',
    id: 23,
    increase: {
      health: 20
    },
    singleUse: true,
    image: '/public/images/fish.png',
    combinations: {
      1: IDLE
    }
  },
  {
    name: 'Mud',
    id: 24,
    image: '/public/images/mud.png',
    combinations: {
      1: [25]
    }
  },
  {
    name: 'Adobe Brick',
    id: 25,
    image: '/public/images/adobe-brick.jpg',
    combinations: {}
  },
  {
    name: 'Bull',
    id: 26,
    isAnimal: true,
    singleUse: true,
    image: '/public/images/bull.webp',
    combinations: {
      12: [27, 28]
    }
  },
  {
    name: 'Leather',
    id: 27,
    image: '/public/images/leather.png',
    combinations: {
      21: [29]
    }
  },
  {
    name: 'Bone',
    id: 28,
    image: '/public/images/bone.png',
    combinations: {}
  },
  {
    name: 'Clothes',
    id: 29,
    image: '/public/images/clothes.png',
    combinations: {}
  },
  {
    name: 'Seeds',
    id: 30,
    image: '/public/images/seeds.webp',
    combinations: {
      2: [31]
    }
  },
  {
    name: 'Plant',
    id: 31,
    image: '/public/images/plant.png',
    combinations: {}
  }
]

export default cards
