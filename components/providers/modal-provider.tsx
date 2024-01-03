"use client"

import { useEffect, useState } from "react"
import { CreateServerModal } from "../modals/CreateServerModal"
import { InviteModal } from "../modals/InviteModal";
import { EditServerModal } from "../modals/EditServerModal";
import { MembersModal } from "../modals/MembersModal";
import { CreateChannelModal } from "../modals/CreateChannelModal";
import { LeaveServerModal } from "../modals/LeaveServerModal";
import { DeleteServerModal } from "../modals/DeleteServerModal";
import { DeleteChannelModal } from "../modals/DeleteChannelModal";
import { EditChannelModal } from "../modals/EditChannelModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null;
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      {/*<MessageFileModal />
      <DeleteMessageModal /> */}
    </>
  )
}