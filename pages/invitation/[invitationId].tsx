import cn from "classnames";
import { motion } from "framer-motion";
import Layout from "@/components/layout";
import ButtonLink from "@/components/shared/button-link";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";

import styles from "./invitation.module.css"
import { getAttendees, getDirectusClient } from "@/lib/directus";
import { InvitationPageProps } from "types/Invitation.types";
import { Attendee } from "types/Attendees.types";

export default function InvitationPage({ attendees }: InvitationPageProps) {
  console.log(attendees)
  return (
    <Layout>
      <motion.div
        className="w-full"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
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
  const directus = await getDirectusClient()
  const { data: attendees } = await directus.items("attendees").readByQuery({
    fields: "id",
    filter: { status: { _eq: "published" } },
    limit: -1,
  })

  const paths = attendees && attendees.map((attendee) => {
    params: { id: attendee.id }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps() {
  const attendees = await getAttendees()
  return {
    props: {
      attendees,
    },
  }
}