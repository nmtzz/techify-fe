<script setup>
import {onMounted, ref} from "vue";
import {Button, useConfirm, useToast} from "primevue";
import router from "@/router/router.js";
import api from "@/services/ApiService.js";
import {showConfirmDelete} from "@/services/MyConfirmService.js";
import {showError, showSuccess} from "@/services/ToastService.js";

const confirm = useConfirm();
const products = ref([]);
const toast = useToast();
const getProducts = async () => {
  products.value = (await api.get("product")).data;
}
const deleteProduct = async (id) => {
  showConfirmDelete(confirm, async function () {
    try {
      await api.delete(`product/${id}`);
      await getProducts();
      showSuccess(toast, "Xóa Sản PhẩmThành Công");
    } catch (error) {
      showError(toast, "Xóa Sản Phẩm Thất Bại");
    }
  });
}
onMounted(async () => {
  await getProducts();
  products.value.forEach((product) => {
    product.thumbnail = JSON.parse(product.thumbnail);
    product.colors = JSON.parse(product.colors);
    product.attributes = JSON.parse(product.attributes);
    return product
  })
  console.log(products.value)
})
</script>

<template>
  <Toast/>
  <ConfirmDialog style="width: 25rem"></ConfirmDialog>
  <div class="actions">
    <Button @click="router.push('/admin/product/add')" label="Thêm" icon="pi pi-plus"/>
  </div>
  <div class="products mt-4">
    <DataTable :value="products">
      <Column field="id" header="Mã Sản Phẩm"></Column>
      <Column header="Tên Sản Phẩm">
        <template #body="slotProps">
          <div class="flex justify-items-center items-center gap-1">
            <Avatar :image="slotProps.data.thumbnail.url" shape="circle" size="xlarge"/>
            <span class="product-name">{{ slotProps.data.name }}</span>
          </div>
        </template>
      </Column>
      <Column field="category" header="Loại Sản Phẩm"></Column>
      <Column field="sellPrice" header="Giá Bán"></Column>
      <Column field="promotionPrice" header="Giá Khuyến Mại"></Column>
      <Column>
        <template #body="slotProps">
          <Button type="button" class="mr-2" icon="pi pi-pencil" rounded/>
          <Button @click="deleteProduct(slotProps.data.id)" type="button" icon="pi pi-trash" severity="danger"
                  rounded/>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>

</style>