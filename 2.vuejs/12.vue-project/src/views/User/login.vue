<template>
  <div>
    <el-row style="text-align:center;margin-bottom:10px;">
      <h3>用户登录</h3>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="6">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-row>
              <el-col :span="16">
                <el-input type="text" v-model="ruleForm.code" autocomplete="off"></el-input>
              </el-col>
              <el-col :span="8">
                <span @click="getCaptcha" v-html="verifySVG"></span>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { v4 } from "uuid";
import { getLocal, setLocal } from "@/utils/local.js";
import { getCaptcha } from "@/api/public";
import { createNamespacedHelpers, mapState } from "vuex";
import * as types from "../../store/action-types";
const { mapActions } = createNamespacedHelpers("user");

export default {
  // 根据图片来输入验证码
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        code: "",
      },
      uuid: "",
      verifySVG: "",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 之间", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions([types.SET_USER_LOGIN]),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this[types.SET_USER_LOGIN]({
            ...this.ruleForm,
            uid: this.uuid,
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async getCaptcha() {
      this.verifySVG = await getCaptcha(this.uuid);
    },
  },
  async created() {
    this.uuid = getLocal("uuid");
    if (!this.uuid) {
      this.uuid = v4();
      setLocal("uuid", this.uuid);
    }
    await this.getCaptcha();
  },
};
</script>
<style>
</style>