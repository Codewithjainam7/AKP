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
    const [heroRes, statsRes, papersRes, patentsRes, copyrightsRes, certsRes, expRes] = await Promise.all([
      supabase.from('hero').select('*').eq('id', 1).single(),
      supabase.from('hero_stats').select('*').order('id'),
      supabase.from('research_papers').select('*').order('id'),
      supabase.from('patents').select('*').order('id'),
      supabase.from('copyrights').select('*').order('id'),
      supabase.from('certifications').select('*').order('id'),
      supabase.from('experiences').select('*').order('id')
    ]);

    // Handle any serious connection errors
    if (heroRes.error && heroRes.error.code !== 'PGRST116') throw heroRes.error;

    // Assemble the JSON object exactly as the UI expects it
    const data = {
      hero: { ...(heroRes.data || {}), stats: statsRes.data || [] },
      researchPapers: papersRes.data || [],
      patents: patentsRes.data || [],
      copyrights: copyrightsRes.data || [],
      certifications: certsRes.data || [],
      experiences: expRes.data || []
    };

    if (Object.keys(data.hero).length > 1 || data.researchPapers.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.error('Error fetching from Supabase, falling back to local storage:', err);
  }
  
  return getDatabase();
}

/**
 * Saves the database state.
 * Always saves to localStorage and Supabase individual tables.
 */
export async function saveDatabase(data) {
  // Save to localStorage immediately for quick UI updates
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  // Save to Supabase Tables
  try {
    // 1. Save Hero
    if (data.hero) {
      const heroData = { ...data.hero };
      delete heroData.stats;
      heroData.id = 1;
      const { error: heroErr } = await supabase.from('hero').upsert(heroData);
      if (heroErr) throw heroErr;
      
      // Save Hero Stats
      await supabase.from('hero_stats').delete().neq('id', 0);
      if (data.hero.stats?.length > 0) {
        const stats = data.hero.stats.map(s => { delete s.id; return s; });
        await supabase.from('hero_stats').insert(stats);
      }
    }

    // 2. Save Research Papers
    await supabase.from('research_papers').delete().neq('id', 0);
    if (data.researchPapers?.length > 0) {
      const papers = data.researchPapers.map(p => { delete p.id; return p; });
      await supabase.from('research_papers').insert(papers);
    }

    // 3. Save Patents
    await supabase.from('patents').delete().neq('id', 0);
    if (data.patents?.length > 0) {
      const patents = data.patents.map(p => { delete p.id; return p; });
      await supabase.from('patents').insert(patents);
    }

    // 4. Save Copyrights
    await supabase.from('copyrights').delete().neq('id', 0);
    if (data.copyrights?.length > 0) {
      const copyrights = data.copyrights.map(c => { delete c.id; return c; });
      await supabase.from('copyrights').insert(copyrights);
    }

    // 5. Save Certifications
    await supabase.from('certifications').delete().neq('id', 0);
    if (data.certifications?.length > 0) {
      const certs = data.certifications.map(c => { delete c.id; return c; });
      await supabase.from('certifications').insert(certs);
    }

    // 6. Save Experiences
    await supabase.from('experiences').delete().neq('id', 0);
    if (data.experiences?.length > 0) {
      const exp = data.experiences.map(e => { 
        if (!e.id) e.id = Date.now() + Math.floor(Math.random() * 1000); 
        return e; 
      });
      await supabase.from('experiences').insert(exp);
    }

    return { success: true, method: 'supabase' };
  } catch (err) {
    console.error('Supabase multi-table update failed:', err);
    return { success: false, method: 'localStorage', error: err.message };
  }
}
