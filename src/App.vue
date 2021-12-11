<template>
  <form>
    <label>{{ t('language') }}</label>
    <select v-model="locale">
      <option value="en">en</option>
      <option value="ja">ja</option>
    </select>
  </form>
  <h1>{{ t('hello') }}</h1>
  <button @click="inc">{{ t('inc', { count }) }}</button>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class App extends Vue {
  private count: number = 0;
  private locale: string = 'ja';

  private inc() {
    this.count++;
  }

  private t(key: string, formatData: Record<string, unknown>) {
    return this.$t ? this.$t(key, formatData) : '';
  }
}
</script>

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>

<i18n>
{
  "en": {
    "language": "Language",
    "hello": "Hello Vue 3!",
    "inc": "Clicked {count} times."
  },
  "ja": {
    "language": "言語",
    "hello": "こんにちは Vue 3！",
    "inc": "{count} 回クリックされました。"
  }
}
</i18n>
