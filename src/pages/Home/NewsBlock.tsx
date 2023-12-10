import * as React from 'react'
import { useEffect } from 'react'
import { Paper, Grid, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import RightIcon from '@material-ui/icons/ChevronRightRounded'
import numToWord from 'number-to-words-ru'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import NewsItemSkeleton from '../../components/skeletons/NewsItem'
import { useDispatch } from 'react-redux'
import { getNewsPromo } from 'src/store/actions/news'
import { useSelector } from 'src/hooks'
import { Post } from 'src/interfaces'
import { MIN_WIDTH } from 'src/config/constants'
import FormattedText from 'src/components/formatters/FormattedText'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(2),
    borderRadius: 0,
    [theme.breakpoints.up(MIN_WIDTH)]: {
      borderRadius: 8,
    },
  },
  header: {
    fontFamily: 'Google Sans',
    fontWeight: 800,
    fontSize: 16,
    color: theme.palette.primary.main,
    paddingBottom: theme.spacing(1),
  },
  item: {
    padding: `${theme.spacing(1)}px 0 ${theme.spacing(1)}px 0`,
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Google Sans',
    fontWeight: 500,
    fontSize: 16,
    color: theme.palette.text.primary,
  },
  ts: {
    fontWeight: 500,
    fontSize: 14,
    color: theme.palette.text.hint,
    fontFamily: 'Google Sans',
    paddingTop: 2,
  },
  linkBox: { marginTop: theme.spacing(1) },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontSize: 14,
    fontFamily: 'Google Sans',
    fontWeight: 500,
    textTransform: 'none',
    '-webkit-tap-highlight-color': 'transparent !important',
  },
  dot: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontWeight: 500,
    fontSize: 12,
    color: theme.palette.text.hint,
  },
  article: {
    textDecoration: 'none',
  },
  error: {
    color: theme.palette.error.light,
    fontWeight: 800,
  },
}))

// eslint-disable-next-line react/display-name
const NewsItem = React.memo(({ data }: { data: Post }): React.ReactElement => {
  const classes = useStyles()
  const ts = dayjs(data.timePublished).calendar()
  const commentsCount = numToWord.convert(data.statistics.commentsCount, {
    currency: {
      currencyNameCases: ['комментарий', 'комментария', 'комментариев'],
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

  return (
    <Link to={'/post/' + data.id} className={classes.article}>
      <Grid container direction="row" className={classes.item}>
        <Grid container direction="column">
          <Grid item>
            <FormattedText className={classes.title}>
              {data.titleHtml}
            </FormattedText>
          </Grid>
          <Grid container direction="row" alignItems="center">
            <Typography className={classes.ts}>{ts}</Typography>
            <span className={classes.dot}>•</span>
            <Typography className={classes.ts}>{commentsCount}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <RightIcon color="disabled" />
        </Grid>
      </Grid>
    </Link>
  )
})

const NewsBlock = ({ hubAlias }: { hubAlias?: string }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isHidden = useSelector(
    (store) => store.settings.interfaceFeed.hideNewsBlock
  )
  const isFetched = useSelector((state) => state.news.block.fetched)
  const isFetching = useSelector((state) => state.news.block.fetching)
  const fetchError = useSelector((state) => state.news.block.error)
  const news = useSelector((state) => state.news.block.data)

  if (isHidden) return null

  useEffect(() => {
    dispatch(getNewsPromo(hubAlias))
  }, [])

  const GoToNewsButton = () => (
    <Button
      size="small"
      component={Link}
      color="primary"
      to="/news/p/1"
      className={classes.link}
      endIcon={<RightIcon />}
    >
      Все новости
    </Button>
  )

  return (
    <Paper className={classes.root} elevation={0}>
      <div className={classes.header}>Новости</div>
      {fetchError && (
        <Typography className={classes.error}>
          Произошла ошибка при выполнении запроса
        </Typography>
      )}
      {isFetching &&
        !fetchError &&
        [...Array(5)].map((_, i) => <NewsItemSkeleton key={i} />)}
      {news
        // Sort news in a descending order based on their timePublished
        ?.sort(
          // TODO: fix types
          //@ts-expect-error
          (a, b) => +new Date(b.timePublished) - +new Date(a.timePublished)
        )
        ?.map((e, i) => <NewsItem data={e} key={i} />)}
      <div className={classes.linkBox}>
        <GoToNewsButton />
      </div>
    </Paper>
  )
}

export default React.memo(NewsBlock)
