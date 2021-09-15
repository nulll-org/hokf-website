<template>
  <div id="orders">
    <div class="px-4 py-3 border rounded-lg border-solid border-gray-300">
      <div class="flex justify-between">
        <h4 class="font-mulish font-bold xl:text-2xl">
          <span class="transform capitalize">{{ show }}</span> Orders
        </h4>
        <div class="flex items-center space-x-2">
          <div
            v-if="show == 'paid' || show == 'all'"
            class="
              md:p-2
              lg:px-4
              lg:py-3
              flex
              items-center
              space-x-2
              bg-yellow-500
              text-white
              cursor-pointer
            "
            @click="display('pending')"
          >
            <icon icon="ion:hourglass-outline" />
            <p class="text-xs">Pending Orders</p>
          </div>
          <div
            v-if="show == 'pending' || show == 'all'"
            class="
              md:p-2
              lg:px-4
              lg:py-3
              flex
              items-center
              space-x-2
              bg-green-500
              text-white
              cursor-pointer
            "
            @click="display('paid')"
          >
            <icon icon="dashicons:money-alt" />
            <p class="text-xs">Paid Orders</p>
          </div>
          <div
            v-if="show == 'pending' || show == 'paid'"
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
            @click="display('all')"
          >
            <icon icon="dashicons:money-alt" />
            <p class="text-xs">All Orders</p>
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
          space-x-4
          flex
          border-b border-solid border-gray-300
        "
      >
        <p class="font-mulish text-xs w-2/12 xl:text-lg">Order ID</p>
        <p class="font-mulish text-xs w-3/12 xl:text-lg">Customer</p>
        <p class="font-mulish text-xs w-3/12 xl:text-lg">Price</p>
        <p class="font-mulish text-xs w-2/12 xl:text-lg">Date</p>
        <p class="font-mulish text-xs w-1/12 xl:text-lg">Status</p>
      </div>
      <div
        id="orders"
        class="
          md:max-h-60vh
          lg:max-h-8/10
          -mx-6
          px-4
          overflow-y-auto overflow-x-hidden
        "
      >
        <div
          v-for="order in orders"
          :key="order.id"
          @click="openModal(order)"
          class="
            order
            cursor-pointer
            hover:bg-gray-200
            -mx-6
            md:py-2
            px-4
            flex
            space-x-4
            items-center
            border-b border-solid border-gray-300
            xl:py-4
          "
        >
          <div class="flex items-center w-2/12">
            <div
              class="mr-2 rounded-full w-2 h-2 xl:w-3 xl:h-3"
              :class="{
                'bg-yellow-500': order.status == 'pending',
                'bg-red-500': order.status == 'pending',
                'bg-green-500': order.status == 'paid',
              }"
            ></div>
            <p
              class="
                font-mulish font-bold
                text-sm
                line-clamp-2
                w-3/4
                overflow-ellipsis overflow-hidden
              "
            >
              {{ order.id }}
            </p>
          </div>
          <p class="font-mulish text-xs w-3/12 xl:text-lg">
            {{ order.firstName }} {{ order.lastName }}
          </p>
          <p class="font-mulish text-xs w-3/12 xl:text-lg">
            <money
              class="
                font-mulish font-bold
                text-dark-grey text-xl
                bg-transparent
              "
              disabled
              :value="order.price"
            />
          </p>
          <p class="font-mulish text-xs w-2/12 xl:text-lg">
            {{ localDate(order.date) }}
          </p>
          <p class="font-mulish uppercase font-bold text-xs w-1/12 xl:text-sm">
            {{ order.status }}
          </p>
        </div>
      </div>
    </div>
    <Modal v-if="isModalOpen" @closeModal="closeModal()">
      <div class="flex space-x-4 h-full" v-if="modalData && relatedCartItems">
        <div class="w-1/2 h-full overflow-auto">
          <h3 class="flex items-center mb-4 font-mulish">
            Ordered Products
          </h3>
          <div
            v-for="cartItem in relatedCartItems"
            :key="cartItem.id"
            class="cartItem group w-32 inline-block mr-8 mb-2 cursor-pointer"
          >
            <div class="relative h-32 w-full">
              <div
                class="
                  absolute
                  right-2
                  top-2
                  text-xs
                  px-2
                  py-2
                  bg-dark-grey
                  text-white
                  md:px-3
                "
              >
                {{ cartItem.quantity }}x [{{ cartItem.size.toUpperCase() }}]
              </div>
              <img
                class="object-center w-full h-full"
                :src="cartItem.product.photo"
                alt=""
              />
            </div>
            <div class="flex flex-col text-center mt-2 p-2 w-full shadow-drop">
              <p
                class="
                  font-bold
                  w-auto
                  line-clamp-2
                  overflow-hidden overflow-ellipsis
                  text-sm
                "
              >
                {{ cartItem.product.name }}
              </p>
              <money
                class="
                  font-inter font-bold
                  text-dark-grey text-sm
                  bg-transparent
                  text-right
                "
                disabled
                :value="cartItem.price"
              />
            </div>
          </div>
        </div>
        <div class="w-1/2 flex flex-col space-y-4">
          <h3 class="flex items-center font-mulish">
            Order ID: <span class="text-base ml-2"> {{ modalData.id }} </span>
          </h3>
          <div>
            <div class="flex space-x-2">
              <p class="text-sm flex font-bold font-mulish">Date:</p>
              <p class="text-sm uppercase flex font-bold font-mulish">
                {{ localDate(modalData.date) }}
              </p>
            </div>
            <p
              class="text-lg uppercase flex font-bold mb-2 font-mulish"
              :class="{
                'text-green-500': modalData.status == 'paid',
                'text-yellow-500': modalData.status == 'pending',
              }"
            >
              {{ modalData.status }}
            </p>
            <p class="font-bold font-mulish text-xl mb-2">
              Customer Information
            </p>
            <p class="text-xl flex mb-2">
              {{ modalData.firstName }} {{ modalData.lastName }}
            </p>
            <a
              class="flex text-lg items-center hover:text-purple-500"
              :href="`mailto:${modalData.email}`"
            >
              <icon class="mr-2" icon="codicon:mail" />
              {{ modalData.email }}
            </a>
            <a
              class="flex text-lg items-center hover:text-purple-500"
              :href="`tel:${modalData.phoneNumber}`"
            >
              <icon class="mr-2" icon="carbon:phone" />
              {{ modalData.phoneNumber }}
            </a>
          </div>
          <div>
            <p class="font-bold font-mulish text-xl mb-2">Delivery Address</p>
            <p class="text-lg flex mb-2 font-mulish">
              {{ modalData.addressLine1 }},
              <span v-if="modalData.addressLine2">{{
                `${modalData.addressLine2},` || ""
              }}</span>
              {{ modalData.city }}, {{ modalData.state }},
              {{ modalData.country }}
            </p>
          </div>
          <div class="flex justify-between">
            <p class="font-bold font-mulish text-xl mb-2">Total Price</p>
            <money
              class="
                font-inter font-bold
                text-dark-grey text-lg
                bg-transparent
                w-1/2
                text-right
              "
              disabled
              :value="modalData.price"
            />
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script src="./orders.page.js"></script>
<style src="./orders.page.scss" scoped lang="scss"></style>
