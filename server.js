const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const errorHandler = require('./_helpers/error-handler')
const environment = require('./environment')
const PORT = process.env.PORT || 6001
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express()

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
  origin: '*'
}));
app.get('/', (req, res) => {
  console.log('Welcome to NODE API (Port: ' + PORT + ' , Environment: ' + environment.env + ')')
  res.send('Welcome to NODE API (Port: ' + PORT + ' , Environment: ' + environment.env + ')')
})


app.use('/member', require('./controllers/member.controller'))
app.use('/admin', require('./controllers/admin.controller'))
app.use('/login', require('./controllers/login.controller'))
app.use('/masterLogin', require('./controllers/masterLogin.controller'))
app.use('/role', require('./controllers/role.controller'))
app.use('/email', require('./controllers/emailRoutes'))
app.use('/upi', require('./controllers/upi.controller'))
app.use('/wallet', require('./controllers/wallet.controller'))
app.use('/withdraw', require('./controllers/withdraw.controller'))
app.use('/payment', require('./controllers/payment.controller'))
app.use('/game', require('./controllers/game.controller'))
app.use('/game2', require('./controllers/game2.controller'))
app.use('/sms', require('./controllers/mobileSms.controller'))
app.use('/feedback', require('./controllers/feedback.controller'))
app.use('/packages', require('./controllers/packages.controller'))
app.use('/game1F', require('./controllers/game1F.controller'))
app.use('/game2F', require('./controllers/game2F.controller'))
app.use('/profit', require('./controllers/profit.controller'))
app.use('/orderId', require('./controllers/orderId.controller'))



app.use('/roomeCode', require('./service/roomCode'))






app.use('/upload', require('./fileUpload'))



app.use('/masterimport', require('./controllers/masterimport.controller'))


app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} , Environment: ${environment.env}`)
})
