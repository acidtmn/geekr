import React from 'react'
import { Typography } from '@material-ui/core'
import numToWord from 'number-to-words-ru'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'src/hooks'

const useStyles = makeStyles((theme) => ({
  dot: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

type Cases = [string, string, string]

export const FollowersCount = (): JSX.Element => {
  const classes = useStyles()
  const user = useSelector((store) => store.profile.profile.card?.data)
  const followers = Number(user?.followStats.followersCount)
  const followed = Number(user?.followStats.followCount)
  const followersCases: Cases = ['подписчик', 'подписчика', 'подписчиков']
  const followedCases: Cases = ['подписка', 'подписки', 'подписок']
  const generateOptions = (cases: Cases): ConvertOptions => ({
    currency: {
      currencyNameCases: cases,
      fractionalPartNameCases: ['', '', ''],
      currencyNounGender: {
        integer: 0,
        fractionalPart: 0,
      },
    },
    showNumberParts: {
      integer: true,
      fractional: false,
    },
    convertNumbertToWords: {
      integer: false,
      fractional: false,
    },
  })
  const followersText = numToWord.convert(
    followers,
    generateOptions(followersCases)
  )
  const followedText = numToWord.convert(
    followed,
    generateOptions(followedCases)
  )
  return (
    <Typography variant="body2">
      {followersText}
      <span className={classes.dot}>•</span>
      {followedText}
    </Typography>
  )
}
