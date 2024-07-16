import { computed } from 'vue';
import { useStore } from 'vuex';

export function composableRecentSearchHistory() {
  const store = useStore();
  const searchHistoryArr = computed(() => {
    return store.getters.getSearchHistoryArr;
  });

  // 새로운 아이템 추가
  function addHistory(newItem) {
    newItem = newItem.replace(/\s+/g, '');
    if (newItem && !searchHistoryArr.value.includes(newItem)) {
      store.dispatch('ADDHISTORY', newItem);
    }
  }

  // 선택 아이템 1개 삭제
  function deleteHistory(deleteItem) {
    store.commit('DELETEHISTORY', deleteItem);
  }

  // 전체 삭제
  function clearHistory() {
    store.commit('CLEARHISTORY');
  }

  return {
    addHistory,
    deleteHistory,
    clearHistory,
    searchHistoryArr,
  };
}
