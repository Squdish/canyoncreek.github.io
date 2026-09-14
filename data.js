/* ==========================================================================
   CANYON CREEK — shared property/business data
   Backed by localStorage so the admin office and the land office page
   stay in sync on the same browser. Replace with a real API later.
   ========================================================================== */

const CC_STORAGE_KEY = 'ccProperties_v1';

// Each listing's `image` field is just a file name (e.g. 'silver-bend-ranch.jpg').
// Drop the matching screenshot into /images/properties/ and set this field from
// admin.html — see images/properties/README.txt for the full walkthrough.
// Leave it as '' to show the default colored placeholder instead of a photo.
const CC_IMAGE_PATH = 'images/properties/';

const CC_DEFAULT_PROPERTIES = [
  /* ---------------- RANCHES ---------------- */
  {
    id: 'p-silverbend',
    image: 'silver-bend-ranch.jpg',
    name: 'Silver Bend Ranch',
    category: 'ranch',
    status: 'available',
    price: '$4,250',
    size: '86 acres',
    desc: 'A working cattle ranch tucked along the creek bend, with a timber homestead, stable for six horses, and grazing land that runs to the tree line.'
  },
  {
    id: 'p-duststar',
    image: 'dust-star-ranch.jpg',
    name: 'Dust Star Ranch',
    category: 'ranch',
    status: 'sold',
    price: '$5,100',
    size: '112 acres',
    desc: 'A sprawling spread with a two-story ranch house, breaking pens, and water rights to the north fork of the creek.'
  },
  {
    id: 'p-crackedhorn',
    image: 'cracked-horn-ranch.jpg',
    name: 'Cracked Horn Ranch',
    category: 'ranch',
    status: 'leased',
    price: '$3,800',
    size: '64 acres',
    desc: 'A cattle and horse-breeding outfit with a solid barn, round pen, and bunkhouse for hired hands. Fences need mending, but the land is good.'
  },
  {
    id: 'p-redwater',
    image: 'redwater-ranch.jpg',
    name: 'Redwater Ranch',
    category: 'ranch',
    status: 'available',
    price: '$4,600',
    size: '78 acres',
    desc: 'Sits along the river shallows with easy water access for stock. Includes a smokehouse, tack room, and a modest ranch house.'
  },

  /* ---------------- FARMS ---------------- */
  {
    id: 'p-quietacre',
    image: 'quiet-acre-farm.jpg',
    name: 'Quiet Acre Farm',
    category: 'farm',
    status: 'available',
    price: '$2,700',
    size: '40 acres',
    desc: 'Fertile bottomland good for crops, a small barn, and a modest farmhouse with a view of the falls.'
  },
  {
    id: 'p-millstone',
    image: 'millstone-farm.jpg',
    name: 'Millstone Farm',
    category: 'farm',
    status: 'available',
    price: '$3,050',
    size: '52 acres',
    desc: 'Wheat fields feeding a small operating mill on the property. Comes with a grain store and a mule team shed.'
  },
  {
    id: 'p-sunkenrow',
    image: 'sunken-row-farm.jpg',
    name: 'Sunken Row Farm',
    category: 'farm',
    status: 'sold',
    price: '$2,400',
    size: '35 acres',
    desc: 'Vegetable rows on rich flood-plain soil near the creek crossing. Prone to spring flooding, priced accordingly.'
  },
  {
    id: 'p-goldenwheat',
    image: 'goldenwheat-farm.jpg',
    name: 'Goldenwheat Farm',
    category: 'farm',
    status: 'leased',
    price: '$2,950',
    size: '48 acres',
    desc: 'Open wheat fields with a weathered farmhouse and root cellar. Good sun most of the day, sheltered from canyon wind.'
  },

  /* ---------------- HOMESTEADS ---------------- */
  {
    id: 'p-hollowpine',
    image: 'hollow-pine-homestead.jpg',
    name: 'Hollow Pine Homestead',
    category: 'home',
    status: 'available',
    price: '$1,180',
    size: '3 rooms',
    desc: 'A modest cabin at the edge of town with a stone hearth, root cellar, and a porch that catches the evening light off the canyon wall.'
  },
  {
    id: 'p-widowrow',
    image: 'widow-row-house.jpg',
    name: 'Widow Row House',
    category: 'home',
    status: 'available',
    price: '$960',
    size: '2 rooms',
    desc: 'A tidy row house near the church, freshly whitewashed, with a small garden plot out back.'
  },
  {
    id: 'p-canyonview',
    image: 'canyon-view-cottage.jpg',
    name: 'Canyon View Cottage',
    category: 'home',
    status: 'available',
    price: '$1,420',
    size: '3 rooms',
    desc: 'Perched on the upper trail with a clear view down into the canyon. Small stable out back, room for one horse.'
  },
  {
    id: 'p-minersrest',
    image: 'miners-rest-cabin.jpg',
    name: "Miner's Rest Cabin",
    category: 'home',
    status: 'sold',
    price: '$780',
    size: '1 room',
    desc: 'A single-room cabin near the old mining ridge. Basic, but solidly built and close to the trading post.'
  },

  /* ---------------- BUSINESSES ---------------- */
  {
    id: 'p-broketooth',
    image: 'broke-tooth-saloon.jpg',
    name: 'The Broke Tooth Saloon',
    category: 'business',
    status: 'leased',
    price: '$3,600',
    size: 'Main Street',
    desc: 'Canyon Creek\'s liveliest saloon — full bar, card room upstairs, and a stage that has seen its share of trouble.'
  },
  {
    id: 'p-ironclad',
    image: 'ironclad-general-store.jpg',
    name: 'Ironclad General Store',
    category: 'business',
    status: 'available',
    price: '$2,900',
    size: 'Main Street',
    desc: 'A well-stocked mercantile with storefront and living quarters above. Steady foot traffic from the trail crossing outside.'
  },
  {
    id: 'p-cindergun',
    image: 'cindergun-gunsmith.jpg',
    name: 'Cindergun Gunsmith',
    category: 'business',
    status: 'available',
    price: '$3,150',
    size: 'Blacksmith Row',
    desc: 'Forge, workbench, and a locked case out front. Comes with an established list of regulars from three counties over.'
  },
  {
    id: 'p-founders',
    image: 'founders-hotel.jpg',
    name: 'Founders Hotel & Boarding House',
    category: 'business',
    status: 'available',
    price: '$5,400',
    size: 'Main Street',
    desc: 'Eight guest rooms over a front desk and parlor. The tallest building in town, and one of the most profitable.'
  },
  {
    id: 'p-ccbank',
    image: 'canyon-creek-bank.jpg',
    name: 'Canyon Creek Bank',
    category: 'business',
    status: 'leased',
    price: '$6,200',
    size: 'Main Street',
    desc: 'Stone-built vault and teller counter at the heart of town. Heavily regulated — Territory Office approval required to operate.'
  },
  {
    id: 'p-stagecoach',
    image: 'stagecoach-stable-co.jpg',
    name: 'Stagecoach & Stable Co.',
    category: 'business',
    status: 'available',
    price: '$3,300',
    size: 'South Trailhead',
    desc: 'Livery stable with twelve stalls, a coach house, and the exclusive route contract running west to the county line.'
  },
  {
    id: 'p-doctors',
    image: 'doctors-office-apothecary.jpg',
    name: "Doctor's Office & Apothecary",
    category: 'business',
    status: 'leased',
    price: '$2,750',
    size: 'Main Street',
    desc: 'Exam room, dispensary, and a small recovery ward in back. Well-stocked medicine cabinet included in the lease.'
  },

  /* ---------------- LAND PARCELS ---------------- */
  {
    id: 'p-northridge',
    image: 'north-ridge-lot.jpg',
    name: 'North Ridge Lot',
    category: 'land',
    status: 'available',
    price: '$1,650',
    size: '22 acres, undeveloped',
    desc: 'Raw land on the northern ridge with a good view and mining rights unclear — buyer to confirm with the Territory Office.'
  },
  {
    id: 'p-creekside',
    image: 'creekside-parcel.jpg',
    name: 'Creekside Parcel',
    category: 'land',
    status: 'available',
    price: '$1,900',
    size: '15 acres, undeveloped',
    desc: 'Flat riverfront land, cleared and ready to build. Popular with settlers looking to put up a homestead or small mill.'
  },
  {
    id: 'p-trailhead',
    image: 'trailhead-lot.jpg',
    name: 'Trailhead Lot',
    category: 'land',
    status: 'sold',
    price: '$1,300',
    size: '9 acres, undeveloped',
    desc: 'Small parcel at the main road split, good visibility for anyone planning to open a roadside business.'
  }
];

function ccGetProperties(){
  try{
    const raw = localStorage.getItem(CC_STORAGE_KEY);
    if(!raw) return CC_DEFAULT_PROPERTIES.slice();
    const parsed = JSON.parse(raw);
    if(!Array.isArray(parsed) || parsed.length === 0) return CC_DEFAULT_PROPERTIES.slice();
    return parsed;
  }catch(e){
    return CC_DEFAULT_PROPERTIES.slice();
  }
}

function ccSaveProperties(list){
  localStorage.setItem(CC_STORAGE_KEY, JSON.stringify(list));
}

function ccResetProperties(){
  localStorage.setItem(CC_STORAGE_KEY, JSON.stringify(CC_DEFAULT_PROPERTIES));
}

function ccUid(){
  return 'p-' + Math.random().toString(36).slice(2, 9);
}

/* Shared category display info used by properties.html and admin.html */
const CC_CATEGORY_LABEL = { ranch: 'Ranch', farm: 'Farm', home: 'Homestead', business: 'Business', land: 'Land Parcel' };
const CC_CATEGORY_SCENE = { ranch: 'scene-ranch', farm: 'scene-farm', home: 'scene-home', business: 'scene-business', land: 'scene-land' };
