var apiAddress = {
    login: {
        register: '/home/user/register',
        ordinary_login: '/home/user/login',
        wxlogin: '/home/user/wxLogin',
        getCode: '/home/user/registcode'
    },
    wx: {
        getCode: '/home/wxch/code',
        login: '/home/wxch/wxlogin',
        JSSDK: '/home/wxch/createJssdkConfig',
        config: '/home/wxch/createJssdkConfig'
    },
    mobile: {
        backVerification: '/home/user/checkcode',
        mobileCode: '/home/user/mobilecode',
        newMobileCode: '/home/user/newcode',
        change: '/home/user/changemobile',
        registerCode: '/home/user/registcode'
    },
    password: {
        changePassword: '/home/user/changepass',
        searchpass: '/home/user/searchpass',
        passCode: '/home/user/passcode'
    },
    home: {
        receivedList: '/home/apply/getlist',
        receivedDetails: '  /home/apply/getdetail',
        applyOperate: '/home/apply/applyoperate',
        applyShift: '/home/apply/applyshift',
        applyDel: '/home/apply/applydel',
        noticeList: '/home/notice/list',
        noticeDetails: '/home/notice/detail'
    },
    mail: {
        list: '/home/user/comlist',
        details: '/home/user/comdetail'
    },
    center: {
        userInfo: '/home/user/getInfo',
        myApply: '/home/apply/mylist',
        applyDel: '/home/apply/delmyapply',
        applyConcel: '/home/apply/mycancel',
        applyDetails: '/home/apply/mydetail',
        getMySalary: '/home/salary/getMySalary',
        salaryDetails: '/home/salary/getMySalaryDetail',
        salaryRule: '/home/salary/getSalaryRule',
        salaryConfirm: '/home/salary/confirmSalary',
        salaryCancel: '/home/salary/cancelSalary'
    },
    apply: {
        leave: '/home/apply/leave',
        userCar: '/home/apply/usecar',
        goods: '/home/apply/goods',
        goodsList: '/home/goods/list',
        reimbursement: '/home/apply/reimburse',
        contractPayment: '/home/apply/contract',
        proceeds: '/home/apply/proceeds',
        reserve: '/home/apply/reserve'
    },
    receivedApply: {
        details: '/home/apply/getdetail',
        applyoperate: '/home/apply/applyoperate',
        transfer: '/home/apply/applyshift'
    },
    calendar: {
        details: '/home/user/calendar',
        setAdvance: '/home/user/setAdvance',
        getAdvance: '/home/user/getAdvance'
    },
    // 打卡
    sign: {
        signIn: '/home/signLog/signIn',
        monthLog: '/home/signLog/getListByMonth',
        second: '/home/signLog/getPmonthSign',
        checkSign: '/home/signLog/checkSign',
        todayInfo: '/home/signLog/getOneUserDetail'
    },
    // 签到
    check: {
        signIn: '/home/newsignLog/signIn',
        signList: '/home/newsignLog/getMyList'
    },
    // 考核
    assessment: {
        list: '/home/assess/getAssessRecord',
        surelist: '/home/assess/getSureAssessList'
    },
    // 客户
    customer: {
        AddCustomer: '/home/client/clientModify',
        delCustomer: '/home/client/clientDelete',
        tag: '/home/client/labelLogList',
        customerList: '/home/client/clientList',
        customerInfo: '/home/client/clientDetail',
        classfiy: '/home/client/classifyList',
        tagList: '/home/client/labelMyList',
        addTag: '/home/client/labelAdd',
        setBirthday: '/home/client/clientBirthday',
        followUpList: '/home/client/followList',
        addFollow: '/home/client/followModify',
        customerAddTag: '/home/client/labelLogAdd',
        delCustomerTag: '/home/client/labelLogDelete',
        addTrade: '/home/client/tradeAdd',
        tagMapCustomer: '/home/client/labelLogCList'
    },
    // 行业列表
    tradeList: {
        tradeList: '/home/client/tradeList',
        tradeAdd: '/home/client/tradeAdd',
        tradeDelete: '/home/client/tradeDelete'
    },
    // 生日提醒
    birthday: {
        birthdayRemind: '/home/client/clientBirthday'
    },
    plan: {
        // public
        getFinishNum: '/home/plan/getPlanNum',
        details: '/home/plan/getAnyDetail',
        finish: '/home/plan/accomplishAny',
        del: '/home/plan/deleteAnyPlan',
        editSummary: '/home/plan/editSummary',
        // day
        priority: '/home/plan/getPriorList',
        daylist: '/home/plan/dayPlanList',
        dayPlanAdd: '/home/plan/addDayPlan',
        dayItemDetails: '/home/plan/getDayPlanDetail',
        dayConfirm: '/home/plan/accomplishDayPlan',
        // week
        weekList: '/home/plan/getWeekPlanList',
        addWeekPlan: '/home/plan/addWeekPlan',
        weekSummaryAdd: '/home/plan/subSummary',
        weekSummaryDetails: '/home/plan/getSumDetail',
        // month
        monthList: '/home/plan/getMonthPlanList',
        monthPlanAdd: '/home/plan/addMonthPlan',
        // year
        yearList: '/home/plan/getYearPlanList',
        yearPlanAdd: '/home/plan/addYearPlan',
        yearPlanClassifyAdd: '/home/plan/addCate',
        yearPlanClassifyList: '/home/plan/getCateList',
        yearPlanList: '/home/plan/getYearPlanListByCate',
        yearPlanDel: '/home/plan/deleteAnyPlan',
        getclassifyName: 'home/plan/getCateName'
    },
    project: {
        list: '/home/project/list',
        workTime: '/home/project/worktime',
        mission: '/home/project/mission',
        submit: '/home/project/daywork'
    }
}
export {apiAddress}
