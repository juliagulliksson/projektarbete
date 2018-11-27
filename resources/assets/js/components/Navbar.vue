<template>
  <!-- <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
      <ul class="navbar-nav">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link :to="{name:'test'}" class="nav-link" >Spa-Page</router-link>
          <router-link :to="{name:'register'}" class="nav-link" >Sign up</router-link>
          <router-link :to="{name:'login'}" class="nav-link" >Sign in</router-link>
      </ul>
    </div>
  </nav> -->

<nav class="navbar navbar-default navbar-static-top">
  <div class="container">
      <div class="navbar-header">

          <!-- Collapsed Hamburger -->
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
              <span class="sr-only">Toggle Navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
          </button>
          <i class="fas fa-search"></i>
          <!-- Branding Image -->
          <li class="navbar-brand">
             <router-link to="/" class="nav-link">Home</router-link>
          </li>
          
      </div>

      <div class="collapse navbar-collapse" id="app-navbar-collapse">
          <!-- Left Side Of Navbar -->
          <ul class="nav navbar-nav">
              
              &nbsp;
          </ul>

          <!-- Right Side Of Navbar -->
          <ul class="nav navbar-nav navbar-right">
              <!-- Authentication  -->
                  <template v-if="!loggedIn">
                    <li><router-link :to="{name:'register'}" class="nav-link" >Sign up</router-link></li>
                    <li><router-link :to="{name:'login'}" class="nav-link" >Sign in</router-link></li>
                  </template>
                  <template v-else>
                  <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true" v-pre>
                          Username <span class="caret"></span>
                      </a>

                      <ul class="dropdown-menu">
                          <li>
                            <router-link :to="{name:'logout'}" class="nav-link" >Logout</router-link>
                          
                          </li>
                      </ul>
                  </li>
                  </template>
          </ul>
      </div>
  </div>
</nav>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  }
};
</script>

