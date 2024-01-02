import ServerSidebar from "@/components/server/ServerSidebar";
import { currentProfile } from "@/lib/current-profile";
import db from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

export interface ServerIdLayoutProps {
  children: React.ReactNode;
  params: { serverId: string }
}

const ServerIdLayout: FC<ServerIdLayoutProps> = async ({
  children, params
}) => {

  const profile = await currentProfile()
  if (!profile) return redirectToSignIn()

  // we will use members profile id as well because if we chekc only using serverId anyone can fetch the data
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  if (!server) return redirect("/")


  return (
    <div className="h-full">
      <div
        className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        {/* server sidebar */}
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">
        {children}
      </main>
    </div>
  );
};
export default ServerIdLayout 