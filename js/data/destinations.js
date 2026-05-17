/* ──────────────────────────────────────────────────
   destinations data
   ────────────────────────────────────────────────── */

export const destinations = {
  'great-wall': {
    num:'No. 01',
    name:{en:'The Great Wall', zh:'万里长城'},
    region:{en:'Beijing · Hebei', zh:'北京 · 河北'},
    hero:'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=2000&q=80',
    gallery:[
      'https://images.unsplash.com/photo-1525870605453-b25099e9bb24?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583425423320-4ba79f2cb5b3?auto=format&fit=crop&w=800&q=80'
    ],
    overview:{en:'Built over two millennia by successive dynasties, the Great Wall is less a single structure than a thread of fortifications stretching more than 21,000 km across northern China. The most photographed sections — Mutianyu, Jinshanling, and Jiankou — sit within easy reach of Beijing and offer dramatically different experiences, from restored stone steps to wild, crumbling ramparts.', zh:'万里长城并非单一建筑，而是历经两千年、由历朝历代修筑而成的防御之链，绵延逾两万一千公里横贯中国北部。游人最常前往的慕田峪、金山岭与箭扣，皆在北京近郊，从修复完整的青石阶到荒野中残破的烽燧，各有截然不同的体验。'},
    bestTime:{en:'September–October for clear skies and autumn color; April–May for green hills.', zh:'九至十月天高云阔，秋色正浓；四至五月山色青翠。'},
    duration:{en:'Half day to 2 days', zh:'半日至两日'},
    difficulty:{en:'Moderate — many stairs', zh:'中等——多石阶'},
    musts:[
      {title:{en:'Mutianyu at sunrise', zh:'慕田峪日出'}, body:{en:'Take the cable car up, walk down at first light; the watchtowers glow gold.', zh:'乘缆车上山，破晓时分徒步下行；烽燧在晨光中泛着金色。'}},
      {title:{en:'Jinshanling crumble', zh:'金山岭古韵'}, body:{en:'The least restored of the popular sections — broken steps, wild grass, real history.', zh:'热门段中最为原貌——残阶、野草、真实的历史气息。'}},
      {title:{en:'Jiankou for photographers', zh:'箭扣摄影之地'}, body:{en:'Unrestored, dangerous, breathtaking. Hire a local guide. Wear grippy shoes.', zh:'未经修复，险峻而壮美。建议聘请向导，并穿防滑登山鞋。'}},
      {title:{en:'A night atop the wall', zh:'长城夜宿'}, body:{en:'Several outfitters arrange permitted tower-top camping at Gubeikou — rare and unforgettable.', zh:'数家服务商可于古北口安排经许可的烽燧露营——稀有而难忘。'}}
    ],
    itinerary:[
      {day:{en:'Day 1 — Mutianyu', zh:'第一日 · 慕田峪'},
        morning:{en:'Early start from Beijing (1.5 hr drive). Cable car up to Tower 14.', zh:'清晨自北京出发（车程约一小时半），乘缆车至 14 号敌楼。'},
        afternoon:{en:'Walk west to Tower 6, then descend via slide.', zh:'西行至 6 号敌楼，乘滑道下山。'},
        evening:{en:'Dinner at a courtyard restaurant in Huairou; overnight nearby.', zh:'怀柔区四合院餐厅晚餐，附近过夜。'}},
      {day:{en:'Day 2 — Jinshanling', zh:'第二日 · 金山岭'},
        morning:{en:'Drive 2 hrs to Jinshanling. East trail to Simatai West.', zh:'车程约两小时至金山岭，东行至司马台西段。'},
        afternoon:{en:'Hike 5 km along restored and wild sections.', zh:'徒步五公里，穿行修复段与野长城。'},
        evening:{en:'Return to Beijing by 8 pm.', zh:'晚八点前返回北京。'}}
    ],
    tips:{en:'Buy water in the parking area — it triples in price at the top. The east-bound walk from Tower 14 at Mutianyu is far less crowded than west.', zh:'山下停车场购水，山顶售价三倍。慕田峪由 14 号敌楼向东走，远较向西清静。'},
    related:['forbidden-city','xian','lijiang']
  },
  'forbidden-city': {
    num:'No. 02',
    name:{en:'Forbidden City', zh:'紫禁城'},
    region:{en:'Beijing', zh:'北京'},
    hero:'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=2000&q=80',
    gallery:[
      'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591001388569-ff09ef9f9c19?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?auto=format&fit=crop&w=800&q=80'
    ],
    overview:{en:'Home to 24 emperors of the Ming and Qing dynasties, the Forbidden City — Gùgōng — is the largest preserved palace complex in the world. Nearly a kilometer long, it houses more than nine thousand rooms behind vermillion walls. The official tour skims the main axis; the side courtyards are where the city quiets and you can feel five centuries of imperial life.', zh:'明清两朝二十四位皇帝的宫廷所在——故宫，是世界上保存最大的宫殿群。朱墙之内逾九千间房舍，绵延近一公里。官方导览仅走主轴线，唯有步入两侧庭院，方能在宁静中感受五百年皇室气息。'},
    bestTime:{en:'October–November or March; avoid Chinese New Year week.', zh:'十至十一月或三月最佳；春节期间宜避开。'},
    duration:{en:'Half day minimum, full day ideal', zh:'至少半日，整日为佳'},
    difficulty:{en:'Easy — flat, large grounds', zh:'轻松——园区平坦，但面积较大'},
    musts:[
      {title:{en:'Hall of Supreme Harmony', zh:'太和殿'}, body:{en:'The largest wooden structure in China; site of imperial coronations.', zh:'中国现存最大的木构建筑，皇帝登基大典之所。'}},
      {title:{en:'Treasure Gallery', zh:'珍宝馆'}, body:{en:'Extra ticket, light crowds, room after room of jade and gold.', zh:'另购门票，人流稀少，玉器金器陈列不绝。'}},
      {title:{en:'Imperial Garden', zh:'御花园'}, body:{en:'A quiet north exit through twisted cypresses and pavilions.', zh:'北门内静谧出口，曲柏与亭台环绕。'}},
      {title:{en:'View from Jingshan Hill', zh:'景山远眺'}, body:{en:'Cross the moat and climb 200 m for the full panorama of golden roofs.', zh:'跨护城河，登景山二百米，俯瞰金顶全貌。'}}
    ],
    itinerary:[
      {day:{en:'Day 1 — The Palace', zh:'第一日 · 紫禁城'},
        morning:{en:'Enter at Meridian Gate (south) by 9 AM. Walk the central axis.', zh:'九时前由午门入园，沿中轴线游览。'},
        afternoon:{en:'Branch east into the Treasure Gallery and Clock Hall.', zh:'东行至珍宝馆与钟表馆。'},
        evening:{en:'Exit north, climb Jingshan for sunset.', zh:'由北门出，登景山观日落。'}}
    ],
    tips:{en:'Book tickets online 7 days ahead — passport ID required. Audio guide in 40 languages near the entrance.', zh:'提前七日线上购票，需护照实名。入口附近可租用 40 种语言的语音导览器。'},
    related:['great-wall','xian','lijiang']
  },
  'li-river': {
    num:'No. 03',
    name:{en:'Li River, Guilin', zh:'桂林漓江'},
    region:{en:'Guangxi', zh:'广西'},
    hero:'https://images.unsplash.com/photo-1537531383496-f4749b8032cf?auto=format&fit=crop&w=2000&q=80',
    gallery:[
      'https://images.unsplash.com/photo-1513415564515-763d91423bdc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583338917451-faafcc9f8f56?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601276861758-2d9c5ca69a17?auto=format&fit=crop&w=800&q=80'
    ],
    overview:{en:'The Li River winds 83 km between Guilin and Yangshuo through a landscape that has been the subject of Chinese ink painting for fifteen centuries: limestone karst peaks rising from rice paddies, water buffalo on the banks, and cormorant fishermen who still work the river at dusk. The slow boat south is the gentlest one-day journey in China.', zh:'漓江在桂林与阳朔之间蜿蜒八十三公里，沿岸喀斯特石峰自稻田中拔起，水牛悠游岸边，鸬鹚渔人于黄昏点起渔火——千五百年来，这片山水一直是中国水墨画的题材。漫舟南下，是中国最为悠然的一日之旅。'},
    bestTime:{en:'April–May for misty mornings; October for dry, golden light.', zh:'四五月烟雨蒙蒙；十月秋光金灿。'},
    duration:{en:'1–3 days', zh:'一至三日'},
    difficulty:{en:'Easy — boat journey + light cycling', zh:'轻松——乘船加轻量骑行'},
    musts:[
      {title:{en:'Guilin–Yangshuo cruise', zh:'桂林至阳朔游船'}, body:{en:'4-hour slow boat, 83 km of karst scenery. Sit on the upper deck.', zh:'四小时漫舟，八十三公里喀斯特风光。建议坐于船顶层。'}},
      {title:{en:'Yangshuo by bicycle', zh:'阳朔骑行'}, body:{en:'Rent a bike, follow the Yulong River through villages and rice fields.', zh:'租一辆自行车，沿遇龙河穿行村庄与稻田。'}},
      {title:{en:'Cormorant fishing at dusk', zh:'黄昏鸬鹚捕鱼'}, body:{en:'A handful of old men still practice it — book through a Yangshuo guesthouse.', zh:'仅存几位老渔人在传承——可由阳朔民宿代订。'}},
      {title:{en:'Sunrise at Xianggong Hill', zh:'相公山日出'}, body:{en:'The river bends below — the postcard view, before the tour buses arrive.', zh:'江流弯下山脚——明信片般的画面，趁旅行团抵达之前抓住它。'}}
    ],
    itinerary:[
      {day:{en:'Day 1 — Cruise', zh:'第一日 · 漓江游船'},
        morning:{en:'Embark at Zhujiang dock, 9 AM.', zh:'上午九时朱江码头登船。'},
        afternoon:{en:'Arrive Yangshuo by 1 PM. Check into a riverside guesthouse.', zh:'下午一时抵阳朔，入住江边民宿。'},
        evening:{en:'West Street stroll; outdoor noodles.', zh:'漫步西街，露天米粉。'}},
      {day:{en:'Day 2 — Yangshuo', zh:'第二日 · 阳朔'},
        morning:{en:'Cycle the Yulong River, 15 km.', zh:'沿遇龙河骑行十五公里。'},
        afternoon:{en:'Tea & local market in Xingping.', zh:'兴坪古镇喝茶逛集市。'},
        evening:{en:'Cormorant fishing on a bamboo raft.', zh:'乘竹筏观鸬鹚捕鱼。'}}
    ],
    tips:{en:'The mainstream cruise is touristy but unbeatable scenery. If you want quieter, ask for a bamboo raft from Yangdi to Xingping.', zh:'主流游船游客虽多但风光无可替代。如喜清静，可从杨堤至兴坪改乘竹筏。'},
    related:['zhangjiajie','lijiang','xian']
  },
  'zhangjiajie': {
    num:'No. 04',
    name:{en:'Zhangjiajie', zh:'张家界'},
    region:{en:'Hunan', zh:'湖南'},
    hero:'https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?auto=format&fit=crop&w=2000&q=80',
    gallery:[
      'https://images.unsplash.com/photo-1523592121529-f6dde35f079e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551582045-6ec9c11d8697?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559682468-a6a29e7d9517?auto=format&fit=crop&w=800&q=80'
    ],
    overview:{en:'Three thousand sandstone pillars rise from a sea of green in Zhangjiajie National Forest Park — the landscape that James Cameron took as the model for Pandora in Avatar. Glass walkways, suspended skybridges, and the world\'s tallest outdoor elevator weave between peaks. It is the most theatrical landscape in China.', zh:'张家界国家森林公园中，三千座砂岩石柱自绿海中拔起——卡梅隆即以此地为《阿凡达》潘多拉星灵感来源。玻璃栈道、悬空天桥与世界最高的户外观光电梯于群峰间穿行，是中国最具戏剧性的风景。'},
    bestTime:{en:'May or October for clear views; July adds dramatic clouds.', zh:'五月或十月视野清朗；七月则云雾缥缈。'},
    duration:{en:'2–3 days', zh:'二至三日'},
    difficulty:{en:'Moderate — steep stairs, long days', zh:'中等——梯陡路长'},
    musts:[
      {title:{en:'Bailong Elevator', zh:'百龙天梯'}, body:{en:'A 326-meter glass elevator bolted to a cliff. Skip the queue with a 7 AM start.', zh:'高三百二十六米、贴崖而建的玻璃电梯。建议七时前抵达以避开人流。'}},
      {title:{en:'Tianzi Mountain', zh:'天子山'}, body:{en:'The classic pillar view — pillars like a stone forest, fog like a sea.', zh:'经典峰林——石柱如林、云雾如海。'}},
      {title:{en:'Tianmen Glass Skywalk', zh:'天门山玻璃栈道'}, body:{en:'Not for the queasy. The 99-bend mountain road below is reason alone.', zh:'恐高者慎入。山下九十九弯盘山公路已是奇观。'}},
      {title:{en:'Golden Whip Stream', zh:'金鞭溪'}, body:{en:'A 7.5 km river walk at the foot of the pillars — easy and stunning.', zh:'七公里半的溪畔步道，于石柱脚下漫行——轻松而壮丽。'}}
    ],
    itinerary:[
      {day:{en:'Day 1 — Wulingyuan', zh:'第一日 · 武陵源'},
        morning:{en:'Bailong Elevator up to Yuanjiajie; "Hallelujah Mountain".', zh:'乘百龙天梯至袁家界，登"哈利路亚山"。'},
        afternoon:{en:'Tianzi Mountain via cable car; sunset over the pillars.', zh:'缆车至天子山，赏石林日落。'},
        evening:{en:'Dinner at Wulingyuan village.', zh:'武陵源镇晚餐。'}},
      {day:{en:'Day 2 — Tianmen', zh:'第二日 · 天门山'},
        morning:{en:'Cable car up Tianmen Mountain — the world\'s longest.', zh:'登天门山——乘世界最长缆车上山。'},
        afternoon:{en:'Glass skywalk + Heaven\'s Gate cave.', zh:'玻璃栈道与天门洞。'},
        evening:{en:'Return to Zhangjiajie city.', zh:'返回张家界市区。'}}
    ],
    tips:{en:'The park is enormous and signs are inconsistent — download an offline map. Stay inside the park to skip the 50-minute morning bus.', zh:'园区辽阔且标识有限，建议下载离线地图。园内住宿可省去清晨五十分钟班车。'},
    related:['li-river','lijiang','great-wall']
  },
  'lijiang': {
    num:'No. 05',
    name:{en:'Lijiang & Yunnan', zh:'云南丽江'},
    region:{en:'Yunnan', zh:'云南'},
    hero:'https://images.unsplash.com/photo-1551806235-6692ad9da9d9?auto=format&fit=crop&w=2000&q=80',
    gallery:[
      'https://images.unsplash.com/photo-1545158539-3e8c9e9c2e6e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503842471779-f2bee45ae8a8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80'
    ],
    overview:{en:'Yunnan is China\'s most ethnically diverse province and quite possibly its most beautiful. Lijiang\'s 800-year-old Naxi old town, the snow peaks of Yulong, the impossibly photogenic Lugu Lake, and the spice-fragrant alleys of Dali all sit within a long day of each other. Travel slow — the people, food, and air all reward it.', zh:'云南是中国民族最多元的省份，也或许是最美的。丽江八百年纳西古城、玉龙雪山、宛若画卷的泸沽湖、与香料弥漫的大理街巷，皆于咫尺之间。慢游云南，山水风物、人情饮食都将以更丰盛之姿回馈你。'},
    bestTime:{en:'February–April for camellia blooms; September–November for clear skies.', zh:'二至四月山茶花开；九至十一月晴空澄澈。'},
    duration:{en:'5–10 days', zh:'五至十日'},
    difficulty:{en:'Easy to moderate — high altitude', zh:'轻松至中等——海拔较高'},
    musts:[
      {title:{en:'Lijiang Old Town', zh:'丽江古城'}, body:{en:'Wake at 6 AM before the tour groups, and you will have the cobbled lanes to yourself.', zh:'晨六时起身，趁旅行团未至，整座石板小巷便仅为你一人独享。'}},
      {title:{en:'Yulong Snow Mountain', zh:'玉龙雪山'}, body:{en:'5,596 m glacier visible from Lijiang. Cable car to 4,506 m — go early.', zh:'海拔 5596 米的雪山，丽江市内即可远望。缆车直达 4506 米，宜早行。'}},
      {title:{en:'Shuhe Ancient Town', zh:'束河古镇'}, body:{en:'Quieter than Lijiang proper, with the same Naxi architecture.', zh:'较之丽江主城更为清静，建筑同为纳西风格。'}},
      {title:{en:'Lugu Lake', zh:'泸沽湖'}, body:{en:'Six hours north — home of the matrilineal Mosuo people. Stay two nights.', zh:'北行六小时，是摩梭母系社会的家园。宜停留两夜。'}}
    ],
    itinerary:[
      {day:{en:'Day 1 — Lijiang', zh:'第一日 · 丽江'},
        morning:{en:'Arrive Lijiang Airport, taxi 35 min to Old Town.', zh:'抵达丽江机场，约三十五分钟车程至古城。'},
        afternoon:{en:'Wander Sifang Square; tea at Mu Family Mansion.', zh:'漫步四方街，木府品茶。'},
        evening:{en:'Naxi banquet — try qíguō jī chicken.', zh:'纳西风味晚宴——必尝汽锅鸡。'}},
      {day:{en:'Day 2 — Yulong', zh:'第二日 · 玉龙雪山'},
        morning:{en:'7 AM departure for the mountain; cable car up.', zh:'七时启程上山，乘缆车至顶。'},
        afternoon:{en:'Blue Moon Valley walk.', zh:'蓝月谷漫步。'},
        evening:{en:'Sunset at Wenchang Palace.', zh:'文昌宫落日。'}},
      {day:{en:'Day 3 — Shuhe', zh:'第三日 · 束河'},
        morning:{en:'Bike to Shuhe Ancient Town.', zh:'骑行至束河古镇。'},
        afternoon:{en:'Lazy lunch by the canal.', zh:'河畔慢午餐。'},
        evening:{en:'Return to Lijiang for dinner.', zh:'返回丽江晚餐。'}}
    ],
    tips:{en:'Altitude is real — drink water, take it slow on day 1. Cash and small bills are still preferred in old-town tea houses.', zh:'高原反应不可轻视——多饮水，首日缓步。古城茶馆仍偏好现金小钞。'},
    related:['li-river','zhangjiajie','xian']
  },
  'xian': {
    num:'No. 06',
    name:{en:"Xi'an & the Terracotta Army", zh:'西安与兵马俑'},
    region:{en:'Shaanxi', zh:'陕西'},
    hero:'https://images.unsplash.com/photo-1591777334841-1a911e3f12c4?auto=format&fit=crop&w=2000&q=80',
    gallery:[
      'https://images.unsplash.com/photo-1597306864929-5cdd4ddccfdc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591018653691-78dd72d2bd87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591018653691-78dd72d2bd87?auto=format&fit=crop&w=800&q=80'
    ],
    overview:{en:'Xi\'an was the eastern terminus of the Silk Road and the capital of thirteen dynasties. Behind 14 km of intact Ming-era city walls you will find the Terracotta Army of Emperor Qin (8,000 life-size warriors), the Muslim Quarter\'s lamb skewers, and the gentle Big Wild Goose Pagoda. It is the best place in China to feel the weight of dynastic history.', zh:'西安是丝绸之路东端起点，亦是十三朝古都。十四公里完整保存的明代城墙之内，沉睡着八千件秦始皇兵马俑、回民街上飘香的羊肉串、与温润的大雁塔。在这里，最能感受中国王朝史的厚重。'},
    bestTime:{en:'April or October; avoid mid-summer heat.', zh:'四月或十月最佳；夏中酷暑宜避。'},
    duration:{en:'2 days', zh:'两日'},
    difficulty:{en:'Easy', zh:'轻松'},
    musts:[
      {title:{en:'Terracotta Army, Pit 1', zh:'兵马俑一号坑'}, body:{en:'A football-field of warriors, no two faces alike. Hire a guide at the gate.', zh:'足球场大小的将士阵列，面容无一雷同。建议入口处请向导。'}},
      {title:{en:'City wall bike ride', zh:'城墙骑行'}, body:{en:'Rent a bike and ride the full 14 km loop at dusk.', zh:'黄昏时分租一辆单车，沿十四公里城墙环骑。'}},
      {title:{en:'Muslim Quarter at night', zh:'夜游回民街'}, body:{en:'Lamb skewers, persimmon cakes, hand-pulled biang-biang noodles.', zh:'羊肉串、柿子饼、手工 biáng biáng 面。'}},
      {title:{en:'Big Wild Goose Pagoda', zh:'大雁塔'}, body:{en:'A Tang-dynasty stupa; the surrounding fountain show is good for kids.', zh:'唐代佛塔，周边音乐喷泉适合带小孩同游。'}}
    ],
    itinerary:[
      {day:{en:'Day 1 — Terracotta Army', zh:'第一日 · 兵马俑'},
        morning:{en:'Drive 1 hr east. Pit 1 first, then 3 and 2.', zh:'东行一小时。先看一号坑，再至三号、二号。'},
        afternoon:{en:'Lunch at the village; return to city wall.', zh:'兵马俑村午餐，返城内游城墙。'},
        evening:{en:'Muslim Quarter for dinner.', zh:'回民街晚餐。'}},
      {day:{en:'Day 2 — Old City', zh:'第二日 · 古城'},
        morning:{en:'Big Wild Goose Pagoda; Shaanxi History Museum.', zh:'大雁塔与陕西历史博物馆。'},
        afternoon:{en:'Bell & Drum Towers.', zh:'钟楼与鼓楼。'},
        evening:{en:'Tang Dynasty dinner show (optional).', zh:'可选《长恨歌》或唐宫宴。'}}
    ],
    tips:{en:'Reserve the Shaanxi History Museum free ticket the day before — by 9 AM it\'s gone. Pit 1 is unmissable; Pit 2 is more atmospheric.', zh:'陕西历史博物馆免费票需提前一日预约，九时即抢完。一号坑必看，二号坑氛围更佳。'},
    related:['great-wall','forbidden-city','lijiang']
  }
};
