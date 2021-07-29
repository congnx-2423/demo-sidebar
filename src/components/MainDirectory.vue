<template>
  <div class="container">
    <div class="row header" >
      HEADER
    </div>
    <div class="row body">
      <div class="col-3 sidebar">
        SIDE BAR
        <ul id="demo" v-for="(item, index) in treeDataSorted" :key="index" :item="item">
          <sub-directory
            class="item"
            :item="item"
            :key="index"
            @markDir="markDir"
          ></sub-directory>
        </ul>
      </div>
      <div class="col-9">
        BODY
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import SubDirectory from './SubDirectory.vue';
import Item from "@/interface/Item";

export default defineComponent({
  name: 'MainDirectory',
  components: {
    SubDirectory,
  },
  data() {
    return {
      treeData: [
        {
          id: 1,
          name: "Folder B",
          children: [
            { id: 2, name: "B. 1", marked: false },
            { id: 3, name: "B. 2", marked: false },
            {
              id: 4,
              name: "B. 3",
              children: [
                { id: 5, name: "B. 3.1", marked: false },
                { id: 6, name: "B. 3.2", marked: false },
                { id: 7, name: "B. 3.3", marked: false },
              ],
              marked: false
            }
          ],
          marked: false
        },
        {
          id: 8,
          name: "Folder A",
          children: [
            { id: 9, name: "A. 1", marked: false },
            { id: 10, name: "A. 2", marked: false },
            {
              id: 11,
              name: "A. 3",
              children: [
                { id: 12, name: "A. 3.1", marked: false },
                { id: 13, name: "A. 3.2", marked: false },
                { id: 14, name: "A. 3.3", marked: false },
              ],
              marked: false
            }
          ],
          marked: true
        },
      ]
    }
  },
  computed: {
    treeDataSorted(): Array<Item> {
      return this.sortTree(this.treeData);
    }
  },
  methods: {
    sortTree(tree: Array<Item>): Array<Item> {
      tree.forEach(item => {
        if (item.children && item.children.length)
          item.children = this.sortTree(item.children);
      });
      return tree.sort((item1: Item, item2: Item) => {
        if(item1.marked === item2.marked)
          if(item1.name <= item2.name)
            return -1;
          else return 1;
        else
          if(item1.marked && !item2.marked)
            return -1;
          else return 1;
      });
    },
    iterator(tree: Array<Item>, id: number): void {
      tree.forEach(item => {
        if(item.id === id){
          item.marked = !item.marked;
          return;
        }
        if(item.children)
          this.iterator(item.children, id);
      })
    },
    markDir(itemId: number): void {
      this.iterator(this.treeData, itemId);
    }
  }
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
  margin-top: 1rem;
}
</style>
