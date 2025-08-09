import { ReactNode } from 'react'
import './Animation.css'

interface AnimateProps{
    children: ReactNode;
    show?:boolean
}

function Animation({children, show=false}:AnimateProps) {
  return (
    <div className={`height-parent ${show&& 'active'}`}>
        <div className='height-child'>
            {children}
        </div>
    </div>
  )
}

export default Animation