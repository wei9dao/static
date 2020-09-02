
Vue.component("ImgLoader",{
  props: {
    background: {type: Boolean, default: false},
    src: {type: String, default: ''},
    className: {type: String, default: ''}
  },
  template: `<img :src="base64Image">`,
  data:  function() {
    return {
      domain: 'http://ac.wet8955.cn/',
      base64Image: null,
      native: new XMLHttpRequest()
    }
  },
  methods: {
    imgLoader() {
      if (this.src.length === 0) return

      var srcReplace = this.src.replace('images/', 'images_base64/')
      srcReplace = srcReplace.split('.')[0] + '.txt'
      var e = this.native
      e.open('GET', this.domain + srcReplace, true);
      e.timeout = 0;
      e.setRequestHeader('Content-Security-Policy', 'upgrade-insecure-requests')
      e.responseType = 'text';
      e.onload = () =>{
        if (e.readyState === 4 && e.status === 200) {
          this.base64Image = e.responseText
        }
      }
      e.send()
    },
    destroyed() {
      this.native.abort()
    }
  },
  created: function () {
    console.info(this.src)
    this.imgLoader()
  },
});
