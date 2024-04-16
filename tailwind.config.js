/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  separator: '__',
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // 兼容小程序，将带有 * 选择器的插件禁用
    preflight: false,
    space: false,
    divideColor: false,
    divideOpacity: false,
    divideStyle: false,
    divideWidth: false,
  },
}
