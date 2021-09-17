<template>
  <div>
    <div style="background-color: #ececec; padding: 20px">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="商品总浏" :bordered="false">
          <p>10293</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="用户总览" :bordered="false">
          <p>19382</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="销量总览" :bordered="false">
          <p>82739</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
  </div>
</template>
<script>
export default {
  data() {
    this.chartSettings = {
      metricsType: {
        访问用户: '0a',
      },
    };
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户'],
        rows: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293 },
        ],
      },
    };
  },
};
</script>
