<template>
  <div
    id="login"
    class="
      hidden
      md:flex
      flex-col
      justify-center
      items-center
      h-screen
      bg-dark-grey
    "
  >
    <div class="flex flex-col space-y-4 p-8 md:w-1/2 lg:w-1/4 bg-white" data-aos="fade-up">
      <div class="logo w-20 mx-auto cursor-pointer">
        <img
          src="../../../assets/logo.png"
          alt="HOKF Logo"
        />
      </div>
      <Input
        :label="'Email'"
        :modelValue="loginFormGroup"
        :field="'email'"
        :placeholder="'Enter your email'"
        :type="'email'"
      />
      <Input
        :label="'Password'"
        :modelValue="loginFormGroup"
        :field="'password'"
        :placeholder="'Enter your password'"
        :type="'password'"
      />
      <button
        @click="login()"
        class="
          px-4
          cursor-pointer
          py-3
          text-center text-white
          font-inter font-bold
          text-lg
          bg-dark-grey
        "
      >
        Login
      </button>
    </div>
  </div>
</template>

<script src="./login.page.js"></script>
<style src="./login.page.scss" scoped lang="scss"></style>