import { ReactNode, useEffect, useRef } from 'react'
import {motion, useInView, useAnimation} from 'framer-motion'

interface AnimateProps{
  children: ReactNode;
  delay?:number;
  direction?:string
}

export const AnimateInView =({children, delay=0, direction='top'}:AnimateProps)=>{

  let variants;

  switch (direction) {
  case 'down':
    variants = {
      offScreen:{y: -100, opacity: 0},
      onScreen:{y: 0, opacity: 1},
    }
    break;
  case 'left':
    variants = {
      offScreen:{x: -100, opacity: 0},
      onScreen:{x: 0, opacity: 1},
    }
    break;
  case 'right':
    variants = {
      offScreen:{x: 100, opacity: 0},
      onScreen:{x: 0, opacity: 1},
    }
    break;
  default:
    variants = {
      offScreen:{y: 100, opacity: 0},
      onScreen:{y: 0, opacity: 1},
    };
    break;
  }

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
      once:false,
      amount: 0.5
  });
  const controls = useAnimation();

  useEffect(() => {
    if (!ref.current) {
      return
    }
    if(isInView){
      controls.start("onScreen")
    }else{
      const { bottom } = ref.current.getBoundingClientRect()
      const isBelowScreenBottom = bottom > window.innerHeight
      if (isBelowScreenBottom) {
        controls.start("offScreen")
      }
    }
  }, [controls, isInView])
    

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="offScreen"
      animate={controls}
      transition={{duration:0.5, delay: delay}}
    >
      {children}
    </motion.div>
  )
}

export default AnimateInView