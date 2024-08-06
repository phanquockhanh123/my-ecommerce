<template>
  <a-card title="List categories" class="w-100">
    <div class="row mb-3">
      <div class="col-12 d-flex justify-content-end">
        <a-button type="primary">
          <PlusOutlined />
          New category
        </a-button>
      </div>
    </div>
    <div class="row">
      <div>
        <a-table
          :dataSource="listCates"
          :loading="loading"
          :pagination="false"
          :columns="columns"
          class="table"
          rowKey="id"
          :scroll="{ x: 1500, y: 650 }"
        >
          // eslint-disable-next-line no-unused-vars
          <template #headerCell="{ column }"> </template>
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'action'">
              <a-space>
                <a-button type="primary">
                  <EditOutlined />
                </a-button>
                <a-button type="primary" danger>
                  <DeleteOutlined />
                </a-button>
              </a-space>
            </template>
          </template>
        </a-table>
        <a-pagination
          v-model:current="pageInfo.pageIndex"
          v-model:pageSize="pageInfo.pageSize"
          :total="pageInfo.totalElements"
          show-size-changer
          :page-size-options="['5', '10', '20', '50']"
          :locale="{ items_per_page: '/ trang' }"
          @show-size-change="onShowSizeChange"
          @change="updatePageSize"
        />
      </div>
    </div>
  </a-card>
</template>
<script>
import { categoriesModule } from "@/store/categories";
import { mapActions, mapState } from "pinia";

export default {
  data() {
    return {
      loading: false,
      pageInfo: {
        content: [],
        pageIndex: 1,
        pageSize: 20,
        totalElements: 0,
        totalPages: 0,
      },
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
        },
      ],
      rules: [
        {
          name: {
            required: true,
            message: "Please enter category name",
            trigger: "blur",
          },
          errors: { message: "", data: "" },
        },
      ],
    };
  },
  methods: {
    ...mapActions(categoriesModule, ["getCategories"]),
  },
  computed: {
    ...mapState(categoriesModule, ["listCates"]),
  },
  async mounted() {
    this.loading = true;
    await this.getCategories();
    this.loading = false;
  },
};
</script>
