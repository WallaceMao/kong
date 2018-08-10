const express = require('express')
const router = express.Router({mergeParams: true})

router.get('/redirect',
  async (req, res, next) => {
    try {
      console.log('---------req.query: ' + JSON.stringify(req.query))
      res.end('success')
    } catch (err) {
      next(err)
    }
  })

module.exports = router