import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  const { id, content } = req.body;

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  
  // Upsert: kalau ID sudah ada, di-update. Kalau belum, di-insert.
  const { error } = await supabase.from('clips').upsert({ id, content, updated_at: new Date() });

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ success: true });
}
