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
  Search: null,
  map: null,
  type_insident: null,
  perMonth: null,
  perDay: null,
  perDistrict: null,
  perWeapon: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },
  SET_AllReport(state, report) {
    state.Repport = report
  },
  SET_Search(state, data) {
    state.Search = data
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
  },
  SET_PerDay(state, data) {
    state.perDay = data
  },
  SET_PerDistrict(state, data) {
    state.perDistrict = data
  },
  SET_PerWeapon(state, data) {
    state.perWeapon = data
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

  async perMonth({ commit }, { year, token }) {
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

  async perDay({ commit }, { year, token }) {
    try {
      axios.defaults.headers = {
        'authorization': token
      }
      const { data } = await axios.get('/incidents_per_day?year='+year)
      commit('SET_PerDay', data)
    }
    catch (error) {
      if (error.response && error.response.status === 403) {
        throw new Error('per day failed')
      }
      throw error
    }
  },

  async perDistrict({ commit }, { year, token }) {
    try {
      axios.defaults.headers = {
        'authorization': token
      }
      const { data } = await axios.get('/incidents_per_district?year='+year)
      commit('SET_PerDistrict', data)
    }
    catch (error) {
      if (error.response && error.response.status === 403) {
        throw new Error('per district failed')
      }
      throw error
    }
  },

  async perWeapon({ commit }, { year, token }) {
    try {
      axios.defaults.headers = {
        'authorization': token
      }
      const { data } = await axios.get('/incidents_per_weapon?year='+year)
      commit('SET_PerWeapon', data)
    }
    catch (error) {
      if (error.response && error.response.status === 403) {
        throw new Error('per weapon failed')
      }
      throw error
    }
  },

  async Search({ commit }, { field, keyword, token}) {
    try {
      axios.defaults.headers = {
        'authorization': token
      }
      const { data } = await axios({
          url: 'http://192.168.34.127:80/searchResults',
          method: 'GET',
          params: {
            keyword: keyword,
            field:field
          },
        })
      commit('SET_Search', data)
    }
    catch (error) {
      if (error.response && error.response.status === 403) {
        throw new Error('Search failed')
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
    const { data } = await axios.get('/reports?page='+page+'&per_page=15')
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
    try {
      axios({
          url: 'http://192.168.34.127:8081/exportToCsv',
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

  async inscription({ commit },{ token, first_name, last_name,
                      gender, email, login,
                      birth_date, hire_date, role, password}) {
     axios.defaults.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    }
     await axios({
      method: 'post',
      url: 'http://192.168.34.127:8080/user',
      params: {
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        email: email,
        birth_date: birth_date,
        hire_date: hire_date,
        role: role,
        login: login,
        password: sha1(password)
      },
    })
    .then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (error) {
        //handle error
        console.log(error.response);
    });
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

  async DeleteReport({commit},{token,compnos})
  {
    try {
        axios.defaults.headers = {
          'Authorization': token
      }
      const { data } = await axios.delete('/reports/'+compnos)
      commit('SET_AllReport',data)
      return {
        message : 'Report has been deleted'
      }
    } catch (error) {
      if (error.response) {
        throw new Error('Error delete')
      }
      throw error
    }
  },


}
