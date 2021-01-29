<template>
  <div>
    <span>
      <button @click="btnClickedHandler()">Click me!</button>
    </span>
  </div>
</template>
<script>

export default {
  name: 'BtnCellRenderer',
  methods: {
    btnClickedHandler() {
      this.params.clicked(this.params.value);
    }
  },
};
</script>
