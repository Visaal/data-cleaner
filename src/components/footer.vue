<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      class="terminal-icon"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path
        d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm8 10h6v2h-6v-2zm-3.333-3L5.838 9.172l1.415-1.415L11.495 12l-4.242 4.243-1.415-1.415L8.667 12z"
      />
    </svg>
    <!-- IMPORTANT: Have the key be the string value otherwise if using id or index the inner text will just be updated and css animation will not be applied -->
    <div
      v-for="message in actionMessages"
      :key="message"
      class="last-action-text"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Footer",
  data() {
    return {
      actionMessages: [],
    };
  },
  created() {
    this.actionMessages.push(this.lastActionText);
  },
  watch: {
    lastActionText: function() {
      this.actionMessages.splice(0, 1);
      this.actionMessages[0] = this.lastActionText;
    },
  },
  computed: {
    ...mapState(["lastActionText"]),
  },
};
</script>

<style>
.terminal-icon {
  vertical-align: middle;
  fill: var(--field-label);
}

.last-action-text {
  padding-left: 0.3rem;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  max-width: 90%;
}

/* Animation */
.last-action-text {
  animation: animated-text 2s steps(300, end) 1s 1 normal backwards;
}

/* text animation */
@keyframes animated-text {
  from {
    width: 0;
  }
  to {
    width: 90%;
  }
}
</style>
