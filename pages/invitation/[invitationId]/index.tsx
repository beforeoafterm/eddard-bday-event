
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import Layout from '@/components/layout'
import Rsvp from '@/components/invitation/rsvp'
import { getAttendee } from '@/lib/directus'

import { InvitationPageProps, InvitationParams } from 'types/Invitation.types'
import { useEffect, useState } from 'react'
import { LoadingSpinner } from '@/components/shared/icons'


export default function InvitationPage({ attendee }: InvitationPageProps) {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (attendee.status === 'confirmed') {
      router.push({
        pathname: `/invitation/${attendee.id}/form`
      })
      return
    }

    if (attendee.status === 'declined') {
      router.push({
        pathname: `/invitation/${attendee.id}/declined`
      })
      return
    }

    if (attendee.status === 'accomplished') {
      router.push({
        pathname: `/invitation/${attendee.id}/accomplished`
      })
      return
    }


    setIsLoading(false)
  }, [router, attendee.status, attendee.id])

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    )
  }

  return (
    <Layout>
      <Rsvp attendee={attendee} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { invitationId } = params as InvitationParams
  const attendee = await getAttendee(invitationId)
  return {
    props: {
      attendee,
    },
  }
}