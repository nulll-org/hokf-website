<template>
  <div id="products">
    <div class="px-4 py-3 border rounded-lg border-solid border-gray-300">
      <div class="flex justify-between">
        <h4 class="font-mulish font-bold xl:text-2xl" v-if="showArchive">
          Archived Products
        </h4>
        <h4 class="font-mulish font-bold xl:text-2xl" v-else>Live Products</h4>
        <div class="flex items-center space-x-2">
          <div
            class="
              md:p-2
              lg:px-4
              lg:py-3
              flex
              items-center
              space-x-2
              bg-purple-500
              text-white
              cursor-pointer
            "
            @click="toggleArchivedProducts()"
          >
            <icon icon="bx:bxs-archive-in" v-if="!showArchive" />
            <icon icon="fluent:live-24-regular" v-else />
            <p class="text-xs" v-if="showArchive">Live Products</p>
            <p class="text-xs" v-else>Archived Products</p>
          </div>
          <div
            @click="openModal('new', 'add')"
            class="
              md:p-2
              lg:px-4
              lg:py-3
              flex
              items-center
              space-x-2
              bg-dark-grey
              text-white
              cursor-pointer
            "
          >
            <icon icon="fluent:add-24-regular" />
            <p class="text-xs">Add Product</p>
          </div>
        </div>
      </div>
      <div
        class="
          mt-3
          -mx-6
          pb-2
          px-4
          font-bold
          text-gray-400
          flex
          border-b border-solid border-gray-300
        "
      >
        <p class="font-mulish text-xs w-5/12 xl:text-lg">Product</p>
        <p class="font-mulish text-xs w-2/12 xl:text-lg">Category</p>
        <p class="font-mulish text-xs w-2/12 xl:text-lg">In Stock</p>
        <p class="font-mulish text-xs w-3/12 xl:text-lg"></p>
      </div>
      <div
        id="products"
        class="
          md:max-h-60vh
          lg:max-h-8/10
          -mx-6
          px-4
          overflow-y-auto overflow-x-hidden
        "
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="
            product
            -mx-6
            md:py-2
            px-4
            flex
            items-center
            border-b border-solid border-gray-300
            xl:py-4
          "
        >
          <div class="flex items-center w-5/12">
            <div class="w-12 h-12 mr-3 xl:w-20 xl:h-20">
              <img class="rounded-lg" :src="product.photo" alt="" />
            </div>
            <p
              class="
                font-mulish font-bold
                text-sm
                line-clamp-2
                w-full
                overflow-ellipsis overflow-hidden
                xl:text-xl
              "
            >
              {{ product.name }}
            </p>
          </div>
          <p class="font-mulish text-xs w-2/12 xl:text-lg">
            {{ product.type }}
          </p>
          <p
            class="font-mulish text-xs w-2/12 xl:text-lg"
            :class="{ 'text-red-500 font-bold': product.totalAvailable < 10 }"
          >
            {{ product.totalAvailable }}
          </p>
          <div class="flex items-center space-x-4 w-3/12">
            <p
              class="
                font-mulish font-bold
                text-xs
                cursor-pointer
                hover:text-purple-500
                xl:text-lg
              "
              @click="openModal(product, 'edit')"
            >
              Edit
            </p>
            <p
              class="
                font-mulish font-bold
                text-xs
                cursor-pointer
                hover:text-purple-500
                xl:text-lg
              "
              v-if="!product.archived"
              @click="archiveProduct(product.id)"
            >
              Archive
            </p>
            <p
              class="
                font-mulish font-bold
                text-xs
                cursor-pointer
                hover:text-purple-500
                xl:text-lg
              "
              v-else
              @click="unarchiveProduct(product.id)"
            >
              Unarchive
            </p>
            <div
              class="ml-auto rounded-full w-2 h-2 xl:w-3 xl:h-3"
              :class="{
                'bg-red-500': product.archived || !product.isInStock,
                'bg-green-500': !product.archived,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="isModalOpen" @closeModal="closeModal()">
      <div class="flex space-x-4 h-full">
        <div class="w-1/2" @click="addImage()">
          <img :src="previewImage" alt="" />
          <input
            class="hidden"
            type="file"
            name=""
            @change="uploadImage()"
            ref="image"
          />
        </div>
        <div class="w-1/2 pb-6 flex flex-col space-y-3 overflow-auto">
          <Input
            :smaller="true"
            :label="'Name'"
            :modelValue="productFormGroup"
            :field="'name'"
            :placeholder="'Enter the product name'"
            :type="'text'"
          />
          <Input
            :smaller="true"
            :label="'Description'"
            :modelValue="productFormGroup"
            :field="'description'"
            :placeholder="'Enter the product description'"
            :type="'text'"
          />
          <Input
            :smaller="true"
            :label="'Price'"
            :modelValue="productFormGroup"
            :field="'price'"
            :placeholder="'Enter the price'"
            :type="'number'"
          />
          <Dropdown
            :smaller="true"
            :label="'Type'"
            :modelValue="productFormGroup"
            :field="'type'"
            :placeholder="'Product Type'"
            :type="'text'"
            :options="productTypes"
          />
          <Input
            :smaller="true"
            :label="'Discount Percentage %'"
            :modelValue="productFormGroup"
            :field="'discountPercentage'"
            :placeholder="'Enter the product discount'"
            :type="'number'"
            :optional="true"
          />
          <div class="flex flex-col">
            <p class="mb-2">
              Quantity Available <span class="text-red-600">*</span>
            </p>
            <div class="flex flex-wrap justify-between">
              <Input
                class="w-2/5 mr-2 mb-2"
                :smaller="true"
                :label="'Size XS'"
                :modelValue="productFormGroup"
                :field="'xs'"
                :optional="true"
                :type="'number'"
              />
              <Input
                class="w-2/5 mr-2 mb-2"
                :smaller="true"
                :label="'Size S'"
                :modelValue="productFormGroup"
                :field="'s'"
                :optional="true"
                :type="'number'"
              />
              <Input
                class="w-2/5 mr-2 mb-2"
                :smaller="true"
                :label="'Size M'"
                :modelValue="productFormGroup"
                :field="'m'"
                :optional="true"
                :type="'number'"
              />
              <Input
                class="w-2/5 mr-2 mb-2"
                :smaller="true"
                :label="'Size L'"
                :modelValue="productFormGroup"
                :field="'l'"
                :optional="true"
                :type="'number'"
              />
              <Input
                class="w-2/5 mr-2 mb-2"
                :smaller="true"
                :label="'Size XL'"
                :modelValue="productFormGroup"
                :field="'xl'"
                :optional="true"
                :type="'number'"
              />
            </div>
          </div>
          <button
            v-if="modalAction == 'add'"
            @click="submitCreate()"
            class="
              px-4
              py-3
              mt-4
              select-none
              cursor-pointer
              text-center text-white
              bg-dark-grey
              font-inter font-bold
              text-lg
              md:px-2
              md:text-sm
            "
          >
            ADD PRODUCT
          </button>
          <button
            v-else
            @click="submitUpdate()"
            class="
              px-4
              py-3
              mt-4
              select-none
              cursor-pointer
              text-center text-white
              bg-dark-grey
              font-inter font-bold
              text-lg
              md:px-2
              md:text-sm
            "
          >
            UPDATE
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script src="./products.page.js"></script>
<style src="./products.page.scss" scoped lang="scss"></style>
