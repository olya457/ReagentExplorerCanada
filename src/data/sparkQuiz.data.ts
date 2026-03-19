export type QuizOption = {
  id: string;
  label: string;
  isCorrect: boolean;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};

export type QuizLevel = {
  id: string;
  title: string;
  questions: QuizQuestion[];
};

export const sparkQuiz: QuizLevel[] = [
  {
    id: 'level_1',
    title: 'Level 1',
    questions: [
      {
        id: 'l1_q1',
        question: 'What unusual natural phenomenon appears at Spotted Lake in summer?',
        options: [
          { id: 'a', label: 'Ice crystals', isCorrect: false },
          { id: 'b', label: 'Mineral circles', isCorrect: true },
          { id: 'c', label: 'Floating islands', isCorrect: false },
          { id: 'd', label: 'Lava bubbles', isCorrect: false },
        ],
      },
      {
        id: 'l1_q2',
        question: 'Which Canadian location is famous for frozen methane bubbles under the ice?',
        options: [
          { id: 'a', label: 'Abraham Lake', isCorrect: true },
          { id: 'b', label: 'Lake Louise', isCorrect: false },
          { id: 'c', label: 'Moraine Lake', isCorrect: false },
          { id: 'd', label: 'Lake Winnipeg', isCorrect: false },
        ],
      },
      {
        id: 'l1_q3',
        question: 'Which place is known as the world’s smallest desert?',
        options: [
          { id: 'a', label: 'Drumheller Badlands', isCorrect: false },
          { id: 'b', label: 'Carcross Desert', isCorrect: true },
          { id: 'c', label: 'Yukon Flats', isCorrect: false },
          { id: 'd', label: 'Alberta Dunes', isCorrect: false },
        ],
      },
      {
        id: 'l1_q4',
        question: 'Which formation looks like giant stone mushrooms in New Brunswick?',
        options: [
          { id: 'a', label: 'Percé Rock', isCorrect: false },
          { id: 'b', label: 'Flowerpot Rocks', isCorrect: true },
          { id: 'c', label: 'Ice Towers', isCorrect: false },
          { id: 'd', label: 'Stone Pillars', isCorrect: false },
        ],
      },
      {
        id: 'l1_q5',
        question: 'What large coin monument stands in Sudbury?',
        options: [
          { id: 'a', label: 'Giant Dollar', isCorrect: false },
          { id: 'b', label: 'Big Nickel', isCorrect: true },
          { id: 'c', label: 'Ice Towers', isCorrect: false },
          { id: 'd', label: 'Lava bubbles', isCorrect: false },
        ],
      },
      {
        id: 'l1_q6',
        question: 'Which island is known as the “Graveyard of the Atlantic”?',
        options: [
          { id: 'a', label: 'Vancouver Island', isCorrect: false },
          { id: 'b', label: 'Prince Edward Island', isCorrect: false },
          { id: 'c', label: 'Sable Island', isCorrect: true },
          { id: 'd', label: 'Fogo Island', isCorrect: false },
        ],
      },
      {
        id: 'l1_q7',
        question: 'Which place is famous for strange rock columns called hoodoos?',
        options: [
          { id: 'a', label: 'Banff', isCorrect: false },
          { id: 'b', label: 'Drumheller', isCorrect: true },
          { id: 'c', label: 'Jasper', isCorrect: false },
          { id: 'd', label: 'Whistler', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'level_2',
    title: 'Level 2',
    questions: [
      {
        id: 'l2_q1',
        question: 'Where can you see the Natural Bridge formed by a river?',
        options: [
          { id: 'a', label: 'Yoho National Park', isCorrect: true },
          { id: 'b', label: 'Banff National Park', isCorrect: false },
          { id: 'c', label: 'Kootenay Park', isCorrect: false },
          { id: 'd', label: 'Glacier Park', isCorrect: false },
        ],
      },
      {
        id: 'l2_q2',
        question: 'Which monument celebrates Canada’s national animal in Alberta?',
        options: [
          { id: 'a', label: 'Giant Moose', isCorrect: false },
          { id: 'b', label: 'Giant Beaver', isCorrect: true },
          { id: 'c', label: 'Giant Elk', isCorrect: false },
          { id: 'd', label: 'Giant Bear', isCorrect: false },
        ],
      },
      {
        id: 'l2_q3',
        question: 'Which rock formation stands in the Gulf of St. Lawrence?',
        options: [
          { id: 'a', label: 'Percé Rock', isCorrect: true },
          { id: 'b', label: 'Eagle Rock', isCorrect: false },
          { id: 'c', label: 'Ocean Arch', isCorrect: false },
          { id: 'd', label: 'Cape Rock', isCorrect: false },
        ],
      },
      {
        id: 'l2_q4',
        question: 'Which mysterious island is famous for the “Money Pit”?',
        options: [
          { id: 'a', label: 'Baffin Island', isCorrect: false },
          { id: 'b', label: 'Oak Island', isCorrect: true },
          { id: 'c', label: 'Victoria Island', isCorrect: false },
          { id: 'd', label: 'Anticosti Island', isCorrect: false },
        ],
      },
      {
        id: 'l2_q5',
        question: 'Which trail in Nova Scotia is known for scenic coastal views?',
        options: [
          { id: 'a', label: 'Pacific Trail', isCorrect: false },
          { id: 'b', label: 'Cabot Trail', isCorrect: true },
          { id: 'c', label: 'Arctic Trail', isCorrect: false },
          { id: 'd', label: 'Highland Route', isCorrect: false },
        ],
      },
      {
        id: 'l2_q6',
        question: 'Which island in Ontario is known for rock formations called flowerpots?',
        options: [
          { id: 'a', label: 'Flowerpot Island', isCorrect: true },
          { id: 'b', label: 'Manitoulin Island', isCorrect: false },
          { id: 'c', label: 'Amherst Island', isCorrect: false },
          { id: 'd', label: 'Wolfe Island', isCorrect: false },
        ],
      },
      {
        id: 'l2_q7',
        question: 'Which region has the largest sand dunes in Canada?',
        options: [
          { id: 'a', label: 'Athabasca Sand Dunes', isCorrect: true },
          { id: 'b', label: 'Yukon Desert', isCorrect: false },
          { id: 'c', label: 'Prairie Sands', isCorrect: false },
          { id: 'd', label: 'Alberta Flats', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'level_3',
    title: 'Level 3',
    questions: [
      {
        id: 'l3_q1',
        question: 'Which Arctic mountain has one of the world’s greatest vertical drops?',
        options: [
          { id: 'a', label: 'Mount Logan', isCorrect: false },
          { id: 'b', label: 'Mount Thor', isCorrect: true },
          { id: 'c', label: 'Mount Robson', isCorrect: false },
          { id: 'd', label: 'Mount Columbia', isCorrect: false },
        ],
      },
      {
        id: 'l3_q2',
        question: 'Where are the Pingos located?',
        options: [
          { id: 'a', label: 'Yukon', isCorrect: false },
          { id: 'b', label: 'Northwest Territories', isCorrect: true },
          { id: 'c', label: 'Nunavut', isCorrect: false },
          { id: 'd', label: 'Manitoba', isCorrect: false },
        ],
      },
      {
        id: 'l3_q3',
        question: 'Which arch-shaped rock formation is found in Quebec?',
        options: [
          { id: 'a', label: 'Percé Rock', isCorrect: true },
          { id: 'b', label: 'Arctic Arch', isCorrect: false },
          { id: 'c', label: 'Granite Gate', isCorrect: false },
          { id: 'd', label: 'Northern Arch', isCorrect: false },
        ],
      },
      {
        id: 'l3_q4',
        question: 'Which Canadian place contains ancient Haida village sites?',
        options: [
          { id: 'a', label: 'Vancouver Island', isCorrect: false },
          { id: 'b', label: 'Haida Gwaii', isCorrect: true },
          { id: 'c', label: 'Prince Rupert', isCorrect: false },
          { id: 'd', label: 'Tofino', isCorrect: false },
        ],
      },
      {
        id: 'l3_q5',
        question: 'Which giant roadside statue is located in Moose Jaw?',
        options: [
          { id: 'a', label: 'Giant Elk', isCorrect: false },
          { id: 'b', label: 'Giant Moose', isCorrect: true },
          { id: 'c', label: 'Giant Caribou', isCorrect: false },
          { id: 'd', label: 'Giant Bison', isCorrect: false },
        ],
      },
      {
        id: 'l3_q6',
        question: 'What river carved the Natural Bridge in Yoho National Park?',
        options: [
          { id: 'a', label: 'Fraser River', isCorrect: false },
          { id: 'b', label: 'Kicking Horse River', isCorrect: true },
          { id: 'c', label: 'Bow River', isCorrect: false },
          { id: 'd', label: 'Columbia River', isCorrect: false },
        ],
      },
      {
        id: 'l3_q7',
        question: 'Which island in Ontario has a giant goose statue?',
        options: [
          { id: 'a', label: 'Wawa', isCorrect: true },
          { id: 'b', label: 'Kenora', isCorrect: false },
          { id: 'c', label: 'Thunder Bay', isCorrect: false },
          { id: 'd', label: 'Sault Ste. Marie', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'level_4',
    title: 'Level 4',
    questions: [
      {
        id: 'l4_q1',
        question: 'Which national park contains Virginia Falls?',
        options: [
          { id: 'a', label: 'Banff', isCorrect: false },
          { id: 'b', label: 'Nahanni National Park', isCorrect: true },
          { id: 'c', label: 'Jasper', isCorrect: false },
          { id: 'd', label: 'Wood Buffalo', isCorrect: false },
        ],
      },
      {
        id: 'l4_q2',
        question: 'Which Canadian place has the highest tides in the world?',
        options: [
          { id: 'a', label: 'Hudson Bay', isCorrect: false },
          { id: 'b', label: 'Bay of Fundy', isCorrect: true },
          { id: 'c', label: 'Georgian Bay', isCorrect: false },
          { id: 'd', label: 'Arctic Ocean', isCorrect: false },
        ],
      },
      {
        id: 'l4_q3',
        question: 'Which location is known for sacred mineral lakes by the Okanagan people?',
        options: [
          { id: 'a', label: 'Emerald Lake', isCorrect: false },
          { id: 'b', label: 'Spotted Lake', isCorrect: true },
          { id: 'c', label: 'Great Slave Lake', isCorrect: false },
          { id: 'd', label: 'Lake Athabasca', isCorrect: false },
        ],
      },
      {
        id: 'l4_q4',
        question: 'Which unusual dunes are located near Lake Athabasca?',
        options: [
          { id: 'a', label: 'Prairie Sands', isCorrect: false },
          { id: 'b', label: 'Athabasca Sand Dunes', isCorrect: true },
          { id: 'c', label: 'Yukon Dunes', isCorrect: false },
          { id: 'd', label: 'Northern Sands', isCorrect: false },
        ],
      },
      {
        id: 'l4_q5',
        question: 'Which region contains dramatic Arctic cliffs and Mount Thor?',
        options: [
          { id: 'a', label: 'Nunavut', isCorrect: true },
          { id: 'b', label: 'Yukon', isCorrect: false },
          { id: 'c', label: 'Alberta', isCorrect: false },
          { id: 'd', label: 'Manitoba', isCorrect: false },
        ],
      },
      {
        id: 'l4_q6',
        question: 'Which large statue welcomes visitors to Wawa?',
        options: [
          { id: 'a', label: 'Giant Goose', isCorrect: true },
          { id: 'b', label: 'Giant Eagle', isCorrect: false },
          { id: 'c', label: 'Giant Owl', isCorrect: false },
          { id: 'd', label: 'Giant Swan', isCorrect: false },
        ],
      },
      {
        id: 'l4_q7',
        question: 'Which Canadian landmark is a suspension bridge above a canyon?',
        options: [
          { id: 'a', label: 'Capilano Suspension Bridge', isCorrect: true },
          { id: 'b', label: 'Fraser Canyon Bridge', isCorrect: false },
          { id: 'c', label: 'Rocky Arch Bridge', isCorrect: false },
          { id: 'd', label: 'Yukon Rope Bridge', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'level_5',
    title: 'Level 5',
    questions: [
      {
        id: 'l5_q1',
        question: 'Which remote valley is known as the “Valley of the Headless Men”?',
        options: [
          { id: 'a', label: 'Yukon Valley', isCorrect: false },
          { id: 'b', label: 'Nahanni Valley', isCorrect: true },
          { id: 'c', label: 'Fraser Valley', isCorrect: false },
          { id: 'd', label: 'Mackenzie Valley', isCorrect: false },
        ],
      },
      {
        id: 'l5_q2',
        question: 'Which rock formations are created by erosion with protective stone caps?',
        options: [
          { id: 'a', label: 'Pillars', isCorrect: false },
          { id: 'b', label: 'Hoodoos', isCorrect: true },
          { id: 'c', label: 'Columns', isCorrect: false },
          { id: 'd', label: 'Stacks', isCorrect: false },
        ],
      },
      {
        id: 'l5_q3',
        question: 'Which island is famous for wild horses and shipwreck history?',
        options: [
          { id: 'a', label: 'Sable Island', isCorrect: true },
          { id: 'b', label: 'Baffin Island', isCorrect: false },
          { id: 'c', label: 'Vancouver Island', isCorrect: false },
          { id: 'd', label: 'Victoria Island', isCorrect: false },
        ],
      },
      {
        id: 'l5_q4',
        question: 'Which natural arch stands in the sea near Percé?',
        options: [
          { id: 'a', label: 'Percé Rock', isCorrect: true },
          { id: 'b', label: 'Ocean Gate', isCorrect: false },
          { id: 'c', label: 'Atlantic Arch', isCorrect: false },
          { id: 'd', label: 'North Gate', isCorrect: false },
        ],
      },
      {
        id: 'l5_q5',
        question: 'Which Canadian landmark is a giant coin monument?',
        options: [
          { id: 'a', label: 'Silver Dollar', isCorrect: false },
          { id: 'b', label: 'Big Nickel', isCorrect: true },
          { id: 'c', label: 'Giant Penny', isCorrect: false },
          { id: 'd', label: 'Copper Coin', isCorrect: false },
        ],
      },
      {
        id: 'l5_q6',
        question: 'Which Canadian desert formed from glacial activity?',
        options: [
          { id: 'a', label: 'Yukon Sands', isCorrect: false },
          { id: 'b', label: 'Carcross Desert', isCorrect: true },
          { id: 'c', label: 'Alberta Desert', isCorrect: false },
          { id: 'd', label: 'Prairie Desert', isCorrect: false },
        ],
      },
      {
        id: 'l5_q7',
        question: 'Which unusual hills formed by underground ice pushing the ground upward?',
        options: [
          { id: 'a', label: 'Ice domes', isCorrect: false },
          { id: 'b', label: 'Pingos', isCorrect: true },
          { id: 'c', label: 'Frost hills', isCorrect: false },
          { id: 'd', label: 'Snow mounds', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'level_6',
    title: 'Level 6',
    questions: [
      {
        id: 'l6_q1',
        question: 'Which Canadian island is famous for ancient Haida culture and carved totem poles?',
        options: [
          { id: 'a', label: 'Haida Gwaii', isCorrect: true },
          { id: 'b', label: 'Vancouver Island', isCorrect: false },
          { id: 'c', label: 'Prince Edward Island', isCorrect: false },
          { id: 'd', label: 'Anticosti Island', isCorrect: false },
        ],
      },
      {
        id: 'l6_q2',
        question: 'Which unusual rock formation in Alberta resembles tall stone pillars with caps?',
        options: [
          { id: 'a', label: 'Granite Towers', isCorrect: false },
          { id: 'b', label: 'Hoodoos', isCorrect: true },
          { id: 'c', label: 'Rock Needles', isCorrect: false },
          { id: 'd', label: 'Stone Spires', isCorrect: false },
        ],
      },
      {
        id: 'l6_q3',
        question: 'Which natural phenomenon creates frozen gas bubbles beneath lake ice in winter?',
        options: [
          { id: 'a', label: 'Methane bubbles', isCorrect: true },
          { id: 'b', label: 'Oxygen pockets', isCorrect: false },
          { id: 'c', label: 'Nitrogen gas', isCorrect: false },
          { id: 'd', label: 'Carbon layers', isCorrect: false },
        ],
      },
      {
        id: 'l6_q4',
        question: 'Which desert-like landscape formed after glaciers retreated thousands of years ago?',
        options: [
          { id: 'a', label: 'Yukon Flats', isCorrect: false },
          { id: 'b', label: 'Carcross Desert', isCorrect: true },
          { id: 'c', label: 'Prairie Sands', isCorrect: false },
          { id: 'd', label: 'Alberta Basin', isCorrect: false },
        ],
      },
      {
        id: 'l6_q5',
        question: 'Which Canadian park contains one of the world’s tallest waterfalls, Virginia Falls?',
        options: [
          { id: 'a', label: 'Banff National Park', isCorrect: false },
          { id: 'b', label: 'Nahanni National Park', isCorrect: true },
          { id: 'c', label: 'Jasper National Park', isCorrect: false },
          { id: 'd', label: 'Glacier National Park', isCorrect: false },
        ],
      },
      {
        id: 'l6_q6',
        question: 'Which roadside attraction in Saskatchewan is known as “Mac”?',
        options: [
          { id: 'a', label: 'Giant Moose', isCorrect: true },
          { id: 'b', label: 'Giant Bear', isCorrect: false },
          { id: 'c', label: 'Giant Elk', isCorrect: false },
          { id: 'd', label: 'Giant Caribou', isCorrect: false },
        ],
      },
      {
        id: 'l6_q7',
        question: 'Which unusual geological feature forms dome-shaped hills in Arctic permafrost?',
        options: [
          { id: 'a', label: 'Ice domes', isCorrect: false },
          { id: 'b', label: 'Pingos', isCorrect: true },
          { id: 'c', label: 'Frost cones', isCorrect: false },
          { id: 'd', label: 'Glacier mounds', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'level_7',
    title: 'Level 7',
    questions: [
      {
        id: 'l7_q1',
        question: 'Which Canadian bay has the highest tides on Earth?',
        options: [
          { id: 'a', label: 'Hudson Bay', isCorrect: false },
          { id: 'b', label: 'Bay of Fundy', isCorrect: true },
          { id: 'c', label: 'James Bay', isCorrect: false },
          { id: 'd', label: 'Georgian Bay', isCorrect: false },
        ],
      },
      {
        id: 'l7_q2',
        question: 'Which rock formation rises from the sea near the town of Percé?',
        options: [
          { id: 'a', label: 'Granite Arch', isCorrect: false },
          { id: 'b', label: 'Percé Rock', isCorrect: true },
          { id: 'c', label: 'Ocean Pillar', isCorrect: false },
          { id: 'd', label: 'Atlantic Arch', isCorrect: false },
        ],
      },
      {
        id: 'l7_q3',
        question: 'Which national park is home to Mount Thor’s massive vertical cliff?',
        options: [
          { id: 'a', label: 'Auyuittuq National Park', isCorrect: true },
          { id: 'b', label: 'Banff National Park', isCorrect: false },
          { id: 'c', label: 'Jasper National Park', isCorrect: false },
          { id: 'd', label: 'Kluane National Park', isCorrect: false },
        ],
      },
      {
        id: 'l7_q4',
        question: 'Which Canadian place is often called the “Graveyard of the Atlantic”?',
        options: [
          { id: 'a', label: 'Cape Breton', isCorrect: false },
          { id: 'b', label: 'Sable Island', isCorrect: true },
          { id: 'c', label: 'Newfoundland Coast', isCorrect: false },
          { id: 'd', label: 'Hudson Strait', isCorrect: false },
        ],
      },
      {
        id: 'l7_q5',
        question: 'Which natural arch in British Columbia was formed by the Kicking Horse River?',
        options: [
          { id: 'a', label: 'Stone Gate', isCorrect: false },
          { id: 'b', label: 'Natural Bridge', isCorrect: true },
          { id: 'c', label: 'River Arch', isCorrect: false },
          { id: 'd', label: 'Glacier Arch', isCorrect: false },
        ],
      },
      {
        id: 'l7_q6',
        question: 'Which Ontario island is known for limestone pillars shaped like flowerpots?',
        options: [
          { id: 'a', label: 'Flowerpot Island', isCorrect: true },
          { id: 'b', label: 'Manitoulin Island', isCorrect: false },
          { id: 'c', label: 'Amherst Island', isCorrect: false },
          { id: 'd', label: 'Toronto Island', isCorrect: false },
        ],
      },
      {
        id: 'l7_q7',
        question: 'Which Alberta region is famous for dinosaur fossils and dramatic badlands?',
        options: [
          { id: 'a', label: 'Drumheller', isCorrect: true },
          { id: 'b', label: 'Canmore', isCorrect: false },
          { id: 'c', label: 'Lethbridge', isCorrect: false },
          { id: 'd', label: 'Red Deer', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'level_8',
    title: 'Level 8',
    questions: [
      {
        id: 'l8_q1',
        question: 'Which giant roadside statue welcomes visitors to the town of Wawa?',
        options: [
          { id: 'a', label: 'Giant Goose', isCorrect: true },
          { id: 'b', label: 'Giant Eagle', isCorrect: false },
          { id: 'c', label: 'Giant Hawk', isCorrect: false },
          { id: 'd', label: 'Giant Swan', isCorrect: false },
        ],
      },
      {
        id: 'l8_q2',
        question: 'Which Canadian landmark is a giant replica of a five-cent coin?',
        options: [
          { id: 'a', label: 'Golden Dollar', isCorrect: false },
          { id: 'b', label: 'Big Nickel', isCorrect: true },
          { id: 'c', label: 'Silver Coin', isCorrect: false },
          { id: 'd', label: 'Copper Penny', isCorrect: false },
        ],
      },
      {
        id: 'l8_q3',
        question: 'Which lake is known for colorful mineral circles appearing in summer?',
        options: [
          { id: 'a', label: 'Great Bear Lake', isCorrect: false },
          { id: 'b', label: 'Spotted Lake', isCorrect: true },
          { id: 'c', label: 'Emerald Lake', isCorrect: false },
          { id: 'd', label: 'Peyto Lake', isCorrect: false },
        ],
      },
      {
        id: 'l8_q4',
        question: 'Which coastal route in Nova Scotia is famous for scenic ocean cliffs?',
        options: [
          { id: 'a', label: 'Atlantic Way', isCorrect: false },
          { id: 'b', label: 'Cabot Trail', isCorrect: true },
          { id: 'c', label: 'Ocean Drive', isCorrect: false },
          { id: 'd', label: 'Maritime Route', isCorrect: false },
        ],
      },
      {
        id: 'l8_q5',
        question: 'Which unusual dunes are located along Lake Athabasca?',
        options: [
          { id: 'a', label: 'Northern Dunes', isCorrect: false },
          { id: 'b', label: 'Athabasca Sand Dunes', isCorrect: true },
          { id: 'c', label: 'Prairie Sands', isCorrect: false },
          { id: 'd', label: 'Arctic Dunes', isCorrect: false },
        ],
      },
      {
        id: 'l8_q6',
        question: 'Which large suspension bridge crosses a forest canyon in North Vancouver?',
        options: [
          { id: 'a', label: 'Capilano Suspension Bridge', isCorrect: true },
          { id: 'b', label: 'Fraser Bridge', isCorrect: false },
          { id: 'c', label: 'Coastal Bridge', isCorrect: false },
          { id: 'd', label: 'Pacific Bridge', isCorrect: false },
        ],
      },
      {
        id: 'l8_q7',
        question: 'Which rock formations in New Brunswick resemble giant flowerpots shaped by tides?',
        options: [
          { id: 'a', label: 'Hopewell Rocks', isCorrect: true },
          { id: 'b', label: 'Fundy Towers', isCorrect: false },
          { id: 'c', label: 'Ocean Columns', isCorrect: false },
          { id: 'd', label: 'Atlantic Pillars', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'level_9',
    title: 'Level 9',
    questions: [
      {
        id: 'l9_q1',
        question: 'Which remote valley gained fame due to mysterious deaths of gold prospectors?',
        options: [
          { id: 'a', label: 'Yukon Valley', isCorrect: false },
          { id: 'b', label: 'Nahanni Valley', isCorrect: true },
          { id: 'c', label: 'Fraser Valley', isCorrect: false },
          { id: 'd', label: 'Columbia Valley', isCorrect: false },
        ],
      },
      {
        id: 'l9_q2',
        question: 'Which Canadian national park contains dramatic Arctic landscapes and Mount Thor?',
        options: [
          { id: 'a', label: 'Auyuittuq National Park', isCorrect: true },
          { id: 'b', label: 'Wood Buffalo Park', isCorrect: false },
          { id: 'c', label: 'Gros Morne Park', isCorrect: false },
          { id: 'd', label: 'Yoho Park', isCorrect: false },
        ],
      },
      {
        id: 'l9_q3',
        question: 'Which giant sculpture celebrates Canada’s national animal in Alberta?',
        options: [
          { id: 'a', label: 'Giant Beaver', isCorrect: true },
          { id: 'b', label: 'Giant Elk', isCorrect: false },
          { id: 'c', label: 'Giant Moose', isCorrect: false },
          { id: 'd', label: 'Giant Wolf', isCorrect: false },
        ],
      },
      {
        id: 'l9_q4',
        question: 'Which natural formation in Yoho National Park looks like a stone bridge over a river?',
        options: [
          { id: 'a', label: 'Glacier Arch', isCorrect: false },
          { id: 'b', label: 'Natural Bridge', isCorrect: true },
          { id: 'c', label: 'Rock Gate', isCorrect: false },
          { id: 'd', label: 'Canyon Arch', isCorrect: false },
        ],
      },
      {
        id: 'l9_q5',
        question: 'Which Canadian island is home to wild horses and shifting sand dunes?',
        options: [
          { id: 'a', label: 'Sable Island', isCorrect: true },
          { id: 'b', label: 'Baffin Island', isCorrect: false },
          { id: 'c', label: 'Victoria Island', isCorrect: false },
          { id: 'd', label: 'Prince Edward Island', isCorrect: false },
        ],
      },
      {
        id: 'l9_q6',
        question: 'Which rock columns are protected by harder stone caps from erosion?',
        options: [
          { id: 'a', label: 'Stalagmites', isCorrect: false },
          { id: 'b', label: 'Hoodoos', isCorrect: true },
          { id: 'c', label: 'Basalt Columns', isCorrect: false },
          { id: 'd', label: 'Stone Towers', isCorrect: false },
        ],
      },
      {
        id: 'l9_q7',
        question: 'Which region in Canada contains the world’s smallest desert?',
        options: [
          { id: 'a', label: 'Yukon', isCorrect: true },
          { id: 'b', label: 'Manitoba', isCorrect: false },
          { id: 'c', label: 'Ontario', isCorrect: false },
          { id: 'd', label: 'Quebec', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'level_10',
    title: 'Level 10',
    questions: [
      {
        id: 'l10_q1',
        question: 'Which Indigenous cultural region is located on an archipelago off the coast of British Columbia?',
        options: [
          { id: 'a', label: 'Haida Gwaii', isCorrect: true },
          { id: 'b', label: 'Vancouver Island', isCorrect: false },
          { id: 'c', label: 'Gulf Islands', isCorrect: false },
          { id: 'd', label: 'Discovery Islands', isCorrect: false },
        ],
      },
      {
        id: 'l10_q2',
        question: 'Which geological formations were carved by extreme tidal erosion in the Bay of Fundy?',
        options: [
          { id: 'a', label: 'Ocean Arches', isCorrect: false },
          { id: 'b', label: 'Hopewell Rocks', isCorrect: true },
          { id: 'c', label: 'Coastal Pillars', isCorrect: false },
          { id: 'd', label: 'Fundy Columns', isCorrect: false },
        ],
      },
      {
        id: 'l10_q3',
        question: 'Which unusual lake near Osoyoos contains mineral pools that appear as colored spots?',
        options: [
          { id: 'a', label: 'Emerald Lake', isCorrect: false },
          { id: 'b', label: 'Spotted Lake', isCorrect: true },
          { id: 'c', label: 'Moraine Lake', isCorrect: false },
          { id: 'd', label: 'Peyto Lake', isCorrect: false },
        ],
      },
      {
        id: 'l10_q4',
        question: 'Which dramatic limestone formation stretches over 400 meters in the Gulf of St. Lawrence?',
        options: [
          { id: 'a', label: 'Percé Rock', isCorrect: true },
          { id: 'b', label: 'Atlantic Arch', isCorrect: false },
          { id: 'c', label: 'Ocean Gate', isCorrect: false },
          { id: 'd', label: 'Granite Cliff', isCorrect: false },
        ],
      },
      {
        id: 'l10_q5',
        question: 'Which Canadian attraction is a giant axe monument symbolizing the forestry industry?',
        options: [
          { id: 'a', label: 'World’s Largest Axe', isCorrect: true },
          { id: 'b', label: 'Giant Logger', isCorrect: false },
          { id: 'c', label: 'Big Saw', isCorrect: false },
          { id: 'd', label: 'Lumber Monument', isCorrect: false },
        ],
      },
      {
        id: 'l10_q6',
        question: 'Which natural phenomenon forms dome-shaped hills in Arctic permafrost regions?',
        options: [
          { id: 'a', label: 'Ice domes', isCorrect: false },
          { id: 'b', label: 'Pingos', isCorrect: true },
          { id: 'c', label: 'Frost hills', isCorrect: false },
          { id: 'd', label: 'Snow mounds', isCorrect: false },
        ],
      },
      {
        id: 'l10_q7',
        question: 'Which Canadian location features frozen methane bubbles trapped under lake ice?',
        options: [
          { id: 'a', label: 'Abraham Lake', isCorrect: true },
          { id: 'b', label: 'Lake Superior', isCorrect: false },
          { id: 'c', label: 'Lake Winnipeg', isCorrect: false },
          { id: 'd', label: 'Great Slave Lake', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'level_11',
    title: 'Level 11',
    questions: [
      {
        id: 'l11_q1',
        question: 'Which Canadian national park is known for dramatic fjords and tableland mountains?',
        options: [
          { id: 'a', label: 'Gros Morne National Park', isCorrect: true },
          { id: 'b', label: 'Banff National Park', isCorrect: false },
          { id: 'c', label: 'Jasper National Park', isCorrect: false },
          { id: 'd', label: 'Pacific Rim Park', isCorrect: false },
        ],
      },
      {
        id: 'l11_q2',
        question: 'Which unusual rock formation in Alberta Badlands looks like tall stone pillars?',
        options: [
          { id: 'a', label: 'Stone Columns', isCorrect: false },
          { id: 'b', label: 'Hoodoos', isCorrect: true },
          { id: 'c', label: 'Rock Towers', isCorrect: false },
          { id: 'd', label: 'Canyon Spires', isCorrect: false },
        ],
      },
      {
        id: 'l11_q3',
        question: 'Which Canadian island is famous for wild horses and remote sand dunes?',
        options: [
          { id: 'a', label: 'Sable Island', isCorrect: true },
          { id: 'b', label: 'Victoria Island', isCorrect: false },
          { id: 'c', label: 'Baffin Island', isCorrect: false },
          { id: 'd', label: 'Prince Edward Island', isCorrect: false },
        ],
      },
      {
        id: 'l11_q4',
        question: 'Which natural arch formation rises from the sea near Percé, Quebec?',
        options: [
          { id: 'a', label: 'Percé Rock', isCorrect: true },
          { id: 'b', label: 'Atlantic Gate', isCorrect: false },
          { id: 'c', label: 'Ocean Arch', isCorrect: false },
          { id: 'd', label: 'Coastal Pillar', isCorrect: false },
        ],
      },
      {
        id: 'l11_q5',
        question: 'Which Canadian roadside landmark represents a giant coin?',
        options: [
          { id: 'a', label: 'Silver Dollar Monument', isCorrect: false },
          { id: 'b', label: 'Big Nickel', isCorrect: true },
          { id: 'c', label: 'Giant Penny', isCorrect: false },
          { id: 'd', label: 'Copper Coin', isCorrect: false },
        ],
      },
      {
        id: 'l11_q6',
        question: 'Which desert-like area formed by glacial deposits exists in Yukon?',
        options: [
          { id: 'a', label: 'Carcross Desert', isCorrect: true },
          { id: 'b', label: 'Yukon Flats', isCorrect: false },
          { id: 'c', label: 'Arctic Sands', isCorrect: false },
          { id: 'd', label: 'Prairie Basin', isCorrect: false },
        ],
      },
      {
        id: 'l11_q7',
        question: 'Which frozen phenomenon appears on Abraham Lake in winter?',
        options: [
          { id: 'a', label: 'Ice towers', isCorrect: false },
          { id: 'b', label: 'Methane bubbles', isCorrect: true },
          { id: 'c', label: 'Frozen waves', isCorrect: false },
          { id: 'd', label: 'Snow domes', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'level_12',
    title: 'Level 12',
    questions: [
      {
        id: 'l12_q1',
        question: 'Which rock formations shaped by tides can be walked around during low tide?',
        options: [
          { id: 'a', label: 'Hopewell Rocks', isCorrect: true },
          { id: 'b', label: 'Atlantic Towers', isCorrect: false },
          { id: 'c', label: 'Ocean Pillars', isCorrect: false },
          { id: 'd', label: 'Fundy Arches', isCorrect: false },
        ],
      },
      {
        id: 'l12_q2',
        question: 'Which Canadian region contains the Pingos formed by permafrost pressure?',
        options: [
          { id: 'a', label: 'Northwest Territories', isCorrect: true },
          { id: 'b', label: 'Manitoba', isCorrect: false },
          { id: 'c', label: 'Alberta', isCorrect: false },
          { id: 'd', label: 'Saskatchewan', isCorrect: false },
        ],
      },
      {
        id: 'l12_q3',
        question: 'Which Arctic mountain is known for one of the world’s largest vertical cliffs?',
        options: [
          { id: 'a', label: 'Mount Logan', isCorrect: false },
          { id: 'b', label: 'Mount Thor', isCorrect: true },
          { id: 'c', label: 'Mount Columbia', isCorrect: false },
          { id: 'd', label: 'Mount Robson', isCorrect: false },
        ],
      },
      {
        id: 'l12_q4',
        question: 'Which cultural region is famous for Haida Indigenous heritage?',
        options: [
          { id: 'a', label: 'Haida Gwaii', isCorrect: true },
          { id: 'b', label: 'Vancouver Island', isCorrect: false },
          { id: 'c', label: 'Prince Rupert', isCorrect: false },
          { id: 'd', label: 'Gulf Islands', isCorrect: false },
        ],
      },
      {
        id: 'l12_q5',
        question: 'Which suspension bridge crosses a deep forest canyon in British Columbia?',
        options: [
          { id: 'a', label: 'Capilano Suspension Bridge', isCorrect: true },
          { id: 'b', label: 'Fraser Canyon Bridge', isCorrect: false },
          { id: 'c', label: 'Rocky Bridge', isCorrect: false },
          { id: 'd', label: 'Pacific Bridge', isCorrect: false },
        ],
      },
      {
        id: 'l12_q6',
        question: 'Which island in Ontario contains unique limestone flowerpot formations?',
        options: [
          { id: 'a', label: 'Flowerpot Island', isCorrect: true },
          { id: 'b', label: 'Manitoulin Island', isCorrect: false },
          { id: 'c', label: 'Amherst Island', isCorrect: false },
          { id: 'd', label: 'Pelee Island', isCorrect: false },
        ],
      },
      {
        id: 'l12_q7',
        question: 'Which famous scenic coastal route runs through Cape Breton?',
        options: [
          { id: 'a', label: 'Cabot Trail', isCorrect: true },
          { id: 'b', label: 'Atlantic Drive', isCorrect: false },
          { id: 'c', label: 'Coastal Route', isCorrect: false },
          { id: 'd', label: 'Highland Road', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'level_13',
    title: 'Level 13',
    questions: [
      {
        id: 'l13_q1',
        question: 'Which Canadian lake reveals colorful mineral circles when water evaporates?',
        options: [
          { id: 'a', label: 'Spotted Lake', isCorrect: true },
          { id: 'b', label: 'Moraine Lake', isCorrect: false },
          { id: 'c', label: 'Emerald Lake', isCorrect: false },
          { id: 'd', label: 'Peyto Lake', isCorrect: false },
        ],
      },
      {
        id: 'l13_q2',
        question: 'Which rock bridge was carved by the Kicking Horse River?',
        options: [
          { id: 'a', label: 'Natural Bridge', isCorrect: true },
          { id: 'b', label: 'Glacier Arch', isCorrect: false },
          { id: 'c', label: 'Canyon Bridge', isCorrect: false },
          { id: 'd', label: 'River Gate', isCorrect: false },
        ],
      },
      {
        id: 'l13_q3',
        question: 'Which massive roadside statue celebrates Canada’s national animal?',
        options: [
          { id: 'a', label: 'Giant Beaver', isCorrect: true },
          { id: 'b', label: 'Giant Moose', isCorrect: false },
          { id: 'c', label: 'Giant Elk', isCorrect: false },
          { id: 'd', label: 'Giant Caribou', isCorrect: false },
        ],
      },
      {
        id: 'l13_q4',
        question: 'Which valley gained a mysterious reputation due to unexplained deaths?',
        options: [
          { id: 'a', label: 'Nahanni Valley', isCorrect: true },
          { id: 'b', label: 'Yukon Valley', isCorrect: false },
          { id: 'c', label: 'Fraser Valley', isCorrect: false },
          { id: 'd', label: 'Columbia Valley', isCorrect: false },
        ],
      },
      {
        id: 'l13_q5',
        question: 'Which sand dune system is the largest in Canada?',
        options: [
          { id: 'a', label: 'Athabasca Sand Dunes', isCorrect: true },
          { id: 'b', label: 'Yukon Sands', isCorrect: false },
          { id: 'c', label: 'Prairie Dunes', isCorrect: false },
          { id: 'd', label: 'Arctic Sands', isCorrect: false },
        ],
      },
      {
        id: 'l13_q6',
        question: 'Which Canadian island has ancient Indigenous village remains and totem poles?',
        options: [
          { id: 'a', label: 'Haida Gwaii', isCorrect: true },
          { id: 'b', label: 'Vancouver Island', isCorrect: false },
          { id: 'c', label: 'Baffin Island', isCorrect: false },
          { id: 'd', label: 'Victoria Island', isCorrect: false },
        ],
      },
      {
        id: 'l13_q7',
        question: 'Which large statue welcomes travelers to the town of Wawa?',
        options: [
          { id: 'a', label: 'Giant Goose', isCorrect: true },
          { id: 'b', label: 'Giant Hawk', isCorrect: false },
          { id: 'c', label: 'Giant Eagle', isCorrect: false },
          { id: 'd', label: 'Giant Swan', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'level_14',
    title: 'Level 14',
    questions: [
      {
        id: 'l14_q1',
        question: 'Which Canadian park contains the powerful Virginia Falls?',
        options: [
          { id: 'a', label: 'Nahanni National Park', isCorrect: true },
          { id: 'b', label: 'Banff National Park', isCorrect: false },
          { id: 'c', label: 'Jasper National Park', isCorrect: false },
          { id: 'd', label: 'Kootenay National Park', isCorrect: false },
        ],
      },
      {
        id: 'l14_q2',
        question: 'Which giant monument represents the forestry industry in New Brunswick?',
        options: [
          { id: 'a', label: 'World’s Largest Axe', isCorrect: true },
          { id: 'b', label: 'Giant Logger', isCorrect: false },
          { id: 'c', label: 'Big Saw', isCorrect: false },
          { id: 'd', label: 'Timber Monument', isCorrect: false },
        ],
      },
      {
        id: 'l14_q3',
        question: 'Which Alberta region is famous for dramatic badlands landscapes and fossils?',
        options: [
          { id: 'a', label: 'Drumheller', isCorrect: true },
          { id: 'b', label: 'Canmore', isCorrect: false },
          { id: 'c', label: 'Medicine Hat', isCorrect: false },
          { id: 'd', label: 'Red Deer', isCorrect: false },
        ],
      },
      {
        id: 'l14_q4',
        question: 'Which island is often called the “Graveyard of the Atlantic”?',
        options: [
          { id: 'a', label: 'Sable Island', isCorrect: true },
          { id: 'b', label: 'Cape Breton Island', isCorrect: false },
          { id: 'c', label: 'Prince Edward Island', isCorrect: false },
          { id: 'd', label: 'Anticosti Island', isCorrect: false },
        ],
      },
      {
        id: 'l14_q5',
        question: 'Which natural rock arch stands off the coast of Quebec?',
        options: [
          { id: 'a', label: 'Percé Rock', isCorrect: true },
          { id: 'b', label: 'Atlantic Gate', isCorrect: false },
          { id: 'c', label: 'Ocean Bridge', isCorrect: false },
          { id: 'd', label: 'Coastal Pillar', isCorrect: false },
        ],
      },
      {
        id: 'l14_q6',
        question: 'Which geological feature forms frozen gas bubbles beneath winter ice?',
        options: [
          { id: 'a', label: 'Methane bubbles', isCorrect: true },
          { id: 'b', label: 'Nitrogen pockets', isCorrect: false },
          { id: 'c', label: 'Oxygen bubbles', isCorrect: false },
          { id: 'd', label: 'Ice chambers', isCorrect: false },
        ],
      },
      {
        id: 'l14_q7',
        question: 'Which Arctic landform creates dome-shaped hills due to underground ice pressure?',
        options: [
          { id: 'a', label: 'Pingos', isCorrect: true },
          { id: 'b', label: 'Ice cones', isCorrect: false },
          { id: 'c', label: 'Frost domes', isCorrect: false },
          { id: 'd', label: 'Glacier mounds', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 'level_15',
    title: 'Level 15',
    questions: [
      {
        id: 'l15_q1',
        question: 'Which Canadian attraction is a giant five-cent coin monument?',
        options: [
          { id: 'a', label: 'Big Nickel', isCorrect: true },
          { id: 'b', label: 'Silver Dollar', isCorrect: false },
          { id: 'c', label: 'Copper Coin', isCorrect: false },
          { id: 'd', label: 'Golden Penny', isCorrect: false },
        ],
      },
      {
        id: 'l15_q2',
        question: 'Which unusual desert landscape exists in Yukon?',
        options: [
          { id: 'a', label: 'Carcross Desert', isCorrect: true },
          { id: 'b', label: 'Yukon Basin', isCorrect: false },
          { id: 'c', label: 'Arctic Plains', isCorrect: false },
          { id: 'd', label: 'Prairie Sands', isCorrect: false },
        ],
      },
      {
        id: 'l15_q3',
        question: 'Which towering rock columns are formed by erosion in Alberta’s badlands?',
        options: [
          { id: 'a', label: 'Hoodoos', isCorrect: true },
          { id: 'b', label: 'Rock Towers', isCorrect: false },
          { id: 'c', label: 'Basalt Columns', isCorrect: false },
          { id: 'd', label: 'Stone Needles', isCorrect: false },
        ],
      },
      {
        id: 'l15_q4',
        question: 'Which Ontario island features rock formations shaped like flowerpots?',
        options: [
          { id: 'a', label: 'Flowerpot Island', isCorrect: true },
          { id: 'b', label: 'Manitoulin Island', isCorrect: false },
          { id: 'c', label: 'Wolfe Island', isCorrect: false },
          { id: 'd', label: 'Toronto Island', isCorrect: false },
        ],
      },
      {
        id: 'l15_q5',
        question: 'Which island mystery is associated with the legendary “Money Pit”?',
        options: [
          { id: 'a', label: 'Oak Island', isCorrect: true },
          { id: 'b', label: 'Baffin Island', isCorrect: false },
          { id: 'c', label: 'Vancouver Island', isCorrect: false },
          { id: 'd', label: 'Victoria Island', isCorrect: false },
        ],
      },
      {
        id: 'l15_q6',
        question: 'Which Arctic mountain cliff is famous for its extreme vertical drop?',
        options: [
          { id: 'a', label: 'Mount Thor', isCorrect: true },
          { id: 'b', label: 'Mount Logan', isCorrect: false },
          { id: 'c', label: 'Mount Columbia', isCorrect: false },
          { id: 'd', label: 'Mount Robson', isCorrect: false },
        ],
      },
      {
        id: 'l15_q7',
        question: 'Which coastal rock formations in New Brunswick were shaped by the Bay of Fundy tides?',
        options: [
          { id: 'a', label: 'Hopewell Rocks', isCorrect: true },
          { id: 'b', label: 'Atlantic Towers', isCorrect: false },
          { id: 'c', label: 'Ocean Columns', isCorrect: false },
          { id: 'd', label: 'Fundy Arches', isCorrect: false },
        ],
      },
    ],
  },
];