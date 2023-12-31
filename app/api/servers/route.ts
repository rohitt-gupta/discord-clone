import { currentProfile } from "@/lib/current-profile";
import db from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"

/**
 * THis POST request takes in name and image url of the server and creates a server using the associated profile
 * @param req ={name:string,imageUrl:string}
 * @returns NextResponse
 */
export async function POST(req: Request) {
  try {
    // extract the name and imageUrl
    const { name, imageUrl } = await req.json();
    // get the profile from the util function
    const profile = await currentProfile();

    // if profile not found , then return a response with unauthorized access with status as 401
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    // if the profile is present / authorized, then we create the server in the db
    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            { name: 'general', profileId: profile.id }
          ]
        },
        members: {
          create: [
            { profileId: profile.id, role: MemberRole.ADMIN }
          ]
        }
      }
    })

    return NextResponse.json(server)


  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
