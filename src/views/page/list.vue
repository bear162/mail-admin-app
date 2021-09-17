<template>
  <div class="list-container">
    <search :data="categoryList" @submit="searchSubmit" />
    <porductTable @remove="removes" :data="tableDate" />
  </div>
</template>

<script>
import porductTable from '@/components/porductTable.vue';
import search from '@/components/Search.vue';
import api from '@/api/categoryList';

export default {
  data() {
    return {
      tableDate: [],
      searchWords: {
        searchWord: '',
        category: '',
      },
      categoryList: [],
      categoryObg: {},
    };
  },
  async created() {
    await api.getsearch().then((e) => {
      this.categoryList = e.data.data.data;
      e.data.data.data.forEach((item) => {
        this.categoryObg[item.id] = item;
      });
    });
    this.list();
  },
  components: {
    search,
    porductTable,
  },
  methods: {
    removes() {
      console.log('yunxingl');
      this.list();
    },
    searchSubmit(form) {
      console.log(form, 'fanheui');
      this.searchWords = form;
      console.log(this.searchWords, 'sadahfiwhehsifhsifhasiefhifhs');
      this.list();
    },
    list() {
      console.log(this.searchWords, '当前的筛选');
      api.getlist({
        page: 1,
        size: 10,
        ...this.searchWords,
      }).then((j) => {
        console.log('再次查询', this.searchWords);
        this.tableDate = j.data.data.data.map((item) => ({
          ...item,
          categoryName: this.categoryObg[item.category].name,
        }));
      });
    },
  },
};
</script>

<style>
</style>
