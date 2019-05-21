<template>
  <div v-if="flag===1" class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;" @click="toRegister">注册成为新用户</span>
        <span>cct+cct</span>
      </div>

    </el-form>
  </div>

  <div v-else-if="flag===2" class="login-container">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>
      <p v-show="showTishi" align="center">{{tishi}}</p>
      <el-form-item
        prop="username"
        :rules="[
          { required: true, message: '请输入用户名', trigger: 'blur' }]"
      >
        <el-input v-model="ruleForm.username" placeholder="用户名" />
      </el-form-item>

      <el-form-item
        prop="pwd"
        :rules="[
          { required: true, message: '请输入密码', trigger: 'blur' }]"
      >
        <el-input v-model="ruleForm.pwd" type="password" autocomplete="off" placeholder="密码" />
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" placeholder="确认密码" />
      </el-form-item>
      <el-form-item
        prop="phone"
        :rules="[
          { required: true, message: '请输入电话', trigger: 'blur' }]"
      >
        <el-input v-model.number="ruleForm.phone" placeholder="电话" />
      </el-form-item>
      <el-form-item
        prop="email"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]"
      >
        <el-input v-model="ruleForm.email" placeholder="邮箱" />
      </el-form-item>
      <el-form-item prop="age">
        <el-input v-model.number="ruleForm.age" placeholder="年龄" />
      </el-form-item>
      <el-form-item prop="sex">
        <el-input v-model.number="ruleForm.sex" placeholder="性别" />
      </el-form-item>
      <el-form-item prop="address">
        <el-input v-model.number="ruleForm.address" placeholder="住址" />
      </el-form-item>
      <el-form-item prop="hospital">
        <el-input v-model.number="ruleForm.hospital" placeholder="所在医院" />
      </el-form-item>
      <div class="ttips">
        <span>必填项：用户名、密码、电话、邮箱</span>
      </div>

      <el-button :loading="loading" type="primary" style="width:20%;margin-bottom:30px;float: right;margin-left: 20px" @click.native.prevent="Register">注册</el-button>
      <el-button :loading="loading" type="primary" style="width:20%;margin-bottom:30px;float: right;" @click.native.prevent="resetForm">重置</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('The password can not be less than 1 digits'))
      } else {
        callback()
      }
    }

    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      flag: 1,

      ruleForm: {
        username: '',
        pwd: '',
        checkPass: '',
        phone: '',
        email: '',
        age: '',
        sex: '',
        address: '',
        hospital: ''
      },
      rules: {
        pwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      },
      tishi: '',
      showTishi: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toRegister() {
      this.flag = 2
    },
    resetForm() {
      this.$nextTick(() => {
        this.$refs.ruleForm.resetFields()
      })
    },
    Register() {
      console.log(this.ruleForm)
      this.$ajax({
        method: 'post',
        url: 'http://127.0.0.1:8088/project/UserRegister',
        data: {
          'username': this.ruleForm.username,
          'pwd': this.ruleForm.pwd,
          'email': this.ruleForm.email,
          'phone': this.ruleForm.phone,
          'sex': this.ruleForm.sex,
          'address': this.ruleForm.address,
          'hospital': this.ruleForm.hospital,
          'age': this.ruleForm.age
        },
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
      }).then((res) => {
        console.log(res)
          console.log(res.data)
          this.tishi = '注册成功'
          this.showTishi = true

          /* 注册成功之后再跳回登录页*/
          setTimeout(function() {
            this.flag = 1
          }.bind(this), 1000)
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    float: right;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .ttips {
    font-size: 14px;
    color: #ff4f26;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .btn{
    margin:10px;
    float:right;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
  .txt1{
    color: white;
  }
</style>
