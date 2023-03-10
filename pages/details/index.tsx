import cn from 'classnames'
import { motion } from 'framer-motion'
import Layout from '@/components/layout'
import ButtonLink from '@/components/shared/button-link'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/constants'

import styles from './details.module.css'

export default function DetailsPage() {
  return (
    <Layout>
      <motion.div
        className='w-full'
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <article className={styles.comic}>
          <div className={styles.panel}>
            <p
              className={cn(
                styles.text,
                styles._topLeft
              )}>
              Suddenly...
            </p>
            <p
              className={cn(
                styles.text,
                styles._bottomRight
              )}>
              ...something amazing happened
            </p>
          </div>
          <div className={styles.panel}>
            <p
              className={cn(
                styles.text,
                styles._topLeft
              )}>
              Try resizing...
            </p>
            <p
              className={cn(
                styles.text,
                styles._bottomRight
              )}>
              ...it&apos;s responsive
            </p>
          </div>
          <div className={styles.panel}>
            <p className={styles.speech}>A speech bubble</p>
          </div>
          <div className={styles.panel}></div>
          <div className={styles.panel}></div>
          <div className={styles.panel}></div>
          <div className={styles.panel}></div>
          <div className={styles.panel}></div>
          <div className={styles.panel}>
            <p
              className={cn(
                styles.text,
                styles._bottomRight
              )}>
              THE END</p>
          </div>
        </article>
      </motion.div>
      <motion.div
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <ButtonLink href='#' text='See what heroic gifts you can bring!' />
      </motion.div>
    </Layout>
  )
}
