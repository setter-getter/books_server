import Mn from 'backbone.marionette'
import Bb from 'backbone'
import MenuTemplate from './template/menu.hbs'


export class MenuView extends Mn.View {
    constructor() {
        super({
            className: 'menu_container_view',
            template: MenuTemplate,
            triggers: {
                'click .library': 'openLib',
            },
            events: {
                'click #add-book': 'openAddBook',
                'click .search': 'clickSearch'
            }
        });
    }

    clickSearch() {
        this.trigger('search', {
            text: $('.search-line').val()
        })
    }

    openAddBook() {
        $.blockUI({
            message: `<ul class="blockUI-form" >
                       <li><input class="form author-add" placeholder="Автор"/></li>
                       <li><input class="form title-add" placeholder="Название"/></li>
                       <li><textarea class="form form__description description-add"></textarea></li>
                       <button class="exit-add">Назад</button>
                       <button class="save-book">Сохранить</button>
                       </ul>`
        });
        $('.save-book').click(() => {
            this.model = new BookAdd();
            this.model.set('author', $('.author-add').val());
            this.model.set('title', $('.title-add').val());
            this.model.set('description', $('.description-add').val());
            this.model.save(null, {
                url: this.model.url() + '/',
                post: true,
                success: () => {
                    this.trigger('addModel', this.model);
                    $.unblockUI();
                },
                error: (e) => console.log(e)
            });
        });
        $('.exit-add').click(() => {
            $.unblockUI()
        })
    }
}

class BookAdd extends Bb.Model{
    url(){
        if(this.get('id')) {
            return 'book/books/' + this.get('id') + '/'
        }
        return 'book/books'
    }
}