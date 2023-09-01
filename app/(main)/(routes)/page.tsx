import { ModeToggle } from '@/components/ModeToggle'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl='/' />
      <ModeToggle />
    </div>
  )
}
