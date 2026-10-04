import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BookTutorClient from "./BookTutorClient";

export default async function BookTutorPage({ params }: { params: Promise<{ tutorId: string }> }) {
  const { tutorId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ดึงข้อมูลติวเตอร์
  const { data: tutorProfile } = await supabase
    .from("tutor_profiles")
    .select("*, profiles(full_name)")
    .eq("id", tutorId)
    .single();

  if (!tutorProfile) {
    redirect("/dashboard/tutors");
  }

  // ดึงชื่อวิชา
  const teachingSubjects = tutorProfile.teaching_subjects || [];
  const { data: subjects } = await supabase
    .from("subjects")
    .select("name")
    .in("id", teachingSubjects.length > 0 ? teachingSubjects : ["none"]);

  const subjectNames = subjects?.map(s => s.name) || [];
  const tutorName = (tutorProfile.profiles as any)?.full_name || "ติวเตอร์";

  return (
    <BookTutorClient 
      tutorProfile={tutorProfile} 
      tutorName={tutorName}
      subjectNames={subjectNames}
      userId={user.id} 
    />
  );
}
