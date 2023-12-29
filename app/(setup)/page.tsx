import db from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile'
import React from 'react'
import { redirect } from 'next/navigation'

const SetupPage = async () => {
  // get profile from initial profile util function.
  const profile = await initialProfile();

  // check if this profile is associated with any server, stored in db
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        }
      }
    }
  })

  // if server found associated with this profile then redirect to the server  directly.
  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return (
    <div>Create a server</div>
  )
}

export default SetupPage