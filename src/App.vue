<template>
  <div id="app-root" class="overflow-x-hidden">
    <div id="app-header" class="h-full" v-if="!adminRoute">
      <Header />
    </div>
    <div id="app-body" class="min-h-70vh" :class="{'mt-20': !adminRoute}">
      <router-view />
    </div>
    <div id="app-footer" class="h-full" v-if="!adminRoute">
      <Footer />
    </div>
  </div>
</template>

<script src="./App.js" lang="js"></script>

<style src="./App.scss" lang="scss"></style>
