<template>
  <form autocomplete="off" @submit.prevent="addNewWord">
    <div class="autocomplete" style="width:300px;">
      <input id="newWord" type="text" placeholder="New Word" v-model="newWord" />
    </div>
    <input type="submit" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      newWord: ""
    };
  },
  methods: {
    addNewWord() {
      this.$emit("add-word", this.newWord);
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
form {
  margin: 10px;
}
.autocomplete {
  position: relative;
  display: inline-block;
}

input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
}

input[type="text"] {
  background-color: #f1f1f1;
  width: 100%;
}

input[type="submit"] {
  background-color: DodgerBlue;
  color: #fff;
  cursor: pointer;
}
</style>
