// Aircraft specs database — keyed by the exact class names from combined_classes.txt
const SPECS = {
  // ── Boeing Commercial ──────────────────────────────────────────────────────
  '707-320':        { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '146 ft',  speed: '605 mph',   range: '5,754 mi',   crew: 3, service: '1958–present' },
  '727-200':        { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '108 ft',  speed: '599 mph',   range: '2,498 mi',   crew: 3, service: '1963–present' },
  '737-200':        { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '93 ft',  speed: '586 mph',   range: '1,771 mi',   crew: 2, service: '1968–present' },
  '737-300':        { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '95 ft',  speed: '497 mph',   range: '2,600 mi',   crew: 2, service: '1984–present' },
  '737-400':        { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '95 ft',  speed: '497 mph',   range: '2,394 mi',   crew: 2, service: '1988–present' },
  '737-500':        { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '95 ft',  speed: '497 mph',   range: '3,107 mi',   crew: 2, service: '1990–present' },
  '737-600':        { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '113 ft',  speed: '518 mph',   range: '3,510 mi',   crew: 2, service: '1998–present' },
  '737-700':        { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '113 ft',  speed: '523 mph',   range: '3,958 mi',   crew: 2, service: '1997–present' },
  '737-800':        { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '117 ft',  speed: '523 mph',   range: '3,582 mi',   crew: 2, service: '1998–present' },
  '737-900':        { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '117 ft',  speed: '523 mph',   range: '3,393 mi',   crew: 2, service: '2001–present' },
  '747-100':        { flag:'🇺🇸', role: 'Wide-body Airliner',         wingspan: '196 ft',  speed: '614 mph',   range: '6,089 mi',   crew: 3, service: '1970–2005' },
  '747-200':        { flag:'🇺🇸', role: 'Wide-body Airliner',         wingspan: '211 ft',  speed: '614 mph',   range: '7,891 mi',  crew: 3, service: '1971–present' },
  '747-300':        { flag:'🇺🇸', role: 'Wide-body Airliner',         wingspan: '211 ft',  speed: '614 mph',   range: '7,705 mi',  crew: 2, service: '1983–2008' },
  '747-400':        { flag:'🇺🇸', role: 'Wide-body Airliner',         wingspan: '211 ft',  speed: '614 mph',   range: '8,357 mi',  crew: 2, service: '1989–present' },
  '757-200':        { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '125 ft',  speed: '528 mph',   range: '4,505 mi',   crew: 2, service: '1983–present' },
  '757-300':        { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '125 ft',  speed: '528 mph',   range: '3,990 mi',   crew: 2, service: '1999–present' },
  '767-200':        { flag:'🇺🇸', role: 'Wide-body Airliner',         wingspan: '156 ft',  speed: '529 mph',   range: '4,430 mi',   crew: 2, service: '1982–present' },
  '767-300':        { flag:'🇺🇸', role: 'Wide-body Airliner',         wingspan: '156 ft',  speed: '529 mph',   range: '6,891 mi',  crew: 2, service: '1986–present' },
  '767-400':        { flag:'🇺🇸', role: 'Wide-body Airliner',         wingspan: '170 ft',  speed: '529 mph',   range: '6,472 mi',  crew: 2, service: '2000–present' },
  '777-200':        { flag:'🇺🇸', role: 'Wide-body Airliner',         wingspan: '200 ft',  speed: '562 mph',   range: '6,024 mi',   crew: 2, service: '1995–present' },
  '777-300':        { flag:'🇺🇸', role: 'Wide-body Airliner',         wingspan: '213 ft',  speed: '562 mph',   range: '6,910 mi',  crew: 2, service: '1998–present' },
  'Boeing 717':     { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '93 ft',  speed: '504 mph',   range: '2,371 mi',   crew: 2, service: '1999–present' },

  // ── Airbus Commercial ─────────────────────────────────────────────────────
  'A300B4':         { flag:'🇪🇺', role: 'Wide-body Airliner',         wingspan: '147 ft',  speed: '518 mph',   range: '4,785 mi',   crew: 2, service: '1974–present' },
  'A310':           { flag:'🇪🇺', role: 'Wide-body Airliner',         wingspan: '144 ft',  speed: '528 mph',   range: '5,965 mi',   crew: 2, service: '1983–present' },
  'A318':           { flag:'🇪🇺', role: 'Narrow-body Airliner',       wingspan: '112 ft',  speed: '515 mph',   range: '3,697 mi',   crew: 2, service: '2003–present' },
  'A319':           { flag:'🇪🇺', role: 'Narrow-body Airliner',       wingspan: '112 ft',  speed: '514 mph',   range: '4,256 mi',   crew: 2, service: '1996–present' },
  'A320':           { flag:'🇪🇺', role: 'Narrow-body Airliner',       wingspan: '117 ft',  speed: '518 mph',   range: '3,821 mi',   crew: 2, service: '1988–present' },
  'A321':           { flag:'🇪🇺', role: 'Narrow-body Airliner',       wingspan: '117 ft',  speed: '518 mph',   range: '3,685 mi',   crew: 2, service: '1994–present' },
  'A330-200':       { flag:'🇪🇺', role: 'Wide-body Airliner',         wingspan: '198 ft',  speed: '541 mph',   range: '8,345 mi',  crew: 2, service: '1998–present' },
  'A330-300':       { flag:'🇪🇺', role: 'Wide-body Airliner',         wingspan: '198 ft',  speed: '541 mph',   range: '7,301 mi',  crew: 2, service: '1994–present' },
  'A340-200':       { flag:'🇪🇺', role: 'Wide-body Airliner',         wingspan: '198 ft',  speed: '547 mph',   range: '9,321 mi',  crew: 2, service: '1993–2012' },
  'A340-300':       { flag:'🇪🇺', role: 'Wide-body Airliner',         wingspan: '198 ft',  speed: '547 mph',   range: '8,389 mi',  crew: 2, service: '1993–present' },
  'A340-500':       { flag:'🇪🇺', role: 'Wide-body Airliner',         wingspan: '208 ft',  speed: '547 mph',   range: '10,358 mi',  crew: 2, service: '2003–present' },
  'A340-600':       { flag:'🇪🇺', role: 'Wide-body Airliner',         wingspan: '208 ft',  speed: '562 mph',   range: '9,072 mi',  crew: 2, service: '2002–present' },
  'A380':           { flag:'🇪🇺', role: 'Wide-body Airliner',         wingspan: '262 ft',  speed: '561 mph',   range: '9,445 mi',  crew: 2, service: '2007–present' },
  'A400M':          { flag:'🇪🇺', role: 'Military Transport',         wingspan: '139 ft',  speed: '485 mph',   range: '5,530 mi',   crew: 4, service: '2013–present' },

  // ── ATR ───────────────────────────────────────────────────────────────────
  'ATR-42':         { flag:'🇪🇺', role: 'Regional Turboprop',         wingspan: '81 ft',  speed: '345 mph',   range: '824 mi',   crew: 2, service: '1985–present' },
  'ATR-72':         { flag:'🇪🇺', role: 'Regional Turboprop',         wingspan: '89 ft',  speed: '317 mph',   range: '949 mi',   crew: 2, service: '1989–present' },

  // ── Bombardier ────────────────────────────────────────────────────────────
  'CRJ-200':        { flag:'🇨🇦', role: 'Regional Jet',               wingspan: '70 ft',  speed: '534 mph',   range: '1,895 mi',   crew: 2, service: '1992–present' },
  'CRJ-700':        { flag:'🇨🇦', role: 'Regional Jet',               wingspan: '76 ft',  speed: '544 mph',   range: '1,892 mi',   crew: 2, service: '2001–present' },
  'CRJ-900':        { flag:'🇨🇦', role: 'Regional Jet',               wingspan: '82 ft',  speed: '541 mph',   range: '1,787 mi',   crew: 2, service: '2003–present' },
  'Challenger 600': { flag:'🇨🇦', role: 'Business Jet',               wingspan: '64 ft',  speed: '548 mph',   range: '4,603 mi',   crew: 2, service: '1980–present' },
  'Global Express': { flag:'🇨🇦', role: 'Business Jet',               wingspan: '94 ft',  speed: '594 mph',   range: '7,481 mi',  crew: 2, service: '1997–present' },

  // ── Embraer ───────────────────────────────────────────────────────────────
  'EMB-120':        { flag:'🇧🇷', role: 'Regional Turboprop',         wingspan: '65 ft',  speed: '345 mph',   range: '1,087 mi',   crew: 2, service: '1985–present' },
  'ERJ 135':        { flag:'🇧🇷', role: 'Regional Jet',               wingspan: '66 ft',  speed: '518 mph',   range: '2,014 mi',   crew: 2, service: '1999–present' },
  'ERJ 145':        { flag:'🇧🇷', role: 'Regional Jet',               wingspan: '66 ft',  speed: '518 mph',   range: '1,785 mi',   crew: 2, service: '1996–present' },
  'E-170':          { flag:'🇧🇷', role: 'Regional Jet',               wingspan: '85 ft',  speed: '541 mph',   range: '2,325 mi',   crew: 2, service: '2004–present' },
  'E-190':          { flag:'🇧🇷', role: 'Regional Jet',               wingspan: '94 ft',  speed: '541 mph',   range: '2,819 mi',   crew: 2, service: '2006–present' },
  'E-195':          { flag:'🇧🇷', role: 'Regional Jet',               wingspan: '94 ft',  speed: '541 mph',   range: '2,647 mi',   crew: 2, service: '2006–present' },
  'Embraer Legacy 600': { flag:'🇧🇷', role: 'Business Jet',           wingspan: '70 ft',  speed: '529 mph',   range: '3,731 mi',   crew: 2, service: '2001–present' },
  'EMB314':         { flag:'🇧🇷', role: 'Light Attack (Super Tucano)', wingspan: '37 ft', speed: '367 mph',   range: '826 mi',   crew: 2, service: '2003–present' },

  // ── Fokker ────────────────────────────────────────────────────────────────
  'Fokker 50':      { flag:'🇳🇱', role: 'Regional Turboprop',         wingspan: '95 ft',  speed: '331 mph',   range: '1,367 mi',   crew: 2, service: '1987–present' },
  'Fokker 70':      { flag:'🇳🇱', role: 'Regional Jet',               wingspan: '92 ft',  speed: '525 mph',   range: '2,119 mi',   crew: 2, service: '1994–present' },
  'Fokker 100':     { flag:'🇳🇱', role: 'Regional Jet',               wingspan: '92 ft',  speed: '525 mph',   range: '1,970 mi',   crew: 2, service: '1988–present' },

  // ── Dassault / Business Jets ──────────────────────────────────────────────
  'Falcon 2000':    { flag:'🇫🇷', role: 'Business Jet',               wingspan: '70 ft',  speed: '536 mph',   range: '3,454 mi',   crew: 2, service: '1995–present' },
  'Falcon 900':     { flag:'🇫🇷', role: 'Business Jet',               wingspan: '63 ft',  speed: '570 mph',   range: '4,488 mi',   crew: 2, service: '1986–present' },
  'Gulfstream IV':  { flag:'🇺🇸', role: 'Business Jet',               wingspan: '78 ft',  speed: '581 mph',   range: '4,859 mi',   crew: 2, service: '1987–present' },
  'Gulfstream V':   { flag:'🇺🇸', role: 'Business Jet',               wingspan: '94 ft',  speed: '594 mph',   range: '7,481 mi',  crew: 2, service: '1997–present' },

  // ── BAE / British Aerospace ───────────────────────────────────────────────
  'BAE 146-200':    { flag:'🇬🇧', role: 'Regional Jet',               wingspan: '86 ft',  speed: '466 mph',   range: '1,509 mi',   crew: 2, service: '1983–present' },
  'BAE 146-300':    { flag:'🇬🇧', role: 'Regional Jet',               wingspan: '86 ft',  speed: '466 mph',   range: '1,520 mi',   crew: 2, service: '1988–present' },
  'BAE-125':        { flag:'🇬🇧', role: 'Business Jet',               wingspan: '47 ft',  speed: '518 mph',   range: '2,670 mi',   crew: 2, service: '1962–present' },

  // ── Douglas / McDonnell Douglas ───────────────────────────────────────────
  'DC-3':           { flag:'🇺🇸', role: 'Piston Airliner',            wingspan: '95 ft',  speed: '230 mph',   range: '1,504 mi',   crew: 2, service: '1936–present' },
  'DC-6':           { flag:'🇺🇸', role: 'Piston Airliner',            wingspan: '117 ft',  speed: '315 mph',   range: '4,811 mi',   crew: 4, service: '1947–present' },
  'DC-8':           { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '148 ft',  speed: '600 mph',   range: '5,406 mi',   crew: 3, service: '1959–present' },
  'DC-9-30':        { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '94 ft',  speed: '564 mph',   range: '1,727 mi',   crew: 2, service: '1966–present' },
  'DC-10':          { flag:'🇺🇸', role: 'Wide-body Airliner',         wingspan: '165 ft',  speed: '610 mph',   range: '4,606 mi',   crew: 3, service: '1971–present' },
  'MD-11':          { flag:'🇺🇸', role: 'Wide-body Airliner',         wingspan: '170 ft',  speed: '587 mph',   range: '7,739 mi',  crew: 2, service: '1990–present' },
  'MD-80':          { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '108 ft',  speed: '504 mph',   range: '2,880 mi',   crew: 2, service: '1980–present' },
  'MD-87':          { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '108 ft',  speed: '504 mph',   range: '3,636 mi',   crew: 2, service: '1987–2009' },
  'MD-90':          { flag:'🇺🇸', role: 'Narrow-body Airliner',       wingspan: '108 ft',  speed: '504 mph',   range: '2,371 mi',   crew: 2, service: '1995–2014' },

  // ── Lockheed ──────────────────────────────────────────────────────────────
  'L-1011':         { flag:'🇺🇸', role: 'Wide-body Airliner',         wingspan: '155 ft',  speed: '605 mph',   range: '6,027 mi',   crew: 2, service: '1972–2001' },

  // ── DHC / de Havilland Canada ─────────────────────────────────────────────
  'DHC-1':          { flag:'🇨🇦', role: 'Trainer',                    wingspan: '34 ft',  speed: '138 mph',   range: '470 mi',     crew: 2, service: '1946–present' },
  'DHC-6':          { flag:'🇨🇦', role: 'Utility Turboprop',          wingspan: '65 ft',  speed: '210 mph',   range: '1,060 mi',   crew: 2, service: '1966–present' },
  'DHC-8-100':      { flag:'🇨🇦', role: 'Regional Turboprop',         wingspan: '85 ft',  speed: '304 mph',   range: '1,064 mi',   crew: 2, service: '1984–present' },
  'DHC-8-300':      { flag:'🇨🇦', role: 'Regional Turboprop',         wingspan: '90 ft',  speed: '328 mph',   range: '968 mi',   crew: 2, service: '1989–present' },

  // ── Saab ──────────────────────────────────────────────────────────────────
  'Saab 340':       { flag:'🇸🇪', role: 'Regional Turboprop',         wingspan: '70 ft',  speed: '324 mph',   range: '1,076 mi',   crew: 2, service: '1984–present' },
  'Saab 2000':      { flag:'🇸🇪', role: 'Regional Turboprop',         wingspan: '81 ft',  speed: '424 mph',   range: '1,782 mi',   crew: 2, service: '1994–present' },

  // ── Cessna / General Aviation ─────────────────────────────────────────────
  'Cessna 172':     { flag:'🇺🇸', role: 'Light Trainer',              wingspan: '36 ft',  speed: '140 mph',   range: '801 mi',   crew: 1, service: '1956–present' },
  'Cessna 208':     { flag:'🇺🇸', role: 'Utility Turboprop',          wingspan: '52 ft',  speed: '212 mph',   range: '1,232 mi',   crew: 1, service: '1984–present' },
  'Cessna 525':     { flag:'🇺🇸', role: 'Light Business Jet',         wingspan: '47 ft',  speed: '449 mph',   range: '1,762 mi',   crew: 1, service: '1993–present' },
  'Cessna 560':     { flag:'🇺🇸', role: 'Light Business Jet',         wingspan: '52 ft',  speed: '478 mph',   range: '2,548 mi',   crew: 2, service: '1991–present' },
  'SR-20':          { flag:'🇺🇸', role: 'Light Aircraft',             wingspan: '37 ft',  speed: '175 mph',   range: '874 mi',   crew: 1, service: '1999–present' },
  'Beechcraft 1900':{ flag:'🇺🇸', role: 'Regional Turboprop',         wingspan: '58 ft',  speed: '331 mph',   range: '1,725 mi',   crew: 2, service: '1984–present' },
  'Model B200':     { flag:'🇺🇸', role: 'Twin Turboprop',             wingspan: '54 ft',  speed: '333 mph',   range: '2,290 mi',   crew: 1, service: '1974–present' },
  'Metroliner':     { flag:'🇺🇸', role: 'Regional Turboprop',         wingspan: '57 ft',  speed: '320 mph',   range: '1,553 mi',   crew: 2, service: '1970–present' },
  'PA-28':          { flag:'🇺🇸', role: 'Light Trainer',              wingspan: '36 ft',  speed: '145 mph',   range: '840 mi',   crew: 1, service: '1961–present' },
  'DR-400':         { flag:'🇫🇷', role: 'Light Aircraft',             wingspan: '29 ft',   speed: '146 mph',   range: '777 mi',   crew: 1, service: '1972–present' },

  // ── Dornier ───────────────────────────────────────────────────────────────
  'Dornier 328':    { flag:'🇩🇪', role: 'Regional Turboprop',         wingspan: '69 ft', speed: '385 mph',   range: '1,150 mi',   crew: 2, service: '1993–present' },

  // ── De Havilland / WWII ───────────────────────────────────────────────────
  'DH-82':          { flag:'🇬🇧', role: 'Biplane Trainer',            wingspan: '29 ft',   speed: '103 mph',   range: '305 mi',     crew: 2, service: '1932–present' },
  'Spitfire':       { flag:'🇬🇧', role: 'WWII Fighter',               wingspan: '37 ft',  speed: '369 mph',   range: '470 mi',     crew: 1, service: '1938–1954' },

  // ── Special Purpose ───────────────────────────────────────────────────────
  'CL415':          { flag:'🇨🇦', role: 'Amphibious Firefighter',     wingspan: '94 ft',  speed: '234 mph',   range: '1,507 mi',   crew: 2, service: '1994–present' },
  'Be200':          { flag:'🇷🇺', role: 'Amphibious Aircraft',        wingspan: '108 ft',  speed: '441 mph',   range: '2,392 mi',   crew: 2, service: '2003–present' },
  'US2':            { flag:'🇯🇵', role: 'Amphibious SAR',             wingspan: '143 ft',  speed: '348 mph',   range: '2,920 mi',   crew: 11, service: '2007–present' },
  'AG600':          { flag:'🇨🇳', role: 'Amphibious Aircraft',        wingspan: '127 ft',  speed: '311 mph',   range: '2,796 mi',   crew: 4, service: '2022–present' },

  // ── US Military Fighters ──────────────────────────────────────────────────
  'F':              { flag:'🇺🇸', role: 'Fighter Aircraft',           wingspan: 'N/A',    speed: 'N/A',        range: 'N/A',        crew: 1, service: 'N/A' },
  'F14':            { flag:'🇺🇸', role: 'Carrier Fighter',            wingspan: '64 ft',  speed: 'Mach 2.34',  range: '1,842 mi',   crew: 2, service: '1974–2006' },
  'F15':            { flag:'🇺🇸', role: 'Air Superiority Fighter',    wingspan: '43 ft',  speed: 'Mach 2.5',   range: '3,449 mi',   crew: 1, service: '1976–present' },
  'F16':            { flag:'🇺🇸', role: 'Multirole Fighter',          wingspan: '32 ft',   speed: 'Mach 2.0',   range: '2,622 mi',   crew: 1, service: '1979–present' },
  'F-16A':          { flag:'🇺🇸', role: 'Multirole Fighter',          wingspan: '32 ft',   speed: 'Mach 2.0',   range: '2,622 mi',   crew: 1, service: '1979–present' },
  'F18':            { flag:'🇺🇸', role: 'Carrier Fighter',            wingspan: '45 ft',  speed: 'Mach 1.8',   range: '1,458 mi',   crew: 1, service: '1983–present' },
  'F22':            { flag:'🇺🇸', role: '5th-Gen Fighter',            wingspan: '45 ft',  speed: 'Mach 2.25',  range: '1,839 mi',   crew: 1, service: '2005–present' },
  'F35':            { flag:'🇺🇸', role: '5th-Gen Multirole',          wingspan: '35 ft',  speed: 'Mach 1.6',   range: '1,379 mi',   crew: 1, service: '2015–present' },
  'F117':           { flag:'🇺🇸', role: 'Stealth Attack',             wingspan: '43 ft',  speed: '617 mph',   range: '1,069 mi',   crew: 1, service: '1983–2008' },
  'F4':             { flag:'🇺🇸', role: 'Multirole Fighter',          wingspan: '38 ft',  speed: 'Mach 2.23',  range: '1,616 mi',   crew: 2, service: '1960–present' },
  'AV8B':           { flag:'🇺🇸', role: 'VSTOL Attack',               wingspan: '31 ft',   speed: 'Mach 0.9',   range: '1,367 mi',   crew: 1, service: '1985–present' },
  'A10':            { flag:'🇺🇸', role: 'Close Air Support',          wingspan: '57 ft',  speed: '439 mph',   range: '2,579 mi',   crew: 1, service: '1977–present' },
  'SR71':           { flag:'🇺🇸', role: 'Strategic Reconnaissance',   wingspan: '55 ft',  speed: 'Mach 3.3',   range: '3,355 mi',   crew: 2, service: '1966–1998' },
  'U2':             { flag:'🇺🇸', role: 'High-altitude Recon',        wingspan: '103 ft',  speed: '497 mph',   range: '6,214 mi',  crew: 1, service: '1957–present' },
  'X29':            { flag:'🇺🇸', role: 'Experimental Fighter',       wingspan: '27 ft',   speed: 'Mach 1.6',   range: 'N/A',        crew: 1, service: '1984–1992' },
  'X32':            { flag:'🇺🇸', role: 'JSF Demonstrator',           wingspan: '36 ft',  speed: 'Mach 1.6',   range: '2,069 mi',   crew: 1, service: '2000–2001' },
  'XB70':           { flag:'🇺🇸', role: 'Experimental Bomber',        wingspan: '105 ft',  speed: 'Mach 3.0',   range: '7,456 mi',  crew: 2, service: '1964–1969' },
  'YF23':           { flag:'🇺🇸', role: 'ATF Demonstrator',           wingspan: '44 ft',  speed: 'Mach 2.0+',  range: 'N/A',        crew: 1, service: '1990–1991' },
  'FCK1':           { flag:'🇹🇼', role: 'Light Fighter',              wingspan: '28 ft',   speed: 'Mach 1.8',   range: '684 mi',   crew: 1, service: '1994–present' },

  // ── US Bombers & Transport ────────────────────────────────────────────────
  'B1':             { flag:'🇺🇸', role: 'Strategic Bomber',           wingspan: '137 ft',  speed: 'Mach 1.25',  range: '5,841 mi',   crew: 4, service: '1986–present' },
  'B2':             { flag:'🇺🇸', role: 'Stealth Bomber',             wingspan: '172 ft',  speed: '628 mph', range: '6,897 mi',  crew: 2, service: '1997–present' },
  'B21':            { flag:'🇺🇸', role: 'Stealth Bomber',             wingspan: '~131 ft',   speed: 'Subsonic',   range: 'Classified', crew: 2, service: '2023–present' },
  'B52':            { flag:'🇺🇸', role: 'Strategic Bomber',           wingspan: '185 ft',  speed: '651 mph', range: '8,749 mi',  crew: 5, service: '1955–present' },
  'C-130':          { flag:'🇺🇸', role: 'Military Transport',         wingspan: '133 ft',  speed: '400 mph',   range: '4,258 mi',   crew: 5, service: '1956–present' },
  'C130':           { flag:'🇺🇸', role: 'Military Transport',         wingspan: '133 ft',  speed: '400 mph',   range: '4,258 mi',   crew: 5, service: '1956–present' },
  'C-47':           { flag:'🇺🇸', role: 'WWII Transport',             wingspan: '95 ft',  speed: '230 mph',   range: '1,501 mi',   crew: 3, service: '1941–present' },
  'C1':             { flag:'🇯🇵', role: 'Military Transport',         wingspan: '100 ft',  speed: '435 mph',   range: '2,083 mi',   crew: 4, service: '1981–2019' },
  'C17':            { flag:'🇺🇸', role: 'Strategic Transport',        wingspan: '170 ft',  speed: '518 mph',   range: '5,411 mi',   crew: 3, service: '1995–present' },
  'C2':             { flag:'🇺🇸', role: 'Carrier Onboard Delivery',   wingspan: '81 ft',  speed: '357 mph',   range: '1,491 mi',   crew: 3, service: '1966–present' },
  'C5':             { flag:'🇺🇸', role: 'Strategic Transport',        wingspan: '223 ft',  speed: '518 mph',   range: '7,907 mi',  crew: 7, service: '1970–present' },
  'C390':           { flag:'🇧🇷', role: 'Military Transport',         wingspan: '115 ft',  speed: '541 mph',   range: '3,853 mi',   crew: 3, service: '2019–present' },
  'KC135':          { flag:'🇺🇸', role: 'Aerial Refueller',           wingspan: '131 ft',  speed: '580 mph',   range: '9,196 mi',  crew: 4, service: '1957–present' },
  'P3':             { flag:'🇺🇸', role: 'Maritime Patrol',            wingspan: '100 ft',  speed: '473 mph',   range: '5,558 mi',   crew: 11, service: '1962–present' },
  'E2':             { flag:'🇺🇸', role: 'AEW&C',                      wingspan: '81 ft',  speed: '389 mph',   range: '1,773 mi',   crew: 5, service: '1964–present' },
  'E7':             { flag:'🇺🇸', role: 'AEW&C',                      wingspan: '200 ft',  speed: '530 mph',   range: '7,146 mi',  crew: 10, service: '2009–present' },

  // ── US Rotorcraft ─────────────────────────────────────────────────────────
  'AH64':           { flag:'🇺🇸', role: 'Attack Helicopter',          wingspan: '48 ft',  speed: '182 mph',   range: '296 mi',     crew: 2, service: '1986–present' },
  'CH47':           { flag:'🇺🇸', role: 'Heavy Transport Helicopter', wingspan: '60 ft',  speed: '196 mph',   range: '460 mi',     crew: 3, service: '1962–present' },
  'CH53':           { flag:'🇺🇸', role: 'Heavy Transport Helicopter', wingspan: '79 ft',  speed: '196 mph',   range: '621 mi',   crew: 3, service: '1966–present' },
  'UH60':           { flag:'🇺🇸', role: 'Utility Helicopter',         wingspan: '54 ft',  speed: '183 mph',   range: '363 mi',     crew: 4, service: '1979–present' },
  'V22':            { flag:'🇺🇸', role: 'Tilt-rotor Transport',       wingspan: '85 ft',  speed: '351 mph',   range: '1,011 mi',   crew: 4, service: '2007–present' },
  'V280':           { flag:'🇺🇸', role: 'Tilt-rotor Assault',         wingspan: '115 ft',  speed: '345 mph',   range: '578 mi',     crew: 4, service: 'Testing' },

  // ── US Drones ─────────────────────────────────────────────────────────────
  'MQ9':            { flag:'🇺🇸', role: 'Combat Drone',               wingspan: '66 ft',  speed: '300 mph',   range: '1,151 mi',   crew: 0, service: '2007–present' },
  'RQ4':            { flag:'🇺🇸', role: 'Strategic Recon Drone',      wingspan: '131 ft',  speed: '391 mph',   range: '14,155 mi',  crew: 0, service: '2001–present' },
  'MQ20':           { flag:'🇺🇸', role: 'Stealth Combat Drone',       wingspan: '80 ft',  speed: '575 mph',   range: '3,666 mi',   crew: 0, service: 'Testing' },
  'MQ25':           { flag:'🇺🇸', role: 'Carrier Refuelling Drone',   wingspan: '87 ft',  speed: '~519 mph',  range: '4,971 mi',   crew: 0, service: 'Testing' },
  'MQ28':           { flag:'🇦🇺', role: 'Loyal Wingman Drone',        wingspan: '~38 ft', speed: 'Mach 0.8+',  range: '2,299 mi',   crew: 0, service: 'Testing' },
  'XQ58':           { flag:'🇺🇸', role: 'Stealth Combat Drone',       wingspan: '27 ft',   speed: 'Mach 0.85',  range: '3,455 mi',   crew: 0, service: 'Testing' },

  // ── European Fighters ─────────────────────────────────────────────────────
  'Eurofighter Typhoon': { flag:'🇪🇺', role: 'Multirole Fighter',     wingspan: '36 ft',  speed: 'Mach 2.0',   range: '1,802 mi',   crew: 1, service: '2003–present' },
  'EF2000':         { flag:'🇪🇺', role: 'Multirole Fighter',          wingspan: '36 ft',  speed: 'Mach 2.0',   range: '1,802 mi',   crew: 1, service: '2003–present' },
  'Rafale':         { flag:'🇫🇷', role: 'Multirole Fighter',          wingspan: '36 ft',  speed: 'Mach 1.8',   range: '2,299 mi',   crew: 1, service: '2001–present' },
  'Mirage2000':     { flag:'🇫🇷', role: 'Multirole Fighter',          wingspan: '30 ft',   speed: 'Mach 2.2',   range: '963 mi',   crew: 1, service: '1984–present' },
  'Tornado':        { flag:'🇬🇧', role: 'Strike Fighter',             wingspan: '46 ft',  speed: 'Mach 2.2',   range: '2,417 mi',   crew: 2, service: '1979–present' },
  'JAS39':          { flag:'🇸🇪', role: 'Multirole Fighter',          wingspan: '28 ft',   speed: 'Mach 2.0',   range: '1,988 mi',   crew: 1, service: '1996–present' },
  'Hawk T1':        { flag:'🇬🇧', role: 'Jet Trainer',                wingspan: '31 ft',   speed: '645 mph', range: '1,566 mi',   crew: 2, service: '1976–present' },
  'Vulcan':         { flag:'🇬🇧', role: 'Strategic Bomber',           wingspan: '100 ft',  speed: '646 mph', range: '4,722 mi',   crew: 5, service: '1956–1984' },
  'NH90':           { flag:'🇪🇺', role: 'Multirole Helicopter',       wingspan: '53 ft',  speed: '186 mph',   range: '497 mi',     crew: 2, service: '2007–present' },
  'KAAN':           { flag:'🇹🇷', role: '5th-Gen Fighter',            wingspan: '36 ft',  speed: 'Mach 1.8+',  range: '1,491 mi',   crew: 1, service: 'Testing' },
  'KF21':           { flag:'🇰🇷', role: '4.5-Gen Fighter',            wingspan: '37 ft',  speed: 'Mach 1.8',   range: '1,802 mi',   crew: 1, service: 'Testing' },
  'T50':            { flag:'🇰🇷', role: 'Supersonic Trainer',         wingspan: '30 ft',   speed: 'Mach 1.5',   range: '1,150 mi',   crew: 2, service: '2005–present' },
  'Tejas':          { flag:'🇮🇳', role: 'Light Combat Aircraft',      wingspan: '27 ft',   speed: 'Mach 1.8',   range: '1,864 mi',   crew: 1, service: '2016–present' },

  // ── Turkish Drones ────────────────────────────────────────────────────────
  'TB2':            { flag:'🇹🇷', role: 'Combat Drone',               wingspan: '39 ft',  speed: '138 mph',   range: '186 mi',     crew: 0, service: '2014–present' },
  'TB001':          { flag:'🇹🇷', role: 'Medium Altitude Drone',      wingspan: '92 ft',  speed: '173 mph',   range: '932 mi',   crew: 0, service: '2021–present' },
  'AKINCI':         { flag:'🇹🇷', role: 'Heavy Combat Drone',         wingspan: '66 ft',  speed: '224 mph',   range: '932 mi',   crew: 0, service: '2021–present' },
  'KIZILELMA':      { flag:'🇹🇷', role: 'Jet Combat Drone',           wingspan: '33 ft',  speed: 'Mach 0.9',   range: '559 mi',     crew: 0, service: 'Testing' },
  'KJ600':          { flag:'🇨🇳', role: 'Carrier Drone',              wingspan: '~49 ft',   speed: 'N/A',        range: 'Classified', crew: 0, service: 'Testing' },

  // ── Russian Fighters ──────────────────────────────────────────────────────
  'Mig29':          { flag:'🇷🇺', role: 'Multirole Fighter',          wingspan: '37 ft',  speed: 'Mach 2.25',  range: '1,305 mi',   crew: 1, service: '1983–present' },
  'Mig31':          { flag:'🇷🇺', role: 'Interceptor',                wingspan: '44 ft',  speed: 'Mach 2.83',  range: '2,051 mi',   crew: 2, service: '1981–present' },
  'Su24':           { flag:'🇷🇺', role: 'Variable-sweep Bomber',      wingspan: '58 ft',  speed: 'Mach 1.35',  range: '1,864 mi',   crew: 2, service: '1974–present' },
  'Su25':           { flag:'🇷🇺', role: 'Ground Attack',              wingspan: '47 ft',  speed: '606 mph',   range: '777 mi',   crew: 1, service: '1981–present' },
  'Su34':           { flag:'🇷🇺', role: 'Strike Fighter',             wingspan: '48 ft',  speed: 'Mach 1.8',   range: '2,485 mi',   crew: 2, service: '2014–present' },
  'Su47':           { flag:'🇷🇺', role: 'Experimental Fighter',       wingspan: '50 ft',  speed: 'Mach 1.65',  range: '2,051 mi',   crew: 1, service: '1997–2015' },
  'Su57':           { flag:'🇷🇺', role: '5th-Gen Fighter',            wingspan: '46 ft',  speed: 'Mach 2.0',   range: '2,175 mi',   crew: 1, service: '2020–present' },
  'F2':             { flag:'🇯🇵', role: 'Air Superiority Fighter',    wingspan: '36 ft',  speed: 'Mach 2.0',   range: '1,802 mi',   crew: 1, service: '2000–present' },

  // ── Russian Bombers ───────────────────────────────────────────────────────
  'Tu160':          { flag:'🇷🇺', role: 'Strategic Bomber',           wingspan: '183 ft',  speed: 'Mach 2.05',  range: '7,643 mi',  crew: 4, service: '1987–present' },
  'Tu22M':          { flag:'🇷🇺', role: 'Supersonic Bomber',          wingspan: '113 ft',  speed: 'Mach 1.88',  range: '4,225 mi',   crew: 4, service: '1972–present' },
  'Tu95':           { flag:'🇷🇺', role: 'Strategic Bomber',           wingspan: '164 ft',  speed: '572 mph',   range: '9,321 mi',  crew: 6, service: '1956–present' },
  'H6':             { flag:'🇨🇳', role: 'Strategic Bomber',           wingspan: '108 ft',  speed: '630 mph', range: '3,728 mi',   crew: 4, service: '1959–present' },

  // ── Russian Rotorcraft ────────────────────────────────────────────────────
  'Mi8':            { flag:'🇷🇺', role: 'Utility Helicopter',         wingspan: '70 ft',  speed: '162 mph',   range: '382 mi',     crew: 3, service: '1967–present' },
  'Mi24':           { flag:'🇷🇺', role: 'Attack Helicopter',          wingspan: '57 ft',  speed: '208 mph',   range: '280 mi',     crew: 2, service: '1972–present' },
  'Mi26':           { flag:'🇷🇺', role: 'Heavy Transport Helicopter', wingspan: '105 ft',  speed: '183 mph',   range: '497 mi',     crew: 5, service: '1983–present' },
  'Mi28':           { flag:'🇷🇺', role: 'Attack Helicopter',          wingspan: '56 ft',  speed: '186 mph',   range: '286 mi',     crew: 2, service: '1996–present' },
  'Ka27':           { flag:'🇷🇺', role: 'Naval Helicopter',           wingspan: '52 ft',  speed: '168 mph',   range: '497 mi',     crew: 3, service: '1982–present' },
  'Ka52':           { flag:'🇷🇺', role: 'Attack Helicopter',          wingspan: '47 ft',  speed: '186 mph',   range: '684 mi',   crew: 2, service: '2011–present' },
  'WZ10':           { flag:'🇨🇳', role: 'Attack Helicopter',          wingspan: '43 ft',  speed: '168 mph',   range: '497 mi',     crew: 2, service: '2012–present' },

  // ── Russian Airlifters ────────────────────────────────────────────────────
  'An-12':          { flag:'🇷🇺', role: 'Military Transport',         wingspan: '125 ft',  speed: '483 mph',   range: '3,542 mi',   crew: 5, service: '1959–present' },
  'An72':           { flag:'🇷🇺', role: 'STOL Transport',             wingspan: '105 ft',  speed: '438 mph',   range: '2,983 mi',   crew: 3, service: '1985–present' },
  'An124':          { flag:'🇷🇺', role: 'Strategic Transport',        wingspan: '240 ft',  speed: '537 mph',   range: '3,355 mi',   crew: 6, service: '1986–present' },
  'An22':           { flag:'🇷🇺', role: 'Heavy Transport',            wingspan: '211 ft',  speed: '460 mph',   range: '6,804 mi',  crew: 5, service: '1967–present' },
  'An225':          { flag:'🇺🇦', role: 'Super-heavy Transport',      wingspan: '290 ft',  speed: '528 mph',   range: '9,569 mi',  crew: 6, service: '1988–2022' },
  'Il-76':          { flag:'🇷🇺', role: 'Strategic Transport',        wingspan: '166 ft',  speed: '559 mph',   range: '4,163 mi',   crew: 7, service: '1974–present' },
  'Il76':           { flag:'🇷🇺', role: 'Strategic Transport',        wingspan: '166 ft',  speed: '559 mph',   range: '4,163 mi',   crew: 7, service: '1974–present' },

  // ── Russian Airliners ─────────────────────────────────────────────────────
  'Tu-134':         { flag:'🇷🇺', role: 'Narrow-body Airliner',       wingspan: '95 ft',  speed: '559 mph',   range: '1,877 mi',   crew: 3, service: '1967–present' },
  'Tu-154':         { flag:'🇷🇺', role: 'Narrow-body Airliner',       wingspan: '123 ft',  speed: '606 mph',   range: '3,281 mi',   crew: 3, service: '1972–present' },
  'Yak-42':         { flag:'🇷🇺', role: 'Narrow-body Airliner',       wingspan: '115 ft',  speed: '503 mph',   range: '2,485 mi',   crew: 2, service: '1980–present' },

  // ── Chinese Military ──────────────────────────────────────────────────────
  'J10':            { flag:'🇨🇳', role: 'Multirole Fighter',          wingspan: '32 ft',   speed: 'Mach 2.0',   range: '2,013 mi',   crew: 1, service: '2004–present' },
  'J20':            { flag:'🇨🇳', role: '5th-Gen Fighter',            wingspan: '43 ft',  speed: 'Mach 2.0',   range: '2,485 mi',   crew: 1, service: '2017–present' },
  'J35':            { flag:'🇨🇳', role: '5th-Gen Carrier Fighter',    wingspan: '38 ft',  speed: 'Mach 1.8',   range: '1,864 mi',   crew: 1, service: '2022–present' },
  'J36':            { flag:'🇨🇳', role: 'Flying-wing Fighter',        wingspan: '~66 ft',   speed: 'N/A',        range: 'N/A',        crew: 1, service: 'Testing' },
  'J50':            { flag:'🇨🇳', role: 'Carrier Fighter',            wingspan: 'N/A',    speed: 'N/A',        range: 'N/A',        crew: 1, service: 'Testing' },
  'JH7':            { flag:'🇨🇳', role: 'Strike Fighter',             wingspan: '42 ft',  speed: 'Mach 1.7',   range: '2,268 mi',   crew: 2, service: '1994–present' },
  'JF17':           { flag:'🇵🇰', role: 'Multirole Fighter',          wingspan: '30 ft',   speed: 'Mach 1.6',   range: '2,164 mi',   crew: 1, service: '2007–present' },
  'Y20':            { flag:'🇨🇳', role: 'Strategic Transport',        wingspan: '197 ft',  speed: '559 mph',   range: '4,847 mi',   crew: 3, service: '2016–present' },
  'WZ7':            { flag:'🇨🇳', role: 'High-altitude Drone',        wingspan: '82 ft',  speed: '466 mph',   range: '4,350 mi',   crew: 0, service: '1981–present' },
  'WZ9':            { flag:'🇨🇳', role: 'Combat Drone',               wingspan: 'N/A',    speed: 'N/A',        range: 'N/A',        crew: 0, service: 'Testing' },
  'Z10':            { flag:'🇨🇳', role: 'Attack Helicopter',          wingspan: '43 ft',  speed: '168 mph',   range: '497 mi',     crew: 2, service: '2012–present' },
  'Z19':            { flag:'🇨🇳', role: 'Recon / Attack Helicopter',  wingspan: '33 ft',  speed: '152 mph',   range: '435 mi',     crew: 2, service: '2012–present' },
}

const DEFAULT = { flag: '✈', role: 'Aircraft', wingspan: 'N/A', speed: 'N/A', range: 'N/A', crew: 'N/A' }

// Duplicate / alternate class names → canonical SPECS key
const ALIASES = {
  'EF2000':              'Eurofighter Typhoon',
  'Typhoon':             'Eurofighter Typhoon',
  'C130':                'C-130',
  'Il76':                'Il-76',
  'F-16A':               'F16',
  'F-16':                'F16',
  'F-15':                'F15',
  'F-14':                'F14',
  'F-18':                'F18',
  'F-22':                'F22',
  'F-35':                'F35',
  'F-4':                 'F4',
  'A-10':                'A10',
  'SR-71':               'SR71',
  'U-2':                 'U2',
  'B-1':                 'B1',
  'B-2':                 'B2',
  'B-52':                'B52',
  'B-21':                'B21',
  'Su-24':               'Su24',
  'Su-25':               'Su25',
  'Su-27':               'Su27',
  'Su-34':               'Su34',
  'Su-57':               'Su57',
  'MiG-29':              'Mig29',
  'MiG-31':              'Mig31',
  'JAS-39':              'JAS39',
  'JAS 39':              'JAS39',
  'Gripen':              'JAS39',
  'V-22':                'V22',
  'V-280':               'V280',
  'AH-64':               'AH64',
  'CH-47':               'CH47',
  'CH-53':               'CH53',
  'UH-60':               'UH60',
  'MQ-9':                'MQ9',
  'RQ-4':                'RQ4',
  'XQ-58':               'XQ58',
  'C-17':                'C17',
  'C-5':                 'C5',
  'KC-135':              'KC135',
  'An-12':               'An-12',
  'An-72':               'An72',
  'An-124':              'An124',
  'An-225':              'An225',
}

export default function SpecsPanel({ aircraftName }) {
  if (!aircraftName) return null
  const canonical = ALIASES[aircraftName] ?? aircraftName
  const specs     = SPECS[canonical] || SPECS[aircraftName] || DEFAULT
  const wikiUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(aircraftName)}`

  return (
    <div className="specs-panel">
      <div className="specs-header">
        <div>
          <h3>{aircraftName}</h3>
          <p className="specs-role">{specs.role}</p>
        </div>
        <div className="specs-header-right">
          <span className="specs-flag">{specs.flag}</span>
          <a
            href={wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wiki-link"
            title="Open Wikipedia"
          >
            Wikipedia ↗
          </a>
        </div>
      </div>
      <div className="specs-grid">
        <div className="spec">
          <span className="spec-label">Wingspan</span>
          <span className="spec-value">{specs.wingspan}</span>
        </div>
        <div className="spec">
          <span className="spec-label">Top Speed</span>
          <span className="spec-value">{specs.speed}</span>
        </div>
        <div className="spec">
          <span className="spec-label">Range</span>
          <span className="spec-value">{specs.range}</span>
        </div>
        <div className="spec">
          <span className="spec-label">Crew</span>
          <span className="spec-value">{specs.crew}</span>
        </div>
        {specs.service && specs.service !== 'N/A' && (
          <div className="spec spec-wide">
            <span className="spec-label">In Service</span>
            <span className="spec-value">{specs.service}</span>
          </div>
        )}
      </div>
    </div>
  )
}
