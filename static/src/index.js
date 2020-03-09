import Mn from 'backbone.marionette'
import {View_} from './mainView/index.js'
import './styles.css'


class  App extends Mn.Application{
    onStart(){
        this.showView( new View_())
    }
}

window.app = new App({region: '#main'});

$(() => {
    window.app.start()
});


