<template>
  <div id="register">
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <p v-show="showTishi" align="center">{{ tishi }}</p>
      <el-form-item
        label="用户名"
        :rules="[
          { required: true, message: '请输入用户名', trigger: 'blur' }]"
      >
        <el-input v-model="ruleForm.username" />
      </el-form-item>

      <el-form-item
        label="密码"
        prop="pass"
        :rules="[
          { required: true, message: '请输入密码', trigger: 'blur' }]"
      >
        <el-input v-model="ruleForm.pwd" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="电话"
        prop="phone"
        :rules="[
          { required: true, message: '请输入用户名', trigger: 'blur' }]"
      >
        <el-input v-model.number="ruleForm.phone" />
      </el-form-item>
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]"
      >
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model.number="ruleForm.sex" />
      </el-form-item>
      <el-form-item label="住址" prop="address">
        <el-input v-model.number="ruleForm.address" />
      </el-form-item>
      <el-form-item label="所在医院" prop="hos">
        <el-input v-model.number="ruleForm.hospital" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Register(ruleForm)">提交</el-button>
        <el-button @click="resetForm(ruleForm)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script >
export default {
  name: 'Register',
  data() {
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
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
        if (res.data === true) {
          console.log(res.data)
          this.tishi = '注册成功'
          this.showTishi = true

          /* 注册成功之后再跳回登录页*/
          setTimeout(function() {
            this.$router.push('/login')
          }.bind(this), 1000)
        }
      })
    }

  }
}

</script>

<style scoped>
  #register{
    padding: 10px;
    height: -webkit-fill-available;
    /*background: url('../img/index.jpg');*/
  }
  .el-form{
    border-style: solid;
    border-color: #b9bbbe;
    border-radius:25px;
    padding: 50px;
    margin-top: 0px;
    background-color: white;
    width: 30%;
    margin-left: 28%;
  }
  .el-form-item>.el-button{

  }

</style>
