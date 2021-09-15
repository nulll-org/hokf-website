<template>
  <div id="orders" class="h-8">
    <div class="px-4 py-3 border rounded-lg border-solid border-gray-300">
      <div class="flex justify-between">
        <h4 class="font-mulish font-bold xl:text-2xl">
          <span class="transform capitalize">{{show}}</span> Orders
        </h4>
        <div class="flex items-center space-x-2">
          <div v-if="show == 'paid' || show == 'all'"
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
            @click="display('pending')"
          >
            <icon icon="ion:hourglass-outline"/>
            <p class="text-xs">Pending Orders</p>
          </div>
          <div v-if="show == 'pending' || show == 'all'"
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
            @click="display('paid')"
          >
            <icon icon="dashicons:money-alt" />
            <p class="text-xs" >Paid Orders</p>
          </div>
          <div v-if="show == 'pending' || show == 'paid'"
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
            <p class="text-xs" >All Orders</p>
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
              class="font-mulish font-bold text-dark-grey text-xl bg-transparent"
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
    <Modal v-if="isModalOpen" @closeModal="closeModal()"></Modal>
  </div>
</template>
<script src="./orders.page.js"></script>
<style src="./orders.page.scss" scoped lang="scss"></style>
