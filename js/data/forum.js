/* ──────────────────────────────────────────────────
   forum — categories + seeded threads
   ────────────────────────────────────────────────── */

export const categories = [
  { id: 'general',      label: {en:'General',                  zh:'综合'} },
  { id: 'destinations', label: {en:'Destinations & Routes',    zh:'目的地与路线'} },
  { id: 'photography',  label: {en:'Photography',              zh:'摄影'} },
  { id: 'food',         label: {en:'Food & Culture',           zh:'美食与文化'} },
  { id: 'practical',    label: {en:'Visas, Money, Transport',  zh:'签证 · 钱 · 交通'} }
];

const day = 86400000;
const now = Date.now();
const iso = (msAgo) => new Date(now - msAgo).toISOString();

export const forumSeed = [
  {
    id: 't_001',
    category: 'practical',
    title: 'Best week in October for Yunnan — anyone been recently?',
    body: `Planning a 10-day trip in October next year. Hoping to hit Lijiang, Yulong, and maybe Lugu Lake.

I keep reading "go in October" but the weather between early and late October seems to swing a lot. Anyone been in the last two years who can pin down a specific week? Also, is altitude sickness a real concern for someone who lives at sea level?`,
    author: 'Mei',
    authorEmail: 'mei@example.com',
    createdAt: iso(2 * day),
    likedBy: ['j@example.com','sarah@example.com','tom@example.com'],
    replies: [
      { id:'r_001a', author:'James', authorEmail:'j@example.com',
        body:'Mid-October is the sweet spot. I was there Oct 12–18 last year, blue skies every single day, low 20s in the day, single digits at night. Pack layers.',
        createdAt: iso(2*day - 4*3600*1000), likedBy:['mei@example.com','tom@example.com'] },
      { id:'r_001b', author:'Sarah', authorEmail:'sarah@example.com',
        body:'On the altitude question — yes, real. Yulong Snow Mountain peaks above 4,500m. Drink water, do not drink alcohol the first night, take the cable car slowly. I had a mild headache day 1; gone by day 2.',
        createdAt: iso(2*day - 3*3600*1000), likedBy:['mei@example.com'] }
    ]
  },
  {
    id: 't_002',
    category: 'photography',
    title: 'Cormorant fishermen on the Li River — still possible?',
    body: `I keep seeing the iconic photos with the lanterns and the cormorants on bamboo rafts. Is this still actually happening or is it now staged for tourists only? Where do you go for the real thing?`,
    author: 'Devon',
    authorEmail: 'devon@example.com',
    createdAt: iso(5 * day),
    likedBy: ['lin@example.com','j@example.com','sarah@example.com','mei@example.com'],
    replies: [
      { id:'r_002a', author:'Lin', authorEmail:'lin@example.com',
        body:'Honest answer: 95% is staged. The fishermen still do it, but mostly for paying photographers at dusk near Xingping. The same three or four old men are in basically every photo you have seen.\n\nThat said, it is still beautiful — and if you book directly with one of them through a Yangshuo guesthouse rather than a tour bus, they will spend two hours with you instead of fifteen minutes.',
        createdAt: iso(5*day - 6*3600*1000), likedBy:['devon@example.com','sarah@example.com'] },
      { id:'r_002b', author:'James', authorEmail:'j@example.com',
        body:'+1 to Lin. The shot you want is right at blue hour, not full sunset. Bring a tripod and ISO 1600 minimum.',
        createdAt: iso(5*day - 5*3600*1000), likedBy:['devon@example.com'] }
    ]
  },
  {
    id: 't_003',
    category: 'destinations',
    title: 'Trip report: 14 days on the Silk Road',
    body: `Just got back. Xi'an → Lanzhou → Zhangye → Jiayuguan → Dunhuang → Turpan → Kashgar. Did it overland, mostly trains.

Highlights:
• Zhangye danxia at sunset is even better than the photos
• Dunhuang's Mogao caves require a guided tour but the caves themselves are unreal
• Kashgar Sunday market is exactly as advertised

What I'd skip: the Crescent Lake camel ride (overcrowded). What I'd add: an extra day in Turpan for the karez tunnels.

Happy to answer questions.`,
    author: 'Tom',
    authorEmail: 'tom@example.com',
    createdAt: iso(8 * day),
    likedBy: ['sarah@example.com','j@example.com','mei@example.com','devon@example.com','lin@example.com','crystal@example.com'],
    replies: [
      { id:'r_003a', author:'Crystal', authorEmail:'crystal@example.com',
        body:'How was the train booking? I keep reading mixed things about whether foreigners can buy Lanzhou–Dunhuang sleeper tickets online.',
        createdAt: iso(8*day - 12*3600*1000), likedBy:[] },
      { id:'r_003b', author:'Tom', authorEmail:'tom@example.com',
        body:'@Crystal — Trip.com worked for every train. You enter your passport number and they print the ticket QR. The only stretch where I went to a counter was Turpan → Kashgar (24h ride). Bring snacks; the dining car is rough.',
        createdAt: iso(8*day - 11*3600*1000), likedBy:['crystal@example.com','sarah@example.com'] },
      { id:'r_003c', author:'Sarah', authorEmail:'sarah@example.com',
        body:'Did you do Kashgar–Karakoram Highway by any chance? Curious how the road is after the recent landslides.',
        createdAt: iso(8*day - 9*3600*1000), likedBy:[] }
    ]
  },
  {
    id: 't_004',
    category: 'food',
    title: "What's actually in jianbing? (and where in Beijing to find the good one)",
    body: `So I had jianbing on my last trip and now I cannot stop thinking about it. The street vendor near my hotel made it with green onion, an egg, some kind of fried cracker thing, and a brown sauce.

Two questions:
1) What is the fried cracker called?
2) Anyone have a Beijing recommendation for the best one — not a tourist spot, an actual local favorite?`,
    author: 'Crystal',
    authorEmail: 'crystal@example.com',
    createdAt: iso(11 * day),
    likedBy: ['mei@example.com','tom@example.com'],
    replies: [
      { id:'r_004a', author:'Mei', authorEmail:'mei@example.com',
        body:'1) The cracker is "báocuì" (薄脆) — literally "thin-crispy". It is what makes the texture work.\n2) Try the stand at the south corner of Beixinqiao Santiao, just east of Yonghegong subway exit B. Old guy, no English, three people deep at 8am. ¥10 with everything. Tell him "辣的" if you want chili.',
        createdAt: iso(11*day - 8*3600*1000), likedBy:['crystal@example.com','j@example.com','tom@example.com'] }
    ]
  },
  {
    id: 't_005',
    category: 'practical',
    title: 'Visa-free transit for US passport in 2026?',
    body: `The rules keep changing. Anyone done the 144-hour transit recently? I have a flight Tokyo → Beijing → London and want to spend 3 days in Beijing. Do I need a regular tourist visa or can I do this on transit?`,
    author: 'James',
    authorEmail: 'j@example.com',
    createdAt: iso(14 * day),
    likedBy: ['sarah@example.com'],
    replies: [
      { id:'r_005a', author:'Sarah', authorEmail:'sarah@example.com',
        body:'Did this exact route in March. 144-hour transit is fine for US passports as long as: you have an onward ticket to a third country (not back to Japan), and you stay within the eligible region (Beijing/Tianjin/Hebei is one of them).\n\nFill the arrival card honestly and tell the immigration officer "144-hour transit". They will stamp you for the 6 days. No visa needed.',
        createdAt: iso(14*day - 6*3600*1000), likedBy:['j@example.com'] }
    ]
  },
  {
    id: 't_006',
    category: 'destinations',
    title: 'Anyone done a Sichuan-Tibet highway road trip?',
    body: `Looking at G318 from Chengdu to Lhasa. 8 days driving. I have done the standard Tibet trip but never the overland. Question: do you really need a Tibetan guide for the whole route, or only after entering the TAR border?

Also — any private drivers you would recommend?`,
    author: 'Lin',
    authorEmail: 'lin@example.com',
    createdAt: iso(18 * day),
    likedBy: ['tom@example.com','crystal@example.com'],
    replies: []
  },
  {
    id: 't_007',
    category: 'photography',
    title: 'Editing presets for misty / monsoon-season photography?',
    body: `Going to Zhangjiajie in July when it is supposed to be peak mist season. My usual presets are too punchy — they crush the soft gradient that makes mist photos work.

Any Lightroom users with go-to settings? Or just willing to share what you do for high-humidity, low-contrast scenes?`,
    author: 'Devon',
    authorEmail: 'devon@example.com',
    createdAt: iso(22 * day),
    likedBy: ['lin@example.com'],
    replies: [
      { id:'r_007a', author:'Lin', authorEmail:'lin@example.com',
        body:'Three settings that helped me:\n• Drop dehaze to -10 or -15 (don\'t fight the mist, work with it)\n• Pull clarity to -8\n• Push the blue luminance up in HSL to keep distant peaks readable\n\nShoot at f/8 or wider — diffraction on smaller apertures will kill the soft falloff.',
        createdAt: iso(22*day - 3*3600*1000), likedBy:['devon@example.com'] }
    ]
  },
  {
    id: 't_008',
    category: 'general',
    title: 'Welcome to the community',
    body: `Hi everyone, and welcome.

This forum is for travelers heading to China, planning a trip, or just back. A few notes:

• Be specific — "what should I eat in Xi'an" gets generic answers; "I have one dinner in Xi'an and a soft spot for noodles, what should I do" gets great ones.
• Trip reports are gold — even short ones. Future travelers thank you.
• Photos are encouraged but please credit, especially for cormorant fishermen and Yulong sunset shots that get repurposed a lot.
• Be kind. Travel is hard. Different people travel differently.

Looking forward to your stories.`,
    author: 'Editorial Team',
    authorEmail: 'team@exploring-china.com',
    createdAt: iso(40 * day),
    likedBy: ['mei@example.com','j@example.com','sarah@example.com','tom@example.com','devon@example.com','lin@example.com','crystal@example.com'],
    replies: []
  }
];
