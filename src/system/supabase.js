import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL || 'https://xorwweyxbkzubxbrmgvq.supabase.co'
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_wDEZSbHJhJ16U5DVuX8t0Q_Zkwh4_2Z'

export const supabase = createClient(url, key)
