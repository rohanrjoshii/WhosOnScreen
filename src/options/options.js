import { MSG } from '../shared/messages.js';

const tmdbInput = document.getElementById('tmdb-key');
const autoPauseInput = document.getElementById('auto-pause');
const status = document.getElementById('status');
const saveButton = document.getElementById('save');
const clearButton = document.getElementById('clear-cache');

function showStatus(message, isError = false) {
  status.textContent = message;
  status.style.color = isError ? '#f87171' : '#34d399';
}

async function loadSettings() {
  const values = await chrome.storage.local.get(['tmdbApiKey', 'wosAutoPause']);
  tmdbInput.value = values.tmdbApiKey || '';
  autoPauseInput.checked = !!values.wosAutoPause;
}

async function saveSettings() {
  saveButton.disabled = true;
  try {
    await chrome.storage.local.set({
      tmdbApiKey: tmdbInput.value.trim(),
      wosAutoPause: autoPauseInput.checked,
    });
    showStatus('Settings saved.');
  } catch (error) {
    showStatus(`Could not save settings: ${error.message}`, true);
  } finally {
    saveButton.disabled = false;
  }
}

async function clearCache() {
  clearButton.disabled = true;
  try {
    const values = await chrome.storage.local.get(null);
    const cacheKeys = Object.keys(values).filter(
      (key) => key.startsWith('wos_cache_') || key.startsWith('wos_cast_') || key.startsWith('wos_mc_')
    );
    if (cacheKeys.length) await chrome.storage.local.remove(cacheKeys);
    await chrome.runtime.sendMessage({ type: MSG.CLEAR_CAST_CACHE });
    showStatus(cacheKeys.length ? `Cleared ${cacheKeys.length} cached entries.` : 'No cached data to clear.');
  } catch (error) {
    showStatus(`Could not clear cached data: ${error.message}`, true);
  } finally {
    clearButton.disabled = false;
  }
}

saveButton.addEventListener('click', saveSettings);
clearButton.addEventListener('click', clearCache);
loadSettings().catch((error) => showStatus(`Could not load settings: ${error.message}`, true));
