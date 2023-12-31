import { auth } from "@clerk/nextjs";

import db from "@/lib/db";


/**
 * A utility function that returns the current logged in profile if available orherwise null
 * @returns Proile or Null if not available
 */
export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const profile = await db.profile.findFirst({
    where: {
      userId
    }
  })

  return profile
}