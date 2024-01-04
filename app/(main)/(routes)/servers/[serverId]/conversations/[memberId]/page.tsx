import ChatHeader from "@/components/chat/ChatHeader";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import db from "@/lib/db";
import { redirectToSignIn, } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

export interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  }
}

const MemberIdPage: FC<MemberIdPageProps> = async ({ params: { memberId, serverId } }) => {

  const profile = await currentProfile()

  if (!profile) return redirectToSignIn()

  const currentMember = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile.id
    },
    include: {
      profile: true
    }
  })

  if (!currentMember) return redirect("/")

  const conversation = await getOrCreateConversation(currentMember.id, memberId)

  if (!conversation) return redirect(`/servers/${serverId}`);

  const { memberOne, memberTwo } = conversation


  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        serverId={serverId}
        type="conversation"
      />
    </div>
  );
};
export default MemberIdPage 