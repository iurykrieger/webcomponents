import EditableList from './components/editable-list';

window.addEventListener('WebComponentsReady', () => {
    try {
        customElements.define('editable-list', EditableList);
        
        const editableList = new EditableList();
        document.body.appendChild(editableList);
    } catch (err) {
        console.error(`Error defining linx-banner component: ${err}`);
    }
});