<template>
  <div
    class="LinkDetailCompBigBox"
    :class="classDetailBox"
  >
    <!-- 输入结果显示区域 -->
    <div class="tableBox">
      <v-simple-table
        dense
        light
      >
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
              v-for="(item,key,index) in objInputFirstLink"
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
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({}),
  computed: {
    ...mapState(['objInputFirstLink', 'radioValue']),

    classDetailBox() {
      return {
        classDisabled:
          this.radioValue === '6' || this.radioValue === '3'
        // classActivated: this.radioValue === '1'
      }
    }
  }
}
</script>

<style>
.classDisabled {
  display: none;
}
</style>
