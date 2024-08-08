<!-- eslint-disable vue/no-unused-vars -->
<template>
  <a-card title="List products" class="w-100">
    <!-- Form search -->
    <div class="d-flex mb-3 w-100">
      <div class="mb-3 me-3">
        <label for="title" class="form-label">Title</label>
        <a-input v-model:value="search.title" placeholder="Title" />
      </div>
      <div class="mb-3 me-3">
        <label for="category" class="form-label">Category</label>
        <div class="select-category">
          <a-select
            v-model:value="search.category"
            show-search
            placeholder="Select a category"
            :options="listCategory"
            :filter-option="filterOption"
            :allowClear="true"
            @focus="handleFocusCate"
            @blur="handleBlurCate"
            @change="handleChangeCate"
            style="min-width: 150px"
          ></a-select>
        </div>
      </div>
      <div class="mb-3 me-3" style="margin-left: 15px">
        <label for="price" class="form-label">Range price</label>
        <a-slider
          v-model:value="rangePriceVal"
          range
          :disabled="false"
          :min="0"
          :max="10000"
        />
      </div>

      <div class="mb-3 me-3 button-css-search">
        <a-button class="btn btn-primary" @click.prevent="getProductsList(1)"
          >Search</a-button
        >
      </div>
      <div
        class="mb-3 me-3 button-css d-flex justify-content-end"
        v-if="['ADMIN', 'MANAGER'].includes(roleUser)"
      >
        <a-button type="primary" class="me-3" @click="showDrawer">
          <PlusOutlined />
          New product
        </a-button>
        <a-button
          class="btn btn-danger"
          @click="confirmDeleteIds"
          :disabled="selectedRowKeys.length === 0"
          >Delete products</a-button
        >
      </div>
    </div>

    <div class="row">
      <span class="text-error" v-if="errors.search">{{ errors.search }}</span>
      <div class="col-12 mr-10">
        <a-table
          :dataSource="listProducts"
          :loading="loading"
          :pagination="false"
          :columns="columns"
          class="table"
          :scroll="{ x: 1500, y: 650 }"
          rowKey="id"
          :rowSelection="roleUser == 'USER' ? null : rowSelection"
          size="small"
        >
          <template #headerCell="{ column }"> </template>
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'action'">
              <a-space>
                <a-button
                  type="primary"
                  @click="showDrawer(record.id)"
                  v-if="['ADMIN', 'MANAGER'].includes(roleUser)"
                >
                  <EditOutlined />
                </a-button>
                <a-button
                  type="primary"
                  danger
                  @click="confirmDelete(record.id)"
                  v-if="['ADMIN', 'MANAGER'].includes(roleUser)"
                >
                  <DeleteOutlined />
                </a-button>
                <a-button
                  type="primary"
                  @click="showModalProductDetail(record.id)"
                >
                  <CopyOutlined />
                </a-button>
              </a-space>
            </template>
            <template v-if="column.key === 'created'">
              <a-space>
                {{ formattedDatetime(record.created) }}
              </a-space>
            </template>
          </template>
        </a-table>
        <a-modal
          v-model:visible="isModalVisible"
          title="Delete product"
          @ok="deleteListProductIds"
          @cancel="handleCancel"
        >
          <p>Are you sure you want to delete this products ?</p>
        </a-modal>
        <a-pagination
          v-model:current="pageInfo.pageIndex"
          v-model:pageSize="pageInfo.pageSize"
          :total="pageInfo.totalElements"
          show-size-changer
          :page-size-options="['10', '20', '50', '100']"
          :locale="{ items_per_page: '/ trang' }"
          @show-size-change="onShowSizeChange"
          @change="updatePageSize"
        />
      </div>
    </div>
  </a-card>

  <!-- A drawer create product view -->
  <a-drawer
    title="Product"
    :width="720"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
    class="mt-15"
    style="margin-top: 50px"
  >
    <a-form
      :model="product"
      :rules="rules"
      layout="vertical"
      enctype="multipart/form-data"
    >
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Title" name="title">
            <a-input v-model:value="product.title" placeholder="Please enter title" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Price" name="price">
            <a-input v-model:value="product.price" placeholder="Please enter price" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Category" name="categoryId">
            <a-select
              v-model:value="product.category"
              show-search
              placeholder="Select a category"
              :options="listCategory"
              :filter-option="filterOption"
              @focus="handleFocusCate"
              @blur="handleBlurCate"
              @change="handleChangeCate"
            ></a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="DiscountPercentage(%)" name="discountPercentage">
            <a-input
              v-model:value="product.discountPercentage"
              placeholder="Please enter discount percentage"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="stock" name="stock">
            <a-input v-model:value="product.stock" placeholder="Please enter stock" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="brand" name="brand">
            <a-input v-model:value="product.brand" placeholder="Please enter brand" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="Weight" name="weight">
            <a-input v-model:value="product.weight" placeholder="Please enter weight" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="WarrantyInformation" name="warrantyInformation">
            <a-input
              v-model:value="product.warrantyInformation"
              placeholder="Please enter warrantyInformation"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="ShippingInformation" name="shippingInformation">
            <a-input
              v-model:value="product.shippingInformation"
              placeholder="Please enter shippingInformation"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="AvailabilityStatus" name="availabilityStatus">
            <a-input
              v-model:value="product.availabilityStatus"
              placeholder="Please enter availabilityStatus"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="ReturnPolicy" name="returnPolicy">
            <a-input
              v-model:value="product.returnPolicy"
              placeholder="Please enter returnPolicy"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="MinimumOrderQuantity" name="minimumOrderQuantity">
            <a-input
              v-model:value="product.minimumOrderQuantity"
              placeholder="Please enter minimumOrderQuantity"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Description" name="description">
            <a-textarea
              v-model:value="product.description"
              :rows="4"
              placeholder="please enter description"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="Image" name="thumbnail">
            <img
              :src="previewImage"
              class="uploading-image"
              width="300px"
              height="300px"
              v-if="previewImage"
            />
            <input type="file" accept="image/jpeg" @change="uploadImage" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <span class="text-error" v-if="errors.message">{{ errors.message }}</span>
    <span class="text-error" v-if="errors.data">{{ errors.data }}</span>

    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
      <a-button type="primary" @click.prevent="createProduct">Submit</a-button>
    </div>
  </a-drawer>

  <!-- A  show modal detail product-->
  <div>
    <a-button type="primary" >Product <details></details></a-button>
    <a-modal v-model:open="openModal" width="1000px" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>

<script>
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CopyOutlined,
} from "@ant-design/icons-vue";
import axiosInterceptor from "@/service/axiosInteceptor";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import moment from "moment";

export default {
  name: "ProductView",
  components: {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    CopyOutlined,
  },
  data() {
    return {
      openModal: false,
      selectedDate: null,
      isModalVisible: false,
      productIdToDelete: null,
      loading: false,
      dateFormat: "YYYY/MM/DD HH:mm:ss",
      listProducts: [],
      listCategory: [],
      listCategoriesByproductId: [],
      listCategoriesTag: [],
      selectedRowKeys: [],
      rangePriceVal: [],
      selectedYear: null,
      years: [],
      display: [],
      search: {
        title: "",
        category: "",
        priceFrom: "",
        priceTo: "",
      },
      visibleCates: {},
      product: {
        price: "",
        discountPercentage: "",
        title: "",
        description: "",
        stock: "",
        brand: "",
        weight: "",
        warrantyInformation: "",
        shippingInformation: "",
        availabilityStatus: "",
        returnPolicy: "",
        minimumOrderQuantity: "",
        thumbnail: "",
        category: "",
      },
      dateRangeValDefault: [
        moment().startOf("day").format("YYYY/MM/DD HH:mm:ss"),
        moment().endOf("day").format("YYYY/MM/DD HH:mm:ss"),
      ],
      dateRangeVal: [],
      errors: {
        message: "",
        data: "",
        search: "",
      },
      searchCateIds: [],
      saveproductCateIds: [],
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
          width: "100px",
        },
        {
          title: "Sku",
          dataIndex: "sku",
          key: "sku",
        },
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
        },
        {
          title: "CategoryName",
          dataIndex: "categoryName",
          key: "categoryName",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
        },
        {
          title: "Brand",
          dataIndex: "brand",
          key: "brand",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
        },
      ],
      pageInfo: {
        content: [],
        pageIndex: 1,
        pageSize: 20,
        totalElements: 0,
        totalPages: 0,
      },
      rs: [],
      rowSelection: {
        onChange: this.onSelectChange,
      },
      visible: false,
      borrowVisible: false,
      id: "",
      rules: {
        title: {
          required: true,
          message: "Please enter product title",
          trigger: "blur",
        },
        price: {
          required: true,
          message: "Please enter product price",
          trigger: "blur",
        },
      },
      previewVisible: false,
      previewImage: "",
      fileList: [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
      ],
      thumbnail: "",
    };
  },
  computed: {
    roleUser() {
      return localStorage.getItem("role");
    },
  },
  mounted() {
    this.getProductsList();
    this.getCategories();
    this.generateYearList();
  },
  methods: {
    displayCates(id) {
      this.visibleCates = {
        ...this.visibleCates,
        [id]: !this.visibleCates[id],
      };
    },
    convertToArray(data) {
      return data == null ? "" : data.split(",").map((name) => name.trim());
    },
    disabledDate(current) {
      // Disable dates before yesterday
      const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
      return current && current < yesterday;
    },

    showDrawer(id = "") {
      this.visible = true;
      if (id != "" && !isNaN(id)) {
        this.id = id;
        this.getProduct(id);
      }
    },
    showBorrowDrawer(id = "") {
      this.borrowVisible = true;
      if (id != "" && !isNaN(id)) {
        this.id = id;
        this.getProduct(id);
      }
    },
    moment() {
      return moment;
    },
    onClose() {
      this.visible = false;
      this.borrowVisible = false;
      this.isSubmitting = false;
      // product
      this.product.title = "";
      this.product.description = "";
      this.product.price = "";
      this.product.discountPercentage = "";
      this.product.stock = "";
      this.product.brand = "";
      this.product.weight = "";
      this.product.warrantyInformation = "";
      this.product.shippingInformation = "";
      this.product.availabilityStatus = "";
      this.product.returnPolicy = "";
      this.product.thumbnail = "";
      this.product.minimumOrderQuantity = "";
      this.product.category = "";
      this.thumbnail = "";

      this.previewImage = "";
      this.errors.message = "";
      this.errors.data = "";
      this.dateRangeVal = null;
      this.id = "";
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log("Selected Row Keys: ", selectedRowKeys);
      console.log("Selected Rows: ", selectedRows);
      this.selectedRowKeys = selectedRowKeys;
      const selectedIds = selectedRows.map((row) => row.id);
      console.log("Selected product IDs: ", selectedIds);
    },
    async getCategories() {
      await axiosInterceptor
        .get("/admin/categories")
        .then((response) => {
          // JSON responses are automatically parsed.
          if (response.data.data != "") {
            const rs = response.data.data.data;

            this.listCategory = rs.map((item) => ({
              value: item.id,
              label: item.name,
            }));
          }
        })
        .catch((e) => {
          console.log(e.response.status);
        });
    },
    formattedDatetime(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    onShowSizeChange() {
      this.handleChange(this.pageInfo.pageIndex, this.pageInfo.pageSize);
    },
    updatePageSize() {
      this.handleChange(this.pageInfo.pageIndex, this.pageInfo.pageSize);
    },
    handleChange(pageIndex, pageSize) {
      this.pageInfo.pageIndex = pageIndex;
      this.pageInfo.pageSize = pageSize;

      this.getProductsList();
    },
    generateYearList() {
      const currentYear = new Date().getFullYear();
      const startYear = currentYear - 20; // Adjust the range as needed

      for (let year = currentYear; year >= startYear; year--) {
        this.years.push(year);
      }
    },
    tableScroll() {
      return this.screenWidth > 1300 ? { x: 1300 } : {};
    },
    async getProductsList(pageIndex) {
      this.loading = true;

      let dataParams = {
        page: pageIndex ? pageIndex : this.pageInfo.pageIndex,
        limit: this.pageInfo.pageSize,
        get_total_count: 1,
      };

      if (this.search.title != "" && this.search.title != null) {
        dataParams.title = this.search.title.trim();
      }

      if (this.search.category != "" && this.search.category != null) {
        dataParams.category = this.search.category;
      }

      if (
        Array.isArray(this.rangePriceVal) &&
        this.rangePriceVal.length > 0 &&
        this.rangePriceVal[1] != 0
      ) {
        dataParams.priceFrom = this.rangePriceVal[0];
        dataParams.priceTo = this.rangePriceVal[1];
      }

      try {
        const response = await axiosInterceptor.get("/admin/products", {
          params: dataParams,
        });

        this.listProducts = response.data.data.data;

        this.pageInfo.totalElements = response.data.data.pagination.total_record;
        this.pageInfo.totalPages = response.data.data.pagination.total_page;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
        setTimeout(() => {
          this.errors.search = "";
        }, 1000);
      }
    },
    confirmDelete(id) {
      this.selectedRowKeys = [id];
      this.isModalVisible = true;
    },
    confirmDeleteIds() {
      this.isModalVisible = true;
    },
    handleCancel() {
      this.isModalVisible = false;
    },
    handleBlurCate() {
      console.log("blur");
    },
    handleFocusCate() {
      console.log("focus");
    },
    handleChangeCate(value) {
      console.log(`selected ${value}`);
    },
    filterOption(input, option) {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
    getRandomColor() {
      const minHex = 0xcc0000; // Minimum hex value for a "hot" color
      const maxHex = 0xffcc00; // Maximum hex value for a "hot" color
      let color;

      do {
        const randomHex = Math.floor(Math.random() * (maxHex - minHex + 1)) + minHex;
        color = "#" + randomHex.toString(16).padStart(6, "0");
      } while (color === "#FFFFFF");

      return color;
    },
    async deleteListProductIds() {
      try {
        const response = await axiosInterceptor.delete("/admin/products", {
          data: {
            ids: this.selectedRowKeys,
          },
        });

        this.isModalVisible = false;
        this.getProductsList();

        toast.success(
          `Delete list products successfully with ids{} ${this.selectedRowKeys}`,
          {
            autoClose: 1000,
          }
        );
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          this.loading = false;
        });
      }
    },
    async createProduct() {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;
      this.product.thumbnail = this.thumbnail;

      const formData = new FormData();

      formData.append("title", this.product.title);
      formData.append("description", this.product.description);
      formData.append("price", this.product.price);
      formData.append("discountPercentage", this.product.discountPercentage);
      formData.append("stock", this.product.stock);
      formData.append("brand", this.product.brand);
      formData.append("sku", this.product.sku);
      formData.append("weight", this.product.weight);
      formData.append("warrantyInformation", this.product.warrantyInformation);
      formData.append("shippingInformation", this.product.shippingInformation);
      formData.append("availabilityStatus", this.product.availabilityStatus);
      formData.append("returnPolicy", this.product.returnPolicy);
      formData.append("minimumOrderQuantity", this.product.minimumOrderQuantity);
      formData.append("thumbnail", this.product.thumbnail);
      formData.append("category", this.product.category);

      console.log(formData);
      if (this.id == "") {
        axiosInterceptor
          .post("/admin/products/create", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            // JSON responses are automatically parsed.

            if (response.data.success == true) {
              toast.success("Create products successfully!", {
                autoClose: 1000,
              });

              setTimeout(() => {
                this.$router.push("/products");
                this.onClose();
                this.getProductsList();
                this.searchCateIds = [];
              }, 2000);
            }
          })
          .catch((e) => {
            console.log(e);
            this.errors.data = e.response.data.data;
            this.errors.message = e.response.data.message;
          })
          .finally(() => {
            setTimeout(() => {
              this.isSubmitting = false;
            }, 2000);
          });
      } else {
        await axiosInterceptor
          .put(`/admin/products/update/${this.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            // JSON responses are automatically parsed.
            console.log(response.data.data);
            toast.success(`Update product success with id ${this.id}`, {
              autoClose: 1000,
            });

            if (response.data.success == true) {
              setTimeout(() => {
                this.$router.push("/products");
                this.onClose();
                this.getProductsList();
              }, 2000);
            }
          })
          .catch((e) => {
            console.log(e);
            this.errors.data = e.response.data.data;
            this.errors.message = e.response.data.message;
          })
          .finally(() => {
            setTimeout(() => {
              this.isSubmitting = false;
            }, 2000);
          });
      }
    },
    getProduct(id) {
      if (id != "") {
        axiosInterceptor
          .get(`/admin/products/detail/${id}`)
          .then((response) => {

            // JSON responses are automatically parsed.
            this.product.title = response.data.data.title;
            this.product.category = response.data.data.categoryId;
            this.product.description = response.data.data.description;
            this.product.price = response.data.data.price;
            this.product.discountPercentage = response.data.data.discountPercentage;
            this.product.rating = response.data.data.rating;
            this.product.stock = response.data.data.stock;
            this.product.brand = response.data.data.brand;
            this.product.weight = response.data.data.weight;
            this.product.warrantyInformation = response.data.data.warrantyInformation;
            this.product.shippingInformation = response.data.data.shippingInformation;
            this.product.availabilityStatus = response.data.data.availabilityStatus;
            this.product.returnPolicy = response.data.data.returnPolicy;
            this.product.minimumOrderQuantity = response.data.data.minimumOrderQuantity;
            this.product.shippingInformation = response.data.data.shippingInformation;
            this.previewImage = `http://localhost:8081/static/public/product-images/${id}/${response.data.data.thumbnail}`;

          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    uploadImage(e) {
      if (e.target.files[0] != null) {
        const image = e.target.files[0];
        try {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = (e) => {
            this.previewImage = e.target.result;
            this.thumbnail = image;
          };
        } catch (error) {
          console.error("Error creating preview image:", error);
          return null;
        }
      } else {
        this.previewImage = "";
        this.thumbnail = "";
      }
    },
    showModalProductDetail(id) {
      this.openModal = true;
      this.id = id;
    },
    handleOk() {
      console.log(this.id);
    }
  },
};
</script>

<style scoped>
/* Add any scoped styles here */

.mb-3.me-3.button-css {
  margin-top: 23px;
}

.mb-3.me-3.button-css-search {
  margin-top: 30px;
}
span.text-error {
  font-size: small;
  color: red;
  margin-left: 15px;
}
.mb-3.me-3.button-css.d-flex.justify-content-end {
  margin-top: 29px;
  margin-left: 200px;
}

.mb-3.me-3 {
  width: 140px;
}

.mb-3.me-3.button-css.d-flex.justify-content-end[data-v-36410294] {
  margin-top: 29px;
  margin-left: 1500px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
