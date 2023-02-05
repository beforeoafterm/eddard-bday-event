import Card from "@/components/home/card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";

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
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.img
          className="bg-gradient-to-br from-sky-700 to-sky-300 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          key='/ned-herobanner.svg'
          src='/ned-herobanner.svg'
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        />
        <motion.p
          className="border-2 border-sky-500 bg-sky-500/50 backdrop-blur-sm max-w-xs p-4 -mt-20 mx-auto text-center text-white text-2xl uppercase sm:-mt-36 md:max-w-md md:text-4xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            is turning 7 years old!
          </Balancer>
        </motion.p>
      </motion.div>
    </Layout>
  );
}
