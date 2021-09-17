<template>
  <a-form-model
    class="form"
    :model="form"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    ref="ruleForm"
    :rules="rules"
  >
    <a-form-model-item label="商品价格" prop="price" required>
      <a-input v-model="form.price" />
    </a-form-model-item>
    <a-form-model-item label="商品折扣价">
      <a-input v-model="form.price_off" />
    </a-form-model-item>
    <a-form-model-item label="库存总量" prop="inventory" required>
      <a-input v-model="form.inventory" />
    </a-form-model-item>
    <a-form-model-item label="计量单位" prop="unit" required>
      <a-input v-model="form.unit" />
    </a-form-model-item>
    <a-form-model-item label="商品相册">
      <div class="clearfix">
        <a-upload
          name="avatar"
          :action="
            'https://mallapi.duyiedu.com/upload/images?appkey=' +
            $store.state.loginuser.user.appkey
          "
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 8">
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import api from '@/api/categoryList';
import '@/eventBus';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  props: ['form'],
  created() {
    this.siok = true;
    this.$bus.$on('submitw', this.submitw);
    this.$bus.$on('prev', this.prev);
    api.getsearch().then((e) => {
      this.categoryList = e.data.data.data;
    });
  },
  data() {
    return {
      rules: {},
      loading: false,
      previewVisible: false,
      previewImage: '',
      fileList: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      categoryList: [],
      cList: [],
    };
  },
  watch: {
    form() {
      this.siok = false;

      if (this.form.images.length > 0) {
        const obj = this.form.images.map((a, b) => ({
          uid: b,
          name: 'image.png',
          status: 'done',
          url: a,
        }));
        this.fileList = obj;
      }
    },
  },
  beforeMount() {
    console.log(this.form.images.length);
    console.log(this.fileList);
  },
  methods: {
    handleCancel() {
      console.log('sahnchu');
      this.previewVisible = false;
    },
    submitw() {
      this.$refs.ruleForm.validate((valid) => {
        console.log(this.$refs.ruleForm);
        if (valid) {
          this.$bus.$emit('oksubmit');
          this.$emit('submit', this.form);
          return true;
        }
        return false;
      });
    },
    prev() {
      console.log('prev');
    },
    handleChange({ file, fileList }) {
      this.fileList = fileList;
      console.log(file, fileList);
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      }
      if (file.status === 'removed') {
        this.form.images = this.form.images.filter(
          (item) => item !== file.response.data.url,
        );
      }
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(obj.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    categoryChange(c) {
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
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
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
