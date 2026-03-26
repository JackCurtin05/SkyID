import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'
import AircraftViewer from './AircraftViewer'
import SpecsPanel from './SpecsPanel'
import CollectionPanel from './CollectionPanel'

const API             = 'http://127.0.0.1:8000'
const LOW_CONFIDENCE  = 45
const MAX_HISTORY     = 6
const HEALTH_INTERVAL = 5000

function App() {
  const [predictions, setPredictions] = useState(null)
  const [loading, setLoading]         = useState(false)
  const [preview, setPreview]         = useState(null)
  const [error, setError]             = useState(null)
  const [dragging, setDragging]       = useState(false)
  const [history, setHistory]         = useState([])
  const [apiStatus, setApiStatus]     = useState('checking')  // 'online' | 'offline' | 'checking'
  const [inputMode, setInputMode]     = useState('file')      // 'file' | 'url'
  const [urlValue, setUrlValue]       = useState('')
  const [resultKey, setResultKey]     = useState(0)           // bump to re-trigger animation
  const [discovered, setDiscovered]   = useState(new Set())
  const [newlyFound, setNewlyFound]   = useState(null)
  const [showCollection, setShowCollection] = useState(false)
  const fileRef = useRef()

  // ── API health polling ─────────────────────────────────────────────────────
  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`${API}/health`, { signal: AbortSignal.timeout(3000) })
        setApiStatus(res.ok ? 'online' : 'offline')
      } catch {
        setApiStatus('offline')
      }
    }
    check()
    const id = setInterval(check, HEALTH_INTERVAL)
    return () => clearInterval(id)
  }, [])

  // ── Clipboard paste ────────────────────────────────────────────────────────
  const handlePaste = useCallback((e) => {
    const item = [...(e.clipboardData?.items || [])].find(i => i.type.startsWith('image/'))
    if (item) { setInputMode('file'); handleFile(item.getAsFile()) }
  }, [])

  useEffect(() => {
    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [handlePaste])

  // ── Core predict (from blob) ───────────────────────────────────────────────
  const handleFile = async (file) => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    setPredictions(null)
    setError(null)
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res  = await fetch(`${API}/predict`, { method: 'POST', body: formData })
      const data = await res.json()
      setPredictions(data.predictions)
      setResultKey(k => k + 1)
      setHistory(prev => [
        { preview: url, predictions: data.predictions },
        ...prev.filter(h => h.preview !== url),
      ].slice(0, MAX_HISTORY))
      const top = data.predictions?.[0]?.aircraft
      if (top) {
        setDiscovered(prev => {
          if (!prev.has(top)) {
            setNewlyFound(top)
            setTimeout(() => setNewlyFound(null), 3000)
            return new Set([...prev, top])
          }
          return prev
        })
      }
    } catch {
      setError('Could not reach the API. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  // ── Predict from URL ───────────────────────────────────────────────────────
  const handleUrlSubmit = async (e) => {
    e.preventDefault()
    const url = urlValue.trim()
    if (!url) return

    setPreview(url)
    setPredictions(null)
    setError(null)
    setLoading(true)

    try {
      const res  = await fetch(`${API}/predict_url?url=${encodeURIComponent(url)}`, { method: 'POST' })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || 'Failed to identify from URL')
      }
      const data = await res.json()
      setPredictions(data.predictions)
      setResultKey(k => k + 1)
      setHistory(prev => [
        { preview: url, predictions: data.predictions },
        ...prev.filter(h => h.preview !== url),
      ].slice(0, MAX_HISTORY))
      const top = data.predictions?.[0]?.aircraft
      if (top) {
        setDiscovered(prev => {
          if (!prev.has(top)) {
            setNewlyFound(top)
            setTimeout(() => setNewlyFound(null), 3000)
            return new Set([...prev, top])
          }
          return prev
        })
      }
    } catch (err) {
      setError(err.message || 'Could not load image from URL.')
    } finally {
      setLoading(false)
    }
  }

  // ── Misc handlers ──────────────────────────────────────────────────────────
  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    setInputMode('file')
    handleFile(e.dataTransfer.files[0])
  }

  const handleReset = () => {
    setPredictions(null)
    setPreview(null)
    setError(null)
    setLoading(false)
    setDragging(false)
    setUrlValue('')
    if (fileRef.current) fileRef.current.value = ''
  }

  const loadFromHistory = (entry) => {
    setPreview(entry.preview)
    setPredictions(entry.predictions)
    setResultKey(k => k + 1)
    setError(null)
  }

  const topPrediction = predictions?.[0]?.aircraft
  const topConfidence = predictions?.[0]?.confidence ?? 100
  const lowConfidence = predictions && topConfidence < LOW_CONFIDENCE

  return (
    <div className="app">

      {/* ── Header ── */}
      <header>
        <div className="header-title">
          <h1>SkyID</h1>
          <div className={`api-dot ${apiStatus}`} title={`API ${apiStatus}`} />
        </div>
        <p>Aircraft recognition powered by deep learning</p>
        <button className="collection-btn" onClick={() => setShowCollection(true)}>
          ✈ Collection <span className="collection-btn-count">{discovered.size}/200</span>
        </button>
      </header>

      {/* ── New discovery toast ── */}
      {newlyFound && (
        <div className="discovery-toast">
          <span className="discovery-icon">🆕</span>
          <div>
            <div className="discovery-label">New Discovery!</div>
            <div className="discovery-name">{newlyFound}</div>
          </div>
        </div>
      )}

      {/* ── Collection modal ── */}
      {showCollection && (
        <CollectionPanel
          discovered={discovered}
          newlyFound={newlyFound}
          onClose={() => setShowCollection(false)}
        />
      )}

      <main>
        {/* ── Input mode tabs ── */}
        <div className="input-tabs">
          <button
            className={`input-tab${inputMode === 'file' ? ' active' : ''}`}
            onClick={() => setInputMode('file')}
          >Upload / Paste</button>
          <button
            className={`input-tab${inputMode === 'url' ? ' active' : ''}`}
            onClick={() => setInputMode('url')}
          >Image URL</button>
        </div>

        {/* ── File dropzone ── */}
        {inputMode === 'file' && (
          <div
            className={`dropzone${dragging ? ' drag-active' : ''}`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setDragging(true)}
            onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false) }}
            onClick={() => !preview && fileRef.current.click()}
            style={{ cursor: preview ? 'default' : 'pointer' }}
          >
            {preview ? (
              <img src={preview} alt="preview" className="preview" />
            ) : (
              <div className="dropzone-inner">
                <div className="upload-icon">✈</div>
                <p>{dragging ? 'Drop to identify' : 'Drop an aircraft photo here'}</p>
                <span>click to browse · or paste from clipboard</span>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>
        )}

        {/* ── URL input ── */}
        {inputMode === 'url' && (
          <form className="url-form" onSubmit={handleUrlSubmit}>
            {preview && inputMode === 'url' && (
              <img src={preview} alt="preview" className="url-preview" onError={(e) => e.target.style.display='none'} />
            )}
            <div className="url-input-wrap">
              <input
                type="url"
                className="url-input"
                placeholder="https://example.com/aircraft.jpg"
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                autoFocus
              />
              <button type="submit" className="url-submit" disabled={!urlValue.trim() || loading}>
                Identify
              </button>
            </div>
          </form>
        )}

        {loading && <div className="loading">Identifying aircraft...</div>}

        {/* ── Results (keyed so they re-animate on each new result) ── */}
        {predictions && (
          <div key={resultKey} className="results-group">
            <SpecsPanel aircraftName={topPrediction} />
            <AircraftViewer aircraftName={topPrediction} />

            {lowConfidence && (
              <div className="low-confidence">
                Low confidence ({topConfidence}%) — try a clearer or less cropped photo.
              </div>
            )}

            <div className="results">
              <div className="results-header">
                <h2>Top Results</h2>
                <button className="reset-btn" onClick={handleReset}>↺ Try another</button>
              </div>
              {predictions.map((p, i) => (
                <div key={i} className={`result-row ${i === 0 ? 'top-result' : ''}`}>
                  <div className="result-label">
                    <span className="rank">#{i + 1}</span>
                    <span className="aircraft">{p.aircraft}</span>
                  </div>
                  <div className="bar-wrap">
                    <div className="bar" style={{ width: `${p.confidence}%` }} />
                    <span className="confidence">{p.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="error">
            {error}
            <button className="reset-btn" onClick={handleReset}>↺ Try again</button>
          </div>
        )}

        {/* ── History strip ── */}
        {history.length > 0 && (
          <div className="history">
            <div className="history-label">Recent</div>
            <div className="history-strip">
              {history.map((entry, i) => (
                <button
                  key={i}
                  className={`history-chip${entry.preview === preview ? ' active' : ''}`}
                  onClick={() => loadFromHistory(entry)}
                  title={entry.predictions?.[0]?.aircraft ?? ''}
                >
                  <img src={entry.preview} alt="" className="history-thumb" onError={(e) => e.target.style.opacity='0'} />
                  <span className="history-name">{entry.predictions?.[0]?.aircraft ?? '?'}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
