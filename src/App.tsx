import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import ClientHelper from '@koishidev/layouter-client-helper'
import { settings } from './settings'
import SVGFormFields from './SVGForm'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import Dialog from './Dialog'
export type SVGForm = {
  [inputId: string]: {
    id: string
    tag: string
    label: string
    value: string
  }
}
type Inputs = {
  [svgId: string]: SVGForm
}

function App() {
  const helper = new ClientHelper(settings.token, settings.layoutId, process.env.REACT_APP_API_ROOT)
  const [svgs, setSvgs] = React.useState<string[]>()
  const [data, setData] = React.useState<Inputs>(settings.inputs)
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
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {svgs &&
              svgs.map((base64, i) => (
                <Box key={i}>
                  <img src={`data:image/svg+xml;base64,${base64}`} />
                </Box>
              ))}
          </Grid>
          <Grid item xs={6}>
            {Object.keys(data).map((key) => (
              <form noValidate autoComplete='off' key={key}>
                <SVGFormFields
                  fields={data[key]}
                  onChange={(event) => handleChange(event, key)}
                />
              </form>
            ))}
          </Grid>
        </Grid>
        <Dialog data={pngs} onClose={() => setPNGs([])} />
      </Container>
    </>
  )
}

export default App
