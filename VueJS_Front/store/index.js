import axios from 'axios'
var cookieparser = require('cookieparser')
var sha1 = require('sha1')
export const strict = false

export const state = () => ({
  authUser: null,
  authToken: null,
  Getpermission: null,
  Pending:null,
  Repport: null,
  map: null,
  type_insident: null,
  perMonth: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },
  SET_AllReport(state, report) {
    state.Repport = report
  },
  update (state, data) {
    state.auth = data
  },
  SET_Pending: function (state, data) {
    state.Pending = data
  },
  Get_Insident(state,data) {
    state.type_insident = data
  },
  SET_PerMonth(state, data) {
    state.perMonth = data
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    let accessToken = null
    if (req.session && req.session.authUser) {
      if (req.headers.cookie) {
        var parsed = cookieparser.parse(req.headers.cookie)
        accessToken = JSON.parse(parsed.auth)
        console.log(accessToken)
      }
      commit('update', accessToken)
      commit('SET_USER', req.session.authUser)
    }
  },

  /*
  * fonction for Connection send param
  * @param : username, password
  */
  async login({ commit }, { username, password }) {

    try {
      axios.defaults.headers = {
         'Content-Type': 'application/json',
         'login': username,
         'password': sha1(password)
      }
      const { data } = await axios.get('login', { username, password })
      console.log(data['permission'])
      commit('SET_USER', data)

    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Wrong login or password')
      }
      else if(error.response && error.response.status === 403) {
        throw new Error('Your account has not yet been activated')
      }
      throw error
    }
  },

  /*
  * fonction for logout delete all parm
  */
  async logout({ commit }) {
    commit('SET_USER', null)
  },

  /*
  * fonction for inscription
  * @param : first_name, last_name, gender, email
  *          login, birth_date, role, password, token
  */
  async inscription({ token,first_name, last_name,
                      gender, email, login,
                      birth_date, hire_date, role,  password}) {
    try {
      axios.defaults.headers = {
         'Content-Type': 'application/x-www-form-urlencoded',
         'authorization': token
      }
      const { data } = await axios.post('http://172.20.10.2:8080/users', {
        first_name,
        last_name,
        gender,
        email,
        login,
        birth_date,
        hire_date,
        role,
        password
       })
    } catch (error) {
      if (error.response && error.response.status === 401 ) {
        throw new Error('Echec de l inscription')
      }
      throw error
    }
  },

  /*
  * fonction for add report
  * @param :      compnos, token, naturecode,
  *    incident_type_description,
  *    main_crimecode, reptdistrict,
  *    reportingarea, fromdate,
  *    weapontype, shooting, domestic,
  *    shift, year, month, day_week,
  *    ucrpart, x, y, streetname,
  *    xstreetname, location,
  */
  async report({ commit }, {
    compnos, token, naturecode,
    incident_type_description,
    main_crimecode, reptdistrict,
    reportingarea, fromdate,
    weapontype, shooting, domestic,
    shift, year, month, day_week,
    ucrpart, x, y, streetname,
    xstreetname, location,
  }) {
      try {
        axios.defaults.headers = {
           'Content-Type': 'application/json',
           'authorization': token
        }
      const { data } = await axios.post('/add_report', {
        compnos,
        token,
        naturecode,
        incident_type_description,
        main_crimecode,
        reptdistrict,
        reportingarea,
        fromdate,
        weapontype,
        shooting,
        domestic,
        shift,
        year,
        month,
        day_week,
        ucrpart,
        x,
        y,
        streetname,
        xstreetname,
        location,
      })
    } catch (error) {
        if (error.response && error.response.status === 403) {
          throw new Error('Echec du Repport ')
        }
        throw error
      }
    },

    async edit({ commit }, {
      compnos, token, naturecode,
      incident_type_description,
      main_crimecode, reptdistrict,
      reportingarea, fromdate,
      weapontype, shooting, domestic,
      shift, year, month, day_week,
      ucrpart, x, y, streetname,
      xstreetname, location,
    }) {
        try {
          axios.defaults.headers = {
             'Content-Type': 'application/json',
             'authorization': token
          }
        const { data } = await axios.put('/reports/'+compnos, {
          compnos,
          token,
          naturecode,
          incident_type_description,
          main_crimecode,
          reptdistrict,
          reportingarea,
          fromdate,
          weapontype,
          shooting,
          domestic,
          shift,
          year,
          month,
          day_week,
          ucrpart,
          x,
          y,
          streetname,
          xstreetname,
          location,
        })
      console.log("success")
      } catch (error) {
          if (error.response && error.response.status === 403) {
            throw new Error('Update failed')
          }
          throw error
        }
      },

    /*
    * fonction for get all count in pending
    * @param : token
    */
    async pendingAll({ commit }, { token}) {
  try {
      axios.defaults.headers = {
        'authorization': token
    }
    const { data } = await axios.get('/pending_accounts')
    commit('SET_Pending', data)
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('Fail Account')
    }
    throw error
  }
},

  /*
  * fonction for get all Report
  * @param : token
  */
  async GetAllreport({ commit }, { token }) {
  try {
      axios.defaults.headers = {
        'Authorization': token
    }
    const { data } = await axios.get('/reports')
    commit('SET_AllReport',data)
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('report')
    }
    throw error
  }
},

async perMonth({ commit }, { year, token}) {
  try {
    axios.defaults.headers = {
      'authorization': token
    }
    const { data } = await axios.get('/incidents_per_month?year='+year)
    commit('SET_PerMonth', data)
  }
  catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('per month failed')
    }
    throw error
  }
},

  /*
  * fonction for pagination and get all report
  * @param : token, page
  */
  async GetAllreportNavigation({ commit }, { page, token }) {
  try {
      axios.defaults.headers = {
        'Authorization': token
    }
    const { data } = await axios.get('/reports?page='+page+'&per_page=25')
    commit('SET_AllReport',data)
    return data
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('report')
    }
    throw error
  }
},

 /*
 * fonction for get location By insident
 * @param : token, insident
 */
  async GetGeolocbyInsident({ commit }, {token, insident}) {
    try {
        axios.defaults.headers = {
          'Authorization': token
        }
        const { data } = await axios.get('/geoloc/'+insident)
        commit(Get_Insident, data)
        return data
    } catch (err) {
      if (err.response) {
        throw new Error('report')
      }
      throw error
    }
  },

  async GetCsv({token}){
    // axios.default.headers = {
    //   'Authorization': token
    // }
    // await axios.get('http://192.168.34.28:8080/exportToCsv')
    // let blob = new Blob([response.data], { type: 'application/pdf' }),
    //     url = window.URL.createObjectURL(blob)
    //
    //   window.open(url)
    try {
      axios({
          url: 'http://192.168.34.28:8080/exportToCsv',
          method: 'GET',
          responseType: 'blob',
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'users.csv');
          document.body.appendChild(link);
          link.click();
        });
    } catch (error) {
      if (error.response) {
        throw new Error('Activation error')
      }
      throw error
    }
  },

  async validate({commit},{token, id})
  {
    try {
        axios.defaults.headers = {
          'Authorization': token
      }
      const { data } = await axios.put('/activate_user/'+id)
      commit('SET_Pending',data)
      return {
        message : 'Success'
      }
    } catch (error) {
      if (error.response) {
        throw new Error('Activation error')
      }
      throw error
    }
  },

}
