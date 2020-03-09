import Mn from 'backbone.marionette'
import ViewTemlate from './template/main.hbs'
import {ContentView} from '../content/index'
import {MenuView} from "../menu/index"




export class View_ extends Mn.View {
    constructor() {
        super({
            tagName: 'p',
            className: 'container_view',
            template: ViewTemlate,
            regions: {
                menu: '.container_1',
                content_space: '.container_2'
            },
            childViewTriggers: {
                'openLib': 'showBook',
                'openMain': 'Render',
            },
        });
    }


    onRender() {
        this.showChildView('menu', new MenuView());
        this.showChildView('content_space', new ContentView());
        this.onShowBook();
    }

    onShowBook() {
        let _view = this.getChildView('content_space');
         _view.openView('book_lib')
    }
}