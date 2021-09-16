<template>
  <div id="bookings">
    <div class="px-4 py-3 border rounded-lg border-solid border-gray-300">
      <div class="flex justify-between">
        <h4 class="font-mulish font-bold xl:text-2xl">
          <span class="transform capitalize">{{ show }}</span> Bookings
        </h4>
        <div class="flex items-center space-x-2">
          <div
            v-if="show == 'approved' || show == 'declined' || show == 'all'"
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
            <icon icon="ic:baseline-pending-actions" />
            <p class="text-xs">Pending Bookings</p>
          </div>
          <div
            v-if="show == 'pending' || show == 'declined' || show == 'all'"
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
            @click="display('approved')"
          >
            <icon icon="akar-icons:double-check" />
            <p class="text-xs">Approved Bookings</p>
          </div>
          <div
            v-if="show == 'pending' || show == 'all' || show == 'approved'"
            class="
              md:p-2
              lg:px-4
              lg:py-3
              flex
              items-center
              space-x-2
              bg-red-500
              text-white
              cursor-pointer
            "
            @click="display('declined')"
          >
            <icon icon="teenyicons:denied-outline" />
            <p class="text-xs">Denied Bookings</p>
          </div>
          <div
            v-if="show == 'pending' || show == 'declined' || show == 'approved'"
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
            <icon icon="ri:reserved-line" />
            <p class="text-xs">All Bookings</p>
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
        <p class="font-mulish text-xs w-4/12 xl:text-lg">Area</p>
        <p class="font-mulish text-xs w-3/12 xl:text-lg">Customer</p>
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
          v-for="booking in bookings"
          :key="booking.id"
          @click="openModal(booking)"
          class="
            booking
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
          <div class="flex items-center w-4/12">
            <div
              class="mr-2 rounded-full w-2 h-2 xl:w-3 xl:h-3"
              :class="{
                'bg-yellow-500': booking.status == 'pending',
                'bg-red-500': booking.status == 'declined',
                'bg-green-500': booking.status == 'approved',
              }"
            ></div>
            <p
              class="
                font-mulish font-bold
                text-lg
                line-clamp-2
                w-3/4
                overflow-ellipsis overflow-hidden
              "
            >
              {{ booking.area }}
            </p>
          </div>
          <p class="font-mulish text-xs w-3/12 xl:text-lg">
            {{ booking.name }}
          </p>
          <p class="font-mulish text-xs w-2/12 xl:text-lg">
            {{ localDate(booking.date) }}
          </p>
          <p class="font-mulish uppercase font-bold text-xs w-1/12 xl:text-sm">
            {{ booking.status }}
          </p>
        </div>
      </div>
    </div>
    <Modal v-if="isModalOpen" @closeModal="closeModal()">
      <div class="flex items-center space-x-4 h-full" v-if="modalData">
        <div class="w-1/2 h-3/4 overflow-auto">
          <img
            src="../../../assets/hokf-project-management.svg"
            alt=""
            srcset=""
          />
        </div>
        <div class="w-1/2 flex flex-col justify-center space-y-4">
          <div>
            <p class="font-bold font-mulish text-xl mb-2">
              Booking Information
            </p>
            <div class="flex space-x-2 mb-2">
              <p class="text-lg flex font-bold font-mulish">Area:</p>
              <p class="text-xl uppercase flex font-bold font-mulish">
                {{ modalData.area }}
              </p>
            </div>
            <div class="flex space-x-2 mb-2">
              <p class="text-sm flex font-bold font-mulish">Date:</p>
              <p class="text-sm uppercase flex font-bold font-mulish">
                {{ localDate(modalData.date) }}
              </p>
            </div>
            <div class="flex space-x-2 mb-2">
              <p class="text-sm flex font-bold font-mulish">Time:</p>
              <p class="text-sm uppercase flex font-bold font-mulish">
                {{ modalData.time }}
              </p>
            </div>
            <div class="flex space-x-2 mb-2">
              <p class="text-sm flex font-bold font-mulish">Duration:</p>
              <p class="text-sm uppercase flex font-bold font-mulish">
                {{ modalData.duration }}
              </p>
            </div>
            <div class="flex w-full space-x-2 mb-2">
              <p class="text-sm flex flex-initial font-bold font-mulish">
                Special Request:
              </p>
              <p class="text-sm overflow-hidden flex font-bold font-mulish">
                {{ modalData.request || "None" }}
              </p>
            </div>
          </div>
          <div>
            <div class="flex mb-2 justify-between">
              <p
                class="text-lg uppercase flex font-bold font-mulish"
                :class="{
                  'text-red-500': modalData.status == 'declined',
                  'text-green-500': modalData.status == 'approved',
                  'text-yellow-500': modalData.status == 'pending',
                }"
              >
                {{ modalData.status }}
              </p>
              <div class="flex space-x-4">
                <div
                  v-if="modalData.status == 'pending'"
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
                  @click="approveBooking()"
                >
                  <icon icon="akar-icons:double-check" />
                  <p class="text-xs">Approve</p>
                </div>
                <div
                  v-if="modalData.status == 'pending'"
                  class="
                    md:p-2
                    lg:px-4
                    lg:py-3
                    flex
                    items-center
                    space-x-2
                    bg-red-500
                    text-white
                    cursor-pointer
                  "
                  @click="declineBooking()"
                >
                  <icon icon="teenyicons:denied-outline" />
                  <p class="text-xs">Decline</p>
                </div>
              </div>
            </div>
            <p class="font-bold font-mulish text-xl mb-2">
              Customer Information
            </p>
            <p class="text-xl flex mb-2">
              {{ modalData.name }}
            </p>
            <a
              class="flex text-lg mb-2 items-center hover:text-purple-500"
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
        </div>
      </div>
    </Modal>
  </div>
</template>
<script src="./bookings.page.js"></script>
<style src="./bookings.page.scss" scoped lang="scss"></style>
