const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)

const runCmd = async (cmd) => {
  try {
    const output = await cmdExec(cmd)
    return output
  }
  catch(err){
    console.error(err.stack)
  }

}

// Not being used at the moment, but it keeping incase we need it in the future
export default function buildHook(platform){
  return {
    name: 'buildHook',
    buildEnd: async () => {
      try {

        if(!process.env.DOC_APP_PATH || platform === 'native') return

        const rootPath = path.join(__dirname, '../')
        const nmPath = `${rootPath}app/node_modules/@simpleviewinc/re-theme/build`
        
        console.log(`---------- copyBuild to ----------`)
        console.log(nmPath)
        
        await runCmd(`rm -rf ${nmPath}`)
        await runCmd(`cp -R ${rootPath}/build ${ nmPath }`)

        const hookFile = path.join(rootPath, 'app/src/retheme-hook.js')
        await runCmd(`echo "import '@simpleviewinc/re-theme'\n\nconst time=new Date()\n export { time }" > ${ hookFile }`)

      }
      catch(err){
        console.error(err.stack)
      }

    }
  }
} 