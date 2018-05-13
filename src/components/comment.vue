<template>
  <div class="section">
    <p v-if="comment.text" class="text-muted"><span>{{ `by ${comment.by}` }}</span> | <span>{{ `${this.timeSince(comment.time)}` }}</span></p>
    <p v-html="comment.text || 'Loading comment...'"></p>
  </div>
</template>

<script>
export default {
  name: 'comment',
  data () {
    return {
      commentLink: 'https://hacker-news.firebaseio.com/v0/item/',
      comment: {}
    }
  },
  props: {
    commentId: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.getComment()
  },
  methods: {
    timeSince(date) {
      date *= 1000;

      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    },
    getComment() {
      this.commentLink += `${this.commentId}.json`
      console.log("this.commentLink", this.commentLink);
      this.$http.get(this.commentLink).then(function(response){
        console.log("response", response);
        this.comment = response.data;
      }, function(error){
        console.log(error.statusText);
      });
    }
  },
}
</script>

<style lang="scss" scoped>
.p-t-sm {
  padding-top: 0.4rem;
}

.p-x-0 {
  padding-left: 0;
  padding-right: 0;
}

.section {
  background: #fff;
  padding: 1rem;
}

.text-muted {
  color: #aaa;
}
</style>
