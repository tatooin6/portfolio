import React from 'react'
import { IconType } from 'react-icons';
interface IconProps {
    icon: IconType;
    description: string;
}

const Icon = ({icon: IconComponent, description}: IconProps) => {
  return (
    <div className="relative group text-theme-primary">
        <IconComponent className='text-5xl' />
        <span className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-md bg-theme-text px-2 py-1 text-xs text-theme-contrast group-hover:block">
         { description }
        </span>
    </div>
  )
}

export default Icon
