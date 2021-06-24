<template>
  <div>
   我是数据：{{ json }}
   <br/>
    <input type="text" v-model="jsonText" @change="generate"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      json: [],
      jsonText: "",
    };
  },
  methods: {
    generate() {
      let arr = this.jsonText.split(",");
      arr.forEach((item, index) => {
        let obj = {
          value: index,
          label: item,
        };
        this.json.push(obj);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>