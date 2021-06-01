const dashboardDataFunction = (name,email,password) => {
    return  {
    name,
    email,
    password,
    dashboard: [ {
        courseType:"html",
        score:0,
        courseStatus:false
    },
    {
        courseType:"css",
        score:0,
        courseStatus:false
    },
    {
        courseType:"js",
        score:0,
        courseStatus:false
    },
    {
        courseType:"reactjs",
        score:0,
        courseStatus:false
    },
    {
        courseType:"python",
        score:0,
        courseStatus:false
    },
    {
        courseType:"angularjs",
        score:0,
        courseStatus:false
    },
    {
        courseType:"nodejs",
        score:0,
        courseStatus:false
    },
    {
        courseType:"sql",
        score:0,
        courseStatus:false
    },

    ],
    aboutSomething:""
}
}

module.exports = dashboardDataFunction