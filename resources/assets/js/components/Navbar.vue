<template>
  <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
      <ul class="navbar-nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link :to="{name:'test'}" class="nav-link" >Spa-Page</router-link>
          <router-link :to="{name:'register'}" class="nav-link" >Sign up</router-link>
          <router-link :to="{name:'login'}" class="nav-link" >Sign in</router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

