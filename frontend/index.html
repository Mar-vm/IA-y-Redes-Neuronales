<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DermoScan · Análisis de lesiones de piel</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..700&family=IBM+Plex+Mono:wght@400;500;600&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --cream:#FAF6F0;
    --paper:#FFFFFF;
    --ink:#2B2B26;
    --ink-soft:#6E6A60;
    --teal:#1F4E4A;
    --teal-soft:#E4EEED;
    --clay:#D9714E;
    --clay-soft:#FBE7DE;
    --line:#E4DED4;
    --ok:#4F8A6D;
    --ok-soft:#E5F0E9;
    --warn:#D9A23B;
    --warn-soft:#FBF1DD;
    --risk-alto:#C0463B;
    --risk-medio-alto:#D9714E;
    --risk-medio:#D9A23B;
    --risk-bajo:#4F8A6D;
    --radius:14px;
    --shadow: 0 1px 2px rgba(43,43,38,0.04), 0 8px 24px -8px rgba(43,43,38,0.10);
  }

  *{ box-sizing:border-box; }

  html,body{ margin:0; padding:0; }

  body{
    background:var(--cream);
    color:var(--ink);
    font-family:'Work Sans', system-ui, sans-serif;
    line-height:1.5;
    -webkit-font-smoothing:antialiased;
  }

  /* ---------- Layout ---------- */
  .wrap{
    max-width:760px;
    margin:0 auto;
    padding:32px 20px 80px;
  }

  /* ---------- Header ---------- */
  header{
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    gap:16px;
    margin-bottom:28px;
    padding-bottom:24px;
    border-bottom:1px solid var(--line);
  }
  .brand{ display:flex; align-items:center; gap:12px; }
  .brand-mark{
    width:42px; height:42px; border-radius:50%;
    background:var(--teal);
    position:relative;
    flex-shrink:0;
  }
  .brand-mark::after{
    content:"";
    position:absolute; inset:9px;
    border-radius:50%;
    border:2px solid var(--cream);
    border-bottom-color:transparent;
    border-right-color:transparent;
    transform:rotate(45deg);
  }
  .brand h1{
    font-family:'Fraunces', serif;
    font-size:1.5rem;
    font-weight:600;
    margin:0;
    letter-spacing:-0.01em;
  }
  .brand p{
    margin:2px 0 0;
    font-size:0.8rem;
    color:var(--ink-soft);
    font-family:'IBM Plex Mono', monospace;
    letter-spacing:0.02em;
  }

  .config-toggle{
    background:none;
    border:1px solid var(--line);
    border-radius:999px;
    padding:6px 14px;
    font-family:'IBM Plex Mono', monospace;
    font-size:0.75rem;
    color:var(--ink-soft);
    cursor:pointer;
    transition:border-color .15s, color .15s;
    white-space:nowrap;
  }
  .config-toggle:hover{ border-color:var(--teal); color:var(--teal); }

  /* ---------- Disclaimer banner ---------- */
  .disclaimer{
    background:var(--warn-soft);
    border:1px solid #EEDDB8;
    border-radius:var(--radius);
    padding:14px 16px;
    font-size:0.85rem;
    color:#7A5A1E;
    margin-bottom:24px;
    display:flex;
    gap:10px;
    align-items:flex-start;
  }
  .disclaimer strong{ color:#5C420F; }
  .disclaimer .icon{ font-size:1.1rem; line-height:1.2; flex-shrink:0; }

  /* ---------- Config panel ---------- */
  .config-panel{
    background:var(--paper);
    border:1px solid var(--line);
    border-radius:var(--radius);
    padding:18px 20px;
    margin-bottom:24px;
    display:none;
  }
  .config-panel.open{ display:block; }
  .config-panel label{
    display:block;
    font-family:'IBM Plex Mono', monospace;
    font-size:0.75rem;
    color:var(--ink-soft);
    margin-bottom:6px;
    text-transform:uppercase;
    letter-spacing:0.05em;
  }
  .config-panel input{
    width:100%;
    padding:10px 12px;
    border:1px solid var(--line);
    border-radius:8px;
    font-family:'IBM Plex Mono', monospace;
    font-size:0.85rem;
    color:var(--ink);
    background:var(--cream);
  }
  .config-panel input:focus{ outline:2px solid var(--teal); outline-offset:1px; }
  .config-hint{ font-size:0.78rem; color:var(--ink-soft); margin-top:8px; }

  /* ---------- Upload card ---------- */
  .card{
    background:var(--paper);
    border:1px solid var(--line);
    border-radius:var(--radius);
    box-shadow:var(--shadow);
    overflow:hidden;
  }

  .dropzone{
    padding:36px 24px;
    text-align:center;
    border-bottom:1px dashed var(--line);
    cursor:pointer;
    transition:background .15s;
    position:relative;
  }
  .dropzone:hover{ background:var(--teal-soft); }
  .dropzone.dragover{ background:var(--teal-soft); border-color:var(--teal); }
  .dropzone input[type=file]{
    position:absolute; inset:0; opacity:0; cursor:pointer;
  }

  .slide{
    width:128px; height:128px;
    margin:0 auto 16px;
    border-radius:50%;
    border:2px solid var(--line);
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
    background:var(--teal-soft);
    position:relative;
  }
  .slide img{
    width:100%; height:100%;
    object-fit:cover;
    display:block;
  }
  .slide .placeholder{
    color:var(--teal);
    font-size:2rem;
  }
  .slide.scanning::after{
    content:"";
    position:absolute; left:0; right:0;
    height:3px;
    background:linear-gradient(90deg, transparent, var(--clay), transparent);
    top:0;
    animation:scan 1.4s ease-in-out infinite;
  }
  @keyframes scan{
    0%{ top:6%; opacity:.2; }
    50%{ top:88%; opacity:1; }
    100%{ top:6%; opacity:.2; }
  }

  .dz-title{
    font-family:'Fraunces', serif;
    font-size:1.05rem;
    font-weight:600;
    margin:0 0 4px;
  }
  .dz-sub{
    font-size:0.85rem;
    color:var(--ink-soft);
    margin:0;
    font-family:'IBM Plex Mono', monospace;
  }

  .card-actions{
    padding:18px 24px;
    display:flex;
    gap:10px;
    align-items:center;
    flex-wrap:wrap;
  }

  button.primary{
    background:var(--teal);
    color:var(--cream);
    border:none;
    border-radius:8px;
    padding:12px 22px;
    font-family:'Work Sans', sans-serif;
    font-weight:600;
    font-size:0.92rem;
    cursor:pointer;
    transition:background .15s, transform .1s;
    flex:1;
  }
  button.primary:hover:not(:disabled){ background:#163A37; }
  button.primary:active:not(:disabled){ transform:scale(0.99); }
  button.primary:disabled{
    background:#C9C4B8;
    cursor:not-allowed;
  }

  button.ghost{
    background:none;
    border:1px solid var(--line);
    border-radius:8px;
    padding:12px 18px;
    font-family:'Work Sans', sans-serif;
    font-weight:500;
    font-size:0.9rem;
    color:var(--ink-soft);
    cursor:pointer;
    transition:border-color .15s, color .15s;
  }
  button.ghost:hover{ border-color:var(--teal); color:var(--teal); }

  .filename{
    font-family:'IBM Plex Mono', monospace;
    font-size:0.78rem;
    color:var(--ink-soft);
    width:100%;
    word-break:break-all;
  }

  /* ---------- Status / errors ---------- */
  .status{
    margin-top:18px;
    padding:14px 16px;
    border-radius:var(--radius);
    font-size:0.88rem;
    display:none;
  }
  .status.show{ display:block; }
  .status.error{
    background:#FBEAE8;
    border:1px solid #F3C9C4;
    color:#9A3B30;
  }
  .status.loading{
    background:var(--teal-soft);
    border:1px solid #C9DEDC;
    color:var(--teal);
    font-family:'IBM Plex Mono', monospace;
  }

  /* ---------- Results ---------- */
  .results{
    margin-top:24px;
    display:none;
  }
  .results.show{ display:block; animation:fadeUp .35s ease both; }
  @keyframes fadeUp{
    from{ opacity:0; transform:translateY(8px); }
    to{ opacity:1; transform:translateY(0); }
  }

  .result-head{
    background:var(--paper);
    border:1px solid var(--line);
    border-radius:var(--radius);
    box-shadow:var(--shadow);
    padding:22px 24px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:16px;
    flex-wrap:wrap;
  }
  .result-head .label{
    font-family:'IBM Plex Mono', monospace;
    font-size:0.72rem;
    text-transform:uppercase;
    letter-spacing:0.08em;
    color:var(--ink-soft);
    margin:0 0 4px;
  }
  .result-head h2{
    font-family:'Fraunces', serif;
    font-size:1.5rem;
    margin:0 0 6px;
    font-weight:600;
  }
  .result-head .cat{
    font-size:0.88rem;
    color:var(--ink-soft);
  }
  .confidence{
    text-align:right;
    flex-shrink:0;
  }
  .confidence .num{
    font-family:'Fraunces', serif;
    font-size:2.1rem;
    font-weight:600;
    line-height:1;
  }
  .confidence .lbl{
    font-family:'IBM Plex Mono', monospace;
    font-size:0.7rem;
    color:var(--ink-soft);
    text-transform:uppercase;
    letter-spacing:0.06em;
  }

  .risk-pill{
    display:inline-flex;
    align-items:center;
    gap:6px;
    padding:4px 12px;
    border-radius:999px;
    font-family:'IBM Plex Mono', monospace;
    font-size:0.72rem;
    text-transform:uppercase;
    letter-spacing:0.05em;
    font-weight:600;
    margin-top:10px;
  }
  .risk-pill .dot{
    width:8px; height:8px; border-radius:50%;
  }

  /* ---------- Section block ---------- */
  .section{
    background:var(--paper);
    border:1px solid var(--line);
    border-radius:var(--radius);
    box-shadow:var(--shadow);
    padding:22px 24px;
    margin-top:16px;
  }
  .section h3{
    font-family:'Fraunces', serif;
    font-size:1.05rem;
    margin:0 0 12px;
    font-weight:600;
  }
  .section p{
    font-size:0.92rem;
    color:#48453E;
    margin:0 0 0;
  }

  /* Probability bars */
  .bar-row{
    display:flex;
    align-items:center;
    gap:12px;
    margin-bottom:12px;
  }
  .bar-row:last-child{ margin-bottom:0; }
  .bar-label{
    width:170px;
    flex-shrink:0;
    font-size:0.85rem;
  }
  .bar-track{
    flex:1;
    height:8px;
    background:var(--teal-soft);
    border-radius:999px;
    overflow:hidden;
  }
  .bar-fill{
    height:100%;
    background:var(--teal);
    border-radius:999px;
    width:0%;
    transition:width .6s ease;
  }
  .bar-pct{
    width:48px;
    text-align:right;
    flex-shrink:0;
    font-family:'IBM Plex Mono', monospace;
    font-size:0.8rem;
    color:var(--ink-soft);
  }

  /* Observation list */
  .obs-list{
    list-style:none;
    margin:0;
    padding:0;
    display:grid;
    gap:8px;
  }
  .obs-list li{
    display:flex;
    gap:10px;
    font-size:0.9rem;
    color:#48453E;
    align-items:flex-start;
  }
  .obs-list li::before{
    content:"—";
    color:var(--clay);
    flex-shrink:0;
    font-weight:600;
  }

  /* Recommendation box */
  .rec-box{
    background:var(--teal-soft);
    border-radius:10px;
    padding:16px 18px;
    font-size:0.92rem;
    color:#1A3F3C;
    margin-top:14px;
    border-left:3px solid var(--teal);
  }

  /* Legal footer note */
  .legal{
    margin-top:20px;
    font-size:0.78rem;
    color:var(--ink-soft);
    text-align:center;
    font-family:'IBM Plex Mono', monospace;
    line-height:1.7;
  }

  @media (max-width:480px){
    .bar-label{ width:120px; font-size:0.78rem; }
    .result-head{ flex-direction:column; align-items:flex-start; }
    .confidence{ text-align:left; }
  }
</style>
</head>
<body>
<div class="wrap">

  <header>
    <div class="brand">
      <div class="brand-mark"></div>
      <div>
        <h1>DermoScan</h1>
        <p>HAM10000 · clasificador de 7 clases · proyecto académico</p>
      </div>
    </div>
    <button class="config-toggle" id="configToggle" type="button">⚙ Configurar API</button>
  </header>

  <div class="disclaimer">
    <span class="icon">⚠️</span>
    <div>
      <strong>Este es un proyecto académico (PFAD-PADCC-VIC04 · TecNM Virtual).</strong>
      El resultado lo genera un modelo de IA entrenado con fines educativos y
      <strong>no es un diagnóstico médico</strong>. Ante cualquier duda sobre una
      lesión en tu piel, acude con un dermatólogo certificado.
    </div>
  </div>

  <!-- Panel de configuración: URL del backend en Render -->
  <div class="config-panel" id="configPanel">
    <label for="apiUrl">URL de la API (Render)</label>
    <input type="text" id="apiUrl" placeholder="https://tu-servicio.onrender.com/predict"
           value="https://TU-SERVICIO.onrender.com/predict">
    <p class="config-hint">
      Pega aquí la URL pública de tu API en Render seguida de <code>/predict</code>.
      Esta configuración se guarda solo en este navegador.
    </p>
  </div>

  <!-- Tarjeta principal: subir imagen -->
  <div class="card">
    <div class="dropzone" id="dropzone">
      <div class="slide" id="slide">
        <span class="placeholder" id="placeholder">📷</span>
        <img id="preview" alt="" style="display:none;">
      </div>
      <p class="dz-title">Sube una foto de la lesión</p>
      <p class="dz-sub">Toca para elegir un archivo · JPG o PNG</p>
      <input type="file" id="fileInput" accept="image/*">
    </div>
    <div class="card-actions">
      <button class="primary" id="analyzeBtn" disabled>Analizar imagen</button>
      <button class="ghost" id="resetBtn" style="display:none;">Subir otra</button>
      <span class="filename" id="filename"></span>
    </div>
  </div>

  <div class="status" id="status"></div>

  <!-- Resultados -->
  <div class="results" id="results">

    <div class="result-head">
      <div>
        <p class="label">Resultado del modelo</p>
        <h2 id="resClase">—</h2>
        <p class="cat" id="resCategoria">—</p>
        <span class="risk-pill" id="resRiesgo">
          <span class="dot"></span>
          <span id="resRiesgoTexto">—</span>
        </span>
      </div>
      <div class="confidence">
        <div class="num" id="resConfianza">—</div>
        <div class="lbl">Confianza</div>
      </div>
    </div>

    <div class="section">
      <h3>Distribución de probabilidades</h3>
      <div id="bars"></div>
    </div>

    <div class="section">
      <h3>¿Qué es esto?</h3>
      <p id="resDescripcion">—</p>
    </div>

    <div class="section" id="seccionObservar">
      <h3>Qué observar</h3>
      <ul class="obs-list" id="obsList"></ul>
    </div>

    <div class="section">
      <h3>Recomendación</h3>
      <p id="resRecomendacion">—</p>
      <div class="rec-box" id="resAvisoLegal">—</div>
    </div>

  </div>

  <p class="legal">
    DermoScan no almacena tus imágenes ni resultados.<br>
    Cada análisis se procesa de forma independiente y no se guarda en ningún servidor.
  </p>

</div>

<script>
  // ---------------------------------------------------------------
  // Configuración
  // ---------------------------------------------------------------
  const STORAGE_KEY = 'dermoscan_api_url';
  const apiUrlInput = document.getElementById('apiUrl');
  const savedUrl = localStorage.getItem(STORAGE_KEY);
  if (savedUrl) apiUrlInput.value = savedUrl;
  apiUrlInput.addEventListener('change', () => {
    localStorage.setItem(STORAGE_KEY, apiUrlInput.value.trim());
  });

  document.getElementById('configToggle').addEventListener('click', () => {
    document.getElementById('configPanel').classList.toggle('open');
  });

  // ---------------------------------------------------------------
  // Elementos
  // ---------------------------------------------------------------
  const dropzone   = document.getElementById('dropzone');
  const fileInput  = document.getElementById('fileInput');
  const preview    = document.getElementById('preview');
  const placeholder= document.getElementById('placeholder');
  const slide      = document.getElementById('slide');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const resetBtn   = document.getElementById('resetBtn');
  const filenameEl = document.getElementById('filename');
  const statusEl   = document.getElementById('status');
  const resultsEl  = document.getElementById('results');

  let selectedFile = null;

  // ---------------------------------------------------------------
  // Selección de imagen
  // ---------------------------------------------------------------
  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  });

  ['dragover','dragenter'].forEach(evt =>
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    })
  );
  ['dragleave','drop'].forEach(evt =>
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    })
  );
  dropzone.addEventListener('drop', (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });

  function handleFile(file){
    if (!file.type.startsWith('image/')){
      showStatus('error', 'Por favor selecciona un archivo de imagen (JPG o PNG).');
      return;
    }
    selectedFile = file;
    filenameEl.textContent = file.name;
    const reader = new FileReader();
    reader.onload = (ev) => {
      preview.src = ev.target.result;
      preview.style.display = 'block';
      placeholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
    analyzeBtn.disabled = false;
    hideStatus();
    resultsEl.classList.remove('show');
  }

  // ---------------------------------------------------------------
  // Reset
  // ---------------------------------------------------------------
  resetBtn.addEventListener('click', () => {
    selectedFile = null;
    fileInput.value = '';
    preview.style.display = 'none';
    placeholder.style.display = 'block';
    filenameEl.textContent = '';
    analyzeBtn.disabled = true;
    resetBtn.style.display = 'none';
    resultsEl.classList.remove('show');
    hideStatus();
  });

  // ---------------------------------------------------------------
  // Analizar
  // ---------------------------------------------------------------
  analyzeBtn.addEventListener('click', async () => {
    if (!selectedFile) return;

    const apiUrl = apiUrlInput.value.trim();
    if (!apiUrl || apiUrl.includes('TU-SERVICIO')){
      document.getElementById('configPanel').classList.add('open');
      showStatus('error', 'Configura primero la URL de tu API (botón "⚙ Configurar API").');
      return;
    }

    analyzeBtn.disabled = true;
    resetBtn.style.display = 'none';
    slide.classList.add('scanning');
    showStatus('loading', '🔬 Analizando imagen, esto puede tardar unos segundos…');
    resultsEl.classList.remove('show');

    try{
      const formData = new FormData();
      formData.append('file', selectedFile);

      const resp = await fetch(apiUrl, {
        method: 'POST',
        body: formData
      });

      if (!resp.ok){
        const errBody = await resp.json().catch(() => null);
        throw new Error(errBody?.detail || `Error del servidor (${resp.status})`);
      }

      const data = await resp.json();
      renderResults(data);
      hideStatus();

    } catch(err){
      console.error(err);
      let msg = err.message || 'Ocurrió un error al conectar con la API.';
      if (msg.includes('Failed to fetch')){
        msg = 'No se pudo conectar con la API. Verifica la URL en "⚙ Configurar API" y que el servicio en Render esté activo (puede tardar ~30s en despertar).';
      }
      showStatus('error', '❌ ' + msg);
    } finally {
      slide.classList.remove('scanning');
      analyzeBtn.disabled = false;
      resetBtn.style.display = 'inline-block';
    }
  });

  // ---------------------------------------------------------------
  // Render de resultados
  // ---------------------------------------------------------------
  function renderResults(data){
    const pred = data.prediccion;
    const info = data.info_educativa;

    document.getElementById('resClase').textContent = pred.nombre_display;
    document.getElementById('resCategoria').textContent = pred.categoria;
    document.getElementById('resConfianza').textContent = pred.confianza + '%';

    // Pill de riesgo
    const riskColors = {
      'alto': 'var(--risk-alto)',
      'medio-alto': 'var(--risk-medio-alto)',
      'medio': 'var(--risk-medio)',
      'bajo': 'var(--risk-bajo)'
    };
    const riskColor = riskColors[pred.nivel_riesgo] || '#7f8c8d';
    const pill = document.getElementById('resRiesgo');
    pill.style.color = riskColor;
    pill.style.background = riskColor + '1A';
    pill.querySelector('.dot').style.background = riskColor;
    document.getElementById('resRiesgoTexto').textContent = 'Riesgo ' + pred.nivel_riesgo;

    // Color del número de confianza
    document.getElementById('resConfianza').style.color = riskColor;

    // Barras top-5
    const barsContainer = document.getElementById('bars');
    barsContainer.innerHTML = '';
    data.top5.forEach(item => {
      const row = document.createElement('div');
      row.className = 'bar-row';
      row.innerHTML = `
        <div class="bar-label">${item.nombre_display}</div>
        <div class="bar-track"><div class="bar-fill" style="width:0%"></div></div>
        <div class="bar-pct">${item.probabilidad}%</div>
      `;
      barsContainer.appendChild(row);
      requestAnimationFrame(() => {
        row.querySelector('.bar-fill').style.width = item.probabilidad + '%';
      });
    });

    // Descripción
    document.getElementById('resDescripcion').textContent = info.descripcion;

    // Qué observar
    const obsList = document.getElementById('obsList');
    const obsSection = document.getElementById('seccionObservar');
    obsList.innerHTML = '';
    if (info.que_observar && info.que_observar.length){
      obsSection.style.display = 'block';
      info.que_observar.forEach(txt => {
        const li = document.createElement('li');
        li.textContent = txt;
        obsList.appendChild(li);
      });
    } else {
      obsSection.style.display = 'none';
    }

    // Recomendación + aviso legal
    document.getElementById('resRecomendacion').textContent = info.recomendacion;
    document.getElementById('resAvisoLegal').textContent = '⚠ ' + data.aviso_legal;

    resultsEl.classList.add('show');
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ---------------------------------------------------------------
  // Status helper
  // ---------------------------------------------------------------
  function showStatus(type, msg){
    statusEl.className = 'status show ' + type;
    statusEl.textContent = msg;
  }
  function hideStatus(){
    statusEl.className = 'status';
    statusEl.textContent = '';
  }
</script>
</body>
</html>
