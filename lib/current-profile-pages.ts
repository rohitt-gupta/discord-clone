import db from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";


/**
 * A utility function that returns the current logged in profile if available orherwise null
 * @returns Proile or Null if not available
 */
export const currentProfilePages = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);

  if (!userId) return null;

  const profile = await db.profile.findFirst({
    where: {
      userId
    }
  })

  return profile
}