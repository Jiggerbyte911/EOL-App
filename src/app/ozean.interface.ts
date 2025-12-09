export interface Ozean {
  id: string;
  name: string;
  description: string;
  picturesLinkList: string[];
  picturesCaptions: { title: string; description: string }[];
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
    picturesCaptions: [
      {
        title: 'Hawaii-Mönchsrobbe',
        description: 'Eine der seltensten Robben der Welt, die man nur um Hawaii findet.',
      },
      {
        title: 'Vaquita-Schweinswal',
        description: 'Das kleinste und am stärksten bedrohte Meeressäugetier der Welt.',
      },
      {
        title: 'Japanische Riesenkrabbe',
        description:
          'Der größte Krebs der Welt! Sie kann eine Beinspannweite von fast 4 Metern haben.',
      },
      {
        title: 'Gespensterfisch',
        description: 'Ein bizarres Tier aus der Tiefee mit großen Zähnen und leuchtenden Augen.',
      },
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
      'Der Atlantische Ozean ist der zweitgrößte Ozean der Welt und liegt zwischen Europa, Afrika, Nord- und Südamerika. Er ist bekannt für seine vielen Stürme und die wichtige Rolle, die er für das Wetter der Welt spielt.\n\nDas Besondere am Atlantik ist der Mittelatlantische Rücken. Stell dir ein riesiges Gebirge vor, das komplett unter Wasser liegt – es ist die längste Bergkette der Erde! An dieser Stelle wächst der Ozean ständig ein kleines Stück, da die Erdplatten auseinanderdriften. Die berühmte Insel Island ist übrigens ein Teil dieses Gebirges, das über die Wasseroberfläche ragt.\n\nIm Atlantik leben viele verschiedene Tiere, von winzigen Planktonorganismen bis hin zu riesigen Walen. Delfine, Haie, Meeresschildkröten und bunte Fische sind hier zuhause. Besonders spannend sind die Tiefseegräben, in denen es Lebewesen gibt, die in völliger Dunkelheit leben und ganz anders aussehen als die Tiere, die wir an der Oberfläche kennen.\n\n',
    picturesLinkList: ['/platzhalter.webp', '/platzhalter.webp', '/platzhalter.webp'],
    picturesCaptions: [
      {
        title: 'Atlantik Bild 1',
        description: 'Kommt bald...',
      },
      {
        title: 'Atlantik Bild 2',
        description: 'Kommt bald...',
      },
      {
        title: 'Atlantik Bild 3',
        description: 'Kommt bald...',
      },
    ],
    nebenmeere: [
      'Mittelmeer',
      'Schwarzes Meer',
      'Karibisches Meer',
      'Golf von Mexiko',
      'Sargassosee',
      'Nordsee',
      'Ostsee',
      'Baltisches Meer',
    ],
  },
  {
    id: 'indisch',
    name: 'Indischer Ozean',
    description:
      'Der Indische Ozean ist der drittgrößte Ozean der Welt und liegt zwischen Afrika, Asien, Australien und der Antarktis. Er ist bekannt dafür, dass er oft wärmer ist als der Atlantik und der Pazifik. Diese Wärme macht ihn besonders attraktiv für Korallen und bestimmte Meerestiere.\n\nEine Besonderheit sind die Monsunwinde. Diese Winde ändern zweimal im Jahr komplett ihre Richtung und bestimmen so das Klima und die Strömungen in diesem Meer. Der Monsun bringt im Sommer viel Regen an die Küsten Asiens, ist aber auch wichtig für die Fische. Ein anderes Highlight sind die vielen Inselparadiese wie die Malediven und Seychellen, die aus wunderschönen Korallenriffen bestehen.\n\nIm Indischen Ozean leben viele verschiedene Tiere, darunter bunte Fische, Delfine, Haie und Meeresschildkröten. Besonders spannend sind die Tiefseegräben, in denen es Lebewesen gibt, die in völliger Dunkelheit leben und ganz anders aussehen als die Tiere, die wir an der Oberfläche kennen.\n\n',
    picturesLinkList: ['/platzhalter.webp', '/platzhalter.webp', '/platzhalter.webp'],
    picturesCaptions: [
      {
        title: 'Indischer Ozean Bild 1',
        description: 'Kommt bald...',
      },
      {
        title: 'Indischer Ozean Bild 2',
        description: 'Kommt bald...',
      },
      {
        title: 'Indischer Ozean Bild 3',
        description: 'Kommt bald...',
      },
    ],
    nebenmeere: ['Arabisches Meer', 'Golf von Bengalen', 'Andamanensee', 'Rotes Meer'],
  },
  {
    id: 'arktis',
    name: 'Arktischer Ozean',
    description:
      'Die Arktis ist keine Landmasse wie die Antarktis, sondern ein Ozean, der fast das ganze Jahr über von einer dicken Schicht aus Meereis bedeckt ist. Sie liegt ganz oben auf der Weltkarte, rund um den Nordpol. Hier gibt es nur zwei Jahreszeiten: einen langen, dunklen Winter und einen kurzen, hellen Sommer.\n\nDas Besondere an der Arktis ist, dass das Eis ständig in Bewegung ist. Große Stücke Eisschollen treiben langsam im Kreis, angetrieben von Winden und Strömungen. Das Wasser unter dem Eis ist extrem kalt und nährstoffreich. Die eisigen Temperaturen sind für die Tiere, die hier leben, kein Problem – sie haben spezielle Fettschichten (Blubber) und dichtes Fell, um warm zu bleiben.\n\nIm Arktischen Ozean leben Tiere wie Eisbären, Robben, Walrosse und verschiedene Walarten. Auch viele Vogelarten nutzen die Arktis als Brutgebiet. Die Pflanzenwelt ist eher spärlich, aber es gibt spezielle Algen, die unter dem Eis wachsen und eine wichtige Nahrungsquelle sind.\n\n',
    picturesLinkList: ['/platzhalter.webp', '/platzhalter.webp', '/platzhalter.webp'],
    picturesCaptions: [
      {
        title: 'Arktis Bild 1',
        description: 'Kommt bald...',
      },
      {
        title: 'Arktis Bild 2',
        description: 'Kommt bald...',
      },
      {
        title: 'Arktis Bild 3',
        description: 'Kommt bald...',
      },
    ],
    nebenmeere: ['Barentssee', 'Beringmeer', 'Chukchi-Meer', 'Karasee'],
  },
  {
    id: 'antarktis',
    name: 'Antarktischer Ozean',
    description:
      'Der Südliche Ozean umgibt den Kontinent Antarktis und ist der viertgrößte Ozean. Er ist der kälteste Ozean der Welt und wird ständig von der Antarktischen Zirkumpolarströmung umflossen – das ist die stärkste Meeresströmung der Erde, die ihn wie ein Zaun vom Rest der Welt abschneidet.\n\nDie Besonderheit ist das Meereis, das im Winter riesige Flächen bedeckt. Trotz der Kälte ist das Wasser unter dem Eis unglaublich nahrhaft. Das liegt daran, dass kaltes Wasser Sauerstoff und Nährstoffe besser speichern kann. Dieses Meer ist der wichtigste Nährboden für Krill, der hier in unglaublichen Mengen vorkommt und die Basis der Nahrungskette bildet.\n\nIm Antarktischen Ozean leben viele Tiere, die an die extremen Bedingungen angepasst sind. Pinguine, Robben, Wale und verschiedene Vogelarten sind hier zuhause. Besonders spannend sind die Tiefseegräben, in denen es Lebewesen gibt, die in völliger Dunkelheit leben und ganz anders aussehen als die Tiere, die wir an der Oberfläche kennen.\n\n',
    picturesLinkList: ['/platzhalter.webp', '/platzhalter.webp', '/platzhalter.webp'],
    picturesCaptions: [
      {
        title: 'Antarktis Bild 1',
        description: 'Kommt bald...',
      },
      {
        title: 'Antarktis Bild 2',
        description: 'Kommt bald...',
      },
      {
        title: 'Antarktis Bild 3',
        description: 'Kommt bald...',
      },
    ],
    nebenmeere: ['Rossmeer', 'Amundsenmeer', 'Weddellmeer'],
  },
];
