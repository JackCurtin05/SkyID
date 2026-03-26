import { useState, useMemo } from 'react'

const ALL_AIRCRAFT = [
  '707-320','727-200','737-200','737-300','737-400','737-500','737-600','737-700',
  '737-800','737-900','747-100','747-200','747-300','747-400','757-200','757-300',
  '767-200','767-300','767-400','777-200','777-300','A10','A300B4','A310','A318',
  'A319','A320','A321','A330-200','A330-300','A340-200','A340-300','A340-500',
  'A340-600','A380','A400M','AG600','AH64','AKINCI','ATR-42','ATR-72','AV8B',
  'An-12','An124','An22','An225','An72','B1','B2','B21','B52','BAE 146-200',
  'BAE 146-300','BAE-125','Be200','Beechcraft 1900','Boeing 717','C-130','C-47',
  'C1','C130','C17','C2','C390','C5','CH47','CH53','CL415','CRJ-200','CRJ-700',
  'CRJ-900','Cessna 172','Cessna 208','Cessna 525','Cessna 560','Challenger 600',
  'DC-10','DC-3','DC-6','DC-8','DC-9-30','DH-82','DHC-1','DHC-6','DHC-8-100',
  'DHC-8-300','DR-400','Dornier 328','E-170','E-190','E-195','E2','E7','EF2000',
  'EMB-120','EMB314','ERJ 135','ERJ 145','Embraer Legacy 600','Eurofighter Typhoon',
  'F','F-16A','F117','F14','F15','F16','F18','F2','F22','F35','F4','FCK1',
  'Falcon 2000','Falcon 900','Fokker 100','Fokker 50','Fokker 70','Global Express',
  'Gulfstream IV','Gulfstream V','H6','Hawk T1','Il-76','Il76','J10','J20','J35',
  'J36','J50','JAS39','JF17','JH7','KAAN','KC135','KF21','KIZILELMA','KJ600',
  'Ka27','Ka52','L-1011','MD-11','MD-80','MD-87','MD-90','MQ20','MQ25','MQ28',
  'MQ9','Metroliner','Mi24','Mi26','Mi28','Mi8','Mig29','Mig31','Mirage2000',
  'Model B200','NH90','P3','PA-28','RQ4','Rafale','SR-20','SR71','Saab 2000',
  'Saab 340','Spitfire','Su24','Su25','Su34','Su47','Su57','T50','TB001','TB2',
  'Tejas','Tornado','Tu-134','Tu-154','Tu160','Tu22M','Tu95','U2','UH60','US2',
  'V22','V280','Vulcan','WZ10','WZ7','WZ9','X29','X32','XB70','XQ58','Y20',
  'YF23','Yak-42','Z10','Z19',
]

const TOTAL = ALL_AIRCRAFT.length

const CATEGORIES = {
  'Commercial': (n) => /^\d{3}-\d|^A3\d\d|^A380|^A310|^A318|^A319|^A320|^A321|^A300|boeing 717|dc-|md-|l-1011|crj|erj|^e-1[79]|emb-120|embraer legacy|atr|fokker|saab [32]|cessna|beechcraft|metroliner|pa-28|dr-400|dornier|bae 1|challenger|global express|gulfstream|falcon [29]|sr-20|dhc|^be200|^cl415|^us2|ag600/i.test(n),
  'Military Fighter': (n) => /^f1[4-9]$|^f22$|^f35$|^f4$|^f16$|^f-16|^f15$|^f2$|^f117$|^fck1$|eurofighter|ef2000|rafale|mirage|tornado|jas39|hawk t1|mig|su2[457]|su3[47]|su47|su57|tejas|kaan|kf21|j10|j20|j35|j36|j50|jf17|jh7|^f$|^av8b$/i.test(n),
  'Bomber': (n) => /^b1$|^b2$|^b21$|^b52$|^h6$|tu160|tu22|tu95|vulcan|xb70/i.test(n),
  'Transport': (n) => /^c-130$|^c130$|^c-47$|^c1$|^c17$|^c2$|^c5$|^c390$|^a400m$|^a10$|^kc135$|^p3$|^e2$|^e7$|an-12|an124|an22|an225|an72|il-76|il76|^y20$/i.test(n),
  'Helicopter': (n) => /^ah64$|^ch47$|^ch53$|^uh60$|^nh90$|^mi[0-9]|^ka[0-9]|^wz10$|^z1[09]$/i.test(n),
  'Drone': (n) => /^mq|^rq4$|^tb[012]|akinci|kizilelma|xq58|^wz[79]$|kj600/i.test(n),
  'Experimental': (n) => /^x29$|^x32$|^xb70$|^yf23$|^v22$|^v280$|^sr71$|^u2$|^su47$|spitfire|^dh-82$/i.test(n),
}

function getCategory(name) {
  for (const [cat, test] of Object.entries(CATEGORIES)) {
    if (test(name)) return cat
  }
  return 'Other'
}

export default function CollectionPanel({ discovered, newlyFound, onClose }) {
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...Object.keys(CATEGORIES), 'Other']

  const filtered = useMemo(() => {
    return ALL_AIRCRAFT.filter(a =>
      filter === 'All' || getCategory(a) === filter
    )
  }, [filter])

  const discoveredInFilter = filtered.filter(a => discovered.has(a)).length

  return (
    <div className="collection-overlay" onClick={onClose}>
      <div className="collection-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="collection-header">
          <div>
            <h2 className="collection-title">Collection</h2>
            <p className="collection-sub">{discovered.size} / {TOTAL} aircraft discovered</p>
          </div>
          <button className="collection-close" onClick={onClose}>✕</button>
        </div>

        {/* Progress bar */}
        <div className="collection-progress-wrap">
          <div
            className="collection-progress-bar"
            style={{ width: `${(discovered.size / TOTAL) * 100}%` }}
          />
        </div>

        {/* Category filter */}
        <div className="collection-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`collection-filter-btn${filter === cat ? ' active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
              <span className="filter-count">
                {cat === 'All'
                  ? discovered.size
                  : ALL_AIRCRAFT.filter(a => getCategory(a) === cat && discovered.has(a)).length}
                /{cat === 'All' ? TOTAL : ALL_AIRCRAFT.filter(a => getCategory(a) === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="collection-grid">
          {filtered.map(aircraft => {
            const found     = discovered.has(aircraft)
            const isNew     = newlyFound === aircraft
            return (
              <div
                key={aircraft}
                className={`collection-card ${found ? 'found' : 'undiscovered'} ${isNew ? 'new-find' : ''}`}
                title={found ? aircraft : '???'}
              >
                <span className="collection-card-name">
                  {found ? aircraft : '???'}
                </span>
                {found && <span className="collection-card-check">✓</span>}
                {isNew && <span className="collection-card-new">NEW</span>}
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
