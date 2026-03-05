// static list class
class StaticList {
  constructor(size) {
    this.size = size;
    this.items = new Array(size).fill(null);
    // i'm creating an array here because in js, creating a vector with [] is a dynamic allocation, which is the default allocation in js.
    // here, we don't want that, we want a static allocation in memory.
  }

  insert(index, val) {
    if (index < 0 || index >= this.size) return 'invalid index';
    if (this.items[index] !== null) return 'index already occupied';
    this.items[index] = val;
    return 'ok';
  }

  remove(index) {
    if (index < 0 || index >= this.size) return 'invalid index';
    if (this.items[index] === null) return 'index already empty';
    this.items[index] = null;
    return 'ok';
  }

  get(index) {
    if (index < 0 || index >= this.size) return 'invalid index';
    return this.items[index];
  }
}

const list = new StaticList(10);

// render
const canvas = document.getElementById('canvas');

function render() {
  canvas.innerHTML = '';

  const container = document.createElement('div');
  container.style.cssText = 'display:flex;align-items:center;gap:4px;flex-wrap:wrap;justify-content:center;padding:20px;';

  list.items.forEach((val, i) => {
    const cell = document.createElement('div');
    const isEmpty = val === null;

    cell.style.cssText = `
      width: 60px;
      height: 60px;
      background: var(--surface);
      border: 1px solid ${isEmpty ? 'var(--border)' : 'var(--accent)'};
      color: ${isEmpty ? 'var(--muted)' : 'var(--accent)'};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: monospace;
      font-size: 0.85rem;
      gap: 4px;
      animation: slideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;

    cell.innerHTML = `
      <span>${isEmpty ? '—' : val}</span>
      <span style="font-size:0.55rem;color:var(--muted)">[${i}]</span>
    `;

    container.appendChild(cell);
  });

  canvas.appendChild(container);
}

render();

// controls
const indexInput = document.getElementById('index-input');
const valInput = document.getElementById('val-input');
const log = document.getElementById('log');

function addLog(msg, color = 'var(--accent)') {
  const line = document.createElement('div');
  line.style.color = color;
  line.textContent = msg;
  log.prepend(line);
}

document.getElementById('btn-insert').addEventListener('click', () => {
  const index = parseInt(indexInput.value);
  const val = parseInt(valInput.value);

  if (isNaN(index) || isNaN(val)) { addLog('invalid input', 'var(--muted)'); return; }

  const result = list.insert(index, val);
  if (result !== 'ok') { addLog(result, '#ff6b35'); return; }

  render();
  addLog(`insert(${index}, ${val})`);
  indexInput.value = '';
  valInput.value = '';
});

document.getElementById('btn-remove').addEventListener('click', () => {
  const index = parseInt(indexInput.value);

  if (isNaN(index)) { addLog('invalid index', 'var(--muted)'); return; }

  const result = list.remove(index);
  if (result !== 'ok') { addLog(result, '#ff6b35'); return; }

  render();
  addLog(`remove(${index})`, '#ff6b35');
  indexInput.value = '';
});

document.getElementById('btn-clear').addEventListener('click', () => {
  list.items = new Array(list.size).fill(null);
  render();
  addLog('cleared', 'var(--muted)');
});

document.getElementById('btn-clear-output').addEventListener('click', () => {
  log.innerHTML = '';
});