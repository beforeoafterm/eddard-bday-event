
import { GetServerSideProps } from 'next'

import Layout from '@/components/layout'
import { getAttendee } from '@/lib/directus'

import { InvitationPageProps, InvitationParams } from 'types/Invitation.types'

import Rsvp from '@/components/invitation/rsvp'

export default function InvitationPage({ attendee }: InvitationPageProps) {
  return (
    <Layout>
      <Rsvp attendee={attendee}/>
    </Layout >
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