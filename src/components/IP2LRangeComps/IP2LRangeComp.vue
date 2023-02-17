<template>
  <div class="ip2lCompBigBox">
    <!-- 上半区 -->
    <div class="rightSideTop ip2lTopBox">
      <div class="ipRangeDisplayBox">
        <div class="ipSlotBox">
          <div class="fourIpsBox">
            <span>xxx</span>
            <i class="circle" />
            <span>xxx</span>
            <i class="circle" />
            <span>xxx</span>
            <i class="circle" />
            <v-text-field
              v-model="ip1_4"
              solo
              dense
            />
          </div>
          <div class="textMidBox">
            To
          </div>
          <div class="fourIpsBox">
            <span>xxx</span>
            <i class="circle" />
            <span>xxx</span>
            <i class="circle" />
            <span>xxx</span>
            <i class="circle" />
            <v-text-field
              v-model="ip2_4"
              solo
              dense
            />
          </div>
        </div>
      </div>
      <div class="ip2lBtnBox">
        <v-btn
          class="cmdBtnCommon"
          color="#9370DB"
          dark
          @click="btnClickSet"
        >Set</v-btn>
        <v-btn
          :disabled="vListDataIp2lRange2.length==0"
          :depressed="vListDataIp2lRange2.length==0"
          :data-clipboard-text="strOutputToCopy"
          class="cmdBtnCommon tagCopyIp2l"
          color="#9370DB"
          dark
          @click="btnClickCopy"
        >copy</v-btn>
        <v-btn
          class="cmdBtnCommon"
          color="#9370DB"
          dark
          @click="btnClickExit"
        >Exit</v-btn>
      </div>
    </div>
    <!-- test区 -->
    <div class="resultDisplayBox">
      <div class="margin-right10">Number of Checked IPs:</div>
      <div class="resultDisplayBox textMidBox">{{ checkedIps.length }} </div>
      <div>Numbers of IPs to be generated: </div>
      <div class="resultDisplayBox textMidBox">{{ ipNumbers }}</div>
      <div>Time of process: </div>
      <div class="resultDisplayBox textMidBox">{{ performanceX }} ms</div>
    </div>
    <!-- 下半区 -->
    <div class="rightSideBottom">
      <div class="bottomLeftBox">
        <div class="inputTextAreaBox bgc-input margin-right10">
          <v-textarea
            v-model="rangeTextArea"
            class="vTextareaIp2l"
            height="569px"
            clearable
            clear-icon="mdi-close-circle"
            outlined
            name="input-7-4"
            label="One IP each line"
            click:clear
          />
        </div>
        <div class="selectAreaBox bgc-input margin-right10">
          <v-virtual-scroll
            bench="20"
            :items="vListDataIp2lRange1"
            item-height="24"
            height="569px"
            width="300px"
          >
            <template v-slot:default="{ item, index}">
              <div class="selectItemBox">

                <div class="itemLeftBox">
                  <input
                    :id="item"
                    v-model="checkedIps"
                    :value="item"
                    class="itemSelect"
                    type="checkbox"
                  >

                  <div class="itemIp">{{ item }}</div>
                </div>
                <div class="itemRightBox">
                  <div class="itemIndex">[{{ vListDataIp2lRange1.length-index }}]</div>
                </div>

              </div>
            </template>
          </v-virtual-scroll>
        </div>
      </div>
      <div class="bottomRightBox">
        <div class="rightSideDisplayBox margin-right10">
          <virtual-list2
            ref="vsl2"
            class="list-dynamic scroll-touch vlistDefault vlistRange2"
            :keeps="20"
            :data-key="'sid'"
            :data-sources="vListDataIp2lRange2"
            :data-component="itemComp2"
            :estimate-size="30"
            :item-class="'list-item-dynamic'"
            :bottom-threshold="2"
          />
        </div>
        <!-- <div class="rightSideDisplayBox">
          <virtual-list2
            ref="vsl2"
            class="list-dynamic scroll-touch vlistDefault vlistRange1"
            :keeps="20"
            :data-key="'sid'"
            :data-sources="vListDataIp2lRange1"
            :data-component="itemComp2"
            :estimate-size="30"
            :item-class="'list-item-dynamic'"
            :bottom-threshold="2"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Clipboard from 'clipboard'
import ipfr from 'ip-from-range'
import VirtualList2 from 'vue-virtual-scroll-list'
import Item2 from '../VscrollItem.vue'

export default {
  components: { 'virtual-list2': VirtualList2 },
  data() {
    return {
      itemComp2: Item2,
      checkedIps: [],
      ip1_4: 1,
      ip2_4: 254,
      performanceX: 0
    }
  },
  computed: {
    ...mapState(['arrayIPsCOPY', 'vListDataIp2lRange1', 'vListDataIp2lRange2', 'flag_ip2lCmdBtn', 'strOutputToCopy']),

    rangeTextArea: {
      get() {
        return this.$store.state.strRangeInput
      },

      set(newValue) {
        this.$store.dispatch('handle_rangeInput', newValue)
      }
    },

    ipNumbers() {
      return this.checkedIps.length * (this.ip2_4 - this.ip1_4 + 1)
    }
  },
  mounted() { },
  methods: {
    btnClickSet() {
      console.log('btnClickSet')

      const t0 = performance.now()

      const arrResultIps = this.generateIpArray()

      const t1 = performance.now()

      this.performanceX = t1 - t0

      this.$store.dispatch('handle_IP2LINK', arrResultIps)
    },
    btnClickCopy() {
      console.log('btnClickCopy()')
      const clipboard = new Clipboard('.tagCopyIp2l')

      clipboard.on('success', (e) => {
        clipboard.destroy()
        console.log('clipboard-success-e->', e)
      })
      clipboard.on('error', (e) => {
        clipboard.destroy()
        console.log('clipboard-error-e->', e)
      })
    },
    btnClickExit() {
      this.$router.push('/')
      this.$store.commit('exit')
    },
    generateIpArray() {
      const arrAllIpRange = []

      this.checkedIps.map(x => {
        const tempX = x.split('.')
        const ipFirst3 = tempX[0] + '.' + tempX[1] + '.' + tempX[2] + '.'

        const startIp = ipFirst3 + this.ip1_4
        const endIp = ipFirst3 + this.ip2_4

        const oneIpRange = ipfr(startIp, endIp).getIpAddresses()

        oneIpRange.forEach(y => arrAllIpRange.push(y))
      })

      return arrAllIpRange
    }
  }
}
</script>

<style>
/* 上半区 */

.ip2lTopBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.ipRangeDisplayBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.nameCustomBox {
  /* border: 2px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: aliceblue;
}

.prefixBox {
  /* border: 2px solid rgb(227, 247, 139); */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.prefixText {
  margin-left: 10px;
}

.ip2lBtnBox {
  margin: 0 10px;
}

/* 中间区 */
.resultDisplayBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
}

/* 下半区 */
.bottomLeftBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.inputTextAreaBox {
  height: 100%;
}

.vTextareaIp2l {
  width: 250px;
  /* height在组件上设置 */
}

.selectAreaBox {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  height: 100%;
  border-radius: 4px;
}

.selectItemBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 4px;
}

.selectItemBox .itemLeftBox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.selectItemBox .itemSelect {
  margin-right: 10px;
}

.selectItemBox .itemIp {
  color: white;
  font-size: 18px;
}

.selectItemBox .itemIndex {
  font-size: 18px;
  color: rgb(0, 0, 0, 0.3);
  margin-right: 4px;
}

/* .bottomRightBox {
} */

.vlistRange1 {
  width: 250px;
}

.vlistRange2 {
  width: 450px;
}
</style>
