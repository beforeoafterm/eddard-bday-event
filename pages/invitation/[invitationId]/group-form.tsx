import cn from 'classnames'
import { motion } from 'framer-motion'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Layout from '@/components/layout'
import Button from '@/components/shared/button'
import { LoadingSpinner } from '@/components/shared/icons'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/constants'
import { getAttendee } from '@/lib/directus'

import { InvitationPageProps, InvitationParams } from 'types/Invitation.types'

import styles from './invitation.module.css'

export default function GroupForm({ attendee }: InvitationPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (
      !attendee.email ||
      (!attendee.canInvite && attendee.groupedAttendees.length === 0) ||
      attendee.status === 'accomplished'
    ) {
      router.push({
        pathname: `/invitation/${attendee.id}`
      })
      return
    }
    setIsLoading(false)
  }, [router, attendee.email, attendee.id, attendee.canInvite, attendee.groupedAttendees, attendee.status])

  const confirmGroupedAttendees = async () => {
    setIsLoading(true)

    await fetch(`/api/attendees/${attendee.id}`, {
      body: JSON.stringify({
        status: 'accomplished'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'PATCH'
    })

    // TODO: Handle possible errors

    router.push({
      pathname: `/invitation/${attendee.id}/accomplished`
    })
  }

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    )
  }

  return (
    <Layout>
      <motion.div
        className={cn(styles.InvitationPage_panel)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <h1 className={cn(styles.InvitationPage_heading)}>
          Who&apos;s coming with you, <span className={cn(styles.InvitationPage_inviteeName)}>{attendee.firstName}</span>?
        </h1>
      </motion.div>
      <motion.div
        className={cn(styles.InvitationPage_panel)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <p className={cn(styles.InvitationPage_message)}>
          Thank you for RSVPing to Kirk&apos;s birthday bash. We&apos;re thrilled to hear that you and your heroic sidekicks will be joining us for this epic celebration!
        </p>
        <p className={cn(styles.InvitationPage_message)}>
          We&apos;re happy to confirm that you&apos;re allowed to bring your heroic sidekicks to accompany you. If you plan to bring multiple sidekicks, please kindly let Kirk&apos;s parent know by sending us a quick message or email.
        </p>
      </motion.div>
      <motion.div
        className={cn(styles.InvitationPage_buttons)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <Button theme='primary' onClick={confirmGroupedAttendees}>
          Okay, will do!
        </Button>
      </motion.div>
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