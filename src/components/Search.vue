<template>
  <div class="container-search">
    <a-form-model
      layout="inline"
      :model="searchForm"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label="检索关键字">
        <a-input v-model="searchForm.seachWord" placeholder="请输入关键字">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目">
        <a-select
          allowClear
          show-search
          placeholder="请选择商品类目"
          style="width: 200px"
          v-model="searchForm.category"
          @change="handleChange"
        >
          <a-select-option v-for="c in data" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit"> 搜索 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>

export default {
  data() {
    return {
      searchForm: {
        seachWord: '',
        category: '',
      },
    };
  },
  props: ['data'],
  methods: {
    // 列表改变了
    handleChange() {
    },
    // 提交
    handleSubmit() {
      console.log(this.searchForm);
      console.log(this.data, 'box');
      this.$emit('submit', this.searchForm);
    },
  },
};
</script>

<style>
.container-search {
  margin-left: 17px;
  padding: 10px;
}
</style>
