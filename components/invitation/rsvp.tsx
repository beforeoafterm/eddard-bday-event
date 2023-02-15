import cn from 'classnames'
import { motion } from 'framer-motion'

import Button from '@/components/shared/button'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/constants'

import { Attendee } from 'types/Attendees.types'

import styles from './rsvp.module.css'

export default function Rsvp({
  attendee,
}: {
  attendee: Attendee;
}) {
  const confirmInvitation = async () => {
    const response = await fetch(`/api/attendees/${attendee.id}`, {
      body: JSON.stringify({
        status: 'confirmed'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'PATCH'
    })
    const updateAttendee = await response.json()

    // Handle possible errors

    // Redirect to invitation form page
  }

  const declineInvitation = async () => {
    const response = await fetch(`/api/attendees/${attendee.id}`, {
      body: JSON.stringify({
        status: 'declined'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'PATCH'
    })
    const updateAttendee = await response.json()

    // Handle possible errors

    // Redirect to declined message page
  }

  return (
    <>
      <motion.div
        className={cn(styles.Rsvp_panel)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <h1 className={cn(styles.Rsvp_heading)}>
          Welcome, <span className={cn(styles.Rsvp_inviteeName)}>{attendee.firstName}</span>!
        </h1>
      </motion.div>
      <motion.div
        className={cn(styles.Rsvp_panel)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <p
          className={cn(
            styles.Rsvp_message,
            'font-black'
          )}>
          I&apos;m so excited to have you join me for my Hero&apos;s Journey Celebration!
        </p>
        <p className={cn(styles.Rsvp_message)}>
          This epic event will be packed with magnificent activities, daring games, and heroic challenges, including a high-stakes laser tag battle! And, we&apos;ll have a feast of heroic snacks and drinks for all to enjoy.
        </p>
        <div className={cn(styles.Rsvp_eventDetails)}>
          <div className={cn(styles.Rsvp_eventDetail)}>
            <h2 className={cn(styles.Rsvp_eventDetailLabel)}>Date and Time</h2>
            <p className={cn(styles.Rsvp_eventDetailText)}>
              March 5, 2023 - 5:00pm-8:00pm
              <a
                className={cn(styles.Rsvp_a)}
                href='https://calendar.google.com/calendar/event?action=TEMPLATE&amp;tmeid=NjQxaHB2NGhlYWpzMnNhYmxlbHJjZDFhNzEgZmFtaWx5MDMwNjk4OTg0ODkyNDIyNzk4NzRAZw&amp;tmsrc=family03069898489242279874%40group.calendar.google.com'
                target='_blank'
                rel='noreferrer'
              >
                (Add to Google calendar)
              </a>
            </p>
          </div>
          <div className={cn(styles.Rsvp_eventDetail)}>
            <h2 className={cn(styles.Rsvp_eventDetailLabel)}>Location</h2>
            <p className={cn(styles.Rsvp_eventDetailText)}>
              Heroes HQ at Shangri-La Plaza Level 5, East Wing (beside Breakout PH)
            </p>
          </div>
        </div>
        <p
          className={cn(
            styles.Rsvp_message,
            'underline',
            'underline-offset-4'
          )}>
          Please RSVP for the celebration below!
        </p>
        <p className={cn(styles.Rsvp_message)}>
          Let us know if you&apos;ll be wearing a heroic costume, as we&apos;ll have a costume contest for the bravest and most dynamic hero, with a magnificent reward for the champion.
        </p>
        <p className={cn(styles.Rsvp_message, 'font-black')}>
          - Kirk (aka. Spiderman Bud)
        </p>
      </motion.div>
      <motion.div
        className={cn(styles.Rsvp_buttons)}
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
