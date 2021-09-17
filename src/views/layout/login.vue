<template>
  <a-form class="froms" :form="form" @submit="handleSubmit">
    <h1>lodin</h1>
    <a-form-item class="from-lodin" v-bind="formItemLayout" label="E-mail">
      <a-input
        class="from-items"
        v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item
      class="from-lodin"
      v-bind="formItemLayout"
      label="Password"
      has-feedback
    >
      <a-input
        class="from-items"
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item class="from-lodin" v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit"> login </a-button>
      <router-link class="register" to="/register">注册</router-link>
    </a-form-item>
  </a-form>
</template>

<script>
// import api from '@/api/login';

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

export default {
  data() {
    return {
      confirmDirty: false,
      residences,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          console.log(values);
          this.$store.dispatch('login', values).then((a) => {
            if (a.data.status === 'success') {
              this.$message.info(a.data.msg);
              this.$router.push({
                name: 'Home',
              });
            } else {
              this.$message.error(a.data.msg);
            }
          });
        }
      });
    },
    handleConfirmBlur(e) {
      const { value } = e.target;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const { form } = this;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        console.log('daskjfdaskdfhaskfhasifl');
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const { form } = this;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(
          (domain) => `${value}${domain}`,
        );
      }
      this.autoCompleteResult = autoCompleteResult;
    },
  },
};
</script>
<style lang="less">
.froms {
  text-align: center;
  width: 400px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  .from-lodin {
    text-align: center;
  }
}
h1 {
  width: 400px;
}
.register {
  color: #30a679;
}
</style>
