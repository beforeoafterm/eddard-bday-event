import cn from 'classnames'
import { motion } from 'framer-motion'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Button from '@/components/shared/button'
import ButtonLink from '@/components/shared/button-link'
import { LoadingSpinner } from '@/components/shared/icons'

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/constants'
import { getAttendee } from '@/lib/directus'

import { InvitationPageProps, InvitationParams } from 'types/Invitation.types'

import styles from './accomplished.module.css'
import Layout from '@/components/layout'

export default function Accomplished({ attendee }: InvitationPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (attendee.status !== 'accomplished') {
      router.push({
        pathname: `/invitation/${attendee.id}`
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
      <motion.div
        className={cn(styles.Accomplished_panel)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <h1 className={cn(styles.Accomplished_heading)}>
          You&apos;re our newest hero, <span className={cn(styles.Accomplished_inviteeName)}>{attendee.firstName}</span>! 🦸🏻
        </h1>
      </motion.div>
      <motion.div
        className={cn(styles.Accomplished_panel)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <div className={cn(styles.Accomplished_eventDetails)}>
          <div className={cn(styles.Accomplished_eventDetail)}>
            <h2 className={cn(styles.Accomplished_eventDetailLabel)}>Date and Time</h2>
            <p className={cn(styles.Accomplished_eventDetailText)}>
              March 5, 2023 - 5:00pm-8:00pm
              <a
                className={cn(styles.Accomplished_a)}
                href='https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=NjQxaHB2NGhlYWpzMnNhYmxlbHJjZDFhNzEgZmFtaWx5MDMwNjk4OTg0ODkyNDIyNzk4NzRAZw&amp;tmsrc=family03069898489242279874%40group.calendar.google.com'
                target='_blank'
                rel='noreferrer'
              >
                (Add to Google calendar)
              </a>
            </p>
          </div>
          <div className={cn(styles.Accomplished_eventDetail)}>
            <h2 className={cn(styles.Accomplished_eventDetailLabel)}>Location</h2>
            <p className={cn(styles.Accomplished_eventDetailText)}>
              Heroes HQ at Shangri-La Plaza Level 5, East Wing (beside Breakout PH)
            </p>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.3191803388395!2d121.05299981488221!3d14.580879689815008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c96971f3486d%3A0x318c0e552e88a27c!2sHeroes%20Headquarters%20Shangri-La%20Plaza!5e0!3m2!1sen!2sph!4v1676893984278!5m2!1sen!2sph'
              width='600'
              height='450'
              className={cn('border-4', 'border-black', 'mt-12', 'w-full')}
              allowFullScreen={true}
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'></iframe>
          </div>
        </div>
      </motion.div>
      <motion.div
        className={cn(styles.Accomplished_panel)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <p
          className={cn(styles.Accomplished_message)}>
          We&apos;re thrilled to hear that you&apos;ll be joining us for Ned&apos;s (Kirk) big birthday bash! You&apos;ll be our newest hero to join our heroic squad, and we&apos;re looking forward to having you with us.
        </p>
        <p className={cn(styles.Accomplished_message)}>
          We&apos;re planning an epic laser tag game, heroic snacks and drinks, and a costume contest for the bravest heroes. We&apos;re also counting on you to show off your superhero moves on the dance floor!
        </p>
        <p className={cn(styles.Accomplished_message)}>
          Ned is also excited to see what heroic gift you&apos;ll bring to his birthday bash. Don&apos;t forget to check out our gift suggestions or come up with something uniquely heroic.
        </p>
        <p className={cn(styles.Accomplished_message)}>
          Thank you for joining us for this legendary celebration. We can&apos;t wait to see you there and make unforgettable heroic memories together.
        </p>
        <p className={cn(styles.Accomplished_message, 'font-black')}>
          Stay heroic,
        </p>
        <p className={cn(styles.Accomplished_message, 'font-black')}>
          - Kirk and the Hero&apos;s Bud-squad
        </p>
      </motion.div>
      <motion.div
        className={cn(styles.Accomplished_buttons)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <ButtonLink
          href='/gift-suggestions'
          text='Check out what heroic gifts you can give!' />
      </motion.div>
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