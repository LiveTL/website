<template>
  <div class="sign-in-error">
    <v-container>
      <v-row align="center" justify="center">
        <v-col md="8">
          <h2 class="error--text">Sorry, there seems to have been an error while trying to get information about your
            YouTube channel. Please make sure that there is a channel associated with your account, and that you allowed
            LiveTL Web read access you your YouTube Channel.</h2>

          <br/>

          <h3>We only use this access to get your channel ID. If you're curious, you can view the source on <a
            href="https://github.com/GrumpyBear57/LiveTl-web" target="_blank">GitHub</a>.<br/>

            In the future, we may remove the requirement of linking a YouTube account, but for now since this is
            intended for translators posting messages in a YouTube chat, we require it to ensure you're a valid user.
          </h3>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'SignInError'
};
</script>
