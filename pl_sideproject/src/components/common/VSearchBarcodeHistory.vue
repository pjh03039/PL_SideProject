<template>
  <v-container>
    <v-sheet class="mx-auto" v-if="searchHistoryArr.length">
      <v-slide-group show-arrows>
        <v-slide-group-item
          v-for="searchBarcode in searchHistoryArr"
          :key="searchBarcode"
        >
          <v-btn class="ma-1" size="small" @click="researchItem(searchBarcode)">
            <span>{{ searchBarcode }}</span>
            <v-icon
              class="ml-2 hover-grey"
              @click.stop="deleteHistory(searchBarcode)"
              >mdi-close</v-icon
            >
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
      <div class="text-right">
        <v-btn
          size="small"
          variant="plain"
          class="underline"
          @click.stop="clearHistory"
        >
          전체 삭제
        </v-btn>
      </div>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { composableRecentSearchHistory } from '@/hooks/composableRecentSearchHistory.js';
import { defineEmits } from 'vue';

const emit = defineEmits(['research-item']);

let { deleteHistory, clearHistory, searchHistoryArr } =
  composableRecentSearchHistory();

const researchItem = searchBarcode => {
  emit('research-item', searchBarcode);
};
</script>

<style>
.hover-grey {
  transition: background-color 0.3s ease;
}
.hover-grey:hover {
  background-color: rgb(146, 146, 146);
}
.text-right {
  text-align: right;
}
.underline {
  text-decoration: underline;
}
</style>
