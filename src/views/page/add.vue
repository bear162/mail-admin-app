<template>
  <div class="add-container">
    <a-steps class="step" :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <center :form="form" @next="nextform" v-show="current === 0" />
      <centers :form="form" @submit="submit" v-show="current === 1" />
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        下一步
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="onSubmit"
      >
        添加
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        上一步
      </a-button>
    </div>
  </div>
</template>
<script>
import '@/eventBus';
import api from '@/api/categoryList';
import center from './add3.vue';
import centers from './add2.vue';

export default {
  created() {
    this.$bus.$on('oknext', this.oknext);
    this.$bus.$on('oksubmit', this.oksubmit);
    const { id } = this.$route.params;
    console.log(id);
    if (id) {
      console.log('获取id');
      api.getid(id).then((item) => {
        let e = item.data.data;
        e = {
          ...e,
          isok: true,
        };
        this.form = e;
      });
    }
  },
  components: {
    center,
    centers,
  },
  data() {
    return {
      search: [],
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: '',
        unit: '',
        status: '',
        images: [],
        inventory: '',
        sale: '',
        _id: '',
        updateTime: '',
        isok: true,
      },
      categoryList: [],
      cList: [],
      current: 0,
      steps: [
        {
          title: '填写产品基本信息',
        },
        {
          title: '填写产品营销信息',
        },
      ],
    };
  },
  methods: {
    oknext() {
      console.log(this.current);
      this.current += 1;
    },
    editForm(a) {
      console.log(a, 'editform');
      this.form = a;
      console.log(this.form, '父组件的form');
    },
    // 下一步返回的数据
    nextform(form) {
      console.log(this.form);
      this.form = form;
    },
    oksubmit() {
      if (this.$route.params.id) {
        api.edit(this.form).then((a) => {
          console.log(a, '返回来的数据');
          this.$router.push({
            name: 'list',
          });
        });
      } else {
        api.add(this.form).then((a) => {
          console.log(a, '返回来的数据');
          this.$router.push({
            name: 'list',
          });
        });
      }
      this.$message.success('Processing complete!');
    },
    submit(formss) {
      console.log(this.form);
      const forms = { ...this.form, ...formss };
      this.form = forms;
      console.log('=====', this.form);
    },
    onSubmit() {
      console.log('发送请求');
      this.$bus.$emit('submitw');
    },
    next() {
      this.$bus.$emit('next');
    },
    prev() {
      this.$bus.$emit('prev');
      this.current -= 1;
    },
  },
};
</script>
<style scoped>
.steps-content {
  margin-top: 0px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 40px;
}
.add-container {
  top: 15%;
  position: relative;
  width: 90%;
  left: 5%;
}
.form {
  top: 5px;
}
.steps-action {
  margin-top: 24px;
}
.step {
  position: absolute;
  width: 80%;
  left: 10%;
  top: -15%;
}
</style>
