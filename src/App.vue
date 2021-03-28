<template>
  <section class="main">
    <header>{{ title }}</header>
    <p v-if="successMessage">{{ successMessage }}</p>
    <add-word v-if="!successMessage" @add-word="addNewWord"></add-word>
    <auto-complete-input
      v-if="words.length && !successMessage"
      @reset-options="resetOptions"
      @get-options="getOptions"
      :options="options"
    ></auto-complete-input>
    <h1 v-if="!words.length">Dictionary is empty, add some word!</h1>
  </section>
</template>

<script>
import Trie from "./js/wordsClass.js";
import AddWord from "./components/AddWord.vue";
import AutoCompleteInput from "./components/AutoCompleteInput.vue";
export default {
  name: "App",
  components: {
    AddWord,
    AutoCompleteInput
  },
  data() {
    return {
      title: "Autocomplete field",
      newWord: "",
      findWord: "",
      dictionary: {},
      words: [],
      options: [],
      successMessage: ""
    };
  },
  mounted() {
    this.dictionary = new Trie();
  },
  methods: {
    addNewWord(value) {
      if (!this.words.includes(value)) {
        this.dictionary.addWord(value);
        this.words = this.dictionary.getWords();
        this.successMessage = "Added with success!";
      } else {
        this.successMessage = "Word already exist! Try another one.";
      }
    },
    resetOptions() {
      this.options = "";
    },
    getOptions(findWord) {
      console.log(findWord);
      this.options = this.dictionary.autoComplete(findWord);
    }
  },
  watch: {
    successMessage() {
      const that = this;
      setTimeout(function() {
        that.successMessage = "";
      }, 2000);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  box-sizing: border-box;
}
.main > header {
  font-size: 24px;
  margin: 20px
}

.main > h1{
  font-size: 16px
}
</style>
