import React from 'react'
import { IconType } from 'react-icons';
interface IconProps {
    icon: IconType;
    description: string;
}

const Icon = ({icon: IconComponent, description}: IconProps) => {
  return (
    <div className="relative group">
        <IconComponent className='text-5xl' />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-gray-700 text-white rounded-md px-2 py-1">
         { description }
        </span>
    </div>
  )
}

export default Icon
