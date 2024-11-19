<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import api from "@/services/ApiService";
import {addToCart} from "@/services/CartService.js";
import {useToast} from "primevue/usetoast";
import getImageUrl from "@/utils/ImageUtils";
import {formatCurrency} from "@/utils/formatters";

const route = useRoute();
const toast = useToast();
const detailProduct = ref();
const quantity = ref(1);
const selectedColor = ref(null);

const fetchProductDetail = async () => {
  try {
    const response = await api.get(`product/${route.params.id}`);
    detailProduct.value = response.data;
    detailProduct.value.images = JSON.parse(detailProduct.value.images);
    detailProduct.value.colors = JSON.parse(detailProduct.value.colors);
    detailProduct.value.attributes = JSON.parse(detailProduct.value.attributes);
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

onMounted(async () => {
  await fetchProductDetail();
});
</script>

<template>
  <Toast/>
  <section class="section-product py-[50px] max-[1199px]:py-[35px]">
    <div
        class="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]"
    >
      <div class="flex flex-wrap w-full">
        <div class="w-full px-[12px]">
          <div class="bb-single-pro mb-[24px]">
            <div class="flex flex-wrap mx-[-12px]">
              <div class="min-[992px]:w-[41.66%] w-full px-[12px] mb-[24px]">
                <div
                    class="single-pro-slider sticky top-[0] p-[15px] border-[1px] border-solid border-[#eee] rounded-[24px] max-[991px]:max-w-[500px] max-[991px]:m-auto"
                >
                  <div class="single-product-cover">
                    <div
                        class="single-slide zoom-image-hover rounded-tl-[15px] rounded-tr-[15px]"
                    >
                      <img
                          class="img-responsive rounded-tl-[15px] rounded-tr-[15px]"
                          :src="getImageUrl(detailProduct.thumbnail)"
                          alt="product-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="min-[992px]:w-[58.33%] w-full px-[12px] mb-[24px]">
                <div class="bb-single-pro-contact">
                  <div class="bb-sub-title mb-[20px]">
                    <h4
                        class="font-quicksand text-[22px] tracking-[0.03rem] font-bold leading-[1.2] text-[#3d4750]"
                    >
                      {{ detailProduct.name }}
                    </h4>
                  </div>
                  <div class="bb-single-rating mb-[12px]">
                    <span class="bb-pro-rating mr-[10px]">
                      <i
                          class="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]"
                      ></i>
                      <i
                          class="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]"
                      ></i>
                      <i
                          class="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]"
                      ></i>
                      <i
                          class="ri-star-fill float-left text-[15px] mr-[3px] text-[#fea99a]"
                      ></i>
                      <i
                          class="ri-star-line float-left text-[15px] mr-[3px] text-[#777]"
                      ></i>
                    </span>
                    <span class="bb-read-review">
                      |&nbsp;&nbsp;<a
                        href="#bb-spt-nav-review"
                        class="font-Poppins text-[15px] font-light leading-[28px] tracking-[0.03rem] text-[#6c7fd8]"
                    >992 Đánh Giá</a
                    >
                    </span>
                  </div>
                  <p
                      class="font-Poppins text-[15px] font-light leading-[28px] tracking-[0.03rem]"
                  >
                    {{ detailProduct.description }}
                  </p>
                  <div
                      class="bb-single-price-wrap flex justify-between py-[10px]"
                  >
                    <div class="bb-single-price py-[15px]">
                      <div class="price mb-[8px]">
                        <h5
                            class="font-quicksand leading-[1.2] tracking-[0.03rem] text-[20px] font-extrabold text-[#3d4750]"
                        >
                          {{ formatCurrency(detailProduct.promotionPrice) }}
                        </h5>
                      </div>
                      <div
                          class="mrp"
                          v-if="
                          detailProduct.promotionPrice < detailProduct.price
                        "
                      >
                        <p
                            class="font-Poppins text-[16px] font-light text-[#686e7d] leading-[28px] tracking-[0.03rem]"
                        >
                          <span class="text-[15px] line-through">{{
                              formatCurrency(detailProduct.price)
                            }}</span>
                        </p>
                      </div>
                    </div>
                    <div class="bb-single-price py-[15px]">
                      <div class="sku mb-[8px]">
                        <h5
                            class="font-quicksand text-[18px] font-extrabold leading-[1.2] tracking-[0.03rem] text-[#3d4750]"
                        >
                          Serial Number: {{ detailProduct.serial }}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="bb-single-list mb-[30px]">
                    <ul class="my-[-8px] pl-[18px]">
                      <li
                          class="my-[8px] font-Poppins text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#777] list-disc"
                      >
                        <span class="font-Poppins text-[#777] text-[14px]"
                        >Closure :</span
                        >
                        Hook & Loop
                      </li>
                      <li
                          class="my-[8px] font-Poppins text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#777] list-disc"
                      >
                        <span class="font-Poppins text-[#777] text-[14px]"
                        >Sole :</span
                        >
                        Polyvinyl Chloride
                      </li>
                      <li
                          class="my-[8px] font-Poppins text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#777] list-disc"
                      >
                        <span class="font-Poppins text-[#777] text-[14px]"
                        >Width :</span
                        >
                        Medium
                      </li>
                      <li
                          class="my-[8px] font-Poppins text-[14px] font-light leading-[28px] tracking-[0.03rem] text-[#777] list-disc"
                      >
                        <span class="font-Poppins text-[#777] text-[14px]"
                        >Outer Material :</span
                        >
                        A-Grade Standard Quality
                      </li>
                    </ul>
                  </div>
                  <div
                      class="bb-single-pro-weight mb-[24px]"
                      v-if="detailProduct.colors.length > 0"
                  >
                    <div class="pro-title mb-[12px]">
                      <h4
                          class="font-quicksand leading-[1.2] tracking-[0.03rem] text-[16px] font-bold uppercase text-[#3d4750]"
                      >
                        Màu Sắc
                      </h4>
                    </div>
                    <div class="bb-pro-variation-contant">
                      <ul class="flex flex-wrap m-[-2px]">
                        <li
                            v-for="color in detailProduct.colors"
                            :key="color.id"
                            class="my-[10px] mx-[2px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] cursor-pointer active-variation"
                        >
                          <span
                              class="font-Poppins text-[#686e7d] font-light text-[14px] leading-[28px] tracking-[0.03rem]"
                          >{{ color.name }}</span
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="bb-single-qty flex flex-wrap m-[-2px]">
                    <div
                        class="qty-plus-minus m-[2px] w-[85px] h-[40px] py-[7px] border-[1px] border-solid border-[#eee] overflow-hidden relative flex items-center justify-between bg-[#fff] rounded-[10px]"
                    >
                      <button
                          class="qty-minus w-[25px] h-[25px] flex items-center justify-center text-[#777] hover:text-[#6c7fd8]"
                          @click="quantity > 1 ? quantity-- : null"
                      >
                        <i class="ri-subtract-line"></i>
                      </button>
                      <input
                          type="text"
                          class="qty-input w-[35px] h-full border-none text-center font-Poppins text-[14px] text-[#777]"
                          v-model="quantity"
                          readonly
                      />
                      <button
                          class="qty-plus w-[25px] h-[25px] flex items-center justify-center text-[#777] hover:text-[#6c7fd8]"
                          @click="quantity++"
                      >
                        <i class="ri-add-line"></i>
                      </button>
                    </div>
                    <div class="buttons m-[2px]">
                      <a
                          href="javascript:void(0)"
                          class="bb-btn-2 transition-all duration-[0.3s] ease-in-out h-[40px] flex font-Poppins leading-[28px] tracking-[0.03rem] py-[6px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                          @click="
                          addToCart(detailProduct.id, quantity, selectedColor)
                        "
                      >Thêm Vào Giỏ Hàng</a
                      >
                    </div>
                    <ul class="bb-pro-actions my-[2px] flex">
                      <li class="bb-btn-group">
                        <a
                            href="javascript:void(0)"
                            title="heart"
                            class="transition-all duration-[0.3s] ease-in-out w-[40px] h-[40px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] hover:bg-[#6c7fd8] border-[1px] border-solid border-[#eee] rounded-[10px]"
                        >
                          <i
                              class="ri-heart-line text-[16px] leading-[10px] text-[#777]"
                          ></i>
                        </a>
                      </li>
                      <li class="bb-btn-group">
                        <a
                            href="javascript:void(0)"
                            title="Quick View"
                            class="bb-modal-toggle transition-all duration-[0.3s] ease-in-out w-[40px] h-[40px] mx-[2px] flex items-center justify-center text-[#fff] bg-[#fff] hover:bg-[#6c7fd8] border-[1px] border-solid border-[#eee] rounded-[10px]"
                        >
                          <i
                              class="ri-eye-line text-[16px] leading-[10px] text-[#777]"
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bb-single-pro-tab">
            <div class="bb-pro-tab mb-[24px]">
              <ul
                  class="bb-pro-tab-nav flex flex-wrap mx-[-20px] max-[991px]:justify-center"
                  id="ProTab"
              >
                <li class="nav-item relative leading-[28px]">
                  <a
                      class="nav-link px-[20px] font-Poppins text-[16px] text-[#686e7d] font-medium capitalize leading-[28px] tracking-[0.03rem] block active"
                      href="#detail"
                  >Detail</a
                  >
                </li>
                <li class="nav-item relative leading-[28px]">
                  <a
                      class="nav-link px-[20px] font-Poppins text-[16px] text-[#686e7d] font-medium capitalize leading-[28px] tracking-[0.03rem] block"
                      href="#information"
                  >Information</a
                  >
                </li>
                <li class="nav-item relative leading-[28px]">
                  <a
                      class="nav-link px-[20px] font-Poppins text-[16px] text-[#686e7d] font-medium capitalize leading-[28px] tracking-[0.03rem] block"
                      href="#reviews"
                  >Reviews</a
                  >
                </li>
              </ul>
            </div>
            <div class="tab-content">
              <div class="tab-pro-pane" id="detail">
                <div
                    class="bb-inner-tabs border-[1px] border-solid border-[#eee] p-[15px] rounded-[20px]"
                >
                  <div class="bb-details">
                    <p
                        class="mb-[12px] font-Poppins text-[#686e7d] leading-[28px] tracking-[0.03rem] font-light"
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Libero, voluptatum. Vitae dolores alias repellat eligendi,
                      officiis, exercitationem corporis quisquam delectus cum
                      non recusandae numquam dignissimos molestiae magnam hic
                      natus. Cumque.
                    </p>
                    <div class="details-info">
                      <ul class="list-disc pl-[20px] mb-[0]">
                        <li
                            class="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light"
                        >
                          Any Product types that You want - Simple, Configurable
                        </li>
                        <li
                            class="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light"
                        >
                          Downloadable/Digital Products, Virtual Products
                        </li>
                        <li
                            class="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light"
                        >
                          Inventory Management with Backordered items
                        </li>
                        <li
                            class="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light"
                        >
                          Flatlock seams throughout.
                        </li>
                      </ul>
                      <ul class="list-disc pl-[20px] mb-[0]">
                        <li
                            class="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light"
                        >
                          <span class="inline-flex font-medium min-w-[150px]"
                          >Highlights</span
                          >Form FactorWhole
                        </li>
                        <li
                            class="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light"
                        >
                          <span class="inline-flex font-medium min-w-[150px]"
                          >Seller</span
                          >No Returns Allowed
                        </li>
                        <li
                            class="py-[5px] text-[15px] text-[#686e7d] font-Poppins leading-[28px] font-light"
                        >
                          <span class="inline-flex font-medium min-w-[150px]"
                          >Services</span
                          >Cash on Delivery available
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
