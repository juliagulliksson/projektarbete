<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <!-- Collapsed Hamburger -->
        <button
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#app-navbar-collapse"
          aria-expanded="false"
        >
          <span class="sr-only">Toggle Navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <!-- Branding Image -->
        <li class="navbar-brand">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
      </div>

      <div class="collapse navbar-collapse" id="app-navbar-collapse">
        <!-- Left Side Of Navbar -->
        <ul class="nav navbar-nav">&nbsp;
          <!--  <i class="fas fa-search"></i> -->
          <!-- <li>
            <router-link :to="{name: 'questions'}">Questions</router-link>
          </li>
          <li>
            <router-link :to="{name: 'answers'}">Answers</router-link>
          </li>-->
        </ul>

        <!-- Right Side Of Navbar -->
        <ul class="nav navbar-nav navbar-right">
          <!-- <li>
            <form>
              <div class="grid">
                <div class="col-6">
                  <div class="form-group">
                    <input type="text" class="form-control">
                  </div>
                </div>
                <div class="col-6">
                  <button type="submit" class="btn btn-default">Search</button>
                </div>
              </div>
            </form>
          </li>-->
          <!-- Authentication  -->
          <template v-if="!isAuthenticated">
            <li>
              <router-link :to="{name:'register'}" class="nav-link">
                Sign up
                <i class="fas fa-user-plus"></i>
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'login'}" class="nav-link">
                Sign in
                <i class="fas fa-sign-in-alt"></i>
              </router-link>
            </li>
          </template>
          <template v-else>
            <li class="dropdown">
              <a
                href="#"
                class="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <i class="fas fa-user-circle"></i>
                {{ user.name }}
                <span class="caret"></span>
              </a>

              <ul class="dropdown-menu">
                <li>
                  <router-link :to="{name:'dashboard'}" class="nav-link">
                    Profile
                    <i class="fas fa-columns"></i>
                  </router-link>
                  <router-link :to="{name:'logout'}" class="nav-link">
                    Sign out
                    <i class="fas fa-sign-out-alt"></i>
                  </router-link>
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
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

