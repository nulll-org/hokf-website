<template>
  <div id="app-root" class="overflow-x-hidden">
    <div id="app-header" class="h-full">
      <Header />
    </div>
    <div id="app-body" class="mt-20 min-h-70vh">
      <router-view />
    </div>
    <div id="app-footer" class="h-full">
      <Footer />
    </div>
  </div>
</template>

<script src="./App.js" lang="js"></script>

<style src="./App.scss" lang="scss"></style>
