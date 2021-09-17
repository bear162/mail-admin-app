  <template>
  <a-table :columns="columns" :data-source="tableDatas">
    <div slot="operation" slot-scope="text, record">
      <a-button @click="idet(record)">编辑</a-button>
      <a-button @click="deleteItem(record)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
import api from '@/api/categoryList';
import router from '@/router';
import '@/eventBus';

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: 80,
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc ',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price ',
    ellipsis: true,
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
    ellipsis: true,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '限制购数量',
    dataIndex: 'inventory',
    key: 'inventory',
    ellipsis: true,
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作 ',
    dataIndex: 'operation',
    key: 'operation',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  monnted() {
    this.isshangjia();
  },
  data() {
    return {
      columns,
    };
  },
  props: ['data'],
  methods: {
    idet(record) {
      this.$bus.$emit('edit', record);
      router.push({
        name: 'idet',
        params: {
          id: record.id,
        },
      });
      console.log(record, '编辑传过来的form');
    },
    deleteItem(record) {
      const thsI = this;
      this.$confirm({
        title: '删除',
        content: <div style="color:red;">你确定要删除当前列表吗？</div>,
        onOk() {
          const asd = thsI;
          console.log('OK');
          api.remove(record).then((a) => {
            asd.$emit('remove');
            console.log(a);
          });
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    },
  },
  computed: {
    tableDatas() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
};
</script>
