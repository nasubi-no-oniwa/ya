// 「矢は壊れない」のデータ：方向12 × 高さ5 = 60コース、各5種類 = 300種類の死に方
// ことばは [日本語, English, 繁體中文, 한국어] の順
window.YA = (function () {
  // 12の方向（30度ずつ）。name＝景色の名前、a＝そこにある物3つ、gc＝地面の色
  const SECT = [
    { n: ['的場', 'Archery range', '靶場', '과녁장'], gc: 0x7fc66b, a: ['mato', 'kakashi', 'shinpan'] },
    { n: ['野球場', 'Ballpark', '棒球場', '야구장'], gc: 0xb98a55, a: ['batter', 'machine', 'score'] },
    { n: ['村', 'Village', '村莊', '마을'], gc: 0x93c96a, a: ['kane', 'fusha', 'ido'] },
    { n: ['牧場', 'Ranch', '牧場', '목장'], gc: 0xa6d46a, a: ['ushi', 'uma', 'tractor'] },
    { n: ['海', 'Sea', '大海', '바다'], gc: 0x2f8fd6, a: ['todai', 'fune', 'kujira'] },
    { n: ['浜辺', 'Beach', '海灘', '해변'], gc: 0xeed9a0, a: ['yashi', 'surfer', 'kani'] },
    { n: ['街', 'City', '城市', '도시'], gc: 0x9aa0a8, a: ['biru', 'kanban', 'shingo'] },
    { n: ['工事現場', 'Construction site', '工地', '공사장'], gc: 0xc9b07a, a: ['crane', 'shovel', 'sagyoin'] },
    { n: ['神社', 'Shrine', '神社', '신사'], gc: 0x6fae6a, a: ['torii', 'daibutsu', 'toro'] },
    { n: ['雪山', 'Snowy mountain', '雪山', '설산'], gc: 0xeef4fa, a: ['kazan', 'yukidaruma', 'kuma'] },
    { n: ['遊園地', 'Amusement park', '遊樂園', '놀이공원'], gc: 0xf0b6c8, a: ['kanransha', 'taiho', 'piero'] },
    { n: ['城下町', 'Castle town', '城下町', '성 아랫마을'], gc: 0xb7c78a, a: ['shiro', 'ninja', 'samurai'] },
  ];
  const ACT = {
    mato: ['的', 'the target', '箭靶', '과녁'], kakashi: ['かかし', 'a scarecrow', '稻草人', '허수아비'], shinpan: ['審判', 'the referee', '裁判', '심판'],
    batter: ['野球部員', 'a baseball player', '棒球隊員', '야구부원'], machine: ['ピッチングマシン', 'a pitching machine', '發球機', '피칭머신'], score: ['スコアボード', 'the scoreboard', '計分板', '전광판'],
    kane: ['お寺の鐘', 'a temple bell', '寺廟的鐘', '절의 종'], fusha: ['風車', 'a windmill', '風車', '풍차'], ido: ['井戸', 'a well', '水井', '우물'],
    ushi: ['牛', 'a cow', '牛', '소'], uma: ['馬', 'a horse', '馬', '말'], tractor: ['トラクター', 'a tractor', '拖拉機', '트랙터'],
    todai: ['灯台', 'a lighthouse', '燈塔', '등대'], fune: ['漁船', 'a fishing boat', '漁船', '어선'], kujira: ['クジラ', 'a whale', '鯨魚', '고래'],
    yashi: ['ヤシの木', 'a palm tree', '椰子樹', '야자수'], surfer: ['サーファー', 'a surfer', '衝浪客', '서퍼'], kani: ['カニ', 'a crab', '螃蟹', '게'],
    biru: ['ビル', 'a building', '大樓', '빌딩'], kanban: ['看板', 'a billboard', '招牌', '간판'], shingo: ['信号機', 'a traffic light', '紅綠燈', '신호등'],
    crane: ['クレーン', 'a crane', '起重機', '크레인'], shovel: ['ショベルカー', 'an excavator', '挖土機', '굴착기'], sagyoin: ['作業員', 'a construction worker', '工人', '작업원'],
    torii: ['鳥居', 'a torii gate', '鳥居', '도리이'], daibutsu: ['大仏', 'a giant Buddha', '大佛', '대불'], toro: ['灯籠', 'a stone lantern', '石燈籠', '석등'],
    kazan: ['火山', 'a volcano', '火山', '화산'], yukidaruma: ['雪だるま', 'a snowman', '雪人', '눈사람'], kuma: ['クマ', 'a bear', '熊', '곰'],
    kanransha: ['観覧車', 'a Ferris wheel', '摩天輪', '관람차'], taiho: ['大砲', 'a cannon', '大砲', '대포'], piero: ['ピエロ', 'a clown', '小丑', '광대'],
    shiro: ['お城', 'a castle', '城堡', '성'], ninja: ['忍者', 'a ninja', '忍者', '닌자'], samurai: ['侍', 'a samurai', '武士', '사무라이'],
    karasu: ['カラス', 'a crow', '烏鴉', '까마귀'], kamome: ['カモメ', 'a seagull', '海鷗', '갈매기'], washi: ['ワシ', 'an eagle', '老鷹', '독수리'],
    hikoki: ['飛行機', 'an airplane', '飛機', '비행기'], ufo: ['UFO', 'a UFO', '幽浮', 'UFO'], kikyu: ['気球', 'a hot-air balloon', '熱氣球', '열기구'],
    kumo: ['雷雲', 'a thundercloud', '雷雲', '먹구름'], tsuki: ['月', 'the moon', '月亮', '달'], eisei: ['人工衛星', 'a satellite', '人造衛星', '인공위성'],
    inseki: ['隕石', 'a meteorite', '隕石', '운석'], heli: ['ヘリコプター', 'a helicopter', '直升機', '헬리콥터'], tako: ['凧', 'a kite', '風箏', '연'],
    tenshi: ['天使', 'an angel', '天使', '천사'], pelican: ['ペリカン', 'a pelican', '鵜鶘', '펠리컨'],
    mogura: ['モグラ', 'a mole', '鼴鼠', '두더지'], ishi: ['石ころ', 'a pebble', '小石頭', '돌멩이'], tramp: ['トランポリン', 'a trampoline', '彈跳床', '트램펄린'],
    kanketsu: ['間欠泉', 'a geyser', '間歇泉', '간헐천'], bane: ['バネ', 'a spring', '彈簧', '스프링'], ari: ['アリの行列', 'a line of ants', '螞蟻隊伍', '개미 떼'],
    mizu: ['水たまり', 'a puddle', '水窪', '물웅덩이'], ashi: ['自分の足', 'your own foot', '自己的腳', '자기 발'],
  };
  const SKY = ['karasu', 'kamome', 'washi', 'hikoki', 'ufo', 'kikyu', 'kumo', 'tsuki', 'eisei', 'inseki', 'heli', 'tako', 'tenshi', 'pelican'];
  const FOOT = ['mogura', 'ishi', 'tramp', 'kanketsu', 'bane', 'ari', 'mizu', 'ashi'];
  // 戻ってき方：[ja（物の名前のあとに続く）, en, zh, ko, もとの秒数, 刺さる向き(f=前 t=真上 b=後ろ), 効果音の文字 ja, ほか]
  const MET = {
    bounce: ['に当たって跳ね返った', 'Bounced off {a}', '射中{a}後彈了回來', '{a} 맞고 튕겨 돌아옴', 2.2, 'f', 'ボヨン', 'BOING'],
    bat: ['に打ち返された', 'Batted back by {a}', '被{a}打了回來', '{a}의 풀스윙에 되돌아옴', 1.9, 'f', 'カキーン！', 'CRACK!'],
    catch: ['につかまれて投げ返された', 'Caught and thrown back by {a}', '被{a}接住後丟了回來', '{a}의 손에 잡혔다가 되던져짐', 3.6, 'f', 'ガシッ', 'GRAB'],
    swallow: ['に飲みこまれて吐き出された', 'Swallowed and spat out by {a}', '被{a}吞下去又吐了出來', '{a}의 입에 삼켜졌다가 뱉어짐', 3.4, 'f', 'パクッ…ペッ', 'GULP… PTOO'],
    orbit: ['の周りを一周して戻ってきた', 'Circled {a} once and came back', '繞了{a}一圈後飛回來', '{a} 주위를 한 바퀴 돌고 돌아옴', 3.8, 'f', 'ぐるん', 'WHIRL'],
    rico: ['に当たり、岩にも当たって戻ってきた', 'Hit {a}, then a rock, then you', '打到{a}，又打到岩石，飛了回來', '{a} 맞고, 바위도 맞고 돌아옴', 3.0, 'f', 'カン！コン！', 'CLANK! CLONK!'],
    sneeze: ['のくしゃみで吹き戻された', 'Blown back by a sneeze from {a}', '被{a}的噴嚏吹了回來', '{a}의 재채기에 날려 돌아옴', 3.2, 'f', 'ハクション！', 'ACHOO!'],
    earth: ['を突き抜け、地球を一周してきた', 'Went through {a} and around the Earth', '穿過{a}，繞了地球一圈', '{a} 뚫고 지구 한 바퀴', 9.0, 'b', 'スポッ', 'ZIP'],
    delay: ['に刺さっていたが、忘れたころに帰ってきた', 'Stuck in {a}, then came home late', '插在{a}上，過了很久才回來', '{a}에 박혀 있다가 잊을 만하면 돌아옴', 2.8, 'f', '……', '. . .'],
    kick: ['に蹴り返された', 'Kicked back by {a}', '被{a}踢了回來', '{a}의 발차기에 되돌아옴', 3.0, 'f', 'ドカッ', 'WHAM'],
    carry: ['に運ばれて、真上から落とされた', 'Carried off by {a} and dropped from above', '被{a}帶走，從正上方丟下來', '{a}의 배달로 머리 위에서 떨어짐', 4.6, 't', 'ガシッ', 'GRAB'],
    boom: ['をかすめて、ブーメランのように戻ってきた', 'Grazed {a} and came back like a boomerang', '擦過{a}，像迴力鏢一樣飛回來', '{a} 스치고 부메랑처럼 돌아옴', 3.4, 'b', 'ヒュルル', 'WHOOSH'],
    space: ['にはじかれて宇宙まで行き、流れ星になって帰ってきた', 'Knocked into space by {a}, returned as a shooting star', '被{a}彈到太空，變成流星回來', '{a} 맞고 우주까지 갔다가 별똥별로 돌아옴', 11.0, 't', 'キラーン', 'TWINKLE'],
    launch: ['に打ち上げられて、真上から落ちてきた', 'Launched by {a}, fell straight down', '被{a}彈上天，從正上方掉下來', '{a} 덕분에 솟구쳤다가 머리 위로 떨어짐', 4.0, 't', 'ボヨーン', 'BOING'],
  };
  const GM = ['bounce', 'bat', 'catch', 'swallow', 'orbit', 'rico', 'sneeze', 'earth', 'delay', 'kick'];   // 地上の物
  const SM = ['bounce', 'bat', 'carry', 'swallow', 'orbit', 'sneeze', 'delay', 'boom', 'space', 'catch'];   // 空の物
  const FM = ['bounce', 'kick', 'swallow', 'delay', 'launch', 'rico', 'orbit', 'catch'];                    // 足元の物
  // 刺さる場所：前4つ・真上1つ・後ろ2つ（＋足の小指は足元だけ）
  const SPOT = { f: [['おでこ', 'forehead', '額頭', '이마'], ['鼻', 'nose', '鼻子', '코'], ['胸', 'chest', '胸口', '가슴'], ['ひざ', 'knee', '膝蓋', '무릎'], ['足の小指', 'little toe', '小腳趾', '새끼발가락']], t: [['頭のてっぺん', 'top of the head', '頭頂', '정수리']], b: [['背中', 'back', '背', '등'], ['おしり', 'butt', '屁股', '엉덩이']] };
  const H = (a, b) => (Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(b + 0x7f4a7c15, 0xc2b2ae35)) >>> 0;
  // 300種類の表。g = コース(0〜59)×5 + 何種類目(0〜4)。コース = 方向(0〜11)×5 + 高さ(0=足元 1=下 2=水平 3=上 4=空)
  const G = [];
  for (let s = 0; s < 12; s++) for (let b = 0; b < 5; b++) for (let i = 0; i < 5; i++) {
    let a, m;
    if (b === 0) { const k = s * 5 + i; a = FOOT[k % 8]; m = FM[(Math.floor(k / 8) + k % 8) % 8]; }
    else if (b === 2) { a = SECT[s].a[[0, 1, 2, 0, 1][i]]; m = GM[(i + s) % 10]; }
    else if (b === 1) { a = SECT[s].a[[2, 0, 1, 2, 0][i]]; m = GM[(5 + i + s) % 10]; }
    else { const k = (s * 2 + (b - 3)) * 5 + i; a = SKY[k % 14]; m = SM[(Math.floor(k / 14) + k % 14) % 10]; }
    const g = G.length, h = H(g + 1, 777);
    let sec = MET[m][4] * (0.9 + (h % 26) / 100);
    if (m === 'delay') { const w = (h >>> 8) % 100; sec += w < 12 ? 9 + ((h >>> 16) % 1300) / 100 : 1.5 + ((h >>> 16) % 450) / 100; }
    if (m === 'space') sec += ((h >>> 8) % 900) / 100;
    if (m === 'earth') sec += ((h >>> 8) % 500) / 100;
    const f = Math.min(2500, Math.round(sec * 100));
    const cls = MET[m][5], list = cls === 'f' ? (b === 0 ? SPOT.f : SPOT.f.slice(0, 4)) : SPOT[cls];
    G.push({ g, a, m, f, cls, spot: list[(h >>> 4) % list.length], sp: (h >>> 4) % list.length, s, b, i });
  }
  return { SECT, ACT, SKY, FOOT, MET, SPOT, G, H };
})();
