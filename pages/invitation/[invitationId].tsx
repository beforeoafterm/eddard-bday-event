import cn from "classnames";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";

import Layout from "@/components/layout";
import ButtonLink from "@/components/shared/button-link";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { getAttendees, getAttendee } from "@/lib/directus";

import { InvitationPageProps, InvitationParams } from "types/Invitation.types";
import { Attendee } from "types/Attendees.types";

import styles from "./invitation.module.css"

export default function InvitationPage({ attendee }: InvitationPageProps) {
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
        <p className={cn(
          styles.InvitationPage_message,
          "font-black"
        )}>
          I&apos;m so excited to have you join me for my Hero&apos;s Journey Celebration!
        </p>
        <p className={cn(styles.InvitationPage_message)}>
          This epic event will be packed with magnificent activities, daring games, and heroic challenges, including a high-stakes laser tag battle! And, we&apos;ll have a feast of heroic snacks and drinks for all to enjoy.
        </p>
        <p className={cn(
          styles.InvitationPage_message,
          "underline",
          "underline-offset-4"
        )}>
          Please fill out the form below to RSVP for the celebration!
        </p>
        <p className={cn(styles.InvitationPage_message)}>
          Don&apos;t forget to indicate if you&apos;ll be wearing a heroic costume, as we&apos;ll have a costume contest for the bravest and most dynamic hero, with a magnificent reward for the champion.
        </p>
      </motion.div>
      <motion.div
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <ButtonLink href="#" text="Submit" />
      </motion.div>
    </Layout >
  );
}

export async function getStaticPaths() {
  const { data: attendees } = await getAttendees({
    fields: "id",
    filter: { status: { _eq: "invited" } },
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