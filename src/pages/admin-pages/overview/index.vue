<template>
  <div id="overview" class="flex flex-col space-y-4 xl:space-y-10">
    <div class="graphs flex">
      <div class="w-1/2 flex flex-col space-y-4">
        <div class="flex flex-col">
          <h4 class="font-bold font-mulish mb-2 xl:text-3xl">
            Total Sales
            <span class="text-xs uppercase font-medium xl:text-lg">[{{ month }}, {{ year }}]</span>
          </h4>
          <money
            class="font-inter font-bold text-dark-grey text-2xl bg-white xl:text-5xl"
            disabled
            :value="totalSales"
          />
        </div>
        <!-- <div>
          <h4 class="font-bold font-mulish mb-2">Highest Selling</h4>
          <div class="flex items-center justify-between" v-for="product in topSoldProducts" :key="product.id">
            <p class="w-1/2 overflow-ellipsis overflow-hidden">{{ product.name }}</p>
            <p>{{ product.totalSold }}</p>
          </div>
        </div> -->
      </div>
      <div class="w-1/2">
        <div class="input flex flex-col w-1/2 ml-auto space-y-2">
          <p class="text-sm">Showing statistics for</p>
          <div class="flex space-x-2">
            <select
              class="px-3 py-2 w-2/3 border border-solid border-gray-700"
              v-model="month"
            >
              <option :value="month" v-for="month in months" :key="month">
                {{ month }}
              </option>
            </select>
            <input class="px-3 py-2 border border-solid border-gray-700" type="number" min="2000" max="2499" step="1" v-model="year" />

          </div>
        </div>
      </div>
    </div>
    <div class="orders">
      <h4 class="font-bold font-mulish xl:text-3xl">Orders</h4>
      <div class="flex flex-wrap space-x-4 sm:mt-3 xl:mt-6">
        <Stats :label="'Total Orders'" :value="orders" />
        <Stats :label="'Pending Orders'" :value="pendingOrders" />
      </div>
    </div>
    <div class="bookings">
      <h4 class="font-bold font-mulish xl:text-3xl">Bookings</h4>
      <div class="flex space-x-4 sm:mt-3 xl:mt-6">
        <Stats :label="'Total Bookings'" :value="bookings" />
        <Stats :label="'Upcoming Bookings'" :value="upcomingBookings" />
        <Stats :label="'Awaiting Approval'" :value="pendingBookings" />
      </div>
    </div>
  </div>
</template>
<script src="./overview.page.js"></script>
<style src="./overview.page.scss" scoped lang="scss"></style>

