import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    strInputFirstLink: '',
    objInputFirstLink: null,
    strIpRemovedFirstLink: '',
    DEFAULT_strInputFirstLink: 'vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogInN0ckRlZmF1bHRJbnB1dExpbmsiLA0KICAiYWRkIjogIjIuMi4yLjIiLA0KICAicG9ydCI6ICI0NDMiLA0KICAiaWQiOiAiMjIyMjIyLTIyMjItMjIyMi0yMjIyLTIyMjIyMjIiLA0KICAiYWlkIjogIjAiLA0KICAic2N5IjogImF1dG8iLA0KICAibmV0IjogIndzIiwNCiAgInR5cGUiOiAibm9uZSIsDQogICJob3N0IjogIlN0cmluZyBEZWZhdWx0IiwNCiAgInBhdGgiOiAiL3BhdGgiLA0KICAidGxzIjogInRscyIsDQogICJzbmkiOiAiIiwNCiAgImFscG4iOiAiIg0KfQ',
    DEFAULT_objInputFirstLink: {
      v: 'default',
      ps: 'default',
      add: '2.2.2.2',
      port: 'default',
      id: 'default',
      aid: 'default',
      scy: 'default',
      net: 'default',
      type: 'default',
      host: 'Object Default',
      path: 'default',
      tls: 'default',
      sni: '',
      alpn: ''
    },
    // 0: 待机状态
    // 1: 成功状态
    // 2: 失败状态
    flag_ATOB: 0,
    flag_JSON: 0,
    flag_BTOA: 0,
    radioValue: '1',
    resultNumber: 0,
    textPrefixInput: null,
    arrayIPsCOPY: [],
    vListDataAuto: [],
    vListDataIp2l: [],
    vListDataL2ip: [],
    vListDataModify: [],
    vListDataCompare1: [],
    vListDataCompare2: [],
    vListDataIp2lRange1: [],
    vListDataIp2lRange2: [],
    strOutputToCopy: '',
    flag_autoCmdBtn: false,
    flag_ip2lCmdBtn: false,
    strL2ipInput: null,
    strSingleInput: null,
    strRangeInput: null,
    modifyInput: null,
    compareInputNew: null,
    compareInputOld: null
  },
  mutations: {
    exit(state) {
      state.strInputFirstLink = ''
      state.objInputFirstLink = null
      state.radioValue = '1'
      state.resultNumber = 0
      state.vListDataAuto = []
      state.vListDataIp2l = []
      state.vListDataL2ip = []
      state.vListDataModify = []
      state.vListDataCompare1 = []
      state.vListDataCompare2 = []
      state.vListDataIp2lRange1 = []
      state.vListDataIp2lRange2 = []
      state.strOutputToCopy = ''
      // 刷新当前页面。刷新页面会自动清空所有数据至初始值
      location.reload()
    },
    set_strInputFirstLink(state, str) {
      state.strInputFirstLink = str
    },
    set_objInputFirstLink(state, obj) {
      state.objInputFirstLink = obj

      // 得到一个缺省add属性的字符串，用来'auto'和'ip2l'字符拼接用
      // 1 深度拷贝
      // 2 删除add属性
      // 3 字符化
      const deepCopiedObjInputLink = JSON.parse(JSON.stringify(obj))

      delete deepCopiedObjInputLink.add

      const strDeepCopyInputLinkNoAdd = JSON.stringify(deepCopiedObjInputLink)

      state.strIpRemovedFirstLink = strDeepCopyInputLinkNoAdd
    },
    set_flag_ATOB(state, flag) {
      state.flag_ATOB = flag
    },
    set_flag_JSON(state, flag) {
      state.flag_JSON = flag
    },
    radioValue(state, value) {
      state.radioValue = value
    },
    set_resultNumber(state, num) {
      state.resultNumber = num
    },
    textPrefixInput(state, str) {
      state.textPrefixInput = str
    },
    vListDataAuto(state, arr) {
      state.vListDataAuto = arr
    },
    vListDataIp2l(state, arr) {
      state.vListDataIp2l = arr
    },
    vListDataL2ip(state, arr) {
      state.vListDataL2ip = arr
    },
    vListDataModify(state, arr) {
      state.vListDataModify = arr
    },
    vListDataCompare1(state, arr) {
      state.vListDataCompare1 = arr
    },
    vListDataCompare2(state, arr) {
      state.vListDataCompare2 = arr
    },
    set_vListDataIp2lRange1(state, arr) {
      state.vListDataIp2lRange1 = arr
    },
    set_vListDataIp2lRange2(state, arr) {
      state.vListDataIp2lRange2 = arr
    },
    set_strOutputToCopy(state, str) {
      state.strOutputToCopy = str
    },
    flag_autoCmdBtn(state, bool) {
      state.flag_autoCmdBtn = bool
    },
    flag_ip2lCmdBtn(state, bool) {
      state.flag_ip2lCmdBtn = bool
    },
    set_arrayIPsCOPY(state, arr) {
      state.arrayIPsCOPY = arr
    },
    set_strL2ipInput(state, str) {
      state.strL2ipInput = str
    },
    set_strSingleInput(state, str) {
      state.strSingleInput = str
    },
    set_strRangeInput(state, str) {
      state.strRangeInput = str
    },
    modifyInput(state, str) {
      state.modifyInput = str
    },
    set_compareInputNew(state, str) {
      state.compareInputNew = str
    },
    set_compareInputOld(state, str) {
      state.compareInputOld = str
    }
  },
  actions: {
    set_homeTextField(context, newString) {
      let strLink1 = context.state.DEFAULT_strInputFirstLink

      if (newString !== '' && newString !== null) strLink1 = newString

      context.commit('set_strInputFirstLink', strLink1)

      context.dispatch('action_set_objInputFirstLink', strLink1)
    },
    async action_set_objInputFirstLink(context, newString) {
      // 去掉前8位的协议头
      const strEncoded = newString.slice(8)
      let result2 = null
      let result3 = null
      let objLink1 = context.state.DEFAULT_objInputFirstLink

      try {
        result2 = await context.dispatch('action_decodedStringSafely', strEncoded)
        context.commit('set_flag_ATOB', 1)
      } catch (error2) {
        context.commit('set_flag_ATOB', 2)
        console.error('error2->', error2)
      }

      try {
        result3 = await context.dispatch('action_jsonParseSafely', result2)
        context.commit('set_flag_JSON', 1)
      } catch (error3) {
        context.commit('set_flag_JSON', 2)
        console.error('error3->', error3)
      }

      if (result3 instanceof Object) objLink1 = result3

      context.commit('set_objInputFirstLink', objLink1)
    },
    handle_singleInput(context, inputData) {
      context.commit('set_strSingleInput', inputData)
    },
    // ip2l 把ip转换成连接
    async handle_IP2LINK(context, arrayIPs) {
      let strResult = ''
      const arrResult = []
      const STR_1 = ',\"add\":\"'
      const STR_2 = '\"}'
      const STR_PROTOCOL = 'vmess://'
      const STR_LINE_BREAKER = '\n'

      for (let i = 0; i < arrayIPs.length; i++) {
        const temp1 = arrayIPs[i]

        // Add address
        const temp2 = context.state.strIpRemovedFirstLink.slice(0, -1).concat(STR_1, temp1, STR_2)

        // Encode Link
        const temp3 = btoa(temp2)

        // Add header
        let temp4 = ''
        temp4 = STR_PROTOCOL.concat(temp3, STR_LINE_BREAKER)

        // 汇总
        strResult = strResult + temp4
        arrResult.push(temp4)
      }

      console.log('strResult | arrResult ->', strResult.length, arrResult.length)

      // 存一个IP的副本，与接下来的流程无关
      context.commit('set_arrayIPsCOPY', arrayIPs)

      // 字符串结果用于剪贴板
      context.commit('set_strOutputToCopy', strResult)

      // vlist数据
      context.dispatch('handle_vListDataSource', arrResult)
    },
    handle_rangeInput(context, inputData) {
      context.commit('set_strRangeInput', inputData)

      if (inputData === null) return

      // 分行
      const arrInputLinks = inputData.split('\n')

      // 去空,去重
      const modArrInputLinks = arrInputLinks.filter((item, index, arr) => {
        return item.length > 0 && arr.indexOf(item, 0) === index
      })

      // 排序(数字从小到大)
      const sortedModArrInputLinks = modArrInputLinks.sort((a, b) => {
        const ip1 = a.split('.').map(e => e.padStart(3, '0')).join('')
        const ip2 = b.split('.').map(e => e.padStart(3, '0')).join('')
        return ip1 - ip2
      })

      context.commit('set_vListDataIp2lRange1', sortedModArrInputLinks)
    },
    async handle_LINK2IP(context, stringLINKs) {
      let strResult = ''
      const arrResult = []

      context.commit('set_strL2ipInput', stringLINKs)

      if (stringLINKs === null) return

      // 分行
      const arrInputLinks = stringLINKs.split('\n')

      // 去空
      const modArrInputLinks = arrInputLinks.filter(l => l.length > 0)

      for (let i = 0; i < modArrInputLinks.length; i++) {
        const element = modArrInputLinks[i]

        const address = element.slice(8)

        const strDecoded = atob(address)

        const objDecoded = JSON.parse(strDecoded)

        strResult = strResult + objDecoded.add + '\n'

        arrResult.push(objDecoded.add)
      }

      // L2IP:
      // 1 字符串结果用于剪贴板
      context.commit('set_strOutputToCopy', strResult)
      // 2 vlist数据
      context.dispatch('handle_vListDataSource', arrResult)
    },
    handle_compareInputNew(context, inputNew) {
      context.commit('set_compareInputNew', inputNew)
      context.dispatch('handle_compareInputBoth')
    },
    handle_compareInputOld(context, inputOld) {
      context.commit('set_compareInputOld', inputOld)
      context.dispatch('handle_compareInputBoth')
    },
    async handle_compareInputBoth(context) {
      const strNewIPs = context.state.compareInputNew
      const strOldIPs = context.state.compareInputOld

      if (strNewIPs === null || strOldIPs === null) return

      // 分行
      const tempNew1 = strNewIPs.split('\n')
      const tempOld1 = strOldIPs.split('\n')

      // 去空
      const tempNew2 = tempNew1.filter(l => l.length > 0)
      const tempOld2 = tempOld1.filter(l => l.length > 0)

      // 去空格
      const tempNew3 = tempNew2.map(x => x.trim())
      const tempOld3 = tempOld2.map(x => x.trim())

      // 对比
      const arrDiffIPs = tempNew3.filter(x => !tempOld3.includes(x))

      // 单独设置ip栏的vlist的DataSources数据
      try {
        const temp_arrData = await context.dispatch('buildDataSources', arrDiffIPs)
        context.commit('vListDataCompare2', temp_arrData)
      } catch (e1) {
        console.error('e1->', e1)
      }

      context.dispatch('handle_IP2LINK', arrDiffIPs)
    },
    handle_modifyInput(context, inputData) {
      const name_prefix = context.state.textPrefixInput
      const arrResult = []
      let strResult = ''
      const STR_PROTOCOL = 'vmess://'
      const STR_LINE_BREAKER = '\n'

      context.commit('modifyInput', inputData)

      console.log('inputData->', inputData)
      console.log('name_prefix->', name_prefix)

      if (inputData === null || name_prefix === null) {
        Vue.$toast.error('prefix or links cannot be empty')
        return
      }

      const arrInputLinks = inputData.split('\n')

      const modArrInputLinks = arrInputLinks.filter(l => l.length)

      for (let i = 0; i < modArrInputLinks.length; i++) {
        let address = ''

        const element = modArrInputLinks[i]

        address = element.slice(8)

        const strDecoded = atob(address)

        const objDecoded = JSON.parse(strDecoded)

        objDecoded.ps = name_prefix + objDecoded.add

        const strObjDecoded = JSON.stringify(objDecoded)

        const strEncoded = btoa(strObjDecoded)

        const strEncodedWithHeader = STR_PROTOCOL + strEncoded

        strResult = strResult + strEncodedWithHeader + STR_LINE_BREAKER

        arrResult.push(strEncodedWithHeader)
      }

      console.log('strResult->', strResult)

      console.log('arrResult->', arrResult)

      // // L2IP:
      // // 1 字符串结果用于剪贴板
      context.commit('set_strOutputToCopy', strResult)
      // // 2 vlist数据
      context.dispatch('handle_vListDataSource', arrResult)
    },
    async handle_vListDataSource(context, arr) {
      // 设置结果个数
      context.commit('set_resultNumber', arr.length)
      // 设置vlist显示所需的DataSources
      switch (context.state.radioValue) {
        case '1':
          try {
            const temp_arrData = await context.dispatch('buildDataSources', arr)
            context.commit('vListDataAuto', temp_arrData)
          } catch (e1) {
            console.error('e1->', e1)
          }
          break

        case '2':
          try {
            const temp_arrData = await context.dispatch('buildDataSources', arr)
            context.commit('vListDataIp2l', temp_arrData)
          } catch (e2) {
            console.error('e2->', e2)
          }
          break

        case '3':
          try {
            const temp_arrData = await context.dispatch('buildDataSources', arr)
            context.commit('vListDataL2ip', temp_arrData)
          } catch (e3) {
            console.error('e3->', e3)
          }
          break

        case '4':
          break
        case '5':
          try {
            const temp_arrData = await context.dispatch('buildDataSources', arr)
            context.commit('vListDataCompare1', temp_arrData)
          } catch (e5) {
            console.error('e5->', e5)
          }
          break

        case '6':
          try {
            const temp_arrData = await context.dispatch('buildDataSources', arr)
            context.commit('vListDataModify', temp_arrData)
          } catch (e6) {
            console.error('e6->', e6)
          }
          break

        case '7':
          try {
            const temp_arrData = await context.dispatch('buildDataSources', arr)
            context.commit('set_vListDataIp2lRange2', temp_arrData)
          } catch (e6) {
            console.error('e6->', e6)
          }
          break

        default:
          console.log('switch语句没有匹配到radioValue为的值')
          break
      }
    },
    async action_decodedStringSafely(context, str) {
      return atob(str)
    },
    async action_jsonParseSafely(context, str) {
      return JSON.parse(str)
    },
    // 字符串数组增加sid属性变为对象数组，用于vlist显示
    buildDataSources(context, arr) {
      const tempX = []

      for (let i = 0; i < arr.length; i++) {
        tempX.push({ sid: i, value: arr[i] })
      }

      return tempX
    }
  },
  modules: {
  }
})
