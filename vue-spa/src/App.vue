<template>
  <div id="app">
    <header>
      <h1>TapToBook</h1>
      <h3>Offers view</h3>
      <br><br>
    </header>
    <main>
      <aside class="sidebar" v-if='device != "smallMobile"' :style="{width: bigSidebar?'100px':'50px'}">
      </aside>
      <div class="content">
        <router-view></router-view>
        <div class="footer" v-if='device != "smallMobile"' :style="{width: bigSidebar?'calc(100% - 152px)':'calc(100% - 102px)'}">
          <!-- <p>This is a poorly aligned footer that will never ever go away</p> -->
          <br><br><br>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2C3E50;
  margin-top: 60px;
}

aside.sidebar {
  height: 100%;
  display: inline-block;
  border-right: 1px solid #FF9502;
  position: fixed;
  top: 0;
  left: 0;
  padding: 30px;
  line-height: 5.0;
}

div.footer {
  border-top: 1px solid #FF9502;
  float: right;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #EF6F00;
}
a:hover {
  color: #FFAF00;
  cursor: pointer;
}

img {
  width: 50%;
}
img.small {
  width: 30%;
}
</style>

<script>
export default {
  data() {
    return {
      windowWidth: "",
      device: "pc",
      bigSidebar: true
    }
  },

  methods: {
    getSize: function() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth < 1000) {
        if (this.windowWidth < 670) {this.device = "smallMobile";}
        else {this.device = "bigMobile";}
      } else {this.device = "pc";}
      if (this.device == "bigMobile") {this.bigSidebar = false;}
      else {this.bigSidebar = true;}
    }
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.getSize()
      });
    })
  },

  created: function() {
    this.getSize();
  }
}
</script>
