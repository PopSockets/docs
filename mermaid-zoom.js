// Mermaid diagram zoom functionality
// Click on any mermaid diagram to view it in a fullscreen modal

document.addEventListener('DOMContentLoaded', function() {
  // Create modal overlay
  const modal = document.createElement('div');
  modal.id = 'mermaid-modal';
  modal.innerHTML = `
    <div class="mermaid-modal-backdrop"></div>
    <div class="mermaid-modal-content">
      <button class="mermaid-modal-close">&times;</button>
      <div class="mermaid-modal-body"></div>
    </div>
  `;
  document.body.appendChild(modal);

  // Add styles
  const styles = document.createElement('style');
  styles.textContent = `
    #mermaid-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
    }
    #mermaid-modal.active {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mermaid-modal-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.85);
    }
    .mermaid-modal-content {
      position: relative;
      max-width: 95vw;
      max-height: 95vh;
      overflow: auto;
      background: white;
      border-radius: 8px;
      padding: 20px;
    }
    .mermaid-modal-close {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 28px;
      background: none;
      border: none;
      cursor: pointer;
      color: #666;
      z-index: 1;
    }
    .mermaid-modal-close:hover {
      color: #000;
    }
    .mermaid-modal-body {
      padding-top: 20px;
    }
    .mermaid-modal-body svg {
      max-width: 100%;
      height: auto;
    }
    /* Make mermaid diagrams show they're clickable */
    .mermaid {
      cursor: zoom-in;
      transition: opacity 0.2s;
    }
    .mermaid:hover {
      opacity: 0.8;
    }
  `;
  document.head.appendChild(styles);

  // Close modal handlers
  modal.querySelector('.mermaid-modal-backdrop').addEventListener('click', closeModal);
  modal.querySelector('.mermaid-modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Add click handlers to mermaid diagrams
  function initMermaidZoom() {
    document.querySelectorAll('.mermaid').forEach(function(diagram) {
      if (diagram.dataset.zoomEnabled) return;
      diagram.dataset.zoomEnabled = 'true';

      diagram.addEventListener('click', function() {
        const svg = diagram.querySelector('svg');
        if (svg) {
          const clone = svg.cloneNode(true);
          modal.querySelector('.mermaid-modal-body').innerHTML = '';
          modal.querySelector('.mermaid-modal-body').appendChild(clone);
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });
  }

  // Run on load and watch for dynamic content
  initMermaidZoom();

  // Re-run periodically to catch dynamically loaded diagrams
  setInterval(initMermaidZoom, 2000);
});
