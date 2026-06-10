import defaultDb from './db.json';

const STORAGE_KEY = 'portfolio_db';

/**
 * Retrieves the current database.
 * Checks localStorage first to retrieve user edits, otherwise falls back to static JSON.
 */
export function getDatabase() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error reading from localStorage', e);
  }
  
  // Initialize localStorage with default data if empty
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDb));
  } catch (e) {
    console.error('Error writing default DB to localStorage', e);
  }
  return defaultDb;
}

/**
 * Saves the database state.
 * Always saves to localStorage so the UI displays it immediately in production.
 * In local development, also sends a POST request to Vite backend to write to src/data/db.json.
 */
export async function saveDatabase(data) {
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  // If in development mode, save to disk using our custom Vite endpoint
  if (import.meta.env.DEV) {
    try {
      const response = await fetch('/api/save-db', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to save database to disk: ${response.statusText}`);
      }
      return { success: true, method: 'disk' };
    } catch (err) {
      console.warn('Vite custom endpoint failed, fell back to local storage only:', err);
      return { success: true, method: 'localStorage', error: err.message };
    }
  }

  return { success: true, method: 'localStorage' };
}
