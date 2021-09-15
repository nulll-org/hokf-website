<template>
  <div id="queries" class="h-8">
    <div class="px-4 py-3 border rounded-lg border-solid border-gray-300">
      <div class="flex justify-between">
        <h4 class="font-mulish font-bold xl:text-2xl">All Queries</h4>
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
        <p class="font-mulish text-xs w-3/12 xl:text-lg">Name</p>
        <p class="font-mulish text-xs w-3/12 xl:text-lg">Email</p>
        <p class="font-mulish text-xs w-6/12 xl:text-lg">Query</p>
      </div>
      <div
        id="queries"
        class="
          md:max-h-60vh
          lg:max-h-8/10
          -mx-6
          px-4
          overflow-y-auto overflow-x-hidden
        "
      >
        <div
          v-for="query in queries"
          :key="query.id"
          @click="openModal(query)"
          class="
            query
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
          <div class="flex items-center w-3/12">
            <p
              class="
                font-mulish font-bold
                text-sm
                line-clamp-2
                w-3/4
                overflow-ellipsis overflow-hidden
              "
            >
              {{ query.name }}
            </p>
          </div>
          <p class="font-mulish text-xs w-3/12 xl:text-lg">
            {{ query.email }}
          </p>
          <div class="font-mulish text-xs w-6/12 xl:text-lg">
            <p
              class="
                font-mulish font-bold
                text-sm
                line-clamp-2
                w-3/4
                overflow-ellipsis overflow-hidden
              "
            >
              {{ query.message }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="isModalOpen" @closeModal="closeModal()">
      <div
        class="flex items-center justify-center space-x-4 h-full"
        v-if="modalData"
      >
        <div class="w-1/2 flex flex-col space-y-2 overflow-auto">
          <div class="w-40 h-40 mx-auto">
            <img :src="image" alt="">
          </div>
          <h3 class="flex items-center font-mulish text-purple-500">Query</h3>
          <div class="flex justify-between">
            <p>by: {{ modalData.name }}</p>
            <a
              :href="`mailto:${modalData.email}`"
              class="hover:text-purple-500 hover:underline"
              >Send a reply</a
            >
          </div>

          <p class="text-xl mt-4">{{ modalData.message }}</p>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script src="./queries.page.js"></script>
<style src="./queries.page.scss" scoped lang="scss"></style>
