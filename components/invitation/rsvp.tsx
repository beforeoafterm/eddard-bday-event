import cn from 'classnames'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Button from '@/components/shared/button'
import { LoadingSpinner } from '@/components/shared/icons'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/constants'

import { InvitationPageProps } from 'types/Invitation.types'

import styles from '@/pages/invitation/[invitationId]/invitation.module.css'

export default function Rsvp({ attendee }: InvitationPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  const declineInvitation = async () => {
    setIsLoading(true)
    await fetch(`/api/attendees/${attendee.id}`, {
      body: JSON.stringify({
        status: 'declined'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'PATCH'
    })

    // TODO: Handle possible errors

    // Redirect to declined message page
    router.push({
      pathname: `/invitation/${attendee.id}/declined`
    })
  }

  if (isLoading) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <>
      <motion.div
        className={cn(styles.InvitationPage_panel)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <h1 className={cn(styles.InvitationPage_heading)}>
          Welcome, <span className={cn(styles.InvitationPage_inviteeName)}>{attendee.firstName}</span>!
        </h1>
      </motion.div>
      <motion.div
        className={cn(styles.InvitationPage_panel)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <p
          className={cn(
            styles.InvitationPage_message,
            'font-black'
          )}>
          I&apos;m so excited to have you join me for my Hero&apos;s Journey Celebration!
        </p>
        <p className={cn(styles.InvitationPage_message)}>
          This epic event will be packed with magnificent activities, daring games, and heroic challenges, including a high-stakes laser tag battle! And, we&apos;ll have a feast of heroic snacks and drinks for all to enjoy.
        </p>
        <div className={cn(styles.InvitationPage_eventDetails)}>
          <div className={cn(styles.InvitationPage_eventDetail)}>
            <h2 className={cn(styles.InvitationPage_eventDetailLabel)}>Date and Time</h2>
            <p className={cn(styles.InvitationPage_eventDetailText)}>
              March 5, 2023 - 4:30pm-8:00pm
              <a
                className={cn(styles.InvitationPage_a)}
                href='https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=NjQxaHB2NGhlYWpzMnNhYmxlbHJjZDFhNzEgZmFtaWx5MDMwNjk4OTg0ODkyNDIyNzk4NzRAZw&amp;tmsrc=family03069898489242279874%40group.calendar.google.com'
                target='_blank'
                rel='noreferrer'
              >
                (Add to Google calendar)
              </a>
            </p>
          </div>
          <div className={cn(styles.InvitationPage_eventDetail)}>
            <h2 className={cn(styles.InvitationPage_eventDetailLabel)}>Location</h2>
            <p className={cn(styles.InvitationPage_eventDetailText)}>
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
        <p
          className={cn(
            styles.InvitationPage_message,
            'underline',
            'underline-offset-4'
          )}>
          Please RSVP for the celebration below!
        </p>
        <p className={cn(styles.InvitationPage_message)}>
          Let us know if you&apos;ll be wearing a heroic costume, as we&apos;ll have a costume contest for the bravest and most dynamic hero, with a magnificent reward for the champion.
        </p>
        <p className={cn(styles.InvitationPage_message, 'font-black')}>
          - Kirk (aka. Spiderman Bud)
        </p>
      </motion.div>
      <motion.div
        className={cn(styles.InvitationPage_buttons)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <Button
          theme='secondary'
          onClick={declineInvitation}>
          Sorry, I must decline...
        </Button>
        <Button onClick={confirmInvitation}>
          Count me in! Let&apos;s gooo!
        </Button>
      </motion.div>
    </>
  )
}
