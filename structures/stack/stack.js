// stack class
class Stack {
  constructor() {
    this.items = [];
  }

  push(val) {
    this.items.push(val);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

const stack = new Stack();

// render
const canvas = document.getElementById('canvas');

function render() {
  canvas.innerHTML = '';

  if (stack.isEmpty()) {
    canvas.innerHTML = '<span style="color:#555;font-size:0.75rem;">empty stack</span>';
    return;
  }

  const container = document.createElement('div');
  container.style.cssText = 'display:flex;flex-direction:column-reverse;align-items:center;gap:4px;';

  stack.items.forEach((val, i) => {
    const item = document.createElement('div');
    const isTop = i === stack.items.length - 1;

    item.style.cssText = `
      width: 140px;
      height: 42px;
      background: var(--surface);
      border: 1px solid ${isTop ? 'var(--accent)' : 'var(--border)'};
      color: ${isTop ? 'var(--accent)' : 'var(--text)'};
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      font-size: 0.8rem;
      font-family: monospace;
      animation: slideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;

    item.innerHTML = `<span>${val}</span><span style="color:var(--muted);font-size:0.6rem;">[${i}]</span>`;
    container.appendChild(item);
  });

  canvas.appendChild(container);
}

render();



// buttons to control the list
const input = document.getElementById('val-input');
const log = document.getElementById('log');

function addLog(msg, color = 'var(--accent)') {
  const line = document.createElement('div');
  line.style.color = color;
  line.textContent = msg;
  log.prepend(line);
}

document.getElementById('btn-insert').addEventListener('click', () => {
  const val = parseInt(input.value);
  if (isNaN(val)) { addLog('invalid value', 'var(--muted)'); return; }
  if (stack.size() >= 10) { addLog('stack overflow!', '#ff6b35'); return; }
  stack.push(val);
  render();
  addLog(`push(${val})`);
  input.value = '';
});

// adding a enter function so the user doesnt have to press the push-btn every time
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('btn-push').click();
});

document.getElementById('btn-remove').addEventListener('click', () => {
  if (stack.isEmpty()) { addLog('stack is empty', 'var(--muted)'); return; }

  const topElement = canvas.querySelector('div > div:last-child');
  if (topElement) {
    topElement.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => {
      const val = stack.pop();
      render();
      addLog(`pop() → ${val}`, '#ff6b35');
    }, 300);
  }
});

document.getElementById('btn-clear').addEventListener('click', () => {
  stack.items = [];
  render();
  addLog('cleared', 'var(--muted)');
});


document.getElementById('btn-clear-output').addEventListener('click', () => {
  log.innerHTML = '';
});