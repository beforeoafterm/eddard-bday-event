import cn from 'classnames'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import useScroll from '@/lib/hooks/use-scroll'
import Meta from './meta'

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const scrolled = useScroll(50)

  return (
    <div className='flex flex-col'>
      <Meta {...meta} />
      <div
        className={cn(
          'fixed top-0 w-full',
          'z-30 transition-all duration-500',
          {
            ['border-b-4 border-sky-600 bg-white']: scrolled,
            ['bg-white/0']: !scrolled,
          })}
      >
        <div className='mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto'>
          <Link href='/' className='flex items-center font-display text-2xl no-underline text-sky-600'>
            <Image
              src='/ned-logo.svg'
              alt="Ned's logo"
              width='40'
              height='40'
              className='mr-2 rounded-sm'
            ></Image>
            <p>Kirk&apos;s 7<sup>th</sup> birthday!</p>
          </Link>
        </div>
      </div>
      <main className='flex flex-grow w-full flex-col items-center justify-center min-h-screen'>
        <motion.div
          className='max-w-screen-xl mx-auto pt-16 px-5 w-full'
          initial='hidden'
          whileInView='show'
          animate='show'
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
          {children}
        </motion.div>
      </main>
      <div className='w-full border-t-4 border-sky-600 bg-white py-5 text-center'>
        <p className='font-bold uppercase tracking-[0.15rem]'>
          Made with ❤️ by Mom & Big Bud.
        </p>
      </div>
    </div>
  )
}
