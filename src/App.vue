<template>
  <img src="./logo.png">
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

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  setup() {
    const { t, locale } = useI18n({})
    const count = ref(0)
    const inc = () => {
      count.value++
    }

    return {
      count,
      inc,
      t,
      locale
    }
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
