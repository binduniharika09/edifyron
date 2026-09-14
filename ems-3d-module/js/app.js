/**
 * Energy Management System (EMS) - Industrial Smart Platform
 * Dashboard Controller & Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('webgl-canvas');
  const labelsContainer = document.getElementById('labels-container');

  // Detail Modal Elements
  const modal = document.getElementById('detail-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalMaxDemand = document.getElementById('modal-max-demand');
  const modalConnectedLoad = document.getElementById('modal-connected-load');
  const modalPf = document.getElementById('modal-pf');
  const modalConsumption = document.getElementById('modal-consumption');
  const modalEquipmentBody = document.getElementById('modal-equipment-body');
  const modalFocusBtn = document.getElementById('modal-focus-btn');

  let currentSelectedUnit = null;
  let chartInstance = null;
  let isSimulating = true;

  // 1. Initialize 3D Scene
  const emsScene = new EMSScene(canvas, labelsContainer, (unitData) => {
    openUnitModal(unitData);
  });

  // 2. Setup Top Bar Live Clock
  function updateLiveClock() {
    const clockEl = document.getElementById('live-clock');
    const dateEl = document.getElementById('live-date');
    if (!clockEl || !dateEl) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour12: true });
    const dateStr = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric', weekday: 'short' });
    
    clockEl.textContent = timeStr;
    dateEl.textContent = dateStr;
  }
  setInterval(updateLiveClock, 1000);
  updateLiveClock();

  // 3. Open Unit Detail Modal
  function openUnitModal(unit) {
    currentSelectedUnit = unit;
    modalBadge.textContent = unit.id;
    modalTitle.textContent = unit.name;
    modalSubtitle.textContent = unit.category;

    modalMaxDemand.textContent = `${unit.maxDemandKVA} kVA`;
    modalConnectedLoad.textContent = `${unit.connectedLoadKW} kW`;
    modalPf.textContent = unit.pf.toFixed(2);
    modalConsumption.textContent = `${unit.consumptionPerMonthKWh.toLocaleString()} kWh`;

    // Render equipment table
    modalEquipmentBody.innerHTML = '';
    unit.majorEquipment.forEach((eq) => {
      const row = document.createElement('tr');
      const statusClass = eq.status.toLowerCase();
      row.innerHTML = `
        <td style="font-weight:600; color:#f0f6fc;">${eq.name}</td>
        <td style="font-family:var(--font-mono); color:#00e5ff;">${eq.loadKW} kW</td>
        <td><span class="status-badge ${statusClass}">${eq.status}</span></td>
      `;
      modalEquipmentBody.appendChild(row);
    });

    // Render Consumption Chart using Chart.js if available
    renderUnitChart(unit);

    modal.classList.add('show');
    modalOverlay.classList.add('show');
  }

  function renderUnitChart(unit) {
    const chartCanvas = document.getElementById('unit-chart');
    if (!chartCanvas || typeof Chart === 'undefined') return;

    if (chartInstance) {
      chartInstance.destroy();
    }

    // Generate 6 months historical data ending at the unit's monthly consumption
    const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
    const base = unit.consumptionPerMonthKWh;
    const history = [
      Math.round(base * 0.88),
      Math.round(base * 0.93),
      Math.round(base * 0.97),
      Math.round(base * 1.02),
      Math.round(base * 0.95),
      base
    ];

    chartInstance = new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Monthly Consumption (kWh)',
          data: history,
          borderColor: '#00e5ff',
          backgroundColor: 'rgba(0, 229, 255, 0.12)',
          borderWidth: 2,
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#00e676',
          pointBorderColor: '#fff',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(10, 24, 44, 0.95)',
            borderColor: '#00e5ff',
            borderWidth: 1,
            titleColor: '#fff',
            bodyColor: '#69f0ae'
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: { color: '#8fa5c4', font: { size: 10 } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: { color: '#8fa5c4', font: { size: 10 } }
          }
        }
      }
    });
  }

  function closeModal() {
    modal.classList.remove('show');
    modalOverlay.classList.remove('show');
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  if (modalFocusBtn) {
    modalFocusBtn.addEventListener('click', () => {
      closeModal();
      if (currentSelectedUnit) {
        emsScene.selectUnit(currentSelectedUnit.id);
      }
    });
  }

  // 4. Camera Controls Presets
  document.querySelectorAll('.cam-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cam-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const preset = btn.dataset.preset;
      emsScene.setCameraPreset(preset);
    });
  });

  // 5. Day / Night Toggle
  const themeToggleBtn = document.getElementById('btn-toggle-theme');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isNight = emsScene.toggleNightMode();
      themeToggleBtn.innerHTML = isNight
        ? `<span>🌙</span> <span>Night Mode</span>`
        : `<span>☀️</span> <span>Day Mode</span>`;
    });
  }

  // 6. Energy Conduits Toggle
  const conduitsToggleBtn = document.getElementById('btn-toggle-conduits');
  if (conduitsToggleBtn) {
    conduitsToggleBtn.addEventListener('click', () => {
      const active = emsScene.toggleConduits();
      conduitsToggleBtn.classList.toggle('active', active);
    });
  }

  // 7. Auto-Rotate Toggle
  const autoRotateBtn = document.getElementById('btn-auto-rotate');
  if (autoRotateBtn) {
    autoRotateBtn.addEventListener('click', () => {
      emsScene.autoRotate = !emsScene.autoRotate;
      autoRotateBtn.classList.toggle('active', emsScene.autoRotate);
    });
  }

  // 8. Navigation Items Click
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach((n) => n.classList.remove('active'));
      item.classList.add('active');
      const text = item.querySelector('span:not(.nav-item-icon)').textContent.trim();
      if (text === 'Overview') {
        emsScene.resetView();
      } else if (text === 'Equipment View') {
        emsScene.focusOnHub();
      }
    });
  });

  // 9. Real-Time Telemetry Simulation Ticker (Living Smart Campus)
  setInterval(() => {
    if (!isSimulating) return;

    // Slight realistic fluctuation in connected load (+/- 1.5%)
    const loadVariance = (Math.random() - 0.5) * 40;
    const currentTotalLoad = Math.round(EMS_DATA.overview.totalConnectedLoadKW + loadVariance);
    
    const topLoadEl = document.getElementById('top-total-load');
    const flowGridEl = document.getElementById('flow-grid-val');
    const flowUnitsEl = document.getElementById('flow-units-val');
    const metricLoadEl = document.getElementById('metric-total-load');

    if (topLoadEl) topLoadEl.innerHTML = `${currentTotalLoad.toLocaleString()} <span class="unit">kW</span>`;
    if (flowGridEl) flowGridEl.textContent = `${currentTotalLoad.toLocaleString()} kW`;
    if (flowUnitsEl) flowUnitsEl.textContent = `${currentTotalLoad.toLocaleString()} kW`;
    if (metricLoadEl) metricLoadEl.textContent = `${currentTotalLoad.toLocaleString()} kW`;

    // Update random unit marker load slightly
    const randomUnitIndex = Math.floor(Math.random() * EMS_DATA.units.length);
    const unit = EMS_DATA.units[randomUnitIndex];
    const marker = emsScene.markerElements.find((m) => m.unitId === unit.id);
    if (marker) {
      const loadValEl = marker.element.querySelector('.marker-stat-val:nth-child(2)');
      const delta = Math.round((Math.random() - 0.5) * 6);
      const newLoad = Math.max(20, unit.connectedLoadKW + delta);
      if (loadValEl) {
        loadValEl.innerHTML = `${newLoad}<span style="font-size:7.5px">kW</span>`;
      }
    }
  }, 2500);
});
