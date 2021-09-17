<template>
  <a-form-model
    class="form"
    :model="form"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :rules="rules"
    ref="ruleForm"
  >
    <a-form-model-item label="标题" prop="title" required>
      <a-input v-model="form.title" />
    </a-form-model-item>
    <a-form-model-item label="商品描述" prop="desc" required>
      <a-input v-model="form.desc" type="textarea" />
    </a-form-model-item>
    <a-form-model-item label="商品类目" prop="category" required>
      <a-select
        v-model="form.category"
        @change="categoryChange"
        placeholder="请填写商品目录"
      >
        <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
          {{ c.name }}
        </a-select-option>
      </a-select>
      <a-select v-model="form.c_item" placeholder="请填写商品子目录">
        <a-select-option v-for="c in cList" :key="c" :value="c">
          {{ c }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item prop="category" required label="商品标签">
      <a-select
        v-model="form.tags"
        mode="tags"
        placeholder="Please select"
        :default-value="['包邮']"
      >
        <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
          {{ (i + 9).toString(36) + i }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import api from '@/api/categoryList';
import '@/eventBus';

export default {
  props: ['form'],
  created() {
    this.$bus.$on('next', this.next);
    api.getsearch().then((a) => {
      this.categoryList = a.data.data.data;
    });
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      categoryList: [],
      cList: [],
      rules: {},
    };
  },
  methods: {
    next() {
      console.log(this.$refs.ruleForm);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        return false;
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    categoryChange(c) {
      console.log(c);
      for (let i = 0; i < this.categoryList.length; i += 1) {
        console.log(this.categoryList[i]);
        if (this.categoryList[i].id === c) {
          this.cList = this.categoryList[i].c_items;
          console.log(this.cList);
        }
      }
    },
  },
};
</script>

<style>
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
