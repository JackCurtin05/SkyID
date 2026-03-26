import { useState, useEffect } from 'react'

// Maps dataset class names to better Wikipedia search terms
function toSearchQuery(name) {
  if (!name) return ''
  const n = name.toLowerCase().trim()

  const overrides = {
    // Boeing commercial
    '707-320': 'Boeing 707', '727-200': 'Boeing 727', '737-200': 'Boeing 737 Classic',
    '737-300': 'Boeing 737 Classic', '737-400': 'Boeing 737 Classic', '737-500': 'Boeing 737 Classic',
    '737-600': 'Boeing 737 Next Generation', '737-700': 'Boeing 737 Next Generation',
    '737-800': 'Boeing 737 Next Generation', '737-900': 'Boeing 737 Next Generation',
    '747-100': 'Boeing 747', '747-200': 'Boeing 747', '747-300': 'Boeing 747',
    '747-400': 'Boeing 747-400', '757-200': 'Boeing 757', '757-300': 'Boeing 757',
    '767-200': 'Boeing 767', '767-300': 'Boeing 767', '767-400': 'Boeing 767',
    '777-200': 'Boeing 777', '777-300': 'Boeing 777',
    // Airbus
    'a300b4': 'Airbus A300', 'a310': 'Airbus A310', 'a320': 'Airbus A320',
    'a330-200': 'Airbus A330', 'a330-300': 'Airbus A330',
    'a340-200': 'Airbus A340', 'a340-300': 'Airbus A340',
    'a340-500': 'Airbus A340', 'a340-600': 'Airbus A340',
    'a380': 'Airbus A380',
    // Military fighters
    'f14':   'Grumman F-14 Tomcat',       'f15':  'McDonnell Douglas F-15 Eagle',
    'f16':   'General Dynamics F-16 Fighting Falcon', 'f18':  'McDonnell Douglas F/A-18 Hornet',
    'f22':   'Lockheed Martin F-22 Raptor','f35':  'Lockheed Martin F-35 Lightning II',
    'f4':    'McDonnell Douglas F-4 Phantom II',      'f86':  'North American F-86 Sabre',
    'f104':  'Lockheed F-104 Starfighter', 'f111': 'General Dynamics F-111 Aardvark',
    'mig21': 'Mikoyan MiG-21',  'mig29': 'Mikoyan MiG-29',  'mig31': 'Mikoyan MiG-31',
    'su27':  'Sukhoi Su-27',    'su30':  'Sukhoi Su-30',    'su35':  'Sukhoi Su-35',
    'su57':  'Sukhoi Su-57',    'su24':  'Sukhoi Su-24',    'su25':  'Sukhoi Su-25',
    'su34':  'Sukhoi Su-34',    'j10':   'Chengdu J-10',    'j11':   'Shenyang J-11',
    'j16':   'Shenyang J-16',   'j20':   'Chengdu J-20',    'j35':   'Shenyang FC-31',
    'eurofighter': 'Eurofighter Typhoon',  'typhoon': 'Eurofighter Typhoon',
    'rafale': 'Dassault Rafale',           'gripen':  'Saab JAS 39 Gripen',
    'tornado': 'Panavia Tornado',          'mirage2000': 'Dassault Mirage 2000',
    'av8b':  'McDonnell Douglas AV-8B Harrier II',
    // Bombers
    'b1':    'Rockwell B-1 Lancer',   'b2':    'Northrop Grumman B-2 Spirit',
    'b21':   'Northrop Grumman B-21 Raider', 'b52': 'Boeing B-52 Stratofortress',
    'tu160': 'Tupolev Tu-160',        'tu22':  'Tupolev Tu-22M',
    'tu95':  'Tupolev Tu-95',         'h6':    'Xian H-6',
    // Transports & tankers
    'c130':  'Lockheed C-130 Hercules', 'c-130': 'Lockheed C-130 Hercules',
    'c17':   'Boeing C-17 Globemaster III', 'c5':   'Lockheed C-5 Galaxy',
    'a400m': 'Airbus A400M Atlas',     'il76':  'Ilyushin Il-76',
    'y20':   'Xian Y-20',              'kc135': 'Boeing KC-135 Stratotanker',
    'c390':  'Embraer C-390',          'an124': 'Antonov An-124',
    'an225': 'Antonov An-225',
    // Helicopters
    'ah64':  'Boeing AH-64 Apache',    'ch47':  'Boeing CH-47 Chinook',
    'uh60':  'Sikorsky UH-60 Black Hawk', 'nh90': 'NHIndustries NH90',
    'wz10':  'CAIC WZ-10',
    // Drones
    'rq4':   'Northrop Grumman RQ-4 Global Hawk', 'mq9':  'General Atomics MQ-9 Reaper',
    'mq1':   'General Atomics MQ-1 Predator',     'tb2':  'Bayraktar TB2',
    'xq58':  'Kratos XQ-58 Valkyrie',
    // Tiltrotor
    'v22':   'Bell Boeing V-22 Osprey', 'v280': 'Bell V-280 Valor',
  }

  if (overrides[n]) return overrides[n]

  // Fallback: use the name as-is plus "aircraft"
  return name + ' aircraft'
}

async function fetchWikiSummary(aircraftName) {
  const query = toSearchQuery(aircraftName)

  // 1. Try direct summary lookup
  const titleSlug = query.replace(/ /g, '_')
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titleSlug)}`,
      { headers: { Accept: 'application/json' } }
    )
    if (res.ok) {
      const data = await res.json()
      if (data.extract && data.extract.length > 80)
        return { title: data.title, extract: data.extract }
    }
  } catch (_) {}

  // 2. Fall back to search API
  try {
    const searchRes = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=1`
    )
    const searchData = await searchRes.json()
    const hit = searchData?.query?.search?.[0]
    if (!hit) return null

    const summaryRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(hit.title.replace(/ /g, '_'))}`,
      { headers: { Accept: 'application/json' } }
    )
    if (summaryRes.ok) {
      const data = await summaryRes.json()
      if (data.extract) return { title: data.title, extract: data.extract }
    }
  } catch (_) {}

  return null
}

// Try to pull a service/introduction year out of Wikipedia's plain-text extract
function extractServiceYear(extract) {
  if (!extract) return null
  const patterns = [
    /entered(?:\w| )*?service.*?(\d{4})/i,
    /in service since (\d{4})/i,
    /has been in service.*?(\d{4})/i,
    /service entry.*?(\d{4})/i,
    /introduced.*?(\d{4})/i,
    /operational since (\d{4})/i,
    /commissioned.*?(\d{4})/i,
    /first (?:flew|flight).*?(\d{4})/i,
    /(\d{4}).*?to the present/i,
  ]
  for (const re of patterns) {
    const m = extract.match(re)
    // Sanity check — year must be plausible for an aircraft
    if (m && +m[1] >= 1900 && +m[1] <= new Date().getFullYear()) return m[1]
  }
  return null
}

export default function AircraftViewer({ aircraftName }) {
  const [info, setInfo]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(false)

  useEffect(() => {
    if (!aircraftName) return
    setInfo(null)
    setError(false)
    setLoading(true)

    fetchWikiSummary(aircraftName)
      .then(result => {
        if (result) setInfo(result)
        else setError(true)
      })
      .finally(() => setLoading(false))
  }, [aircraftName])

  if (!aircraftName) return null

  const serviceYear = info ? extractServiceYear(info.extract) : null

  return (
    <div className="wiki-panel">
      {loading && <div className="wiki-loading">Loading aircraft info…</div>}

      {info && (
        <>
          <div className="wiki-header">
            <div className="wiki-title">{info.title}</div>
            {serviceYear && (
              <div className="wiki-service">
                <span className="wiki-service-label">In service since</span>
                <span className="wiki-service-year">{serviceYear}</span>
              </div>
            )}
          </div>
          <p className="wiki-extract">{info.extract}</p>
          <a
            className="wiki-link"
            href={`https://en.wikipedia.org/wiki/${encodeURIComponent(info.title.replace(/ /g, '_'))}`}
            target="_blank"
            rel="noreferrer"
          >
            Read more on Wikipedia ↗
          </a>
        </>
      )}

      {error && (
        <div className="wiki-error">No Wikipedia article found for "{aircraftName}".</div>
      )}
    </div>
  )
}
