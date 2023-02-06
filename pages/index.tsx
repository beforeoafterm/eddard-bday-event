import Layout from "@/components/layout";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import ButtonLink from "@/components/shared/button-link";

export default function Home() {
  return (
    <Layout>
      <motion.div
        className="max-w-2xl px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.5,
            },
          },
        }}
      >
        <motion.img
          className="w-full"
          src='/ned-herobanner.svg'
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        />
        <motion.div
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <div className="bubble font-default -mt-20 mx-auto max-w-max p-2 sm:-mt-36 md:max-w-md text-center text-2xl uppercase md:text-4xl">
            is turning 7 years old!
          </div>
        </motion.div>
        <motion.div
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <ButtonLink href="/details" text="Join our Hero's Adventure!" />
        </motion.div>
      </motion.div>
    </Layout>
  );
}
