import { currentProfile } from "@/lib/current-profile";
import db from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

export interface InvitePageProps {
  params: {
    inviteCode: string;
  }
}

/**
 * THsi page is rendered whneever a user clicks on the invite code link
 * Here we redirect the user to the server page with which the inviteCode is attached!!
 * @param params:InviteCode
 * @returns 
 */
const page: FC<InvitePageProps> = async ({ params }) => {
  const profile = await currentProfile()
  // if not a regisered user or loggedin user then redirect to sign in  
  if (!profile) return redirectToSignIn({ returnBackUrl: '/' })
  // if the invite code is not present redirect to home page
  if (!params.inviteCode) return redirect("/")


  // check if the user is already joined the server for which the invite code we are sending!!
  // if the existing server is present just redirect to the server page no need to again join the server

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })
  if (existingServer) return redirect(`/servers/${existingServer.id}`)


  // if the user is not yet a member of the server, then allow him to join the 
  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id
          }
        ]
      }
    }
  });

  if (server) return redirect(`/servers/${server.id}`)

  return (
    null
  );
};
export default page 