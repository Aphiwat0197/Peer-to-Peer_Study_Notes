import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import GroupDetailClient from "./GroupDetailClient";

export const dynamic = 'force-dynamic';

export default async function GroupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: group, error } = await supabase
    .from("study_groups")
    .select(`
      *,
      subjects(name),
      profiles(full_name),
      study_group_participants(user_id)
    `)
    .eq("id", id)
    .single();

  if (error || !group) {
    notFound();
  }

  const isJoined = group.study_group_participants?.some((p: any) => p.user_id === user?.id);
  const isOwner = group.created_by === user?.id;
  const participantCount = group.study_group_participants?.length || 0;

  return (
    <GroupDetailClient
      group={group}
      isJoined={isJoined}
      isOwner={isOwner}
      participantCount={participantCount}
      userId={user?.id || ""}
    />
  );
}
