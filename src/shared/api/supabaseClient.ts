import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseKey) {
  console.error('Не заданы VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY в файле .env')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
