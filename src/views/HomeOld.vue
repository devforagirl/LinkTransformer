<template>
  <div class="HomeBigBox">
    <div class="leftSideBox">
      <div class="inputOutterBox">
        <div class="inputBox">
          <v-text-field
            v-model="leftInputValue"
            label="Vmess Link"
            placeholder="vmess link"
            outlined
            clearable
            @click:clear="clearMessage"
          />
        </div>
        <!-- 输入状态检查区域 -->
        <div class="inputStatusBox">
          <div :class="classATOB">
            Decoded
          </div>
          <div :class="classBTOA">
            Encoded
          </div>
          <div :class="classJSON">
            JSON.parse
          </div>
        </div>
      </div>

      <div class="btnSetBox">
        <v-btn
          width="100%"
          @click="btnSetIp"
        >Set {{ objInputLink.add }}</v-btn>
      </div>
      <br>

      <div class="displayBox">
        <!-- 输入结果显示区域 -->
        <div class="tableBox">
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    index
                  </th>
                  <th class="text-left">
                    key
                  </th>
                  <th class="text-left">
                    value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item,key,index) in objInputLink"
                  :key="index"
                >
                  <td>{{ index }}</td>
                  <td>{{ key }}</td>
                  <td>{{ item }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>
    </div>

    <div
      v-show="flag_SET"
      class="rightSideBox"
    >
      <div class="rightCtrlBox">
        <div class="rightCtrlFirstBox">
          <div class="classBackground">
            <v-radio-group
              v-model="radioValue"
              mandatory
              class="optionsGroupBox"
            >
              <v-radio
                label="Auto"
                color="white"
                value="1"
              />
              <v-radio
                label="Manual-IP2L"
                color="white"
                value="2"
              />
              <v-radio
                label="Manual-L2IP"
                color="white"
                value="3"
              />
              <v-radio
                label="Compare"
                color="white"
                value="4"
              />
            </v-radio-group>
          </div>
        </div>

        <!-- IP数字 / 提示部分 -->
        <div class="rightCtrlSecondBox">
          <div
            v-show="radioValue==='1'"
            class="classBackground"
          >

            <div class="inputBox rightInputBox">
              <v-text-field
                v-model="outputIps[0]"
                :label="inputIps[0]"
                :placeholder="inputIps[0]"
                solo
                dense
              />
              <i class="circle" />
              <v-text-field
                v-model="outputIps[1]"
                :label="inputIps[1]"
                :placeholder="inputIps[1]"
                solo
                dense
              />
              <i class="circle" />
              <v-text-field
                v-model="outputIps[2]"
                :label="inputIps[2]"
                :placeholder="inputIps[2]"
                solo
                dense
              />
              <i class="circle" />
              <v-text-field
                v-model="outputIps[3]"
                :label="inputIps[3]"
                :placeholder="inputIps[3]"
                solo
                dense
              />
            </div>
            <div class="textMidBox">
              To
            </div>
            <div class="inputBox rightInputBox">
              <v-text-field
                v-model="outputIps[4]"
                :label="inputIps[0]"
                :placeholder="inputIps[0]"
                solo
                dense
              />
              <i class="circle" />
              <v-text-field
                v-model="outputIps[5]"
                :label="inputIps[1]"
                :placeholder="inputIps[1]"
                solo
                dense
              />
              <i class="circle" />
              <v-text-field
                v-model="outputIps[6]"
                :label="inputIps[2]"
                :placeholder="inputIps[2]"
                solo
                dense
              />
              <i class="circle" />
              <v-text-field
                v-model="outputIps[7]"
                :label="inputIps[3]"
                :placeholder="inputIps[3]"
                solo
                dense
              />
            </div>
          </div>
          <div
            v-show="radioValue!=='1'"
            class="noticeBox classBackground"
          >
            <div class="NoticeIP2L">
              <div v-show="radioValue==='2'">NoticeIP2L:注意对应CDN，CDN提供商的IP段是不同的。
              </div>
            </div>
            <div class="NoticeL2IP">
              <div v-show="radioValue==='3'">NoticeL2IP：单纯的读出IP而已，不能直接继续用来IP2L,因为CDN要对应。
              </div>
            </div>
            <div class="NoticeCompare">
              <div v-show="radioValue==='4'">NoticeCompare:找出在Old IP 里没有的那些NEW IP，再次注意CDN对应。
              </div>
            </div>
          </div>
        </div>

        <!-- 指令部分 -->
        <div class="rightCtrlThirdBox">
          <div class="rightCtrlInnerBox classBackground">
            <v-btn
              class="btnClass"
              @click="btnGenerate"
            >
              GENERATE
            </v-btn>
            <v-btn
              :disabled="flag_BTOA !== 1"
              class="btnCopy btnClass"
              :data-clipboard-text="strLinks"
              @click="btnCopyAll"
            >
              COPY ALL LINKS
            </v-btn>
            <v-btn
              class="btnClass"
              @click="clearMessage"
            >
              RESET
            </v-btn>
          </div>
          <div class="ipRangeAndAmountsBox">
            <div
              v-show="strFromIp !==''&&radioValue==='1'"
              class="ipRangeBox"
            >
              From {{ strFromIp }} to {{ strToIp }}
            </div>
            <div
              v-show="outputIpsNum!==0"
              class="ipAmountsBox"
            >
              Amounts: {{ outputIpsNum }}
            </div>
          </div>
        </div>
      </div>
      <div class="rightDisplayBox">
        <!-- 手动模式 Manual - IP2L -->
        <div
          v-show="radioValue==='2'"
          class="manualBox itemBox"
        >
          <v-textarea
            v-model="strManualInput"
            :disabled="radioValue!=='2'"
            clearable
            clear-icon="mdi-close-circle"
            outlined
            height="48vh"
            name="input-7-4"
            label="One IP each line"
          />
        </div>
        <!-- 手动模式 Manual - L2IP -->
        <div
          v-show="radioValue==='3'"
          class="manualBox itemBox"
        >
          <v-textarea
            v-model="strManualInput2"
            :disabled="radioValue!=='3'"
            clearable
            clear-icon="mdi-close-circle"
            outlined
            height="48vh"
            name="input-7-4"
            label="One LINK each line"
          />
        </div>
        <!-- 对比模式 -->
        <div
          v-show="radioValue==='4'"
          class="oldIpBox itemBox"
        >
          <v-textarea
            v-model="strCompareOldInput"
            :disabled="radioValue!=='4'"
            clearable
            clear-icon="mdi-close-circle"
            outlined
            height="48vh"
            name="input-7-4"
            label="Old IP | One each line"
          />
        </div>
        <div
          v-show="radioValue==='4'"
          class="newIpBox itemBox"
        >
          <v-textarea
            v-model="strCompareNewInput"
            :disabled="radioValue!=='4'"
            clearable
            clear-icon="mdi-close-circle"
            outlined
            height="48vh"
            name="input-7-4"
            label="New IP | One each line"
          />
        </div>
        <div
          v-show="radioValue==='4'"
          class="diffIpDisplay itemBox"
        >
          <div
            v-show="arrCompareDiffIps.length===0"
            class="emptyText"
          >
            Different IPs
          </div>
          <div
            v-for="(item, index) in arrCompareDiffIps"
            :key="index"
          >
            {{ arrCompareDiffIps.length-index }}- {{ item }}
          </div>
        </div>

        <!-- 输出显示 -->
        <div :class="classResultBox">
          <virtual-list
            ref="vsl1"
            class="list-dynamic scroll-touch customization"
            :keeps="15"
            :data-key="'sid'"
            :data-sources="generatedSettingsEncoded"
            :data-component="itemComponent"
            :estimate-size="10"
            :item-class="'list-item-dynamic'"
            :bottom-threshold="2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ipfr from 'ip-from-range'
import Clipboard from 'clipboard' // google 'vue clipboard 使用'
import VirtualList from 'vue-virtual-scroll-list'
import Item from '../components/VscrollItem.vue'

export default {
  name: 'Home',
  components: { 'virtual-list': VirtualList },
  data() {
    return {
      clipboard: Object,
      itemComponent: Item,
      // 0: 待机状态
      // 1: 成功状态
      // 2: 失败状态
      flag_ATOB: 0,
      flag_JSON: 0,
      flag_BTOA: 0,
      flag_SET: false,
      radioValue: '1',
      strManualInput: '',
      strManualInput2: '',
      strCompareOldInput: '',
      strCompareNewInput: '',
      arrCompareDiffIps: [],
      leftInputValue: '',
      defaultLink: 'vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIm5vdGUiLA0KICAiYWRkIjogIjIuMi4yLjIiLA0KICAicG9ydCI6ICI0NDMiLA0KICAiaWQiOiAiMjIyMjIyLTIyMjItMjIyMi0yMjIyLTIyMjIyMjIiLA0KICAiYWlkIjogIjAiLA0KICAic2N5IjogImF1dG8iLA0KICAibmV0IjogIndzIiwNCiAgInR5cGUiOiAibm9uZSIsDQogICJob3N0IjogInd3dy5hYWEuY29tIiwNCiAgInBhdGgiOiAiL3BhdGgiLA0KICAidGxzIjogInRscyIsDQogICJzbmkiOiAiIiwNCiAgImFscG4iOiAiIg0KfQ',
      defaultObjInputLink: {
        v: 'default',
        ps: 'default',
        add: '1.1.1.1',
        port: 'default',
        id: 'default',
        aid: 'default',
        scy: 'default',
        net: 'default',
        type: 'default',
        host: 'default',
        path: 'default',
        tls: 'default',
        sni: ''
      },
      strObjInputLink: '',
      inputIps: [],
      outputIps: [],
      strFromIp: '',
      strToIp: '',
      outputIpsNum: 0,
      generatedSettings: [],
      generatedSettingsEncoded: [],
      generatedIps: [],
      generatedArrObjLinks: [],
      strLinks: ''
    }
  },
  computed: {
    StrArrIpRange() {
      const arrayStringIp = []

      if (this.inputIps.length !== 0) {
        for (let i = 0; i <= 7; i += 1) {
          if (this.outputIps[i] === undefined) {
            arrayStringIp[i] = this.inputIps[i]
          } else {
            arrayStringIp[i] = this.outputIps[i]
          }
        }
      }

      return arrayStringIp
    },
    // vmessString() {
    //   // ATOB
    //   if (this.leftInputValue == null || this.leftInputValue.length <= 1) return ''

    //   const address = this.leftInputValue.slice(8)
    //   const decodedString = this.decodedStringSafely(address)
    //   console.log('@@@decodedString->', decodedString)
    //   return decodedString
    // },
    objInputLink() {
      // ATOB
      if (this.leftInputValue == null || this.leftInputValue.length <= 1) return this.defaultObjInputLink

      const address = this.leftInputValue.slice(8)
      const decodedString = this.decodedStringSafely(address)

      // JSON.parse
      const decodedObj = this.parseJSONSafely(decodedString)
      if (decodedObj instanceof Object) {
        return decodedObj
      }

      return this.defaultObjInputLink
    },
    classATOB() {
      return {
        classIdling: this.flag_ATOB === 0,
        classSuccess: this.flag_ATOB === 1,
        classFailed: this.flag_ATOB === 2
      }
    },
    classBTOA() {
      return {
        classIdling: this.flag_BTOA === 0,
        classSuccess: this.flag_BTOA === 1,
        classFailed: this.flag_BTOA === 2
      }
    },
    classJSON() {
      return {
        classIdling: this.flag_JSON === 0,
        classSuccess: this.flag_JSON === 1,
        classFailed: this.flag_JSON === 2
      }
    },
    classResultBox() {
      return {
        'width100': this.radioValue === '1',
        'width70': this.radioValue === '2' || this.radioValue === '3',
        'width25': this.radioValue === '4',
        'resultBox': true
      }
    }
  },
  created() {
    this.leftInputValue = this.defaultLink
  },
  mounted() {
  },
  methods: {
    btnCopyAll() {
      const clipboard = new Clipboard('.btnCopy')

      clipboard.on('success', (e) => {
        clipboard.destroy()
        console.log('clipboard-success-e->', e)
      })
      clipboard.on('error', (e) => {
        clipboard.destroy()
        console.log('clipboard-error-e->', e)
      })
    },
    btnSetIp() {
      // 必须先set up好链接的其他属性后才能开始其他操作
      this.flag_SET = true

      // 分割 ip 地址段
      this.inputIps = this.objInputLink.add.split('.')

      // 增加inputIps的个数到8个，从而与outputIps的个数对应
      for (let i = 0; i <= 3; i += 1) {
        this.inputIps[i + 4] = this.inputIps[i]
      }

      // 清空上一次的残留值
      this.outputIps = []

      // 深度拷贝
      const deepCopiedObjInputLink = JSON.parse(JSON.stringify(this.objInputLink))

      // 删除add属性
      delete deepCopiedObjInputLink.add

      // 字符化
      this.strObjInputLink = JSON.stringify(deepCopiedObjInputLink)
    },
    btnGenerate() {
      if (this.radioValue === '1') {
        this.autoGenerate()
      } else if (this.radioValue === '2') {
        this.manualIP2LGenerate()
      } else if (this.radioValue === '3') {
        this.manualL2IPGenerate()
      } else if (this.radioValue === '4') {
        this.compareGenerate()
      }
    },
    manualIP2LGenerate() {
      if (this.strManualInput === '') {
        this.$toast.error('Input Cannot Be Empty')
        return
      }

      const arrayManualIps = this.strManualInput.split('\n')

      this.outputIpsNum = arrayManualIps.length

      this.generateIP2L(arrayManualIps)
    },
    manualL2IPGenerate() {
      // 输入为空则报toast
      if (this.strManualInput2 === '') return this.$toast.error('Input Cannot Be Empty')

      // 按行分割数据到数组里
      const arrayManualLinks = this.strManualInput2.split('\n')

      // 排除最后一行的空字符串行(浅拷贝)
      const modArrayManualLinks = arrayManualLinks.filter(link => link.length > 0)

      // 计算个数
      this.outputIpsNum = modArrayManualLinks.length

      // 传给下一步
      this.generateIps(modArrayManualLinks)
    },
    compareGenerate() {
      if (this.strCompareOldInput === '' || this.strCompareNewInput === '') {
        this.$toast.error('Input Cannot Be Empty')
        return
      }

      const arrCompareOldIps = this.strCompareOldInput.split('\n')
      const arrCompareNewIps = this.strCompareNewInput.split('\n')

      this.arrCompareDiffIps = arrCompareNewIps.filter(x => !arrCompareOldIps.includes(x))

      this.outputIpsNum = this.arrCompareDiffIps.length

      this.generateIP2L(this.arrCompareDiffIps)
    },
    autoGenerate() {
      if (this.StrArrIpRange.length === 0) return

      this.strFromIp = ''
      this.strToIp = ''

      for (let i = 0; i < this.StrArrIpRange.length; i += 1) {
        if (i <= 3) {
          this.strFromIp = this.strFromIp.concat('.', this.StrArrIpRange[i])
        } else {
          this.strToIp = this.strToIp.concat('.', this.StrArrIpRange[i])
        }
      }

      this.strFromIp = this.strFromIp.substring(1)
      this.strToIp = this.strToIp.substring(1)

      const arrayAutoIps = ipfr(this.strFromIp, this.strToIp).getIpAddresses()

      this.outputIpsNum = arrayAutoIps.length

      this.generateIP2L(arrayAutoIps)
    },
    generateIP2L(arrIps) {
      this.generatedSettings = arrIps.map((x) => {
        const str1 = ',\"add\":\"'
        const str2 = '\"}'

        return this.strObjInputLink.slice(0, -1).concat(str1, x, str2)
      })

      this.formLinks(this.generatedSettings)
    },
    generateIps(arrLinks) {
      // 遍历links, 转换成对象数组result1
      const result1 = arrLinks.map((x) => {
        // ATOB
        const address = x.slice(8)
        const decodedString = this.decodedStringSafely(address)

        // JSON.parse
        const decodedObj = this.parseJSONSafely(decodedString)
        if (decodedObj instanceof Object) {
          return decodedObj
        }

        return this.defaultObjInputLink
      })

      // 遍历数组result1, 修改属性
      // 浅拷贝，result1也一样被修改，最终，this.generatedArrObjLinks === result1)
      const arrModelNameElements = this.objInputLink.ps.split('-')

      this.generatedArrObjLinks = result1.map((y) => {
        // 收集ip到一个集合里
        this.generatedIps.push(y.add)
        // 改别名
        const arrLinkNameElements = y.ps.split('-')
        y.ps = arrModelNameElements[0] + '-' + arrLinkNameElements[1] + '-' + arrLinkNameElements[2]
        // 改用户ID
        y.id = this.objInputLink.id
        // 改伪装域名
        y.host = this.objInputLink.host
        // 改路径
        y.path = this.objInputLink.path

        return JSON.stringify(y)
      })

      this.formLinks(this.generatedArrObjLinks)
    },
    formLinks(arrStrLinks) {
      for (let i = 0; i < arrStrLinks.length; i++) {
        const strHeader = 'vmess://'

        const encodedString = this.encodedStringSafely(arrStrLinks[i])

        const oneLink = strHeader.concat(encodedString)

        this.generatedSettingsEncoded.push(
          { sid: i + 1, value: oneLink }
        )

        this.strLinks = this.strLinks + oneLink + '\n'
      }
    },
    clearMessage() {
      this.leftInputValue = null
      this.flag_ATOB = 0
      this.flag_BTOA = 0
      this.flag_JSON = 0
      this.inputIps = []
      this.outputIps = []
      this.strFromIp = ''
      this.strToIp = ''
      this.generatedSettingsEncoded = []
      this.outputIpsNum = 0
      this.generatedSettings = []
      this.generatedIps = []
      this.generatedArrObjLinks = []
      this.strLinks = ''
      this.strObjInputLink = ''
      this.leftInputValue = ''
      this.radioValue = '1'
      this.strManualInput = ''
      this.strCompareOldInput = ''
      this.strCompareNewInput = ''
      this.arrCompareDiffIps = []
      this.flag_SET = false
    },
    decodedStringSafely(str) {
      try {
        this.flag_ATOB = 1
        return atob(str)
      } catch (e) {
        console.log('err-atob->', e)
        this.flag_ATOB = 2
        return ''
      }
    },
    encodedStringSafely(str) {
      try {
        this.flag_BTOA = 1
        return btoa(str)
      } catch (e) {
        console.log('err-btoa->', e)
        this.flag_BTOA = 2
        return ''
      }
    },
    parseJSONSafely(str) {
      try {
        this.flag_JSON = 1
        return JSON.parse(str)
      } catch (e) {
        console.log('err-JSON->', e)
        this.flag_JSON = 2
        return {}
      }
    }
  }
}
</script>

<style>
.HomeBigBox {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 100vh;
}

.leftSideBox {
  background-color: rgb(192, 255, 213, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
  width: 330px;
}

.inputOutterBox {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 0 20px 0;
}

.inputBox {
  width: 100%;
}

.inputStatusBox {
  background-color: rgb(192, 255, 213);
  padding: 10px;
  width: 100%;
  height: 100%;
}

.btnSetBox {
  width: 100%;
}

.displayBox {
  background-color: rgb(192, 255, 213);
}

.tableBox {
  margin: 10px;
}

.classSuccess {
  background-color: rgb(0, 255, 0, 0.6);
}

.classFailed {
  background-color: rgb(255, 0, 0, 0.6);
}

.classIdling {
  background-color: rgba(8, 8, 8, 0.5);
  color: darkgray;
}

.circle {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin: 0 2px;
}

.circle:after {
  content: '';
  margin: 3px;
  display: table;
  width: 6px;
  height: 6px;
  background: rgb(0, 0, 0);
  border-radius: 50%;
}

.rightSideBox {
  background-color: rgba(230, 192, 255, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 10px;
  width: 70%;
}

.rightCtrlBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0 30px 0;
}

.rightCtrlFirstBox {
}

.rightCtrlFirstBox .v-input--selection-controls {
  margin-top: 0;
  padding-top: 0;
}

.rightCtrlFirstBox .v-input__slot {
  margin-bottom: 0;
}

.rightCtrlFirstBox .v-messages {
  display: none;
}

.rightCtrlSecondBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}

.classBackground {
  padding: 10px;
  background-color: rgba(230, 192, 255);
}

.noticeBox {
  max-width: 60%;
}

.rightInputBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 300px;
}

.v-text-field__details {
  display: none;
}

.textMidBox {
}

.rightCtrlThirdBox {
  /* background-color: rgba(230, 192, 255); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* padding: 10px; */
}

.rightCtrlInnerBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 0 10px 0;
}

.btnClass {
  margin: 4px 10px;
}

.ipRangeAndAmountsBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.rightDisplayBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  background-color: rgba(230, 192, 255);
  padding: 10px;
}

.manualBox {
  flex-grow: 1;
  max-width: 25%;
  margin: 0 5px 0 10px;
}

.itemBox {
  background-color: rgb(211, 151, 252);
}

.diffIpDisplay {
  min-width: 10%;
  border: 1px solid grey;
  border-radius: 6px;
  padding: 6px 10px;
}

.resultBox {
  flex-grow: 3;
  background-color: rgb(0, 0, 0);
  color: rgb(150, 150, 150);
  /* margin: 0 10px 0 5px; */
}

.width70 {
  max-width: 70%;
}

.width25 {
  max-width: 25%;
}

/* .disabled_resultBox {
  flex-grow: 2;
  width: 70%;
  background-color: rgb(255, 0, 0);
  color: rgb(150, 150, 150);
  margin: 0 10px 0 5px;
} */

.list-dynamic {
  border: 2px solid;
  border-radius: 3px;
  overflow-y: auto;
}

.list-item-dynamic {
  display: flex;
  align-items: center;
}

.customization {
  width: 100%;
  height: 50vh;
}
</style>
