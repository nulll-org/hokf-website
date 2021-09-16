<template >
  <div
    class="
      fixed
      top-0
      left-0
      m-0
      w-screen
      h-screen
      flex
      items-center
      justify-center
    "
  >
    <div
      @click="closeModal()"
      class="fixed top-0 left-0 bg-gray-600 opacity-50 w-screen h-screen"
    ></div>
    <div data-aos="fade-up" class="md:p-4 w-3/4 h-4/5 z-10 lg:px-16 lg:py-8 bg-white rounded-lg">
      <slot />
    </div>
  </div>
</template>
<script src="./modal.component.js" lang="js"></script>
<style src="./modal.component.scss" scoped lang="scss"></style>