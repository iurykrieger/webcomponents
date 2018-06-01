import ejs from 'ejs/ejs';
import template from './template.ejs';
import style from './style.scss';

export default class EditableList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.linx = {
            style,
            template,
            data: {
                title: 'Iury',
                addItemText: 'IuryTmb'
            },
            initialized: false
        }
    }

    // fires after the element has been attached to the DOM
    connectedCallback() {
        this.init();
    }

    init() {
        const style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = this.linx.style;

        this.linx.style = style;
        this.linx.initialized = true;
        this.shadowRoot.appendChild(this.linx.style.cloneNode(true));
        this.shadowRoot.innerHTML = '';

        this.render();
        this.bind();
        this.registerEvents();
    }

    bind() {
        /*let removeElementButtons = [...this.shadowRoot.querySelectorAll('.editable-list-remove-item')];
        let addElementButton = this.shadowRoot.querySelector('.editable-list-add-item');

        this.itemList = this.shadowRoot.querySelector('.item-list');

        this.handleRemoveItemListeners(removeElementButtons);
        addElementButton.addEventListener('click', this.addListItem, false);
        
        this.addListItem = this.addListItem.bind(this);
        this.handleRemoveItemListeners = this.handleRemoveItemListeners.bind(this);
        this.removeListItem = this.removeListItem.bind(this);*/
    }

    render() {
        console.log(this.linx.template);
        console.log(this.linx.data);
        this.shadowRoot.innerHTML += ejs.render(this.linx.template, this.linx.data);
    }

    registerEvents() {

    }

    // add items to the list
    addListItem(e) {
        const textInput = this.shadowRoot.querySelector('.add-new-list-item-input');
        if (textInput.value) {
            const li = document.createElement('li');
            const button = document.createElement('button');
            const childrenLength = this.itemList.children.length;

            li.textContent = textInput.value;
            button.classList.add('editable-list-remove-item', 'icon');
            button.textContent = '\u2796';

            this.itemList.appendChild(li);
            this.itemList.children[childrenLength].appendChild(button);

            this.handleRemoveItemListeners([...this.itemList.children]);

            textInput.value = '';
        }
    }

    // gathering data from element attributes
    get title() {
        return this.getAttribute('title') || '';
    }

    get items() {
        const items = [];

        [...this.attributes].forEach(attr => {
            if (attr.name.includes('list-item')) {
                items.push(attr.value);
            }
        });

        return items;
    }

    get addItemText() {
        return this.getAttribute('add-item-text') || '';
    }

    handleRemoveItemListeners(arrayOfElements) {
        arrayOfElements.forEach(element => element.addEventListener('click', this.removeListItem, false));
    }

    removeListItem(e) {
        e.target.parentNode.remove();
    }
}