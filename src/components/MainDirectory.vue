<template>
  <div class="container">
    <div class="row header" >
      HEADER
    </div>
    <div class="row body">
      <div class="col-3 sidebar">
        SIDE BAR
        <ul id="demo" v-for="(item, index) in treeData" :key="index" :item="item">
          <sub-directory
            class="item"
            :item="item"
            :key="index"
          ></sub-directory>
        </ul>
      </div>
      <div class="col-9">
        BODY
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import SubDirectory from './SubDirectory';
export default defineComponent({
  name: 'MainDirectory',
  components: {
    SubDirectory,
  },
  data() {
    return {
      treeData: [
        {
          name: "Folder A",
          children: [
            { name: "A. 1", marked: false },
            { name: "A. 2", marked: false },
            {
              name: "A. 3",
              children: [
                { name: "A. 3.1", marked: false },
                { name: "A. 3.2", marked: false },
                { name: "A. 3.3", marked: false },
              ],
              marked: false
            }
          ],
          marked: false
        },
        {
          name: "Folder B",
          children: [
            { name: "B. 1", marked: false },
            { name: "B. 2", marked: false },
            {
              name: "B. 3",
              children: [
                { name: "B. 3.1", marked: false },
                { name: "B. 3.2", marked: false },
                { name: "B. 3.3", marked: false },
              ],
              marked: false
            }
          ],
          marked: false
        },
      ]
    }
  },
});
</script>

<style scoped>
body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
  height: 100%;
}
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}

.header {
  background-color: beige;
  height: 50px;
}

.sidebar {
  background-color: aliceblue;
  height: 700px;
  overflow-y: scroll;
}

.container {
  min-height: 100vh;
  height: 100%;
}

.body {
  min-height: 100vh;
  height: 100%;
}

ul {
  list-style-type: none;
}
</style>