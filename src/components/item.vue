<template>
  <main>
    <header>
      <a :href="item.url" target="_blank" class="logo">
        <img class="p-t-sm" src="hn-logo.png" width="30">
      </a>
    </header>
    <div class="container p-x-0">
      <div class="row">
        <div class="col-sm-12">
          <div class="section item">
            <a :href="item.url" target="_blank"><h2> {{ item.title || 'Loading item...' }}</h2></a>
            <p v-if="item.title" class="text-muted"><span>{{ `${item.score || 0} points` }}</span> | <span class="">{{ `by ${item.by || 'N/A'}` }}</span> | <span class="">{{ `${item.kids ? item.kids.length || '0' : '0'} comments` }}</span> | <span>{{ `${this.timeSince(item.time)}` }}</span></p>
          </div>
          <comment
            v-if="comments && comments.length"
            v-for="commentId in comments"
            :commentId="commentId"
            :key="commentId"
          ></comment>
          <div class="section" v-else>
            <p>No Comments.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Comment from './comment.vue'

export default {
  name: 'item',
  components: {
    'comment': Comment
  },
  data () {
    return {
      topStoriesLink: 'https://hacker-news.firebaseio.com/v0/topstories.json',
      topStories: [],
      itemLink: 'https://hacker-news.firebaseio.com/v0/item/',
      item: {}
    }
  },
  mounted() {
    this.getItems()
  },
  computed: {
    comments() {
      return this.item.kids || []
    }
  },
  methods: {
    getItems() {
      this.$http.get(this.topStoriesLink).then(function(response){
        this.topStories = response.data;
      }, function(error){
        console.log(error.statusText);
      });
    },
    getItem(itemNumber) {
      this.itemLink += `${itemNumber}.json`
      this.$http.get(this.itemLink).then(function(response){
        console.log("response", response);
        this.item = response.data;
      }, function(error){
        console.log(error.statusText);
      });
    },
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
    getRandomNumnber(max) {
      let min = 0;
      return Math.floor(Math.random() * max) + min
    }
  },
  watch: {
    topStories: function (stories) {
      console.log("stories", stories)
      let randomNumber = this.getRandomNumnber(stories.length - 1)
      console.log("randomNumber", randomNumber);
      this.getItem(stories[randomNumber])
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  background: #ddd;
}

header button, header [type="button"], header a.button, header label.button, header .button, header a[role="button"], header label[role="button"], header [role="button"] {
    background: rgba(0,0,0,0);
    color: #fff;
    font-weight: 500;
}

a {
  color: #333;
  text-decoration: none;
}

.p-t-sm {
  padding-top: 0.4rem;
}

.p-x-0 {
  padding-left: 0;
  padding-right: 0;
}

.section.item {
  background: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
}

.text-muted {
  color: #aaa;
}
</style>
