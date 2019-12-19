module.exports = {
  info() {
    console.info.apply(console, arguments)
  },
  error() {
    console.error.apply(console, arguments)
  },
}
