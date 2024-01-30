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
const newproject = require('./controllers/summary')
const budget2022 = require('./controllers/budget')
const doc = require('./controllers/doc')
const donate = require('./controllers/donate')
const out = require('./controllers/out')



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
   app.get('/api/v1/project/getMoneybytype', budget.findMoney)//
   app.get('/api/v1/project/getCategory', budget.findCategory)
   app.put('/api/v1/project/update/:id', update.updatePJ)
   app.get('/api/v1/project/getProjectapprove', allproject.findProjectApp) //approve
   app.put('/api/v1/project/updatemoney/:id', update.updateMoneyUsed)
   app.put('/api/v1/project/updatecode/:id', update.updateCode)
   app.post('/api/v1/project/createdplan', update.createProject)




   // chart
   app.get('/api/v1/project/findStatus', chart.findStatus)
   app.get('/api/v1/project/findStDate', chart.findStDate)
   app.get('/api/v1/project/findWait', chart.findWait)

   app.get('/api/v1/project/findExcellence', chart.findEx)
   app.get('/api/v1/project/findCount', chart.findCountbyGroup)
   app.get('/api/v1/project/getSum', chart.findSumbyGroup)
   app.get('/api/v1/project/getsumMoney', chart.sumbymoney)
   app.get('/api/v1/project/getsumMoneyType', chart.sumtype)
   app.get('/api/v1/project/getMoneyUsed' , chart.chart_type)
   app.get('/api/v1/project/Excellence' , chart.excellence)
   app.get('/api/v1/project/sumpriceBygroup' , chart.sumpriceBygroup)
   app.get('/api/v1/project/sumary' , chart.sumary)
   app.get('/api/v1/project/department_data' , chart.department_data)
   app.get('/api/v1/project/sumaryBudget' , chart.sumaryBudget)
   app.get('/api/v1/project/sumaryBudgetOut' , chart.sumaryBudgetOut)
   app.get('/api/project/sumMidYear' , chart.getSumBudgetMidYear)
   app.get('/api/sumBudgetLower' , chart.getSumBudgetLower)         //แผนจัดหา
   app.get('/api/summary/BudgetLower' , chart.summaryBudgetLow)         //แผนจัดหา
   app.get('/api/sumBudgetLowerOut' , chart.getSumBudgetLowerOut)         //แผนจัดหา
   app.get('/api/summary/BudgetLowerOut' , chart.summaryBudgetLowOut)         //แผนจัดหา



   app.get('/api/v1/project/approvebyid/:id', allproject.findApproveById) // 
   app.get('/api/v1/project/projectCheck', check.findAll) // check //หน้าสถานะ
   app.get('/api/v1/project/projectCheck/:id', check.findprojectChById) // check

   // getNewProject
   app.get('/api/v1/project/getnewproject', newproject.newproject) // check
   app.get('/api/v1/project/getNewPjById/:id', newproject.getNewPjById) // check

   
    app.put('/api/v1/project/updateDateDt/:id', update.update_dateDt)
    app.put('/api/v1/project/updateDateSt/:id', update.update_dateSt)
    app.put('/api/v1/project/updateDatePlanSt/:id', update.update_dateplanSt)
    app.put('/api/v1/project/updateDateReply/:id', update.update_dateReply)

    //------------------------------------------------------------------------------------**งบลงทุน
   app.get('/api/budget/findAll', budget2022.findAll) // check
   app.get('/api/budget/findUC', budget2022.findUC) // check
   app.get('/api/budget/findHos', budget2022.findHosMoney) // check
   app.get('/api/budget/findDon', budget2022.findDonate) // check

    //------------------------------------------------------------------------------------**งบลงทุน 2567
    app.get('/api/budget/findAll_2567', budget2022.findAll2567) // check
    app.get('/api/budget/findBudg_1', budget2022.findBudg_1) // check
    app.get('/api/budget/findBudg_2', budget2022.findBudg_2) // check
    app.get('/api/budget/findBudg_3', budget2022.findBudg_3) // check
    app.get('/api/budget/Budget2567ById/:id', budget2022.findBudget2567ById)
    app.put('/api/budget_2567/update/:id', budget2022.updateฺBudget2567)
    app.post('/api/budget_2567/add', budget2022.addฺBudget2567)

    //------------------------------------------------------------------------------------**แผนจัดซื้อจัดหา 2567
    app.get('/api/budget/findUmat_1', budget2022.findUmat_1) // check
    app.get('/api/budget/findUmatById/:id', budget2022.findUmatById)
    app.put('/api/update_L2567/:id', budget2022.updateLow2567)
    app.post('/api/add_L2567', budget2022.addLow2567)


   app.get('/api/budget/findBudgetById/:id', budget2022.findBudgetById)
   app.put('/api/updateBudget/:id', budget2022.updateBudget)
   app.post('/api/updateBudget', budget2022.add)

   app.get('/api/budget/findAllSum', budget2022.findBudgetSum)
   app.get('/api/budget/findBudget/status', budget2022.findBudgetStatus)



   //----------------------------------------------------------ส่วนของวันที่
    app.put('/api/updateformPl/:id', budget2022.update_formPl)
    app.put('/api/updateformDt/:id', budget2022.update_formDt)
    app.put('/api/updateformSt/:id', budget2022.update_formSt)
    app.put('/api/updateformEn/:id', budget2022.update_formEn)
    app.put('/api/updateformPa/:id', budget2022.update_formPa)
    app.put('/api/updateformDe/:id', budget2022.update_formDef)


  //----------------------------------------------------------lสารบรรณ
    app.post('/api/addDoc', doc.add)
    app.put('/api/updateDoc/:id', doc.update)
    app.get('/api/findDocById/:id', doc.findById)
    app.get('/api/doc/findAll', doc.findAll) // check

    app.post('/api/addDocSend', doc.addDocSend)
    app.put('/api/updateDocSend/:id', doc.updateSend)
    app.get('/api/findSendById/:id', doc.findSendById)
    app.get('/api/doc/findAllSend', doc.findAllSend)
    app.post('/api/addDocSSW', doc.addDocSw)
    app.get('/api/doc/findDocSSW', doc.findAllDocSSW)
    app.put('/api/updateDocSw/:id', doc.updateSsw)
    app.get('/api/findSwById/:id', doc.findSwById)

  //----------------------------------------------------------บริจาค
    app.get('/api/donate/findAll', donate.findAll)

    //----------------------------------------------------------สรุปงบลงทุน
    app.get('/api/findBudgetMoney/dashboard', budget2022.findBudgetMoney)

    //----------------------------------------------------------นอกแผน2566
    app.get('/api/out/findAll', out.findAll)
    app.get('/api/out/findById/:id', out.findById)
    app.put('/api/updateOut/:id', out.updateOut)
    app.post('/api/addOut', out.addOut)
    //----------------------------------------------------------นอกแผน2567
    app.get('/api/out/findAllOut2567', out.findAllOut2567)
    app.get('/api/out/findById2567/:id', out.findById2567)
    app.put('/api/updateOut2567/:id', out.updateOut2567)
    app.post('/api/addOut2567', out.addOut2567)




    app.put('/api/updateformPl/:id', budget2022.update_formPl)
    app.put('/api/updateformDt/:id', budget2022.update_formDt)
    app.put('/api/updateformSt/:id', budget2022.update_formSt)
    app.put('/api/updateformEn/:id', budget2022.update_formEn)
    app.put('/api/updateformPa/:id', budget2022.update_formPa)
    app.put('/api/updateformDe/:id', budget2022.update_formDef)

    app.get('/api/out/dashboard', newproject.outTable)
    app.get('/api/in/dashboard', newproject.inTable)

    app.get('/api/donate/:id', donate.findById)
    app.put('/api/updateDonate/:id', donate.update)
    app.post('/api/addDonate', donate.add)

    //------------------------------------------------ครุภัณฑ์นอกแผน
    app.get('/api/out/findAll_L2567', out.findAll2567_LowOut)
    app.get('/api/out/findById_L2567/:id', out.findId2567_LowOut)
    app.put('/api/updateOut_L2567/:id', out.updateOutLow_2567)
    app.post('/api/addOut_L2567', out.addOutLow_2567)
}
