export interface Ozean {
  id: string;
  name: string;
  description: string;
  picturesLinkList: string[];
  nebenmeere: string[];
}

export const OCEANS_DATA: Ozean[] = [
  {
    id: 'pazifik',
    name: 'Pazifischer Ozean',
    description:
      'Der Pazifische Ozean ist der größte Ozean der Erde. Er ist so riesig, dass alle anderen Ozeane zusammen immer noch kleiner sind. Wenn man mit einem Schiff von einer Seite zur anderen fahren würde, bräuchte man viele Wochen! Forscher sagen, dass er über ein Drittel der gesamten Erdoberfläche bedeckt.\n\nIn ihm liegen viele Inseln – mehr als in jedem anderen Ozean. Dazu gehören berühmte Orte wie Hawaii oder Fiji. Auf diesen Inseln leben besondere Tiere und Pflanzen, die es sonst nirgends gibt. Viele Menschen reisen gerne dorthin, weil die Strände wunderschön sind.\n\nIm Pazifik leben riesige Meerestiere. Zum Beispiel Blauwale, die größten Tiere der Welt. Auch Delfine, Haie, Schildkröten und bunte Fische haben dort ihr Zuhause. Manche Tiere tauchen so tief, dass nie ein Mensch ohne Spezialgerät zu ihnen gelangen könnte.\nDer Pazifische Ozean ist außerdem sehr wichtig für das Klima der Erde. Er speichert viel Wärme und beeinflusst das Wetter auf der ganzen Welt. Ohne ihn gäbe es viele Wetterphänomene, wie zum Beispiel Stürme oder den warmen Wind „El Niño“, nicht.\n\nLeider ist der Ozean heute in Gefahr. Immer mehr Plastikmüll landet im Wasser und schadet den Tieren. Forschende und Umweltschützer arbeiten daran, den Pazifik zu schützen. Auch wir können helfen, indem wir weniger Müll produzieren und ihn ordentlich entsorgen. So bleibt der Ozean ein wundervoller Ort – für Menschen und Tiere.\n\n',
    picturesLinkList: [
      '/pazifik/hawaiiMoenchsRobbe.webp',
      '/pazifik/vaquitaSchweinswal.webp',
      '/pazifik/japanischeRiesenkrabbe.jpg',
      '/pazifik/gespensterfisch.jpg',
      '/platzhalter.webp',
    ],
    nebenmeere: [
      'Beringmeer',
      'Korallenmeer',
      'Philippinisches Meer',
      'Tasmanisches Meer',
      'Ostchinesisches Meer',
      'Westchinesisches Meer',
      'Kara-Meer',
      'Südchinesisches Meer',
    ],
  },
  {
    id: 'atlantik',
    name: 'Atlantischer Ozean',
    description:
      'Der Atlantische Ozean trennt die Kontinente Amerika und Europa/Afrika. Er ist der zweitgrößte Ozean und deckt etwa 23% der Wasseroberfläche ab.',
    picturesLinkList: ['/platzhalter.webp', '/platzhalter.webp', '/platzhalter.webp'],
    nebenmeere: ['erstesMeer', 'zweitesMeer', 'drittesMeer'],
  },
  {
    id: 'indisch',
    name: 'Indischer Ozean',
    description:
      'Der Indische Ozean ist der drittgrößte Ozean und liegt zwischen Afrika, Asien, Australien und der Antarktis. Er macht etwa 20% der Wasseroberfläche der Erde aus.',
    picturesLinkList: ['/platzhalter.webp', '/platzhalter.webp', '/platzhalter.webp'],
    nebenmeere: ['erstesMeer', 'zweitesMeer', 'drittesMeer'],
  },
  {
    id: 'arktis',
    name: 'Arktischer Ozean',
    description:
      'Der Arktische Ozean ist der kleinste und flachste der fünf großen Ozeane und befindet sich rund um den nördlichen Polarkreis.',
    picturesLinkList: ['/platzhalter.webp', '/platzhalter.webp', '/platzhalter.webp'],
    nebenmeere: ['erstesMeer', 'zweitesMeer', 'drittesMeer'],
  },
  {
    id: 'antarktis',
    name: 'Antarktischer Ozean',
    description:
      'Der Antarktische Ozean wird auch als Südlicher Ozean bezeichnet und umgibt die Antarktis. Er ist der vierte Ozean und spielt eine wichtige Rolle im globalen Klimasystem.',
    picturesLinkList: ['/platzhalter.webp', '/platzhalter.webp', '/platzhalter.webp'],
    nebenmeere: ['erstesMeer', 'zweitesMeer', 'drittesMeer'],
  },
];
