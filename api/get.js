import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'ID required' });

  // Mengambil Environment Variables dengan aman di Vercel
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  
  const { data, error } = await supabase.from('clips').select('content').eq('id', id).single();

  if (error) return res.status(200).json({ content: null }); // Jika belum ada, return null
  return res.status(200).json({ content: data.content });
}
