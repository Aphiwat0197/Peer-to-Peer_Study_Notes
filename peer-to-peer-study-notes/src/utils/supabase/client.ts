import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // ฟังก์ชันนี้จะสร้างการเชื่อมต่อกับ Supabase Database 
  // โดยดึงค่า URL และ KEY จากไฟล์ .env.local
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
