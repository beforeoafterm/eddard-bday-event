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

export default function Declined({ attendee }: InvitationPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (attendee.status !== 'declined') {
      router.push({
        pathname: `/invitation/${attendee.id}`
      })
      return
    }
    setIsLoading(false)
  }, [router, attendee.status, attendee.id])

  const confirmInvitation = async () => {
    setIsLoading(true)
    await fetch(`/api/attendees/${attendee.id}`, {
      body: JSON.stringify({
        status: 'confirmed'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'PATCH'
    })

    // TODO: Handle possible errors

    // Redirect to invitation form page
    router.push({
      pathname: `/invitation/${attendee.id}/form`
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
          Sad to hear you cannot go, <span className={cn(styles.InvitationPage_inviteeName)}>{attendee.firstName}</span>...
        </h1>
      </motion.div>
      <motion.div
        className={cn(styles.InvitationPage_panel)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <p
          className={cn(styles.InvitationPage_message)}>
          We understand that you won&apos;t be able to join us for Kirk&apos;s birthday bash, and we completely understand. Your heroism is needed elsewhere, and we appreciate your dedication to saving the world.
        </p>
        <p className={cn(styles.InvitationPage_message)}>
          We&apos;re also planning to shower Kirk with heroic gifts, and we&apos;d love for you to join in on the gift-giving fun! You can check our gift ideas to choose a gift to send over as a birthday present instead.
        </p>
        <p className={cn(styles.InvitationPage_message)}>
          Thank you for letting us know you won&apos;t be able to make it. We know that you&apos;ll be doing something heroic and that we&apos;ll definitely catch you at our next heroic gathering!
        </p>
        <p className={cn(styles.InvitationPage_message, 'font-black')}>
          Stay heroic,
        </p>
        <p className={cn(styles.InvitationPage_message, 'font-black')}>
          - Kirk and the Bud-squad Heroes
        </p>
      </motion.div>
      <motion.div
        className={cn(styles.InvitationPage_buttons)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <Button onClick={confirmInvitation}>
          I change my mind, I want to go!
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