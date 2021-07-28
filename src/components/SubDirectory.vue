<template>
  <li>
    <div class="main-folder"
      :class="{bold: isFolder}"
    >
      <div class="left">
        <span v-if="isFolder">
          <i class="fas fa-angle-down" style="font-size:20px" v-if="isOpen"></i>
          <i class="fas fa-angle-right" style="font-size:20px" v-else></i>
        </span>
        <i class="fa fa-folder folder" :class="{active: isOpen}"></i>
        <span style="margin-left: 15px" @click="toggle">{{ item.name }}</span>
      </div>
      <div class="right">
        <p v-if="item.children" v-show="isOpen" class="number" :class="{active: isOpen}">{{item.children.length}}</p>
        <i class="fa-star marked" :class="[item.marked ? 'fas' : 'far']" @click="markDir"></i>
      </div>
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
      type: Object as () => Item,
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
    const markDir = () => {
      // eslint-disable-next-line vue/no-mutating-props
      props.item.marked = !props.item.marked
    }

    return {
      toggle,
      markDir,
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
  display: flex;
  justify-content: space-between;
}

.main-folder .left, .right {
  display: flex;
  align-items: center;
}

.main-folder .right p{
  margin: 0;
  width: 20px;
  height: 20px;
  display: block;
  line-height: 20px;
  color: white;
  background: orange;
  text-align: center;
  border-radius: 10px;
  font-size: 11px;
}

ul {
  list-style-type: none;
}

.active {
  color: orange;
}

.marked {
  margin-left: 5px;
}

.fa-star.fas {
  color: orange;
}

.folder {
  font-size:20px;
  margin-left: 10px;
}
</style>
