import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import db from '@/lib/db';


/**
 * This initial profile util Returns the current loggedin user, thats it.
 * It handles almost all the edge cases
 * @returns Profile object
 */
export const initialProfile = async () => {
  // get current logged in user
  const user = await currentUser();

  // if no user is logged in, redirect user to the Sign In screen
  if (!user) return redirectToSignIn();

  // if the user is loggedin
  // check if the loggwed in user is present or not
  // 1. Check if the logged in user is present in the db or not
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    }
  })

  // if profile present in db or logged in user present in db
  if (profile) {
    return profile
  }

  // if profile is not present in db, create a new entry in db

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  })


  return newProfile;
}