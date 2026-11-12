/* Holiday gift and shopping assistant: the idea data and the link builder.
   Live tool: https://theconvergencehub.com/shopping-assistant
   MIT licensed. Replace AFFILIATE_TAG with your OWN Amazon Associates tag before using this
   (the tag in the live tool belongs to The Convergence Hub). Any page that uses affiliate links
   must disclose them plainly. Nothing here reads or stores personal data. */
var AFFILIATE_TAG = 'YOUR-ASSOCIATES-TAG-20';
// idea fields: t = title, q = Amazon search words, w = why, a = ages (kid, teen, adult, older), g = 1 adds gender words
var IDEAS = {
 "Coffee, tea and cooking at home": [
  {
   "t": "Pour-over or French press coffee kit",
   "q": "pour over coffee maker set",
   "w": "Makes a daily coffee habit feel special.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Insulated travel mug",
   "q": "insulated travel mug leak proof",
   "w": "Keeps drinks hot or cold on the go.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Digital kitchen scale",
   "q": "digital kitchen scale",
   "w": "Handy for baking and portion control.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Cast iron skillet",
   "q": "cast iron skillet",
   "w": "A long-lasting pan for the stove or oven.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Loose-leaf tea sampler",
   "q": "loose leaf tea sampler gift set",
   "w": "An easy way to try new flavors.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Kids baking set",
   "q": "kids baking set",
   "w": "A hands-on kitchen activity, with an adult helping.",
   "a": [
    "kid"
   ],
   "g": 0
  }
 ],
 "Walking, running or working out": [
  {
   "t": "Walking or running shoes",
   "q": "walking shoes",
   "w": "Comfort matters most for a daily walking habit.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 1
  },
  {
   "t": "Resistance bands set",
   "q": "resistance bands set",
   "w": "Small, cheap and easy to use at home.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Insulated water bottle",
   "q": "insulated water bottle",
   "w": "Pairs with any workout or walk.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Foam roller",
   "q": "foam roller",
   "w": "A common choice for stretching and cool-downs.",
   "a": [
    "teen",
    "adult"
   ],
   "g": 0
  },
  {
   "t": "Reflective vest or clip-on light",
   "q": "reflective running vest led",
   "w": "Helps people see you on early or late walks.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Outdoor sports set for kids",
   "q": "kids outdoor sports set",
   "w": "Balls, a frisbee or similar for active play.",
   "a": [
    "kid"
   ],
   "g": 0
  }
 ],
 "Video games and board games": [
  {
   "t": "Gaming headset",
   "q": "gaming headset",
   "w": "Clear chat and sound for long sessions.",
   "a": [
    "teen",
    "adult"
   ],
   "g": 0
  },
  {
   "t": "Controller charging dock",
   "q": "controller charging station",
   "w": "Keeps controllers ready.",
   "a": [
    "teen",
    "adult"
   ],
   "g": 0
  },
  {
   "t": "Family board game",
   "q": "family board games",
   "w": "Works for mixed ages around the table.",
   "a": [
    "kid",
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "1000-piece jigsaw puzzle",
   "q": "1000 piece jigsaw puzzle",
   "w": "A quiet holiday-week activity.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Building blocks set",
   "q": "building blocks set kids",
   "w": "Open-ended play; check the age label.",
   "a": [
    "kid"
   ],
   "g": 0
  },
  {
   "t": "Party card game",
   "q": "party card game",
   "w": "Easy to learn and good for groups.",
   "a": [
    "teen",
    "adult"
   ],
   "g": 0
  }
 ],
 "Reading and learning": [
  {
   "t": "Clip-on book light",
   "q": "clip on book light",
   "w": "Lets someone read without lighting up the room.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "E-reader case or cover",
   "q": "e-reader case",
   "w": "Protects a device they already own.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Large-print puzzle books",
   "q": "large print word search",
   "w": "Easier on the eyes.",
   "a": [
    "older"
   ],
   "g": 0
  },
  {
   "t": "Children’s picture books",
   "q": "children’s picture books",
   "w": "Good for read-aloud time.",
   "a": [
    "kid"
   ],
   "g": 0
  },
  {
   "t": "Language-learning flash cards",
   "q": "language learning flash cards",
   "w": "A simple way to practice a new language.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Bookmarks and reading journal",
   "q": "reading journal",
   "w": "Track books read.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  }
 ],
 "Working or studying at a desk": [
  {
   "t": "Laptop stand",
   "q": "laptop stand adjustable",
   "w": "Raises the screen for a better view.",
   "a": [
    "teen",
    "adult"
   ],
   "g": 0
  },
  {
   "t": "Keyboard wrist rest",
   "q": "keyboard wrist rest",
   "w": "A comfort add-on for long typing.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "LED desk lamp",
   "q": "led desk lamp",
   "w": "Good light for work or homework.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Noise-canceling headphones",
   "q": "noise cancelling headphones",
   "w": "Helps focus in a busy home.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Cable organizer",
   "q": "desk cable organizer",
   "w": "Tidies up cords.",
   "a": [
    "teen",
    "adult"
   ],
   "g": 0
  },
  {
   "t": "Kids stationery set",
   "q": "kids stationery set",
   "w": "Pencils, notebooks and more.",
   "a": [
    "kid"
   ],
   "g": 0
  }
 ],
 "Travel and commuting": [
  {
   "t": "Packing cubes",
   "q": "packing cubes",
   "w": "Keeps a suitcase organized.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Portable phone charger",
   "q": "portable charger power bank",
   "w": "Useful on trips and commutes.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Luggage tags",
   "q": "luggage tags",
   "w": "Small, practical and cheap.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Travel neck pillow",
   "q": "travel neck pillow",
   "w": "For long flights and drives.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Kids travel activity kit",
   "q": "kids travel activity kit",
   "w": "Keeps hands busy on trips.",
   "a": [
    "kid"
   ],
   "g": 0
  }
 ],
 "Gardening and the outdoors": [
  {
   "t": "Garden gloves and hand tools",
   "q": "gardening tool set",
   "w": "The basics for a small garden.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Indoor herb garden kit",
   "q": "indoor herb garden kit",
   "w": "Fresh herbs on a windowsill.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Binoculars",
   "q": "binoculars for bird watching",
   "w": "For birds, hikes or sports.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "LED headlamp",
   "q": "led headlamp",
   "w": "Hands-free light for camping or walks.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Kids explorer kit",
   "q": "kids explorer kit outdoor",
   "w": "Magnifier, bug box and more.",
   "a": [
    "kid"
   ],
   "g": 0
  },
  {
   "t": "Camping hammock",
   "q": "camping hammock",
   "w": "Easy outdoor relaxing.",
   "a": [
    "teen",
    "adult"
   ],
   "g": 0
  }
 ],
 "Pets": [
  {
   "t": "Interactive dog toy",
   "q": "interactive dog toys",
   "w": "Keeps a dog busy.",
   "a": [
    "kid",
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Cat scratching post",
   "q": "cat scratching post",
   "w": "Protects furniture.",
   "a": [
    "kid",
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Pet water fountain",
   "q": "pet water fountain",
   "w": "Encourages drinking.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Pet hair remover",
   "q": "pet hair remover",
   "w": "A cleanup helper.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "No-pull dog harness",
   "q": "dog harness no pull",
   "w": "For easier walks.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  }
 ],
 "Music and podcasts": [
  {
   "t": "Portable Bluetooth speaker",
   "q": "portable bluetooth speaker",
   "w": "Music anywhere.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Wireless earbuds",
   "q": "wireless earbuds",
   "w": "Everyday listening.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Ukulele starter kit",
   "q": "ukulele starter kit",
   "w": "A friendly first instrument.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Record cleaning kit",
   "q": "record cleaning kit",
   "w": "For vinyl collectors.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Kids musical instrument set",
   "q": "kids musical instrument set",
   "w": "Drums, shakers and more.",
   "a": [
    "kid"
   ],
   "g": 0
  }
 ],
 "Arts, crafts and hobbies": [
  {
   "t": "Watercolor paint set",
   "q": "watercolor paint set",
   "w": "Low-mess way to start painting.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Crochet starter kit",
   "q": "crochet starter kit",
   "w": "Everything to begin.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Sketchbook and pencils",
   "q": "sketchbook drawing pencils set",
   "w": "For doodling or serious drawing.",
   "a": [
    "kid",
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Model building kit",
   "q": "model building kit",
   "w": "A focused project.",
   "a": [
    "teen",
    "adult"
   ],
   "g": 0
  },
  {
   "t": "Kids craft kit",
   "q": "kids craft kit",
   "w": "Check the age label.",
   "a": [
    "kid"
   ],
   "g": 0
  },
  {
   "t": "Diamond painting kit",
   "q": "diamond painting kit",
   "w": "Relaxing and screen-free.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  }
 ],
 "Tech and gadgets": [
  {
   "t": "Smart plug",
   "q": "smart plug",
   "w": "Turn lamps on and off from a phone.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Wireless charging pad",
   "q": "wireless charger",
   "w": "Cuts down on cables.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Bluetooth item tracker",
   "q": "bluetooth item tracker",
   "w": "Find keys and bags.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Streaming device",
   "q": "streaming device",
   "w": "Easy access to shows.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Kids tablet case",
   "q": "kids tablet case",
   "w": "Drop protection.",
   "a": [
    "kid"
   ],
   "g": 0
  },
  {
   "t": "1080p webcam",
   "q": "webcam 1080p",
   "w": "Clearer video calls.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  }
 ],
 "Sleep, relaxing and self-care": [
  {
   "t": "Throw blanket",
   "q": "throw blanket",
   "w": "Cozy and widely liked.",
   "a": [
    "kid",
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Sleep mask",
   "q": "sleep mask",
   "w": "Blocks light.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Essential oil diffuser",
   "q": "essential oil diffuser",
   "w": "A calm-room favorite. Check the product for any safety notes, especially around pets.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "House slippers",
   "q": "house slippers",
   "w": "Warm feet.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 1
  },
  {
   "t": "Bath gift set",
   "q": "bath gift set",
   "w": "A simple treat.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  }
 ],
 "Home and organizing": [
  {
   "t": "Drawer organizers",
   "q": "drawer organizer set",
   "w": "A quick tidy-up.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Cordless stick vacuum",
   "q": "cordless stick vacuum",
   "w": "Lightweight cleanup.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Closet organizers",
   "q": "closet organizer",
   "w": "Make space.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Motion-sensor night lights",
   "q": "motion sensor night light",
   "w": "Soft light for hallways and stairs.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Glass food storage containers",
   "q": "glass food storage containers",
   "w": "Leftovers and meal prep.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  }
 ],
 "DIY, tools and cars": [
  {
   "t": "Cordless screwdriver set",
   "q": "cordless screwdriver set",
   "w": "For small fix-it jobs.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Home tool kit",
   "q": "home tool kit",
   "w": "The basics in one case.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Car phone mount",
   "q": "car phone mount",
   "w": "Hands-free navigation (follow local laws).",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Car emergency kit",
   "q": "car emergency kit",
   "w": "Good to keep in the trunk.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Portable jump starter",
   "q": "portable jump starter",
   "w": "For a dead battery.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  }
 ],
 "Hosting and entertaining": [
  {
   "t": "Charcuterie board set",
   "q": "charcuterie board set",
   "w": "For holiday gatherings.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Party games",
   "q": "party games for adults",
   "w": "Icebreakers.",
   "a": [
    "adult"
   ],
   "g": 0
  },
  {
   "t": "Drink mixing kit",
   "q": "mocktail kit",
   "w": "A fun non-alcoholic option.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Outdoor string lights",
   "q": "outdoor string lights",
   "w": "Holiday glow.",
   "a": [
    "teen",
    "adult",
    "older"
   ],
   "g": 0
  },
  {
   "t": "Holiday table decor",
   "q": "holiday table decor",
   "w": "Set the mood.",
   "a": [
    "adult",
    "older"
   ],
   "g": 0
  }
 ]
};
var STOCKING_STUFFERS = {
 "kid": "stocking stuffers for kids",
 "teen": "stocking stuffers for teens",
 "adult": "stocking stuffers for adults",
 "older": "stocking stuffers for adults"
};

// Build an Amazon search link. budget looks like '25-50' (low-high) or '100-' (no upper limit).
function amazonSearchUrl(query, budget) {
  var u = 'https://www.amazon.com/s?k=' + encodeURIComponent(query);
  if (budget) { var p = budget.split('-'); if (p[0]) u += '&low-price=' + p[0]; if (p[1]) u += '&high-price=' + p[1]; }
  return u + '&tag=' + AFFILIATE_TAG;
}
// Return up to 4 ideas per chosen interest for an age group. Link with rel="sponsored noopener".
function suggest(interests, age, gender, budget) {
  var out = [];
  interests.forEach(function (k) {
    (IDEAS[k] || []).filter(function (it) { return it.a.indexOf(age) > -1; }).slice(0, 4).forEach(function (it) {
      out.push({ interest: k, title: it.t, why: it.w, url: amazonSearchUrl((it.g && gender ? gender + ' ' : '') + it.q, budget) });
    });
  });
  return out;
}
