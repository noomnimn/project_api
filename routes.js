const passport = require('passport')
const passportService = require('./service/passport')
const requireSignin = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })
const users = require('./controllers/Users')
const user = require('./controllers/user')
const allproject = require('./controllers/project')
const budget = require('./controllers/select')
const update = require('./controllers/update')
const chart = require('./controllers/chart')
const check = require('./controllers/projects_ch')


module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send("<h1 style='text-align:center;margin-top:150px; '>hello</h1>")
    })
    app.post('/signin', requireSignin, users.signin)

    // user
    app.get('/users', users.findAll)
    app.get('/users/:limit/:offset/:sort_by/:fields/:text', users.findallpagination)
    app.post('/users', users.create)
    app.get('/users/findbyid/:id', users.findById)
    app.put('/users/:id', users.update)
    app.delete('/users/:id', users.delete)
    app.get('/users-profile/:id', users.findProfile)
    app.get('/hash-password', users.hashPassword)

    // members
    app.delete('/api/v1/users/:id', user.deleteUser)
    app.get('/api/v1/users/data/:id', user.findDataById)
    app.get('/api/v1/users/findall', user.findAll)
    app.put('/api/v1/users/:id', user.updateUser)
    app.post('/api/v1/users', user.createUser)
    app.get('/api/v1/users/findallpagination/:limit/:offset/:sort_by/:fields/:text', users.findallpagination)


   app.get('/api/v1/project/getProject', allproject.findProject)
   app.get('/api/v1/project/getProjectbyId/:id', allproject.findProjectById)
   // app.post('/api/v1/project/createProject', allproject.createProject) 
  // app.put('/api/v1/project/:id', allproject.updateProject)
   //------------------------------//
   app.post('/api/v1/project/created', allproject.createProjects)
   app.put('/api/v1/project/:id',allproject.updateProjects)
   app.get('/api/v1/project/getBudgetList', budget.findBudgetList)
   app.get('/api/v1/project/getMoneyType', budget.findMoneyType)
   app.get('/api/v1/project/getMinistry', budget.findMinistry)
   app.get('/api/v1/project/getPolicy', budget.findPolicy)
   app.get('/api/v1/project/getStrategic', budget.findStrategic)
   app.get('/api/v1/project/getMoney', budget.findMoneyType)
   app.get('/api/v1/project/getCategory', budget.findCategory)
   app.put('/api/v1/project/update/:id', update.updatePJ)
   app.get('/api/v1/project/getProjectapprove', allproject.findProjectApp) //approve
   app.put('/api/v1/project/updatemoney/:id', update.updateMoneyUsed)
   app.put('/api/v1/project/updatecode/:id', update.updateCode)
   app.post('/api/v1/project/createdplan', update.createProject)




   // chart
   app.get('/api/v1/project/findStatus', chart.findStatus)
   app.get('/api/v1/project/findExcellence', chart.findEx)
   app.get('/api/v1/project/findCount', chart.findCountbyGroup)
   app.get('/api/v1/project/getSum', chart.findSumbyGroup)
   app.get('/api/v1/project/getsumMoney', chart.sumbymoney)
   app.get('/api/v1/project/getsumMoneyType', chart.sumtype)
   app.get('/api/v1/project/getMoneyUsed' , chart.chart_type)
   app.get('/api/v1/project/Excellence' , chart.excellence)
   app.get('/api/v1/project/sumpriceBygroup' , chart.sumpriceBygroup)
   app.get('/api/v1/project/sumary' , chart.sumary)

   
   app.get('/api/v1/project/approvebyid/:id', allproject.findApproveById) // ap
   app.get('/api/v1/project/projectCheck', check.findAll) // check
   app.get('/api/v1/project/projectCheck/:id', check.findprojectChById) // check


}
