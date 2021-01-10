<template>
  <div class="faq">
    <v-container>
      <v-row>
        <v-col md="6" offset-md="2">
          <h1>Frequently Asked Questions</h1>
        </v-col>
      </v-row>

      <!-- I *was* going to generate this based of an array of FAQ items, but since I want to do formatting in the text,
       I decided to not do that as I dislike using v-html (which just sets el.innerHTML) because of security concerns -->
      <v-row>
        <v-col md="6" offset-md="2">
          <h3>How does LiveTL work?</h3>
          <p>
            LiveTL is, at its core, just a <i><b>chat filter for YouTube streams</b></i>. <b class="error--text">LiveTL
            does not automatically translate streams</b> – instead, it picks up translations found in the chat. This
            helps foreign viewers better catch translations that other viewers are providing in the YouTube Live Chat.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="6" offset-md="2">
          <h3>I opened my stream with LiveTL but it isn’t loading?</h3>
          <p>
            The chat may be temporarily unavailable. LiveTL will only load if the stream has a valid Live Chat or Chat
            Replay.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="6" offset-md="2">
          <h3>I don’t see any translations in the translations panel?</h3>
          <p>
            If there are no translators in chat, LiveTL is unable to display translations. Any messages properly tagged
            with a language code (ex. <code>[en] &lt;translation&gt;</code>, <code>ESP: &lt;translation&gt;</code>,
            etc.) will appear when they appear in chat.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="6" offset-md="2">
          <h3>A translator is using their own style of language tags, how do I make them show?</h3>
          <p>
            You can manually select additional users to filter in the settings.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'FAQ'
};
</script>
