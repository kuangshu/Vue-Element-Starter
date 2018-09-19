<template>
  <div class="avatar-container">
    <el-dropdown trigger="click">
      <div class="avatar-wrapper">
        <span>{{userInfo.name}}</span>
        <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="dialogVisible = true" style="display:block;">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">登出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="50%" :before-close="cancelPwdUpdate">
      <el-form :model="pwd" :rules="rules" ref="pwdForm">
        <el-form-item label="原密码" prop="oldPwd" :label-width="formLabelWidth">
          <el-input type="password" v-model="pwd.oldPwd" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd" :label-width="formLabelWidth">
          <el-input type="password" v-model="pwd.newPwd" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码" prop="rePwd" :label-width="formLabelWidth">
          <el-input type="password" v-model="pwd.rePwd" placeholder="请再输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetPwdForm">取 消</el-button>
        <el-button type="primary" @click="checkPwdForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.pwd.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      formLabelWidth: '200px',
      pwd: {
        oldPwd: '',
        newPwd: '',
        rePwd: '',
      },
      rules: {
        oldPwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        rePwd: [
          { required: true, message: '请再输入新密码', trigger: 'blur' },
          { validator: validatePass },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    ...mapActions(['updatePassword']),
    cancelPwdUpdate(done) {
      this.resetPwdForm();
      done();
    },
    resetPwdForm() {
      this.$refs.pwdForm.resetFields();
      this.dialogVisible = false;
    },
    checkPwdForm() {
      this.$refs.pwdForm.validate(valid => {
        if (valid) {
          this.updatePassword(this.pwd)
            .then(() => {
              this.$message.success('修改密码成功!');

              this.resetPwdForm();
            })
            .catch(err => {
              this.$message.error('修改密码失败!');
            });
        }
      });
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
  },
};
</script>


<style lang="scss">
.avatar-container {
  margin-right: 54px;
  .avatar-wrapper {
    cursor: pointer;
    color: #a0acb9;
    position: relative;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: -18px;
      top: 6px;
      font-size: 12px;
    }
  }
}
</style>
