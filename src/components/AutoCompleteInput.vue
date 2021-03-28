<template>
  <form autocomplete="off" @submit.prevent>
    <div class="autocomplete" style="width:372px;">
      <input
        id="findWord"
        type="text"
        placeholder="Autocomplete"
        v-model="findWord"
        @input="getOptions"
      />
      <div v-if="options.length" class="autocomplete-items">
        <div
          @click="selectWord(word)"
          v-for="word in options"
          :key="word"
          class="autocomplete-result"
        >{{ word }}</div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: ["options"],
  data() {
    return {
      findWord: ""
    };
  },
  methods: {
    selectWord(word) {
      this.findWord = word;
      this.$emit("reset-options");
    },
    getOptions() {
      this.$emit("get-options", this.findWord);
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

form{
    margin: 10px;
}

body {
  font: 16px Arial;
}

/*the container must be positioned relative:*/
.autocomplete {
  position: relative;
  display: inline-block;
}

input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
  background-color: #f1f1f1;
  width: 100%;
}

.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
}

.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}

/*when hovering an item:*/
.autocomplete-items div:hover {
  background-color: #e9e9e9;
}
</style>