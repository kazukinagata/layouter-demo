import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import ClientHelper from '@koishidev/layouter-client-helper'
import SVGFormFields from './SVGForm'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import Dialog from './Dialog'
import config from './demo.config.json'

export type Tag = 'input' | 'textArea'
export interface SVGFormAttrs {
  id: string
  tag: Tag
  label: string
  value: string
  order: number
  parent?: string
}
export type SVGForm = {
  [inputId: string]: SVGFormAttrs
}
export type Inputs = {
  [svgId: string]: SVGForm
}
export default function App() {
  const helper = new ClientHelper(
    config.token,
    config.layoutId,
    process.env.REACT_APP_API_ROOT
  )
  const [svgs, setSvgs] = React.useState<string[]>([])
  const [data, setData] = React.useState<Inputs>(config.inputs as Inputs)
  const [loading, setLoading] = React.useState(false)
  const [pngs, setPNGs] = React.useState<ArrayBuffer[]>([])

  React.useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const srcArr = await helper.initialize()
        setSvgs(srcArr)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    })()
  }, [])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    svgId: string
  ) => {
    const inputId = event.target.name
    const value = event.target.value

    setData({
      ...data,
      [svgId]: {
        ...data[svgId],
        [inputId]: {
          ...data[svgId][inputId],
          value,
        },
      },
    })
  }

  const handlePreview = async () => {
    try {
      setLoading(true)
      console.log(ClientHelper.prepareData(data))
      const res = await helper.update(ClientHelper.prepareData(data))
      setSvgs(res)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const handleGetPng = async () => {
    setLoading(true)
    try {
      const res = await helper.toPng(ClientHelper.prepareData(data))
      setPNGs(res)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  return (
    <>
      {loading && <LinearProgress color='primary' />}
      <Container>
        <Box px={2} pt={4} mb={2} display='flex' justifyContent='space-between'>
          <Button variant='contained' onClick={handlePreview}>
            プレビュー反映
          </Button>
          <Button variant='contained' onClick={handleGetPng}>
            PNG変換
          </Button>
        </Box>

        {Object.keys(data).map((key, i) => (
          <Box mb={4}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box key={i}>
                  {svgs[i] && (
                    <img src={`data:image/svg+xml;base64,${svgs[i]}`} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <form noValidate autoComplete='off' key={key}>
                  <SVGFormFields
                    fields={data[key]}
                    onChange={(event) => handleChange(event, key)}
                  />
                </form>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Dialog data={pngs} onClose={() => setPNGs([])} />
      </Container>
    </>
  )
}

