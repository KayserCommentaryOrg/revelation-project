const sh = require('shell-tag')
const { directory: createTempDirectory } = require('tempy')
const { sync: makeDir } = require('make-dir')

const [,,gitUrl,targetDirectory] = process.argv

makeDir(targetDirectory)
const tempDirectory = createTempDirectory()

console.log(`Deleting from ${targetDirectory}`)

sh`
rm -rf ${targetDirectory}
`

console.log(`Created ${tempDirectory}`)


console.log(`Cloning ${gitUrl}...`)
console.log(sh`
cd ${tempDirectory} && \
git clone --depth=1 ${gitUrl} cloned-repo
`)

console.log(`Installing and building...`)
console.log(sh`
cd ${tempDirectory}/cloned-repo && \
rm package-lock.json && \
npm i --only=prod && \
npm run build && \
echo "Deleting .git folder" && \
rm -rf .git
`)

console.log(`Copying to ${targetDirectory}`)

console.log(sh`
cp -R ${tempDirectory}/cloned-repo/public/ ${targetDirectory}
`)
