const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const authRouter = require('./src/routes/auth')

app.use('/api/user', authRouter)

app.get('/', (req, res) => {
  res.json({
    success: true,
    data: { name: "Huy Manh" }
  })
})

app.listen(3000, () => {
  console.log('App is running on port: ', 3000);
})
