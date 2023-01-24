const fs = require('fs')

const file = fs.readFileSync('./CHANGELOG.md', { encoding: 'utf-8' })

const parsedLines = []
file.split(/\r?\n/).forEach((line) => {
  parsedLines.push(line)
})

if (parsedLines.length === 1 && parsedLines[0] === '') {
  throw new Error(
    'It looks like there is no release information in the changelog. Please check it.'
  )
} else {
  const file = fs.createWriteStream('latest_release_changelog.md')
  file.on('error', (error) => {
    throw new Error(error)
  })
  parsedLines.forEach((line) => {
    file.write(`${line} \n`)
  })
  file.end()
}
