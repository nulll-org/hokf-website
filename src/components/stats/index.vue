<template >
    <router-link :to="route" class="group sm:px-4 sm:py-3 flex flex-col space-y-2 hover:bg-gray-300 hover:text-white
            items-center border border-solid border-gray-300 rounded-md lg:px-10 lg:py-6 xl:px-16 xl:py-8">
        <p class="text-gray-400 font-bold font-mulish text-sm xl:text-xl group-hover:text-white">{{ label }}</p>
        <p class="font-bold text-3xl font-mulish xl:text-5xl">{{ value }}</p>
    </router-link>
</template>
<script src="./stats.component.js" lang="js"></script>
<style src="./stats.component.scss" scoped lang="scss"></style>

