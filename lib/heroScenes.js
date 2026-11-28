// Home page hero: the rotating line drawings and the words that go with them.
//
// Each drawing is a list of depth layers: z = how much the layer zooms on
// scroll, d = when its lines start drawing (seconds). Each shape is
// [path, fill, line color, line width]; everything after the path is optional.
// Original line art, standing in for project photography we don't have yet.
// Brand rule: no rust or orange.

// Each layer has its own depth: z = zoom factor, d = draw delay
const SHELL={ z:.10,d:.2, s:[ // shell
  ['M70 90H330V290H70Z','#34312a'],['M70 290L0 390H400L330 290Z','#5a4630'],['M70 90L0 30M330 90L400 30M70 290L0 390M330 290L400 390'],
  ['M120 300L80 390M170 300L150 390M230 300L250 390M280 300L320 390M55 312H345M30 348H370']]};
const KITCHEN=[
 { z:.10,d:.2, s:[ // shell
  ['M70 90H330V290H70Z','#34312a'],['M70 290L0 390H400L330 290Z','#5a4630'],['M70 90L0 30M330 90L400 30M70 290L0 390M330 290L400 390'],
  ['M120 300L80 390M170 300L150 390M230 300L250 390M280 300L320 390M55 312H345M30 348H370']]},
 { z:.20,d:.55,s:[ // back wall: cabinets, window, range
  ['M82 112H150V178H82Z','#2F4858'],['M116 112V178M108 150v14M124 150v14'],['M250 112H318V178H250Z','#2F4858'],['M284 112V178M276 150v14M292 150v14'],
  ['M166 118H234V188H166Z','#a9c0c4'],['M200 118V188M166 153H234'],['M82 222H318V290H82Z','#2F4858'],['M76 214H324V222H76Z','#EDE7DA'],
  ['M174 230H226V284H174Z','#77736a'],['M182 242H218V270H182ZM130 222V290M270 222V290M100 236h14M286 236h14']]},
 { z:.42,d:.9,s:[ // island
  ['M104 288H296V362H104Z','#6e5530'],['M92 276H308V290H92Z','#EDE7DA'],['M152 288V362M200 288V362M248 288V362M104 352H296']]},
 { z:.75,d:1.15,s:[ // pendants and stools
  ['M140 78V150M260 78V150'],['M122 172Q124 150 140 150T158 172Z','#9B773D'],['M242 172Q244 150 260 150T278 172Z','#9B773D'],
  ['M118 332H168V342H118Z','#9B773D'],['M124 342L116 398M162 342L170 398M120 374H166'],['M232 332H282V342H232Z','#9B773D'],['M238 342L230 398M276 342L284 398M234 374H280']]}
];
const BATH=[SHELL,
 { z:.20,d:.55,s:[ // curbless shower, grab bars, bench, mirror
  ['M82 102H200V290H82Z','#2F4858'],['M82 140H200M82 178H200M82 216H200M82 254H200M121 102V290M161 102V290'],
  ['M96 122H130V128H96ZM113 128V136','#EDE7DA'],['M100 142v10M108 142v14M116 142v14M126 142v10'],['M150 150H184V176H150Z','#77736a'],
  ['M92 214H146V220H92ZM188 190H194V250H188Z','#EDE7DA'],['M140 258H196V268H140Z','#9B773D'],['M148 268V290M188 268V290'],
  ['M130 80H150V85H130ZM250 80H270V85H250Z','#EDE7DA'],['M228 118H306V198H228Z','#a9c0c4'],['M242 184L276 132M262 188L290 146']]},
 { z:.42,d:.9,s:[ // open-underneath vanity
  ['M240 232Q267 258 294 232Z','#a9c0c4'],['M212 222H324V234H212Z','#EDE7DA'],['M267 222V204H255V211'],
  ['M218 234H236V322H218ZM300 234H318V322H300Z','#6e5530'],['M222 252h10M222 276h10M304 252h10M304 276h10M236 300H300']]},
 { z:.75,d:1.15,s:[ // shower stool, bath mat
  ['M210 350H318L334 386H194Z','#77736a'],['M210 360H320M205 374H326'],
  ['M92 334H156V346H92Z','#9B773D'],['M100 346L94 392M148 346L154 392M98 370H150']]}
];
const BASEMENT=[SHELL,
 { z:.20,d:.55,s:[ // egress window, media wall, shelves
  ['M96 104H160V134H96Z','#a9c0c4'],['M128 104V134'],['M188 80H212V85H188Z','#EDE7DA'],['M150 148H250V208H150Z','#2F4858'],['M164 196L196 160M184 198L206 174'],
  ['M130 232H270V260H130Z','#6e5530'],['M176 232V260M224 232V260M142 260v10M258 260v10'],
  ['M264 112H318V290H264Z','#2F4858'],['M264 148H318M264 184H318M264 220H318M264 256H318M274 148v-22h8v22M286 148v-28h8v28M298 220v-18h12v18'],
  ['M88 190H122V290H88Z','#77736a'],['M96 204H114V240H96ZM114 252v14']]},
 { z:.42,d:.9,s:[ // rug and sofa
  ['M92 336H308L336 380H64Z','#77736a'],
  ['M112 292Q112 280 124 280H276Q288 280 288 292V352H112Z','#2F4858'],['M96 308H120V358H96ZM280 308H304V358H280Z','#2F4858'],
  ['M170 282V340M230 282V340M120 340H280M122 358v10M278 358v10']]},
 { z:.75,d:1.15,s:[ // floor lamp and side table
  ['M93 392V268M76 392H110'],['M74 272L84 242H102L112 272Z','#9B773D'],
  ['M282 350H328V358H282Z','#9B773D'],['M290 358V394M320 358V394'],['M298 350V334H312V350Z','#EDE7DA']]}
];
// Accessibility: curbless shower scene plus turning space and wheelchair
const ACCESS=[SHELL,BATH[1],BATH[2],
 { z:.75,d:1.15,s:[ // turning circle and a bold wheelchair
  ['M70 366a96 26 0 1 0 192 0a96 26 0 1 0 -192 0'],
  ['M102 334a38 38 0 1 0 76 0a38 38 0 1 0 -76 0',null,'#EDE7DA',4],['M134 334a6 6 0 1 0 12 0a6 6 0 1 0 -12 0',null,'#EDE7DA',3],
  ['M108 262L122 270L132 322H188L204 362H220',null,'#EDE7DA',5],['M134 300H174',null,'#EDE7DA',4],
  ['M184 364a9 9 0 1 0 18 0a9 9 0 1 0 -18 0',null,'#EDE7DA',3]]}
];
const TUBBATH=[SHELL,
 { z:.20,d:.55,s:[ // window, wainscot, mirrors, towel bar
  ['M82 220H318V290H82Z','#2F4858'],['M121 220V290M161 220V290M200 220V290M239 220V290M279 220V290'],
  ['M158 110H242V186H158Z','#a9c0c4'],['M200 110V186M158 148H242'],['M96 126H136V190H96ZM264 126H304V190H264Z','#a9c0c4'],['M94 206H140M260 206H306']]},
 { z:.42,d:.9,s:[ // freestanding tub
  ['M112 284H288Q284 348 250 348H150Q116 348 112 284Z','#EDE7DA'],['M104 276H296V286H104Z','#EDE7DA'],['M156 348L148 362M244 348L252 362'],['M300 362V250H278V262']]},
 { z:.75,d:1.15,s:[ // stool and mat
  ['M140 370H260L272 394H128Z','#77736a'],['M74 336H112V346H74Z','#9B773D'],['M80 346L76 390M106 346L110 390'],['M80 336V324H106V336Z','#EDE7DA']]}
];
const YARD={z:.10,d:.2,s:[['M0 290H400V390H0Z','#2c3328'],['M0 290H400']]};
const EXTERIOR=[YARD,
 { z:.20,d:.55,s:[ // house and garage
  ['M258 96H282V150H258Z','#77736a'],['M96 178H304V290H96Z','#2F4858'],['M80 184L200 92L320 184Z','#5a4630'],
  ['M180 142a20 20 0 1 0 40 0a20 20 0 1 0 -40 0','#a9c0c4'],['M116 206H160V252H116ZM240 206H284V252H240Z','#a9c0c4'],['M138 206V252M116 229H160M262 206V252M240 229H284'],
  ['M180 218H220V290H180Z','#9B773D'],['M212 255h2'],['M168 202H232L224 190H176Z','#EDE7DA']]},
 { z:.42,d:.9,s:[ // walk and shrubs
  ['M182 290H218L258 390H142Z','#77736a'],['M174 312H226M162 340H238M150 368H250'],
  ['M96 300Q96 276 116 280Q128 264 142 280Q164 276 162 300Z','#4d5c3c'],['M238 300Q236 276 258 280Q272 264 284 280Q304 276 304 300Z','#4d5c3c']]},
 { z:.75,d:1.15,s:[ // trees
  ['M78 368V290M322 368V290'],['M48 272a30 36 0 1 0 60 0a30 36 0 1 0 -60 0','#4d5c3c'],['M292 272a30 36 0 1 0 60 0a30 36 0 1 0 -60 0','#4d5c3c']]}
];
const windows=[];[102,138,174].forEach(y=>[96,138,238,280].forEach(x=>windows.push([`M${x} ${y}H${x+24}V${y+24}H${x}Z`,'#a9c0c4'])));
const APARTMENT=[YARD,
 { z:.20,d:.55,s:[ // three-story building
  ['M80 90H320V290H80Z','#5a4630'],['M72 80H328V90H72Z','#EDE7DA'],['M172 90H228V290H172Z','#2F4858'],
  ...windows,['M184 108H216V132H184ZM184 144H216V168H184ZM184 180H216V204H184Z','#a9c0c4'],
  ['M92 166H166M92 202H166M234 166H308M234 202H308'],
  ['M96 232H120V290H96ZM138 232H162V290H138ZM238 232H262V290H238ZM280 232H304V290H280Z','#77736a'],['M180 238H220V290H180Z','#a9c0c4'],['M200 238V290']]},
 { z:.42,d:.9,s:[ // canopy and walk
  ['M162 232H238L246 244H154Z','#9B773D'],['M160 244V296M240 244V296'],['M178 290H222L270 390H130Z','#77736a'],['M164 320H236M148 355H252'],
  ['M92 304Q94 286 112 290Q126 278 138 292Q154 290 152 304ZM248 304Q250 286 268 290Q282 278 294 292Q310 290 308 304Z','#4d5c3c']]},
 { z:.75,d:1.15,s:[ // street lamps
  ['M74 390V262M326 390V262'],['M64 262L68 244H80L84 262ZM316 262L320 244H332L336 262Z','#9B773D']]}
];

const REMODELING = {
  headline: ['Remodeling', 'Contractor'],
  sub: 'From kitchens and bathrooms to the whole house, we make your home work better for the way you live.',
  estimate: '/consultation?vertical=residential',
  services: '#homeowners',
};
const COMMERCIAL = {
  headline: ['Commercial', 'Contractor'],
  sub: 'From small repairs to major capital improvements, we handle what your property needs across the KC metro.',
  estimate: '/consultation?service=commercial',
  services: '#property-managers',
};
const ACCESSIBILITY = {
  headline: ['Accessibility', 'Contractor'],
  sub: 'From grab bars and home access upgrades to kitchen and bath remodels, we help you live safely at home.',
  estimate: '/consultation?vertical=residential',
  services: '#accessibility',
};

// Rotation order. The first entry is what first-time visitors (and search
// engines) see. A link can pick one with ?room=<key>.
export const HERO_SCENES = [
  { key: 'kitchen', layers: KITCHEN, ...REMODELING },
  { key: 'exterior', layers: EXTERIOR, ...REMODELING },
  { key: 'bathroom', layers: TUBBATH, ...REMODELING },
  { key: 'apartment', layers: APARTMENT, ...COMMERCIAL },
  { key: 'basement', layers: BASEMENT, ...REMODELING },
  { key: 'accessibility', layers: ACCESS, ...ACCESSIBILITY },
];
