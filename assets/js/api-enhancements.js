// Enhanced API loading with error handling and loading states
// Add this to main.min.js for better UX

// Utility function for API calls with error handling
async function fetchWithErrorHandling(url, fallbackData = null) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    
    // Show user-friendly error message
    showNotification(`Unable to load latest content. Some features may be limited.`, 'warning');
    
    // Return fallback data if available
    return fallbackData;
  }
}

// Show notification to users
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <div class="notification__content">
      <i class="ri-information-line"></i>
      <span>${message}</span>
      <button class="notification__close" onclick="this.parentElement.parentElement.remove()">
        <i class="ri-close-line"></i>
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Add loading skeleton for better UX
function showLoadingSkeleton(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `
      <div class="loading-skeleton">
        <div class="skeleton-item"></div>
        <div class="skeleton-item"></div>
        <div class="skeleton-item"></div>
      </div>
    `;
  }
}

// Add these CSS classes for loading states and notifications
const additionalCSS = `
  .loading-skeleton {
    display: flex;
    gap: 1rem;
    padding: 1rem;
  }
  
  .skeleton-item {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    height: 200px;
    flex: 1;
    border-radius: 8px;
  }
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  .notification {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    max-width: 400px;
    border-left: 4px solid var(--first-color);
  }
  
  .notification--warning {
    border-left-color: #fbbf24;
  }
  
  .notification--error {
    border-left-color: #ef4444;
  }
  
  .notification__content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .notification__close {
    background: none;
    border: none;
    cursor: pointer;
    margin-left: auto;
  }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);