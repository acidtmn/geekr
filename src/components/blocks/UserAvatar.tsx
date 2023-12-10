import React from 'react'
import { Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import UserPlaceholder from '../svg/UserPlaceholder'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 40,
    height: 40,
    borderRadius: theme.shape.borderRadius,
  },
}))

const UserAvatar: React.FC<{
  src?: string
  alias?: string
  className?: string
}> = ({ src, alias, className, ...props }) => {
  const habrStubPaths = [
    'habr.com/images/avatars/stub-user',
    'habr.com/images/stub-user',
  ]
  const classes = useStyles()
  // Checks if user has a stub Habr avatar or not
  // If false, then user has a custom avatar and we should render Avatar component
  // Otherwise, we render UserPlaceholder
  const state = src
    ? habrStubPaths.some((e) => src.split('//')[1].startsWith(e))
    : true

  return (
    <div {...props} className={[classes.root, className].join(' ')}>
      {!state && <Avatar className={className || classes.root} src={src} />}
      {state && <UserPlaceholder num={alias?.length || 0} />}
    </div>
  )
}

export default React.memo(UserAvatar)
