<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      config: this.initNum(0, "个", {
        fontSize: 40,
      }),
    };
  },
  methods: {
    initNum(number, type = "", style = {}) {
      return {
        number: [number],
        content: "{nt}" + type,
        style,
        formatter: (number) => {
          const numbers = number.toString().split("").reverse();
          const segs = [];

          while (numbers.length) segs.push(numbers.splice(0, 3).join(""));

          return segs.join(",").split("").reverse().join("");
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>