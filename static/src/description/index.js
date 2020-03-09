import  Mn from 'backbone.marionette'
import DescTemplate from './template/description.hbs'


export class DescriptionView extends Mn.View{
    constructor(options) {
        super({
            model: options.model,
            className: 'description_book',
            template: DescTemplate,
            events: {
                'click .button-redaction': 'openRedaction',
                'click .button-delete': 'openDelete'
            }
        });
    }

    templateContext() {
        return {
            author: this.model.get('author'),
            title: this.model.get('title'),
            description_book: this.model.get('description'),
        }
    }
    openRedaction() {
        $.blockUI({
            message: `<ul class="blockUI-form" >
                       <li><input class="form author" placeholder="Автор" value="${this.model.get("author")}"/></li>
                       <li><input class="form title" placeholder="Название" value="${this.model.get("title")}"/></li>
                       <li><textarea class="form form__description description">${this.model.get("description")}</textarea></li>
                       <button class="exit">Назад</button>
                       <button class="button_redaction">Сохранить</button>
                       </ul>`
        });
        $('.exit').click(() => {
            $.unblockUI()
        });
        $('.button_redaction').click(() => {
            this.model.set('author', $('.author').val());
            this.model.set('title', $('.title').val());
            this.model.set('description', $('.description').val());
            this.model.save(null, {
                url: this.model.url().endsWith('/') ? this.model.url() : this.model.url() + '/',
                patch: true,
                success: () => {
                    $.unblockUI();
                    this.render();
                },
                error: (e) => console.log(e)
            });
        })
    }

    openDelete(){
        $.blockUI({
            message: `<h4>Удалить книгу?</h4><ul class="delete-form">             
                       <li class="delete-form__item"><button class="delete-book">Да</button></li>
                       <li class="delete-form__item"><button class="not-delete">Нет</button></li>
                       </ul>`
        });
        $('.delete-book').click(() => {
            this.model.destroy({
                 success: () => {
                     $.unblockUI();
                    this.trigger('closeDescription')
                 },
                 error: (e) => console.log(e)
            });
        });
        $('.not-delete').click(() => {
            $.unblockUI();
        })
    }
}