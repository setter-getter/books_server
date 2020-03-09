import Mn from 'backbone.marionette'
import ContentTemplate from './template/content.hbs'
import {BooksView} from "../library/index"
import {DescriptionView} from "../description"


export class ContentView extends Mn.View {
    constructor() {
        super({
            className: 'content_container_view',
            template: ContentTemplate,
            regions: {
                content: '.content'
            },
            childViewEvents: {
                'clickBook2': 'clickBook3',
                'closeDescription': 'closeDescription'
            }
        });
        this._views = {
            book_lib: BooksView,
            book_desc: DescriptionView
        }
    }

    closeDescription() {
        this.openView('book_lib')
    }

    clickBook3(options){
        this.openView('book_desc', options)
    }

    openView(choice, options={}){
        let _class = this._views[choice];
        this.showChildView('content', new _class(options));
    }
}