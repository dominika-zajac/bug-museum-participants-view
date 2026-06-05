// Museum of Bugs – Exhibit Data
// NOTE FOR WORKSHOP: Contains intentional data bugs for exercises #11 and #12

import ladybugImg from '../assets/exhibit_ladybug_1780132631312.png';
import stagBeetleImg from '../assets/exhibit_stag_beetle_1780132644943.png';
import fireflyImg from '../assets/exhibit_firefly_1780132658945.png';
import atlasMothImg from '../assets/exhibit_atlas_moth_1780132671135.png';
import prayingMantisImg from '../assets/exhibit_praying_mantis_1780132683967.png';
import herculesBeetleImg from '../assets/exhibit_hercules_beetle_1780132696866.png';
import monarchButterflyImg from '../assets/exhibit_monarch_butterfly_1780132715828.png';
import orchidMantisImg from '../assets/exhibit_orchid_mantis_1780132727559.png';
import antColonyImg from '../assets/exhibit_ant_colony_1780132741188.png';
import dragonflyImg from '../assets/exhibit_dragonfly_1780132755202.png';
import leafInsectImg from '../assets/exhibit_leaf_insect_1780132773982.png';
import goliathBeetleImg from '../assets/exhibit_goliath_beetle_1780132784419.png';

export const exhibits = [
  {
    id: 1,
    title: 'Ladybug',
    scientificName: 'Coccinella septempunctata',
    description: 'The ladybug: nature\'s polka-dotted pest control. Farmers love them. Aphids do not. Known to bring good luck, presumably not to the aphids.',
    category: 'Beetle',
    rarity: 'Common',
    location: 'Europe & North America',
    imageUrl: ladybugImg,
    funFact: 'A ladybug can eat up to 5,000 aphids in its lifetime.',
    exhibitNumber: 'EX-001',
  },
  {
    id: 2,
    title: 'Stag Beetle',
    scientificName: 'Lucanus cervus',
    description: 'The Stag Beetle sports magnificent antler-like mandibles it uses for wrestling matches with rival males. It\'s basically medieval jousting, but smaller and with more legs.',
    category: 'Beetle',
    rarity: 'Uncommon',
    location: 'Europe',
    imageUrl: stagBeetleImg,
    funFact: 'Males can grow up to 7.5cm long, mandibles included.',
    exhibitNumber: 'EX-002',
  },
  {
    id: 3,
    title: 'Firefly',
    scientificName: 'Photinus pyralis',
    description: 'The firefly is an insect that literally glows in the dark using bioluminescence. It\'s basically a tiny organic light show, no batteries required.',
    category: 'Beetle',
    rarity: 'Uncommon',
    location: 'North America & Asia',
    imageUrl: fireflyImg,
    funFact: 'Their light is nearly 100% efficient — almost no heat is produced.',
    exhibitNumber: 'EX-003',
  },
  {
    id: 4,
    title: 'Atlas Moth',
    scientificName: 'Attacus atlas',
    description: 'With a wingspan up to 30cm, the Atlas Moth is essentially a flying dinner plate. It has no mouth and lives entirely on fat reserves from its caterpillar days. Goals.',
    category: 'Moth',
    rarity: 'Rare',
    location: 'Southeast Asia',
    imageUrl: atlasMothImg,
    funFact: 'Adults cannot eat and only live for 1–2 weeks.',
    exhibitNumber: 'EX-004',
  },
  {
    id: 5,
    title: 'Praying Mantis',
    scientificName: 'Mantis religiosa',
    description: 'The Praying Mantis looks serene and contemplative. It is not. It\'s an ambush predator with lightning reflexes that catches prey faster than the human eye can follow.',
    category: 'Mantis',
    rarity: 'Uncommon',
    location: 'Worldwide',
    imageUrl: prayingMantisImg,
    funFact: 'They are the only insect that can look over their shoulder.',
    exhibitNumber: 'EX-005',
  },
  {
    id: 6,
    title: 'Hercules Beetle',
    scientificName: 'Dynastes hercules',
    description: 'The Hercules Beetle can lift 850 times its own body weight. Named after the Greek hero, it has one giant horn that it uses to flip rivals upside down like tiny, beetle-sized WWE wrestlers.',
    category: 'Beetle',
    rarity: 'Rare',
    location: 'Central & South America',
    imageUrl: herculesBeetleImg,
    funFact: 'The longest beetle in the world, reaching up to 17cm.',
    exhibitNumber: 'EX-006',
  },
  {
    id: 7,
    title: 'Monarch Butterfly',
    scientificName: 'Danaus plexippus',
    description: 'The Monarch migrates up to 4,500km each year, navigating by the sun and Earth\'s magnetic field. Basically a GPS system with wings and no roaming charges.',
    category: 'Butterfly',
    rarity: 'Uncommon',
    location: 'North America & Mexico',
    imageUrl: monarchButterflyImg,
    funFact: 'They are poisonous to predators due to toxins absorbed from milkweed.',
    exhibitNumber: 'EX-007',
  },
  {
    id: 8,
    title: 'Orchid Mantis',
    scientificName: 'Hymenopus coronatus',
    description: 'The Orchid Mantis doesn\'t just hide in flowers. It IS a flower. Or convincingly pretends to be one. Insects fly to it expecting nectar and get eaten instead. Savage.',
    category: 'Mantis',
    rarity: 'Rare',
    location: 'Southeast Asia',
    imageUrl: orchidMantisImg,
    funFact: 'Males are half the size of females and look so different they were once classified as separate species.',
    exhibitNumber: 'EX-008',
  },
  {
    id: 9,
    title: 'Ant Colony',
    scientificName: 'Atta cephalotes',
    description: 'A single leafcutter ant colony can contain 8 million individuals. They farm fungus underground. They have been doing sustainable agriculture for 50 million years longer than humans.',
    category: 'Ant',
    rarity: 'Common',
    location: 'Central & South America',
    imageUrl: 'https://museum-of-bugs.example.com/images/ant-colony-missing.jpg',
    funFact: 'Leafcutter ants carry up to 50 times their body weight.',
    exhibitNumber: 'EX-009',
  },
  {
    id: 10,
    title: 'Dragonfly',
    scientificName: 'Anax imperator',
    description: 'The dragonfly has been around for 300 million years. It existed before dinosaurs. It has a 95% hunting success rate. Your cat wishes it had these stats.',
    category: 'Dragonfly',
    rarity: 'Common',
    location: 'Worldwide',
    imageUrl: dragonflyImg,
    funFact: 'They can fly in all six directions including backwards and sideways.',
    exhibitNumber: 'EX-010',
  },
  {
    id: 11,
    title: 'Leaf Insect',
    scientificName: 'Phyllium giganteum',
    description: 'The Leaf Insect has evolved to look exactly like a leaf — including simulated bite marks and fake leaf veins. It even sways gently as it walks, mimicking a leaf in the breeze. Method acting at its finest.',
    category: 'Stick Insect',
    rarity: 'Rare',
    location: 'Southeast Asia',
    imageUrl: leafInsectImg,
    funFact: 'They even reproduce without males through parthenogenesis.',
    exhibitNumber: 'EX-011',
  },
  {
    id: 12,
    title: 'Goliath Beetle',
    scientificName: 'Goliathus goliatus',
    description: 'The Goliath Beetle is the heaviest insect on Earth, weighing up to 115g as a larva. That\'s heavier than a deck of cards. Or a hamster. A tiny hamster.',
    category: 'Beetle',
    rarity: 'Common',
    location: 'Equatorial Africa',
    imageUrl: goliathBeetleImg,
    funFact: 'Their larvae are fed dog or cat food in captivity due to high protein needs.',
    exhibitNumber: 'EX-012',
  },
];

export const categories = [...new Set(exhibits.map(e => e.category))];
export const rarities = ['Common', 'Uncommon', 'Rare', 'Legendary'];
