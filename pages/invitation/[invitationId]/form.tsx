import cn from 'classnames'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as yup from 'yup'

import Layout from '@/components/layout'
import Button from '@/components/shared/button'
import { LoadingSpinner } from '@/components/shared/icons'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/constants'
import { getAttendee } from '@/lib/directus'

import { InvitationPageProps, InvitationParams } from 'types/Invitation.types'

import formStyles from './form.module.css'
import invitationStyles from './invitation.module.css'
import { Attendee } from 'types/Attendees.types'

export default function Form({ attendee }: InvitationPageProps) {
  const router = useRouter()
  const [isHero, setIsHero] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (attendee.status !== 'confirmed') {
      router.push({
        pathname: `/invitation/${attendee.id}`
      })
      return
    }
    setIsLoading(false)
  }, [router, attendee.status, attendee.id])

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
    onSubmit: async (values) => {
      setIsLoading(true)
      const updatedAttendeeProps: Partial<Attendee> = {
        ...values
      }

      const group = attendee.groupedAttendees
      if (!attendee.canInvite && (!group || group.length === 0)) {
        updatedAttendeeProps.status = 'accomplished'
      }

      await fetch(`/api/attendees/${attendee.id}`, {
        body: JSON.stringify(updatedAttendeeProps),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        method: 'PATCH'
      })

      // TODO: Handle possible errors.

      // Redirect to invitation group form.
      if (attendee.canInvite || (group && group.length !== 0)) {
        return await router.push({
          pathname: `/invitation/${attendee.id}/group-form`
        })
      }

      // Redirect to accomplished page.
      router.push({
        pathname: `/invitation/${attendee.id}/accomplished`
      })
    },
    validationSchema: isHero ? isHeroSchema : isNotHeroSchema,
  })

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
        className={cn(invitationStyles.InvitationPage_panel)}
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <h1 className={cn(invitationStyles.InvitationPage_heading)}>
          I&apos;m happy you could join us, <span className={cn(invitationStyles.InvitationPage_inviteeName)}>{attendee.firstName}</span>!
        </h1>
      </motion.div>
      <form onSubmit={formik.handleSubmit}>
        <motion.div
          className={cn(invitationStyles.InvitationPage_panel)}
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <h2 className={cn(formStyles.Form_inputHeading)}>
            What&apos;s your email address?
          </h2>
          <input
            name='email'
            type='email'
            className={cn(formStyles.Form_inputText)}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          <small className='block'>
            We ask this so we can send out reminders and announcements about the party straight to your inbox!
          </small>
          {formik.errors.email && (
            <p className='font-bold text-red-500'>{formik.errors.email}</p>
          )}
        </motion.div>
        <motion.div
          className={cn(invitationStyles.InvitationPage_panel)}
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <h2 className={cn(formStyles.Form_inputHeading)}>
            Are you going as a superhero?
          </h2>

          <label className={cn(formStyles.Form_inputLabel)} htmlFor='isHeroYes'>
            <input
              name='isHeroYes'
              type='radio'
              onChange={() => setIsHero(true)}
              checked={isHero} />
            <span className={cn(formStyles.Form_inputLabelText)}>Yes!</span>
          </label>
          <label className={cn(formStyles.Form_inputLabel)} htmlFor='isHeroNo'>
            <input
              name='isHeroNo'
              type='radio'
              onChange={() => setIsHero(false)}
              checked={!isHero} />
            <span className={cn(formStyles.Form_inputLabelText)}>No...</span>
          </label>
        </motion.div>
        <motion.div
          className={cn(invitationStyles.InvitationPage_panel, {
            hidden: !isHero
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <h2 className={cn(formStyles.Form_inputHeading)}>
            What&apos;s your superhero name?
          </h2>
          <input
            className={cn(formStyles.Form_inputText)}
            name='heroName'
            type='text'
            value={formik.values.heroName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          <small className='block'>
            Be creative with your hero name! We will be putting this on your hero badge and will be part of the costume contest.
          </small>
          {formik.errors.heroName && (
            <p className='font-bold text-red-500'>{formik.errors.heroName}</p>
          )}
        </motion.div>
        <motion.div
          className={cn(invitationStyles.InvitationPage_buttons)}
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Button type='submit' theme='primary'>
            Let&apos;s go!
          </Button>
        </motion.div>
      </form>
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