export default {
  methods: {
    wait (second: number, func = (): void => {}) {
      return setTimeout(() => func(), second * 1000)
    },
  }
}