import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ApplyTutorClient from "./ApplyTutorClient";

export default async function ApplyTutorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ดึงข้อมูล tutor_profiles ปัจจุบัน (ถ้ามี)
  const { data: tutorProfile } = await supabase
    .from("tutor_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return <ApplyTutorClient userId={user.id} existingProfile={tutorProfile} />;
}
