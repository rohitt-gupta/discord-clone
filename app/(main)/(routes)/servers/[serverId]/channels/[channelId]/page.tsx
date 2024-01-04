import ChatHeader from "@/components/chat/ChatHeader";
import { currentProfile } from "@/lib/current-profile";
import db from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

export interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  }
}

const ChannelIdPage: FC<ChannelIdPageProps> = async ({ params: { channelId, serverId } }) => {

  const profile = await currentProfile()

  if (!profile) return redirectToSignIn()

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    }
  })
  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id
    }
  })


  if (!channel || !member) return redirect('/')
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
    </div>
  );
};
export default ChannelIdPage 