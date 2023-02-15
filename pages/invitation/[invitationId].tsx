import cn from 'classnames'
import { motion } from 'framer-motion'
import { GetStaticProps } from 'next'

import Layout from '@/components/layout'
import Button from '@/components/shared/button'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/constants'
import { getAttendees, getAttendee, updateAttendee } from '@/lib/directus'

import { InvitationPageProps, InvitationParams } from 'types/Invitation.types'
import { Attendee } from 'types/Attendees.types'

import styles from './invitation.module.css'
import Image from 'next/image'

export default function InvitationPage({ attendee }: InvitationPageProps) {
  
  const confirmInvitation = async () => {
    const response = await updateAttendee(attendee.id, {
      status: 'confirmed'
    })
    console.log(response)
  }

  const declineInvitation = async () => {
    const response = await updateAttendee(attendee.id, {
      status: 'declined'
    })
    console.log(response)
  }

  return (
    <Layout>
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
              March 5, 2023 - 5:00pm-8:00pm
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
    </Layout >
  )
}

export async function getStaticPaths() {
  const { data: attendees } = await getAttendees({
    fields: 'id',
    filter: { status: { _eq: 'invited' } },
    limit: -1,
  })

  const paths = attendees && attendees.map((attendee) => {
    const attendeeItem = attendee as Attendee
    return {
      params: {
        invitationId: attendeeItem.id
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { invitationId } = params as InvitationParams
  const attendee = await getAttendee(invitationId)
  return {
    props: {
      attendee,
    },
  }
}