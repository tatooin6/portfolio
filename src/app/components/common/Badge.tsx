import React from 'react'
interface Badge {
  tag:string,
  color?: badgeColor,
}

export enum badgeColor {
  gray = 'bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-transparent dark:text-gray-400 dark:ring-gray-400 dark:ring-1',
  red = 'bg-red-50 text-red-700 ring-red-600/10 dark:bg-transparent dark:text-red-400 dark:ring-red-400 dark:ring-1',
  yellow = 'bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-transparent dark:text-yellow-400 dark:ring-yellow-400 dark:ring-1',
  green = 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-transparent dark:text-green-400 dark:ring-green-400 dark:ring-1',
  blue = 'bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-transparent dark:text-blue-400 dark:ring-blue-400 dark:ring-1',
  indigo = 'bg-indigo-50 text-indigo-700 ring-indigo-700/10 dark:bg-transparent dark:text-indigo-400 dark:ring-indigo-400 dark:ring-1',
  purple = 'bg-purple-50 text-purple-700 ring-purple-700/10 dark:bg-transparent dark:text-purple-400 dark:ring-purple-400 dark:ring-1',
  pink = 'bg-pink-50 text-pink-700 ring-pink-700/10 dark:bg-transparent dark:text-pink-400 dark:ring-pink-400 dark:ring-1',
}

const Badge = ({tag, color=badgeColor.gray}:Badge) => {
  return (
    <div>
      <span className={`${color} inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset`}>
        {tag}
      </span>
    </div>
  )
}

export default Badge
