const test = async () => {
  try {
    setTimeout(async () => {
      try {
        const aaa = await throwError()
        console.log('aaa: ' + aaa)
      } catch(err) {
        console.log('----' + err.stack)
      }
    })
  } catch (err){
    console.log('errrrr: ' + err.stack)
  }
}

const throwError = async () => {
  throw new Error('hhhhhh')
}

test()