import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CreateGroupClient from "./CreateGroupClient";

export const dynamic = 'force-dynamic';

export default async function CreateGroupPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: subjects } = await supabase
    .from("subjects")
    .select("id, name")
    .order("name");

  return <CreateGroupClient subjects={subjects || []} userId={user.id} />;
}
