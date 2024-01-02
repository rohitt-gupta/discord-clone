import { currentProfile } from "@/lib/current-profile";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request,
  { params }: { params: { memberId: string } }
) {

  try {
    const profile = await currentProfile()

    const { searchParams } = new URL(req.url);
    const { role } = await req.json()

    const serverId = searchParams.get('serverId')

    if (!profile) return new NextResponse("Unauthorized", {
      status: 401,
    })

    if (!serverId) return new NextResponse("Server ID missing", {
      status: 400,
    })

    if (!params.memberId) return new NextResponse("Member ID missing", {
      status: 400,
    })

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: {
              not: profile.id
            }
          }
        }
      },
      include: {
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

    return NextResponse.json(server)

  } catch (error) {
    console.log("[MEMBERS_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", {
      status: 401,
    })

    // since i am calling the api in the below format
    // we need to extract searchParams from the url and data ={role} from the req.

    /**
     *  const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        }
      });
      const response = await axios.patch(url, { role });
     */
    const { searchParams } = new URL(req.url);
    const { role } = await req.json()

    const serverId = searchParams.get('serverId')

    if (!profile) return new NextResponse("Unauthorized", {
      status: 401,
    })

    if (!serverId) return new NextResponse("Server ID missing", {
      status: 400,
    })

    if (!params.memberId) return new NextResponse("Member ID missing", {
      status: 400,
    })


    // if everything is fine then update the server, with latest role

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              }
            },
            data: {
              role
            }
          }
        }
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: 'asc'
          }
        }
      }
    })

    return NextResponse.json(server)

  } catch (error) {
    console.log("[MEMBERS_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}