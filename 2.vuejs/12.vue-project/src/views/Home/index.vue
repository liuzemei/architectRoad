<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in bannerList" :key="item._id">
        <!-- <h3 class="medium">{{ item }}</h3> -->
        <img :src="item.url" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import * as types from "../../store/action-types";

export default {
  computed: {
    ...mapState(["bannerList"]),
  },
  methods: {
    ...mapActions([types.SET_BANNER_LIST]),
  },
  async mounted() {
    if (!this.bannerList.length) {
      this[types.SET_BANNER_LIST]();
    }
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>