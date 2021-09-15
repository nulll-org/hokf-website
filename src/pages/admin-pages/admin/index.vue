<template>
  <div>
    <div id="dashboard" class="hidden md:flex h-screen">
      <div
        id="admin-navigation"
        class="flex flex-col space-y-10 h-screen w-3/12 bg-dark-grey lg:w-18% xl:2/10"
      >
        <div class="logo w-20 mt-4 mx-auto cursor-pointer lg:w-32 xl:w-40">
          <img
            class="object-cover"
            src="../../../assets/logo.png"
            alt="HOKF Logo"
          />
        </div>
        <div class="flex flex-col space-y-4 text-gray-500 font-mulish">
          <router-link
            to="/admin/overview"
            class="
              lg:py-4
              xl:px-10
              lg:px-8
              lg:space-x-6
              flex
              items-center
              space-x-4
              md:px-4
              md:py-3
              lg:text-lg
              xl:text-2xl
            "
          >
            <icon icon="fa-solid:chart-pie" />
            <p class="lg:text-sm xl:text-lg">Overview</p>
          </router-link>
          <router-link
            to="/admin/products"
            class="
              lg:py-4
              xl:px-10
              lg:px-8
              lg:space-x-6
              flex
              items-center
              space-x-4
              md:px-4
              md:py-3
              lg:text-lg
              xl:text-2xl
            "
          >
            <icon icon="icon-park-outline:ad-product" />
            <p class="lg:text-sm xl:text-lg">Products</p>
          </router-link>
          <router-link
            to="/admin/orders"
            class="
              lg:py-4
              xl:px-10
              lg:px-8
              lg:space-x-6
              flex
              items-center
              space-x-4
              md:px-4
              md:py-3
              lg:text-lg
              xl:text-2xl
            "
          >
            <icon icon="octicon:package-dependencies-24" />
            <p class="lg:text-sm xl:text-lg">Orders</p>
          </router-link>
          <router-link
            to="/admin/bookings"
            class="
              lg:py-4
              xl:px-10
              lg:px-8
              lg:space-x-6
              flex
              items-center
              space-x-4
              md:px-4
              md:py-3
              lg:text-lg
              xl:text-2xl
            "
          >
            <icon icon="ri:reserved-line" />
            <p class="lg:text-sm xl:text-lg">Bookings</p>
          </router-link>
          <router-link
            to="/admin/queries"
            class="
              lg:py-4
              xl:px-10
              lg:px-8
              lg:space-x-6
              flex
              items-center
              space-x-4
              md:px-4
              md:py-3
              lg:text-lg
              xl:text-2xl
            "
          >
            <icon icon="ic:sharp-query-stats" />
            <p class="lg:text-sm xl:text-lg">Queries</p>
          </router-link>
        </div>
      </div>
      <div id="admin-body" class="w-9/12 lg:w-82% xl:8/10 overflow-hidden">
        <div
          id="admin-header"
          class="flex items-center justify-between sm:p-4 h-10vh lg:px-8 xl:p-14"
        >
          <p class="font-bold font-mulish text-xl lg:text-2xl xl:text-3xl">
            {{ pageName }}
          </p>
          <div>
            <p class="text-xs font-bold uppercase xl:text-lg">Logout</p>
          </div>
        </div>
        <router-view class="h-90vh sm:p-4 lg:px-6 lg:pb-6 xl:px-14" />
      </div>
    </div>
    <div id="mobile-no-show" class="flex md:hidden">
      <div class="h-screen px-4 flex flex-col items-center justify-center">
        <div class="p-8 bg-dark-grey text-white md:w-3/5 lg:w-2/5">
          <div class="flex flex-col space-y-4 items-center text-center">
            <div class="w-32 h-32">
              <img src="../../../assets/hokf-astronaut.svg" />
            </div>
            <h3 class="uppercase">You'll need a larger screen</h3>
            <p class="uppercase text-xs">
              The Admin Console not accessible from mobile devices
            </p>
            <p class="uppercase text-xs">Please log in on your Tablet or PC</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./admin.page.js"></script>
<style src="./admin.page.scss" scoped lang="scss"></style>