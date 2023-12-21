import { ButtonHTMLAttributes } from 'react'

interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

const Tag = (props: TagProps) => {
  const { active, className = '', ...rest } = props
  const activeClassName = active
    ? 'text-white dark:text-white bg-red-900 dark:bg-red-400'
    : ''

  return (
    <button
      className={`px-2 py-2 mx-2 my-2 border-red-900 dark:border-red-400 border-2 rounded-md font-bold text-red-900 dark:text-red-400 transition-all ${className} ${activeClassName}`}
      {...rest}
    />
  )
}

export default Tag
