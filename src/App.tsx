import React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import ClientHelper, { Inputs } from '@koishidev/layouter-client-helper'
import SVGFormFields from './SVGForm'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import Dialog from './Dialog'
import BatchResult from './BatchResult'
import config from './demo.config.json'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
type SampleData = { [key: string]: { uuid: string; value: string }[] }
const data: SampleData = {
  '1': [
    {
      // 氏名（英語）
      uuid: '950a6db1-c196-4dbb-b265-39c716a4e6e4',
      value: 'Osamu\nNara',
    },
    {
      // 氏名
      uuid: '31b6ccbd-f98a-4e70-9e38-44bcf8561805',
      value: '',
    },
    {
      // 役職
      uuid: '876958b0-8f30-46bd-8174-ceee4bb297ca',
      value: 'Managing Director',
    },
    {
      // Email
      uuid: '033f3649-eeb2-4d13-b996-0f7b92899df7',
      value: 'osamu.nara@abc-horizon.sg'
    },
    {
      // 住所
      uuid: '3a2d1c97-e4f2-4b5e-a3e4-2dac7cdfda85',
      value: '152 Beach Road, #18-05 Gateway East,\nSingapore 189721'
    },
    {
      // 電話番号
      uuid: '075dae66-5c40-4a9c-b121-76364d3a2dd8',
      value: '+65 6291 5457'
    },
  ],
  '2': [
    {
      // 氏名（英語）
      uuid: '950a6db1-c196-4dbb-b265-39c716a4e6e4',
      value: 'Ken\nTaguma',
    },
    {
      // 氏名
      uuid: '31b6ccbd-f98a-4e70-9e38-44bcf8561805',
      value: '',
    },
    {
      // 役職
      uuid: '876958b0-8f30-46bd-8174-ceee4bb297ca',
      value: 'Senior Consultant',
    },
    {
      // Email
      uuid: '033f3649-eeb2-4d13-b996-0f7b92899df7',
      value: 'ken.taguma@abc-horizon.sg'
    },
    {
      // 住所
      uuid: '3a2d1c97-e4f2-4b5e-a3e4-2dac7cdfda85',
      value: '152 Beach Road, #18-05 Gateway East,\nSingapore 189721'
    },
    {
      // 電話番号
      uuid: '075dae66-5c40-4a9c-b121-76364d3a2dd8',
      value: '+65 6291 5457'
    },
  ],
  '3': [
    {
      // 氏名（英語）
      uuid: '950a6db1-c196-4dbb-b265-39c716a4e6e4',
      value: 'Anna\nTeo',
    },
    {
      // 氏名
      uuid: '31b6ccbd-f98a-4e70-9e38-44bcf8561805',
      value: '',
    },
    {
      // 役職
      uuid: '876958b0-8f30-46bd-8174-ceee4bb297ca',
      value: 'Business Director',
    },
    {
      // Email
      uuid: '033f3649-eeb2-4d13-b996-0f7b92899df7',
      value: 'anna.teo@abc-horizon.sg'
    },
    {
      // 住所
      uuid: '3a2d1c97-e4f2-4b5e-a3e4-2dac7cdfda85',
      value: '152 Beach Road, #18-05 Gateway East,\nSingapore 189721'
    },
    {
      // 電話番号
      uuid: '075dae66-5c40-4a9c-b121-76364d3a2dd8',
      value: '+65 6291 5457'
    },
  ],
  '4': [
    {
      // 氏名（英語）
      uuid: '950a6db1-c196-4dbb-b265-39c716a4e6e4',
      value: 'Hanae\nYanai',
    },
    {
      // 氏名
      uuid: '31b6ccbd-f98a-4e70-9e38-44bcf8561805',
      value: '',
    },
    {
      // 役職
      uuid: '876958b0-8f30-46bd-8174-ceee4bb297ca',
      value: 'Office Manager',
    },
    {
      // Email
      uuid: '033f3649-eeb2-4d13-b996-0f7b92899df7',
      value: 'h.yanai@abc-horizon.sg'
    },
    {
      // 住所
      uuid: '3a2d1c97-e4f2-4b5e-a3e4-2dac7cdfda85',
      value: '152 Beach Road, #18-05 Gateway East,\nSingapore 189721'
    },
    {
      // 電話番号
      uuid: '075dae66-5c40-4a9c-b121-76364d3a2dd8',
      value: '+65 6291 5457'
    },
  ],
  '5': [
    {
      // 氏名（英語）
      uuid: '950a6db1-c196-4dbb-b265-39c716a4e6e4',
      value: 'Ain\nZulkifni',
    },
    {
      // 氏名
      uuid: '31b6ccbd-f98a-4e70-9e38-44bcf8561805',
      value: '',
    },
    {
      // 役職
      uuid: '876958b0-8f30-46bd-8174-ceee4bb297ca',
      value: 'Senior Account Manager',
    },
    {
      // Email
      uuid: '033f3649-eeb2-4d13-b996-0f7b92899df7',
      value: 'ain@abc-horizon.sg'
    },
    {
      // 住所
      uuid: '3a2d1c97-e4f2-4b5e-a3e4-2dac7cdfda85',
      value: '152 Beach Road, #18-05 Gateway East,\nSingapore 189721'
    },
    {
      // 電話番号
      uuid: '075dae66-5c40-4a9c-b121-76364d3a2dd8',
      value: '+65 6291 5457'
    },
  ],
}

const batchContents = Array.from({ length: 1 }).reduce<SampleData>(
  (obj, _, i) => {
    const chunk = Object.keys(data).reduce<SampleData>((obj, key, l) => {
      const value = data[key]
      return {
        ...obj,
        [l + i * 5]: value,
      }
    }, {})
    return {
      ...obj,
      ...chunk,
    }
  },
  {}
)

export default function App() {
  const helper = new ClientHelper(
    config.token,
    config.layoutId,
    process.env.REACT_APP_API_ROOT,
    true
  )
  const [svgs, setSvgs] = React.useState<string[]>([])
  const [data, setData] = React.useState<Inputs>(config.inputs as Inputs)
  const [loading, setLoading] = React.useState(false)
  const [pngs, setPNGs] = React.useState<ArrayBuffer[]>([])
  const [queueId, setQueueId] = React.useState<string | null>(null)
  const [progress, setProgress] = React.useState<number | null>(null)

  const [batchResults, setBatchResults] = React.useState<{
    [x: string]: { svg: string[]; pdf: string }
  }>({})
  const [pdf, setPDF] = React.useState<string>('')

  React.useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const srcArr = await helper.getInit()
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
        elements: {
          ...data[svgId].elements,
          [inputId]: {
            ...data[svgId].elements[inputId],
            value,
          },
        },
      },
    })
  }

  const handlePreview = async () => {
    try {
      setLoading(true)
      console.log(ClientHelper.prepareData(data))
      const res = await helper.update(ClientHelper.prepareData(data))
      setSvgs(res.svg)
      setPDF(res.pdf)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const handleGetPng = async () => {
    setLoading(true)
    try {
      const res = await helper.toPng(
        ClientHelper.prepareData(data),
        'thumbnail'
      )
      setPNGs(res)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const handleBatchRequest = async () => {
    setLoading(true)
    try {
      const res = await helper.batchCreate(batchContents)
      setQueueId(res.id)
      toast(`Queue ${res.id}を実行中`)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  React.useEffect(() => {
    if (!queueId) return

    const timer = setInterval(async () => {
      const res = await helper.batchPolling(queueId)
      setProgress(res.progress)
      if (res.progress >= 100 ) {
        clearInterval(timer)
        res.value && setBatchResults(res.value)
        toast.success(`Queue ${res.id}が完了しました`)
      }
    }, 3000)

    return () => {
      timer && clearInterval(timer)
    }
  }, [queueId])

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
          <Button variant='contained' onClick={handleBatchRequest}>
            バッチリクエスト
            {progress !== null && `progress: ${progress}%`}
          </Button>
        </Box>

        {Object.keys(data).map((key, i) => (
          <Box mb={4} key={key}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box key={i}>
                  {svgs[i] && (
                    <img src={`data:image/svg+xml;base64,${svgs[i]}`} style={{width: '100%'}} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <form noValidate autoComplete='off' key={key}>
                  <SVGFormFields
                    fields={data[key].elements}
                    onChange={(event) => handleChange(event, key)}
                  />
                </form>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Box>
          {pdf && (
            <embed
              width='100%'
              height='100%'
              type='application/pdf'
              src={`data:application/pdf;base64,${pdf}`}
            />
          )}
        </Box>
        <Dialog data={pngs} onClose={() => setPNGs([])} />
        <BatchResult
          data={batchResults}
          onClose={() => setBatchResults({})}
          src={batchContents}
        />
      </Container>
      <ToastContainer autoClose={false} />
    </>
  )
}
