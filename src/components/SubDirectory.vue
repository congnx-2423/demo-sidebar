<template>
  <li>
    <div class="main-folder"
      :class="{bold: isFolder}"
    >
      <span v-if="isFolder">
        <i class="fas fa-angle-down" style="font-size:20px" v-if="isOpen"></i>
        <i class="fas fa-angle-right" style="font-size:20px" v-else></i>
      </span>
      <i class="fa fa-folder folder" :class="{active: isOpen}"></i>
      <span style="margin-left: 15px" @click="toggle">{{ item.name }}</span>
      <span v-if="item.children" class="number" :class="{active: isOpen}">{{item.children.length}}</span>
      <i class="fa-star marked" :class="[item.marked ? 'fas' : 'far']"></i>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <sub-directory
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
      ></sub-directory>
    </ul>
  </li>
</template>

<script lang="ts">
import {defineComponent, computed, ref} from 'vue'
import Item from "@/interface/Item";

export default defineComponent({
  name: 'SubDirectory',
  props: {
    item: {
      type: Item,
      required: true,
    },
    key: Number,
    index: Number,
  },
  setup(props) {
    const isOpen = ref(false);
    const isFolder = computed(() => {
      return props.item.children && props.item.children.length
    });
    const toggle = () => {
      if (isFolder.value) {
        isOpen.value = !isOpen.value;
      }
    };

    return {
      toggle,
      isFolder,
      isOpen
    };
  },
})
</script>

<style scoped>
.main-folder {
  background-color: gainsboro;
  line-height: 50px;
  padding: 10px;
}

ul {
  list-style-type: none;
}

.active {
  color: orange;
}

.number {
  margin-left: 90px;
}
.marked {
  margin-left: 10px;
}

.fa-star.fas {
  color: orange;
}

.folder {
  font-size:20px;
  margin-left: 10px;
}
</style>