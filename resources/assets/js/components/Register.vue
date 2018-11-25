<template>
  <div>
    <form method="post">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" class="form-control" placeholder="user@example.com" required>
        </div>
        <div class="form-group" v-bind:class="{ 'has-error': error && errors.password }">
            <label for="password">Password</label>
            <input type="password" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
    </form>
  </div>
</template>