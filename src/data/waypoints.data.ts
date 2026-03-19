export type WaypointCategory =
  | 'Strange Nature'
  | 'Stone Wonders'
  | 'Mysterious Places'
  | 'Curious Landmarks';

export type WaypointItem = {
  id: string;
  title: string;
  category: WaypointCategory;
  city: string;
  region: string;
  country: string;
  shortNote: string;
  details: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageName: string;
};

export const waypoints: WaypointItem[] = [
  {
    id: 'spotted_lake',
    title: 'Spotted Lake',
    category: 'Strange Nature',
    city: 'Osoyoos',
    region: 'British Columbia',
    country: 'Canada',
    shortNote: 'Mineral-rich pools appear during hot summer months.',
    details:
      'Spotted Lake is one of the most unusual lakes in Canada. During the hot summer months, water evaporates and hundreds of mineral-rich circular pools appear on the surface. Each pool has a slightly different color depending on the concentration of minerals such as magnesium, calcium, and sodium. The lake has long been considered sacred by the Syilx Okanagan people and looks almost like a natural chemical experiment created by nature.',
    coordinates: {
      lat: 49.0536,
      lng: -119.5642,
    },
    imageName: 'mineral_mosaic_lake',
  },
  {
    id: 'abraham_lake_ice_bubbles',
    title: 'Abraham Lake Ice Bubbles',
    category: 'Strange Nature',
    city: 'Abraham Lake',
    region: 'Alberta',
    country: 'Canada',
    shortNote: 'Frozen methane bubbles create layered patterns in the ice.',
    details:
      'In winter, Abraham Lake becomes famous for its frozen methane bubbles. Methane gas released from plants on the lakebed rises through the water and becomes trapped beneath the freezing surface. The bubbles form layered patterns inside the ice, creating a stunning visual effect that attracts photographers from around the world.',
    coordinates: {
      lat: 52.2179,
      lng: -116.4519,
    },
    imageName: 'frozen_breath_lake',
  },
  {
    id: 'carcross_desert',
    title: 'Carcross Desert',
    category: 'Strange Nature',
    city: 'Carcross',
    region: 'Yukon',
    country: 'Canada',
    shortNote: 'A desert-like dune landscape shaped by glacial history.',
    details:
      'Carcross Desert is often described as the world’s smallest desert. Instead of being formed by typical desert conditions, these dunes were created by glacial activity thousands of years ago. Strong winds coming from nearby Bennett Lake continuously move the sand, forming a surprising desert-like landscape surrounded by mountains.',
    coordinates: {
      lat: 60.1823,
      lng: -134.7077,
    },
    imageName: 'dune_whisper',
  },
  {
    id: 'athabasca_sand_dunes',
    title: 'Athabasca Sand Dunes',
    category: 'Strange Nature',
    city: 'Lake Athabasca',
    region: 'Saskatchewan',
    country: 'Canada',
    shortNote: 'The largest active sand dunes in Canada.',
    details:
      'The Athabasca Sand Dunes are the largest active sand dunes in Canada. Some dunes rise more than 30 meters high and stretch along the southern shore of Lake Athabasca. Due to the remote location, the area hosts several rare plant species that exist nowhere else on Earth.',
    coordinates: {
      lat: 59.2,
      lng: -108.0,
    },
    imageName: 'northern_dunes',
  },
  {
    id: 'pingos_of_tuktoyaktuk',
    title: 'Pingos of Tuktoyaktuk',
    category: 'Strange Nature',
    city: 'Tuktoyaktuk',
    region: 'Northwest Territories',
    country: 'Canada',
    shortNote: 'Ice-formed hills rising from Arctic permafrost.',
    details:
      'Pingos are dome-shaped hills formed by ice pushing the ground upward from beneath the permafrost. The Tuktoyaktuk region contains one of the largest concentrations of pingos in the world. These strange frozen hills rise from the flat Arctic tundra and create an unusual landscape rarely seen anywhere else.',
    coordinates: {
      lat: 69.445,
      lng: -133.037,
    },
    imageName: 'arctic_dome_fields',
  },
  {
    id: 'mount_thor',
    title: 'Mount Thor',
    category: 'Strange Nature',
    city: 'Auyuittuq National Park',
    region: 'Nunavut',
    country: 'Canada',
    shortNote: 'A dramatic granite cliff with an immense vertical drop.',
    details:
      'Mount Thor is famous for having the greatest vertical drop on Earth. Its nearly vertical granite cliff falls about 1,250 meters straight down. The mountain’s dramatic shape and remote Arctic setting make it one of the most impressive geological features in Canada.',
    coordinates: {
      lat: 66.5333,
      lng: -65.3167,
    },
    imageName: 'sheer_sky_wall',
  },

  {
    id: 'perce_rock',
    title: 'Percé Rock',
    category: 'Stone Wonders',
    city: 'Percé',
    region: 'Quebec',
    country: 'Canada',
    shortNote: 'A massive limestone formation with a natural arch.',
    details:
      'Percé Rock is a massive limestone formation rising from the waters of the Gulf of St. Lawrence. Stretching over 400 meters in length, it features a dramatic natural arch created by centuries of wind and wave erosion. It is one of the most iconic natural landmarks in eastern Canada.',
    coordinates: {
      lat: 48.5256,
      lng: -64.2051,
    },
    imageName: 'sea_arch_monolith',
  },
  {
    id: 'drumheller_hoodoos',
    title: 'Drumheller Hoodoos',
    category: 'Stone Wonders',
    city: 'Drumheller',
    region: 'Alberta',
    country: 'Canada',
    shortNote: 'Tall rock columns shaped by long erosion.',
    details:
      'The Hoodoos of Drumheller are tall rock columns topped with harder stone caps that protect the softer layers below. Over thousands of years, erosion carved these strange formations in the Alberta Badlands. Their unusual shapes give the landscape an almost otherworldly appearance.',
    coordinates: {
      lat: 51.4689,
      lng: -112.7106,
    },
    imageName: 'badlands_totems',
  },
  {
    id: 'flowerpot_island',
    title: 'Flowerpot Island',
    category: 'Stone Wonders',
    city: 'Georgian Bay',
    region: 'Ontario',
    country: 'Canada',
    shortNote: 'Rock pillars resembling giant flowerpots.',
    details:
      'Flowerpot Island is famous for its unique rock pillars that resemble giant flowerpots. These formations were created by wave erosion over thousands of years. The island is also known for its caves, cliffs, and clear waters along the Bruce Peninsula.',
    coordinates: {
      lat: 45.3303,
      lng: -81.63,
    },
    imageName: 'island_stone_blooms',
  },
  {
    id: 'hopewell_rocks',
    title: 'Hopewell Rocks',
    category: 'Stone Wonders',
    city: 'Bay of Fundy',
    region: 'New Brunswick',
    country: 'Canada',
    shortNote: 'Towering formations sculpted by extreme tides.',
    details:
      'Hopewell Rocks are towering rock formations shaped like giant flowerpots. They were sculpted by the extreme tides of the Bay of Fundy, which has the highest tidal range in the world. During low tide, visitors can walk along the ocean floor and explore the bases of these formations.',
    coordinates: {
      lat: 45.8233,
      lng: -64.576,
    },
    imageName: 'tidal_giants',
  },
  {
    id: 'natural_bridge_yoho',
    title: 'Natural Bridge',
    category: 'Stone Wonders',
    city: 'Yoho National Park',
    region: 'British Columbia',
    country: 'Canada',
    shortNote: 'A river-carved bridge formed by water and time.',
    details:
      'Natural Bridge is a rock formation carved by the powerful Kicking Horse River. Over thousands of years, rushing water eroded the stone, creating a natural bridge across the river. The site shows how slowly but powerfully water can shape the landscape.',
    coordinates: {
      lat: 51.4262,
      lng: -116.5216,
    },
    imageName: 'river_cut_span',
  },
  {
    id: 'flowerpot_rocks_fundy',
    title: 'Flowerpot Rocks',
    category: 'Stone Wonders',
    city: 'Bay of Fundy',
    region: 'New Brunswick',
    country: 'Canada',
    shortNote: 'Stone stacks topped with trees near the coast.',
    details:
      'These unusual rock stacks look like giant stone flowerpots with trees growing on top. They were shaped by centuries of tidal erosion and are constantly changing as the powerful tides of the Bay of Fundy continue to reshape the coastline.',
    coordinates: {
      lat: 45.822,
      lng: -64.577,
    },
    imageName: 'coast_pillar_garden',
  },

  {
    id: 'oak_island',
    title: 'Oak Island',
    category: 'Mysterious Places',
    city: 'Oak Island',
    region: 'Nova Scotia',
    country: 'Canada',
    shortNote: 'A legendary site tied to treasure theories.',
    details:
      'Oak Island is one of the most famous mystery sites in North America. Since the late 1700s, treasure hunters have searched for hidden riches buried in the legendary “Money Pit.” Numerous theories suggest pirates, secret societies, or even medieval relics may be involved.',
    coordinates: {
      lat: 44.5151,
      lng: -64.2936,
    },
    imageName: 'hidden_isle_pit',
  },
  {
    id: 'nahanni_valley',
    title: 'Nahanni Valley',
    category: 'Mysterious Places',
    city: 'Nahanni National Park Reserve',
    region: 'Northwest Territories',
    country: 'Canada',
    shortNote: 'A remote valley associated with enduring legends.',
    details:
      'Known as the “Valley of the Headless Men,” Nahanni Valley gained its mysterious reputation after several gold prospectors were reportedly found dead and decapitated in the early 20th century. Today the valley is part of a remote wilderness park filled with dramatic canyons, waterfalls, and untouched landscapes.',
    coordinates: {
      lat: 61.6,
      lng: -125.6,
    },
    imageName: 'shadow_valley_run',
  },
  {
    id: 'sable_island',
    title: 'Sable Island',
    category: 'Mysterious Places',
    city: 'Sable Island',
    region: 'Nova Scotia',
    country: 'Canada',
    shortNote: 'A remote sand island linked to many shipwrecks.',
    details:
      'Sable Island is a narrow crescent-shaped sand island located far out in the Atlantic Ocean. It has earned the nickname “Graveyard of the Atlantic” because more than 350 ships have wrecked near its shores. Today the island is known for its population of wild horses and remote beauty.',
    coordinates: {
      lat: 43.9333,
      lng: -60.0,
    },
    imageName: 'atlantic_curve_sands',
  },
  {
    id: 'haida_gwaii_ancient_villages',
    title: 'Haida Gwaii Ancient Villages',
    category: 'Mysterious Places',
    city: 'Haida Gwaii',
    region: 'British Columbia',
    country: 'Canada',
    shortNote: 'Fog-wrapped heritage sites rich in Indigenous history.',
    details:
      'Haida Gwaii is an archipelago rich in indigenous culture and history. Ancient Haida village sites feature carved totem poles and longhouse remains that tell stories of a powerful maritime culture. The remote islands are often surrounded by fog, adding to their mysterious atmosphere.',
    coordinates: {
      lat: 52.85,
      lng: -132.0,
    },
    imageName: 'fog_totem_harbor',
  },
  {
    id: 'head_smashed_in_buffalo_jump',
    title: 'Head-Smashed-In Buffalo Jump',
    category: 'Mysterious Places',
    city: 'Fort Macleod',
    region: 'Alberta',
    country: 'Canada',
    shortNote: 'A dramatic cliff site with deep historical meaning.',
    details:
      'This historic site was used for thousands of years by Indigenous peoples to hunt bison. Herds were driven over a cliff where hunters waited below. The dramatic cliffs and the history surrounding the site make it both fascinating and mysterious.',
    coordinates: {
      lat: 49.7486,
      lng: -113.6233,
    },
    imageName: 'cliff_echo_ground',
  },
  {
    id: 'nahanni_virginia_falls',
    title: 'Nahanni Virginia Falls',
    category: 'Mysterious Places',
    city: 'Nahanni National Park',
    region: 'Northwest Territories',
    country: 'Canada',
    shortNote: 'A powerful waterfall deep inside northern wilderness.',
    details:
      'Virginia Falls is nearly twice the height of Niagara Falls. Located deep within Nahanni National Park, the powerful waterfall drops through a narrow canyon surrounded by untouched wilderness, creating one of the most dramatic landscapes in northern Canada.',
    coordinates: {
      lat: 61.589,
      lng: -125.738,
    },
    imageName: 'canyon_fall_roar',
  },

  {
    id: 'big_nickel',
    title: 'The Big Nickel',
    category: 'Curious Landmarks',
    city: 'Sudbury',
    region: 'Ontario',
    country: 'Canada',
    shortNote: 'A giant replica of a Canadian five-cent coin.',
    details:
      'The Big Nickel is a giant nine-meter replica of a Canadian five-cent coin. It was built to celebrate the region’s history of nickel mining and stands beside the Dynamic Earth science center. The monument has become one of the most recognizable roadside attractions in Canada.',
    coordinates: {
      lat: 46.4917,
      lng: -81.01,
    },
    imageName: 'coin_colossus',
  },
  {
    id: 'world_largest_axe',
    title: 'World’s Largest Axe',
    category: 'Curious Landmarks',
    city: 'Nackawic',
    region: 'New Brunswick',
    country: 'Canada',
    shortNote: 'A towering monument honoring the forestry industry.',
    details:
      'Standing more than 15 meters tall, the World’s Largest Axe was built to honor the forestry industry that shaped the region’s economy. The massive steel monument has become a popular photo stop for travelers exploring New Brunswick.',
    coordinates: {
      lat: 45.997,
      lng: -67.24,
    },
    imageName: 'timber_giant',
  },
  {
    id: 'giant_beaver_sculpture',
    title: 'Giant Beaver Sculpture',
    category: 'Curious Landmarks',
    city: 'Beaverlodge',
    region: 'Alberta',
    country: 'Canada',
    shortNote: 'A large roadside sculpture of Canada’s iconic beaver.',
    details:
      'The Giant Beaver statue celebrates Canada’s national animal. Located in the town of Beaverlodge, the sculpture is one of the largest beaver statues in the world and has become a fun roadside attraction for visitors passing through northern Alberta.',
    coordinates: {
      lat: 55.2097,
      lng: -119.4356,
    },
    imageName: 'beaver_guardian',
  },
  {
    id: 'cabot_trail_lookouts',
    title: 'Cabot Trail Lookouts',
    category: 'Curious Landmarks',
    city: 'Cape Breton',
    region: 'Nova Scotia',
    country: 'Canada',
    shortNote: 'Scenic viewpoints along one of Canada’s most famous drives.',
    details:
      'The Cabot Trail is a scenic coastal highway known for its breathtaking viewpoints. Along the route, visitors can stop at several lookouts offering panoramic views of cliffs, forests, and the Atlantic Ocean. The drive is considered one of the most beautiful road trips in North America.',
    coordinates: {
      lat: 46.7383,
      lng: -60.4928,
    },
    imageName: 'ocean_ribbon_view',
  },
  {
    id: 'world_largest_moose',
    title: "World's Largest Moose",
    category: 'Curious Landmarks',
    city: 'Moose Jaw',
    region: 'Saskatchewan',
    country: 'Canada',
    shortNote: 'A huge moose sculpture known as Mac the Moose.',
    details:
      'This massive sculpture of a moose named "Mac the Moose" stands over 10 meters tall. Built as a roadside attraction, it has become one of the most famous oversized animal statues in Canada.',
    coordinates: {
      lat: 50.396,
      lng: -105.535,
    },
    imageName: 'mac_high_watch',
  },
  {
    id: 'giant_goose_statue',
    title: 'Giant Goose Statue',
    category: 'Curious Landmarks',
    city: 'Wawa',
    region: 'Ontario',
    country: 'Canada',
    shortNote: 'A welcoming roadside goose monument in northern Ontario.',
    details:
      'The giant goose statue in Wawa was built to celebrate the Canada goose and welcome travelers entering the town. It quickly became an iconic landmark and a popular stop for road trips across northern Ontario.',
    coordinates: {
      lat: 47.9945,
      lng: -84.7704,
    },
    imageName: 'sky_goose_gate',
  },
  {
    id: 'capilano_suspension_bridge',
    title: 'Capilano Suspension Bridge',
    category: 'Curious Landmarks',
    city: 'North Vancouver',
    region: 'British Columbia',
    country: 'Canada',
    shortNote: 'A high suspension bridge over a forest canyon.',
    details:
      'This famous suspension bridge stretches 137 meters across the Capilano River canyon. Hanging high above the forest, the bridge offers visitors a thrilling way to experience the dramatic landscape of coastal British Columbia.',
    coordinates: {
      lat: 49.3429,
      lng: -123.1149,
    },
    imageName: 'forest_bridge_swing',
  },
];