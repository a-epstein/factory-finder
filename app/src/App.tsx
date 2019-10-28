import { Component, Prop, Vue } from 'vue-property-decorator';

import '@/styles/app.scss'

@Component
export default class App extends Vue {

  private async created() {
    
  }
  private render(h: any) {
    return (
      <div id='app'>
        <router-view/>
      </div>
    );
  }
}
