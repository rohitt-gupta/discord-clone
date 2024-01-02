import { currentProfile } from "@/lib/current-profile";
import db from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { FC } from "react";
import { ServerHeader } from "./ServerHeader";

export interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar: FC<ServerSidebarProps> = async ({ serverId }) => {

  const profile = await currentProfile();

  if (!profile) return redirect('/');

  // fetch server
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc"
        }
      }
    }
  })

  // seperate text channels, audio channels and video channels from the server
  const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
  const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
  const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)

  // get members without ourself
  const members = server?.members.filter((member) => member.profileId !== profile.id)

  if (!server) return redirect("/");

  // get role
  const role = server.members.find((member) => member.profileId === profile.id)?.role;




  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader
        server={server}
        role={role}
      />
    </div >
  );
};
export default ServerSidebar 