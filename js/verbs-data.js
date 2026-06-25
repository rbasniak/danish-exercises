'use strict';

// Top 100 most used Danish verbs
// group: 'ede' | 'te' | 'irregular'
const VERBS = [
  { id: 1,  inf: 'at være',     meaning: 'be',                        present: 'er',         past: 'var',        perfect: 'har været',     imp: 'vær',      group: 'irregular' },
  { id: 2,  inf: 'at have',     meaning: 'have',                      present: 'har',        past: 'havde',      perfect: 'har haft',      imp: 'hav',      group: 'irregular' },
  { id: 3,  inf: 'at kunne',    meaning: 'can / be able to',          present: 'kan',        past: 'kunne',      perfect: 'har kunnet',    imp: '—',        group: 'irregular' },
  { id: 4,  inf: 'at blive',    meaning: 'become / remain',           present: 'bliver',     past: 'blev',       perfect: 'er blevet',     imp: 'bliv',     group: 'irregular' },
  { id: 5,  inf: 'at skulle',   meaning: 'must / be supposed to',     present: 'skal',       past: 'skulle',     perfect: 'har skullet',   imp: '—',        group: 'irregular' },
  { id: 6,  inf: 'at ville',    meaning: 'want to / will',            present: 'vil',        past: 'ville',      perfect: 'har villet',    imp: '—',        group: 'irregular' },
  { id: 7,  inf: 'at få',       meaning: 'get / receive',             present: 'får',        past: 'fik',        perfect: 'har fået',      imp: 'få',       group: 'irregular' },
  { id: 8,  inf: 'at sige',     meaning: 'say',                       present: 'siger',      past: 'sagde',      perfect: 'har sagt',      imp: 'sig',      group: 'irregular' },
  { id: 9,  inf: 'at komme',    meaning: 'come',                      present: 'kommer',     past: 'kom',        perfect: 'er kommet',     imp: 'kom',      group: 'irregular' },
  { id: 10, inf: 'at gå',       meaning: 'go / walk',                 present: 'går',        past: 'gik',        perfect: 'er gået',       imp: 'gå',       group: 'irregular' },
  { id: 11, inf: 'at gøre',     meaning: 'do / make',                 present: 'gør',        past: 'gjorde',     perfect: 'har gjort',     imp: 'gør',      group: 'irregular' },
  { id: 12, inf: 'at se',       meaning: 'see',                       present: 'ser',        past: 'så',         perfect: 'har set',       imp: 'se',       group: 'irregular' },
  { id: 13, inf: 'at måtte',    meaning: 'may / must',                present: 'må',         past: 'måtte',      perfect: 'har måttet',    imp: '—',        group: 'irregular' },
  { id: 14, inf: 'at tage',     meaning: 'take',                      present: 'tager',      past: 'tog',        perfect: 'har taget',     imp: 'tag',      group: 'irregular' },
  { id: 15, inf: 'at give',     meaning: 'give',                      present: 'giver',      past: 'gav',        perfect: 'har givet',     imp: 'giv',      group: 'irregular' },
  { id: 16, inf: 'at stå',      meaning: 'stand',                     present: 'står',       past: 'stod',       perfect: 'har stået',     imp: 'stå',      group: 'irregular' },
  { id: 17, inf: 'at finde',    meaning: 'find',                      present: 'finder',     past: 'fandt',      perfect: 'har fundet',    imp: 'find',     group: 'irregular' },
  { id: 18, inf: 'at holde',    meaning: 'hold / keep',               present: 'holder',     past: 'holdt',      perfect: 'har holdt',     imp: 'hold',     group: 'irregular' },
  { id: 19, inf: 'at sætte',    meaning: 'put / set',                 present: 'sætter',     past: 'satte',      perfect: 'har sat',       imp: 'sæt',      group: 'irregular' },
  { id: 20, inf: 'at vise',     meaning: 'show',                      present: 'viser',      past: 'viste',      perfect: 'har vist',      imp: 'vis',      group: 'te' },
  { id: 21, inf: 'at bruge',    meaning: 'use',                       present: 'bruger',     past: 'brugte',     perfect: 'har brugt',     imp: 'brug',     group: 'te' },
  { id: 22, inf: 'at ligge',    meaning: 'lie / be located',          present: 'ligger',     past: 'lå',         perfect: 'har ligget',    imp: 'lig',      group: 'irregular' },
  { id: 23, inf: 'at vide',     meaning: 'know (a fact)',             present: 'ved',        past: 'vidste',     perfect: 'har vidst',     imp: 'vid',      group: 'irregular' },
  { id: 24, inf: 'at tro',      meaning: 'believe / think',          present: 'tror',       past: 'troede',     perfect: 'har troet',     imp: 'tro',      group: 'ede' },
  { id: 25, inf: 'at mene',     meaning: 'mean / think',             present: 'mener',      past: 'mente',      perfect: 'har ment',      imp: 'men',      group: 'te' },
  { id: 26, inf: 'at ske',      meaning: 'happen',                    present: 'sker',       past: 'skete',      perfect: 'er sket',       imp: '—',        group: 'te' },
  { id: 27, inf: 'at fortælle', meaning: 'tell',                      present: 'fortæller',  past: 'fortalte',   perfect: 'har fortalt',   imp: 'fortæl',   group: 'irregular' },
  { id: 28, inf: 'at høre',     meaning: 'hear',                      present: 'hører',      past: 'hørte',      perfect: 'har hørt',      imp: 'hør',      group: 'te' },
  { id: 29, inf: 'at lave',     meaning: 'make / do',                 present: 'laver',      past: 'lavede',     perfect: 'har lavet',     imp: 'lav',      group: 'ede' },
  { id: 30, inf: 'at lægge',    meaning: 'lay / put',                 present: 'lægger',     past: 'lagde',      perfect: 'har lagt',      imp: 'læg',      group: 'irregular' },
  { id: 31, inf: 'at skrive',   meaning: 'write',                     present: 'skriver',    past: 'skrev',      perfect: 'har skrevet',   imp: 'skriv',    group: 'irregular' },
  { id: 32, inf: 'at sidde',    meaning: 'sit',                       present: 'sidder',     past: 'sad',        perfect: 'har siddet',    imp: 'sid',      group: 'irregular' },
  { id: 33, inf: 'at lade',     meaning: 'let / allow',               present: 'lader',      past: 'lod',        perfect: 'har ladet',     imp: 'lad',      group: 'irregular' },
  { id: 34, inf: 'at synes',    meaning: 'think / find / seem',       present: 'synes',      past: 'syntes',     perfect: 'har syntes',    imp: '—',        group: 'irregular' },
  { id: 35, inf: 'at følge',    meaning: 'follow',                    present: 'følger',     past: 'fulgte',     perfect: 'har fulgt',     imp: 'følg',     group: 'te' },
  { id: 36, inf: 'at begynde',  meaning: 'begin',                     present: 'begynder',   past: 'begyndte',   perfect: 'er begyndt',    imp: 'begynd',   group: 'te' },
  { id: 37, inf: 'at køre',     meaning: 'drive / travel',            present: 'kører',      past: 'kørte',      perfect: 'har/er kørt',   imp: 'kør',      group: 'te' },
  { id: 38, inf: 'at stille',   meaning: 'put / place',               present: 'stiller',    past: 'stillede',   perfect: 'har stillet',   imp: 'stil',     group: 'ede' },
  { id: 39, inf: 'at tænke',    meaning: 'think',                     present: 'tænker',     past: 'tænkte',     perfect: 'har tænkt',     imp: 'tænk',     group: 'te' },
  { id: 40, inf: 'at kalde',    meaning: 'call / name',               present: 'kalder',     past: 'kaldte',     perfect: 'har kaldt',     imp: 'kald',     group: 'te' },
  { id: 41, inf: 'at ønske',    meaning: 'wish / want',               present: 'ønsker',     past: 'ønskede',    perfect: 'har ønsket',    imp: 'ønsk',     group: 'ede' },
  { id: 42, inf: 'at slå',      meaning: 'hit / beat',                present: 'slår',       past: 'slog',       perfect: 'har slået',     imp: 'slå',      group: 'irregular' },
  { id: 43, inf: 'at leve',     meaning: 'live',                      present: 'lever',      past: 'levede',     perfect: 'har levet',     imp: 'lev',      group: 'ede' },
  { id: 44, inf: 'at føre',     meaning: 'lead / carry',              present: 'fører',      past: 'førte',      perfect: 'har ført',      imp: 'før',      group: 'te' },
  { id: 45, inf: 'at burde',    meaning: 'ought to / should',         present: 'bør',        past: 'burde',      perfect: 'har burdet',    imp: '—',        group: 'irregular' },
  { id: 46, inf: 'at spørge',   meaning: 'ask',                       present: 'spørger',    past: 'spurgte',    perfect: 'har spurgt',    imp: 'spørg',    group: 'irregular' },
  { id: 47, inf: 'at arbejde',  meaning: 'work',                      present: 'arbejder',   past: 'arbejdede',  perfect: 'har arbejdet',  imp: 'arbejd',   group: 'ede' },
  { id: 48, inf: 'at skabe',    meaning: 'create',                    present: 'skaber',     past: 'skabte',     perfect: 'har skabt',     imp: 'skab',     group: 'te' },
  { id: 49, inf: 'at sende',    meaning: 'send',                      present: 'sender',     past: 'sendte',     perfect: 'har sendt',     imp: 'send',     group: 'te' },
  { id: 50, inf: 'at falde',    meaning: 'fall',                      present: 'falder',     past: 'faldt',      perfect: 'er faldet',     imp: 'fald',     group: 'irregular' },
  { id: 51, inf: 'at kende',    meaning: 'know / be familiar with',   present: 'kender',     past: 'kendte',     perfect: 'har kendt',     imp: 'kend',     group: 'te' },
  { id: 52, inf: 'at vælge',    meaning: 'choose',                    present: 'vælger',     past: 'valgte',     perfect: 'har valgt',     imp: 'vælg',     group: 'irregular' },
  { id: 53, inf: 'at tale',     meaning: 'speak',                     present: 'taler',      past: 'talte',      perfect: 'har talt',      imp: 'tal',      group: 'te' },
  { id: 54, inf: 'at læse',     meaning: 'read',                      present: 'læser',      past: 'læste',      perfect: 'har læst',      imp: 'læs',      group: 'te' },
  { id: 55, inf: 'at svare',    meaning: 'answer',                    present: 'svarer',     past: 'svarede',    perfect: 'har svaret',    imp: 'svar',     group: 'ede' },
  { id: 56, inf: 'at vende',    meaning: 'turn / return',             present: 'vender',     past: 'vendte',     perfect: 'har vendt',     imp: 'vend',     group: 'te' },
  { id: 57, inf: 'at vinde',    meaning: 'win',                       present: 'vinder',     past: 'vandt',      perfect: 'har vundet',    imp: 'vind',     group: 'irregular' },
  { id: 58, inf: 'at sælge',    meaning: 'sell',                      present: 'sælger',     past: 'solgte',     perfect: 'har solgt',     imp: 'sælg',     group: 'irregular' },
  { id: 59, inf: 'at hjælpe',   meaning: 'help',                      present: 'hjælper',    past: 'hjalp',      perfect: 'har hjulpet',   imp: 'hjælp',    group: 'irregular' },
  { id: 60, inf: 'at møde',     meaning: 'meet',                      present: 'møder',      past: 'mødte',      perfect: 'har mødt',      imp: 'mød',      group: 'te' },
  { id: 61, inf: 'at forsøge',  meaning: 'attempt / try',             present: 'forsøger',   past: 'forsøgte',   perfect: 'har forsøgt',   imp: 'forsøg',   group: 'te' },
  { id: 62, inf: 'at lære',     meaning: 'learn / teach',             present: 'lærer',      past: 'lærte',      perfect: 'har lært',      imp: 'lær',      group: 'te' },
  { id: 63, inf: 'at hedde',    meaning: 'be called',                 present: 'hedder',     past: 'hed',        perfect: 'har heddet',    imp: 'hed',      group: 'irregular' },
  { id: 64, inf: 'at betale',   meaning: 'pay',                       present: 'betaler',    past: 'betalte',    perfect: 'har betalt',    imp: 'betal',    group: 'te' },
  { id: 65, inf: 'at købe',     meaning: 'buy',                       present: 'køber',      past: 'købte',      perfect: 'har købt',      imp: 'køb',      group: 'te' },
  { id: 66, inf: 'at bo',       meaning: 'live / reside',             present: 'bor',        past: 'boede',      perfect: 'har boet',      imp: 'bo',       group: 'ede' },
  { id: 67, inf: 'at spise',    meaning: 'eat',                       present: 'spiser',     past: 'spiste',     perfect: 'har spist',     imp: 'spis',     group: 'te' },
  { id: 68, inf: 'at drikke',   meaning: 'drink',                     present: 'drikker',    past: 'drak',       perfect: 'har drukket',   imp: 'drik',     group: 'irregular' },
  { id: 69, inf: 'at sove',     meaning: 'sleep',                     present: 'sover',      past: 'sov',        perfect: 'har sovet',     imp: 'sov',      group: 'irregular' },
  { id: 70, inf: 'at løbe',     meaning: 'run',                       present: 'løber',      past: 'løb',        perfect: 'har løbet',     imp: 'løb',      group: 'irregular' },
  { id: 71, inf: 'at ringe',    meaning: 'call / ring',               present: 'ringer',     past: 'ringede',    perfect: 'har ringet',    imp: 'ring',     group: 'ede' },
  { id: 72, inf: 'at åbne',     meaning: 'open',                      present: 'åbner',      past: 'åbnede',     perfect: 'har åbnet',     imp: 'åbn',      group: 'ede' },
  { id: 73, inf: 'at lukke',    meaning: 'close',                     present: 'lukker',     past: 'lukkede',    perfect: 'har lukket',    imp: 'luk',      group: 'ede' },
  { id: 74, inf: 'at huske',    meaning: 'remember',                  present: 'husker',     past: 'huskede',    perfect: 'har husket',    imp: 'husk',     group: 'ede' },
  { id: 75, inf: 'at glemme',   meaning: 'forget',                    present: 'glemmer',    past: 'glemte',     perfect: 'har glemt',     imp: 'glem',     group: 'te' },
  { id: 76, inf: 'at vente',    meaning: 'wait',                      present: 'venter',     past: 'ventede',    perfect: 'har ventet',    imp: 'vent',     group: 'ede' },
  { id: 77, inf: 'at forstå',   meaning: 'understand',                present: 'forstår',    past: 'forstod',    perfect: 'har forstået',  imp: 'forstå',   group: 'irregular' },
  { id: 78, inf: 'at prøve',    meaning: 'try / test',                present: 'prøver',     past: 'prøvede',    perfect: 'har prøvet',    imp: 'prøv',     group: 'ede' },
  { id: 79, inf: 'at regne',    meaning: 'calculate / expect',        present: 'regner',     past: 'regnede',    perfect: 'har regnet',    imp: 'regn',     group: 'ede' },
  { id: 80, inf: 'at elske',    meaning: 'love',                      present: 'elsker',     past: 'elskede',    perfect: 'har elsket',    imp: 'elsk',     group: 'ede' },
  { id: 81, inf: 'at føle',     meaning: 'feel',                      present: 'føler',      past: 'følte',      perfect: 'har følt',      imp: 'føl',      group: 'te' },
  { id: 82, inf: 'at fortsætte',meaning: 'continue',                  present: 'fortsætter', past: 'fortsatte',  perfect: 'har fortsat',   imp: 'fortsæt',  group: 'irregular' },
  { id: 83, inf: 'at ændre',    meaning: 'change',                    present: 'ændrer',     past: 'ændrede',    perfect: 'har ændret',    imp: 'ændr',     group: 'ede' },
  { id: 84, inf: 'at bestemme', meaning: 'decide / determine',        present: 'bestemmer',  past: 'bestemte',   perfect: 'har bestemt',   imp: 'bestem',   group: 'te' },
  { id: 85, inf: 'at kræve',    meaning: 'require / demand',          present: 'kræver',     past: 'krævede',    perfect: 'har krævet',    imp: 'kræv',     group: 'ede' },
  { id: 86, inf: 'at udvikle',  meaning: 'develop',                   present: 'udvikler',   past: 'udviklede',  perfect: 'har udviklet',  imp: 'udvikl',   group: 'ede' },
  { id: 87, inf: 'at betyde',   meaning: 'mean / signify',            present: 'betyder',    past: 'betød',      perfect: 'har betydet',   imp: 'betyd',    group: 'irregular' },
  { id: 88, inf: 'at behøve',   meaning: 'need',                      present: 'behøver',    past: 'behøvede',   perfect: 'har behøvet',   imp: '—',        group: 'ede' },
  { id: 89, inf: 'at hente',    meaning: 'fetch / pick up',           present: 'henter',     past: 'hentede',    perfect: 'har hentet',    imp: 'hent',     group: 'ede' },
  { id: 90, inf: 'at bringe',   meaning: 'bring',                     present: 'bringer',    past: 'bragte',     perfect: 'har bragt',     imp: 'bring',    group: 'irregular' },
  { id: 91, inf: 'at rejse',    meaning: 'travel / leave',            present: 'rejser',     past: 'rejste',     perfect: 'har/er rejst',  imp: 'rejs',     group: 'te' },
  { id: 92, inf: 'at flytte',   meaning: 'move',                      present: 'flytter',    past: 'flyttede',   perfect: 'har/er flyttet',imp: 'flyt',     group: 'ede' },
  { id: 93, inf: 'at starte',   meaning: 'start',                     present: 'starter',    past: 'startede',   perfect: 'har startet',   imp: 'start',    group: 'ede' },
  { id: 94, inf: 'at passe',    meaning: 'fit / take care of',        present: 'passer',     past: 'passede',    perfect: 'har passet',    imp: 'pas',      group: 'ede' },
  { id: 95, inf: 'at handle',   meaning: 'act / shop / concern',      present: 'handler',    past: 'handlede',   perfect: 'har handlet',   imp: 'handl',    group: 'ede' },
  { id: 96, inf: 'at besøge',   meaning: 'visit',                     present: 'besøger',    past: 'besøgte',    perfect: 'har besøgt',    imp: 'besøg',    group: 'te' },
  { id: 97, inf: 'at forklare', meaning: 'explain',                   present: 'forklarer',  past: 'forklarede', perfect: 'har forklaret', imp: 'forklar',  group: 'ede' },
  { id: 98, inf: 'at træffe',   meaning: 'meet / make a decision',    present: 'træffer',    past: 'traf',       perfect: 'har truffet',   imp: 'træf',     group: 'irregular' },
  { id: 99, inf: 'at opleve',   meaning: 'experience',                present: 'oplever',    past: 'oplevede',   perfect: 'har oplevet',   imp: 'oplev',    group: 'ede' },
  { id: 100,inf: 'at virke',    meaning: 'work / seem',               present: 'virker',     past: 'virkede',    perfect: 'har virket',    imp: 'virk',     group: 'ede' },
];

// Groups of visually similar verbs (for English→Danish exercise distractors)
// Each array groups verbs whose Danish infinitives look alike
const WRITING_CLUSTERS = [
  ['at lave', 'at leve', 'at lade', 'at løbe', 'at lære'],
  ['at lægge', 'at ligge', 'at lukke', 'at læse'],
  ['at se', 'at sige', 'at sidde', 'at synes', 'at ske'],
  ['at sætte', 'at stille', 'at stå', 'at starte', 'at slå'],
  ['at svare', 'at sove', 'at spise', 'at sende', 'at spørge'],
  ['at sælge', 'at skrive', 'at skabe', 'at ske'],
  ['at vise', 'at vide', 'at virke', 'at vente', 'at vende'],
  ['at vinde', 'at vælge', 'at ville', 'at virke'],
  ['at gå', 'at gøre', 'at give', 'at få', 'at glemme'],
  ['at komme', 'at kalde', 'at kende', 'at kræve', 'at køre', 'at købe'],
  ['at finde', 'at falde', 'at følge', 'at føre', 'at føle', 'at flytte'],
  ['at fortælle', 'at forklare', 'at forsøge', 'at forstå', 'at fortsætte'],
  ['at begynde', 'at betale', 'at betyde', 'at bestemme', 'at besøge', 'at behøve'],
  ['at blive', 'at burde', 'at bo', 'at bruge', 'at bringe'],
  ['at handle', 'at holde', 'at høre', 'at hente', 'at huske', 'at hjælpe', 'at hedde'],
  ['at tage', 'at tale', 'at tænke', 'at træffe', 'at tro'],
  ['at mene', 'at møde', 'at måtte'],
  ['at ringe', 'at rejse', 'at regne'],
  ['at arbejde', 'at åbne', 'at ønske', 'at ændre', 'at opleve'],
  ['at elske', 'at ønske', 'at ændre', 'at åbne'],
  ['at prøve', 'at passe', 'at ringe', 'at rejse'],
  ['at udvikle', 'at ændre', 'at åbne', 'at arbejde'],
  ['at drikke', 'at sidde', 'at skrive', 'at sige'],
  ['at have', 'at handle', 'at hente', 'at huske', 'at holde'],
  ['at tro', 'at tage', 'at tale', 'at tænke'],
  ['at følge', 'at føle', 'at føre', 'at finde', 'at falde'],
  ['at spørge', 'at spise', 'at sende', 'at svare'],
];

// Groups of semantically similar verbs (for Danish→English exercise distractors)
// Each array groups verbs whose English meanings are close
const MEANING_CLUSTERS = [
  // Think / believe / mean / seem
  ['at mene', 'at tro', 'at synes', 'at tænke'],
  // Want / wish / need / should / must / ought
  ['at ville', 'at ønske', 'at behøve', 'at burde', 'at skulle', 'at måtte'],
  // Say / tell / explain / answer / speak / ask
  ['at sige', 'at fortælle', 'at forklare', 'at svare', 'at tale', 'at spørge'],
  // Go / travel / move / drive / run / come / follow
  ['at gå', 'at rejse', 'at køre', 'at løbe', 'at flytte', 'at komme', 'at følge'],
  // Get / receive / bring / fetch / send
  ['at få', 'at hente', 'at bringe', 'at sende'],
  // See / show / find
  ['at se', 'at vise', 'at finde'],
  // Make / do / create / develop / work
  ['at gøre', 'at lave', 'at skabe', 'at arbejde', 'at udvikle'],
  // Know / understand / recognize
  ['at vide', 'at kende', 'at forstå'],
  // Put / place / lay / stand / sit / lie
  ['at stille', 'at lægge', 'at sætte', 'at ligge', 'at sidde', 'at stå'],
  // Live / reside / be / remain / become
  ['at leve', 'at bo', 'at være', 'at blive'],
  // Try / attempt / test
  ['at prøve', 'at forsøge'],
  // Begin / continue / start / happen
  ['at begynde', 'at fortsætte', 'at starte', 'at ske'],
  // Meet / visit / encounter
  ['at møde', 'at besøge', 'at træffe'],
  // Learn / teach / read / hear / understand
  ['at lære', 'at læse', 'at høre', 'at forstå'],
  // Pay / buy / sell / choose
  ['at betale', 'at købe', 'at sælge', 'at vælge'],
  // Love / feel / experience / wish
  ['at elske', 'at føle', 'at opleve', 'at ønske'],
  // Remember / forget / wait
  ['at huske', 'at glemme', 'at vente'],
  // Open / close
  ['at åbne', 'at lukke'],
  // Win / beat / hit / fall
  ['at vinde', 'at slå', 'at falde'],
  // Help / lead / follow / carry
  ['at hjælpe', 'at følge', 'at føre', 'at bringe'],
  // Change / develop / determine / require
  ['at ændre', 'at udvikle', 'at bestemme', 'at kræve'],
  // Work / seem / mean / signify
  ['at virke', 'at betyde', 'at synes', 'at mene'],
  // Eat / drink / sleep
  ['at spise', 'at drikke', 'at sove'],
  // Call / ring / name / be called
  ['at ringe', 'at kalde', 'at hedde'],
  // Use / take / bring / need
  ['at bruge', 'at tage', 'at bringe', 'at behøve'],
  // Fit / take care / act / handle
  ['at passe', 'at handle', 'at bestemme'],
  // Write / read / tell / explain
  ['at skrive', 'at læse', 'at fortælle', 'at forklare'],
  // Take / get / choose / give
  ['at tage', 'at få', 'at vælge', 'at give'],
  // Hold / keep / stand / sit
  ['at holde', 'at stå', 'at sidde', 'at ligge'],
  // Fall / run / go / walk
  ['at falde', 'at løbe', 'at gå'],
  // Give / let / allow
  ['at give', 'at lade', 'at tillade'],
  // Calculate / expect / count
  ['at regne', 'at betale', 'at kræve'],
  // Speak / call / ask / answer
  ['at tale', 'at kalde', 'at spørge', 'at svare'],
  // Turn / return / come / go
  ['at vende', 'at komme', 'at rejse'],
  // Create / make / develop / build
  ['at skabe', 'at lave', 'at udvikle'],
  // Ask / demand / require / need
  ['at spørge', 'at kræve', 'at bestemme', 'at behøve'],
  // Drive / travel / buy / run
  ['at køre', 'at rejse', 'at løbe'],
  // Use / need / have / get
  ['at bruge', 'at behøve', 'at have', 'at få'],
  // Send / bring / receive / get
  ['at sende', 'at bringe', 'at hente', 'at få'],
  // Hit / beat / win / fall
  ['at slå', 'at vinde', 'at falde'],
];
