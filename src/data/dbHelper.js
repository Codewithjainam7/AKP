import defaultDb from './db.json';
import { supabase } from './supabaseClient';

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
 * Fetches the latest database from Supabase and updates localStorage.
 */
export async function fetchDatabase() {
  try {
    const { data, error } = await supabase
      .from('portfolio_data')
      .select('data')
      .eq('id', 1)
      .single();

    if (error) throw error;

    if (data && data.data && Object.keys(data.data).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.data));
      return data.data;
    }
  } catch (err) {
    console.error('Error fetching from Supabase, falling back to local storage:', err);
  }
  
  return getDatabase();
}

/**
 * Saves the database state.
 * Always saves to localStorage and Supabase.
 */
export async function saveDatabase(data) {
  // Save to localStorage immediately for quick UI updates
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  // Save to Supabase
  try {
    const { error } = await supabase
      .from('portfolio_data')
      .update({ data: data })
      .eq('id', 1);

    if (error) {
      throw error;
    }
    return { success: true, method: 'supabase' };
  } catch (err) {
    console.error('Supabase update failed, fell back to local storage only:', err);
    return { success: false, method: 'localStorage', error: err.message };
  }
}
