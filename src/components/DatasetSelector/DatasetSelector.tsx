
import { Row } from '@/components'
import { FormControl, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  Select,
  Autocomplete,
  TextField,
} from '@mui/material'
import { Dataset } from "@/service/types"

import { styled, lighten, darken } from '@mui/system';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});


function DatasetSelector({ datasetsList, setParentDataset, enableVersionSelector = true }) {

  const [versions, setVersions] = useState(0)
  const [filteredDatasetsList, setFilteredDatasetsList] = useState<Dataset[]>([])
  const [layerFilteredDatasetsList, setLayerFilteredDatasetsList] = useState<Dataset[]>([])
  const [layer, setLayer] = useState<string>('')
  const [domain, setDomain] = useState<string>('')
  const [dataset, setDataset] = useState<Dataset>(null)

  useEffect(() => {
    if (datasetsList) {
      if (layer) {
        if (domain) {
          setFilteredDatasetsList(
            datasetsList.filter((dataset) => dataset.layer == layer && dataset.domain == domain)
          )
        }
        else {
          setFilteredDatasetsList(
            datasetsList.filter((dataset) => dataset.layer == layer)
          )
        }
        setLayerFilteredDatasetsList(
          datasetsList.filter((dataset) => dataset.layer == layer)
        )
      }
      else {
        setFilteredDatasetsList(datasetsList)
        setLayerFilteredDatasetsList(datasetsList)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layer, domain])

  useEffect(() => {
    if (datasetsList) {
      setFilteredDatasetsList(datasetsList)
      setLayerFilteredDatasetsList(datasetsList)
    }
  }, [datasetsList])

  const handleDomainSelect = (value) => {
    if (value) {
      const splits = value.split('/')
      const layer = splits[0]
      const domain = splits[1]
      setLayer(layer)
      setDomain(domain)
    }
    else {
      setDomain(null)
    }
    setDataset(null)
  }

  const handleLayerSelect = (value) => {
    if (value) { setLayer(value); setDomain(null) }
    else { setLayer(null), setDataset(null), setDataset(null) }
  }

  useEffect(() => {
    let version = 0
    if (dataset) {
      version = dataset.version
      setLayer(dataset.layer)
      setDomain(dataset.domain)
    }
    else {
      setLayer(null)
      setDomain(null)
    }
    setVersions(version)
    setParentDataset(dataset)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset])

  return (
    <>
      <Row>
        <div>
          <Typography variant="h2">Layer</Typography>
          <FormControl fullWidth sx={{ m: 1 }}>
            <Autocomplete
              multiple={false}
              options={[...new Set(datasetsList.map((dataset) => dataset.layer))]}
              getOptionLabel={(option) => option || ""}
              renderInput={(params) => <TextField {...params} size="small" />}
              value={[...new Set(datasetsList.map((dataset) => dataset.layer))].length === 1 ? datasetsList[0].layer : layer || null}
              onChange={(_, newValue) => {
                handleLayerSelect(newValue);
              }}
            />
          </FormControl>
          <Typography variant="h2">Domain</Typography>
          <FormControl fullWidth sx={{ m: 1 }}>
            <Autocomplete
              multiple={false}
              options={[...new Set(layerFilteredDatasetsList.map((dataset) => `${dataset.layer}/${dataset.domain}`))]}
              getOptionLabel={(option) => option.split('/')[1] || ""}
              renderInput={(params) => <TextField {...params} size="small" />}
              value={layer && domain ? `${layer}/${domain}` : null}
              onChange={(_, newValue) => {
                handleDomainSelect(newValue);
              }}
            />
          </FormControl>
          <Typography variant="h2">Dataset</Typography>
          <FormControl fullWidth sx={{ m: 1 }}>
            <Autocomplete
              multiple={false}
              options={filteredDatasetsList}
              groupBy={(dataset) => `${dataset.layer}-${dataset.domain}`}
              getOptionLabel={(dataset) => (dataset as unknown as Dataset).dataset || ""}
              renderInput={(params) => <TextField {...params} size="small" />}
              renderGroup={(params) => (
                <li key={params.key}>
                  <GroupHeader>{params.group}</GroupHeader>
                  <GroupItems>{params.children}</GroupItems>
                </li>
              )}
              defaultValue={undefined}
              value={dataset}
              onChange={(_, newValue) => {
                setDataset(newValue as unknown as Dataset);
              }}
            />
          </FormControl>
        </div>
      </Row>

      {(enableVersionSelector && versions != 0) && (
        <>
          <Typography variant="h2">Select version</Typography>

          <Row>
            <Select
              label="Select version"
              onChange={(event) => dataset.version = event.target.value as number}
              native
              inputProps={{ 'data-testid': 'select-version' }}
            >
              {Array(versions)
                .fill(0)
                .map((_, index, array) => (
                  <option value={array.length - index} key={index}>
                    {array.length - index}
                  </option>
                ))}
            </Select>
          </Row>
        </>
      )}
    </>
  )
}


export default DatasetSelector
