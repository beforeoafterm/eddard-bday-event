import cn from 'classnames'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import * as yup from 'yup'

import Button from '@/components/shared/button'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/constants'
import { getAttendee } from '@/lib/directus'

import { InvitationPageProps, InvitationParams } from 'types/Invitation.types'

import styles from './form.module.css'

export default function Form({ attendee }: InvitationPageProps) {

  const [isHero, setIsHero] = useState<boolean>(true)

  const initialValues = {
    email: '',
    heroName: ''
  }

  const isHeroSchema = yup.object({
    email: yup.string()
      .email('That doesn\'t look like a valid email address...')
      .required('It\'s very important for us to have this so we can communicate the next mission to you!'),
    heroName: yup.string().required('We\'ll need your superhero name so we can put it on your hero badge!'),
  })

  const isNotHeroSchema = yup.object({
    email: yup.string()
      .email('Must be a valid email')
      .required('Email is required'),
    heroName: yup.string(),
  })

  const formik = useFormik({
    initialValues,
    onSubmit: (values, helpers) => {
      console.log(values)
    },
    validationSchema: isHero ? isHeroSchema : isNotHeroSchema,
  })

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

  return (
    <>
      <motion.div
        className={cn(styles.Form_panel)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <h1 className={cn(styles.Form_heading)}>
          I&apos;m happy you could join us, <span className={cn(styles.Form_inviteeName)}>{attendee.firstName}</span>!
        </h1>
      </motion.div>
      <form onSubmit={formik.handleSubmit}>
        <motion.div
          className={cn(styles.Form_panel)}
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <h2 className={cn(styles.Form_inputHeading)}>
            What&apos;s your email address?
          </h2>
          <input
            name='email'
            type='email'
            className={cn(styles.Form_inputText)}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          <small className='block'>We ask this so we can send out reminders and announcements about the party straight to your inbox!</small>
          {formik.errors.email && (
            <p className='font-bold text-red-500'>{formik.errors.email}</p>
          )}
        </motion.div>
        <motion.div
          className={cn(styles.Form_panel)}
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <h2 className={cn(styles.Form_inputHeading)}>
            Are you going as a superhero?
          </h2>

          <label className={cn(styles.Form_inputLabel)} htmlFor='isHeroYes'>
            <input
              name='isHeroYes'
              type='radio'
              onChange={() => setIsHero(true)}
              checked={isHero} />
            <span className={cn(styles.Form_inputLabelText)}>Yes!</span>
          </label>
          <label className={cn(styles.Form_inputLabel)} htmlFor='isHeroNo'>
            <input
              name='isHeroNo'
              type='radio'
              onChange={() => setIsHero(false)}
              checked={!isHero} />
            <span className={cn(styles.Form_inputLabelText)}>No...</span>
          </label>
        </motion.div>
        <motion.div
          className={cn(styles.Form_panel, {
            hidden: !isHero
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <h2 className={cn(styles.Form_inputHeading)}>
            What&apos;s your superhero name?
          </h2>
          <input
            className={cn(styles.Form_inputText)}
            name='heroName'
            type='text'
            value={formik.values.heroName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          {formik.errors.heroName && (
            <p className='font-bold text-red-500'>{formik.errors.heroName}</p>
          )}
        </motion.div>
        <motion.div
          className={cn(styles.Form_buttons)}
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Button type='submit' theme='primary'>
            Let&apos;s go!
          </Button>
        </motion.div>
      </form>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { invitationId } = params as InvitationParams
  console.log(invitationId)

  const attendee = await getAttendee(invitationId)
  return {
    props: {
      attendee,
    },
  }
}