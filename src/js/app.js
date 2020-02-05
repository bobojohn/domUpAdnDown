const rootEl = document.getElementById('root');

rootEl.innerHTML = `
<form data-id="purchase-add-form" >
<label for="inp_amount" class="labl">Сумма: </label>
<input type="text" id="inp_amount" data-id="purchase-input-amount" class="inp"/>
<label for="inp_category" class="labl">Категория:</label>
<input type="text" id="inp_category" data-id="purchase-input-category" class="inp" />
<button class="btn" data-action="purchase-add">Добавить</button>
</form>
<ul data-id="purchases-list" class="purchases-list"></ul>
<div data-id="purchases-total" class="purchases-total">Общая сумма: 0</div>
<button data-action="purchase-dalete-all" class="btn"> dalete</button>
`
const purchaseAddFormEl = rootEl.querySelector('[data-id=purchase-add-form]');
const purchaseInputAmountEl = purchaseAddFormEl.querySelector('[data-id=purchase-input-amount]');
const purchaseInputCategoryEl = purchaseAddFormEl.querySelector('[data-id=purchase-input-category]');
const purchaseAddButtonEl = purchaseAddFormEl.querySelector('[data-action=purchase-add]');
const purchasesListEl = rootEl.querySelector('[data-id=purchases-list]');
const daleteAllEl = rootEl.querySelector('[data-action=purchase-dalete-all]')


let purchasesTotal = 0;
const purchasesTotalEl = rootEl.querySelector('[data-id=purchases-total]');


purchaseAddButtonEl.onclick = evt => {


    evt.preventDefault();
    if(purchaseInputAmountEl.value ==""){return}

    const value = purchaseInputAmountEl.value;
    purchasesTotal += parseInt(value, 10);

    const category = purchaseInputCategoryEl.value;

    purchasesTotalEl.textContent = `Сумма: ${purchasesTotal}`;

    const purchaseEl = document.createElement('li')
    purchaseEl.innerHTML = `
    
    <div class="blockButton">
    <span>Покупка на сумму ${value}, в категории ${category}</span>
        <button data-action="up" class="btn__li">↑</button>
        <button data-action="down" class="btn__li">↓</button>
        <button data-action="remove" class="btn__li btn_color">x</button> 
    </div>
    `;

    const purchaseRemoveButtonE1 = purchaseEl.querySelector('[data-action=remove]');
    purchaseRemoveButtonE1.onclick = () => {
        purchaseEl.remove();
        purchasesTotal -= value;
        purchasesTotalEl.textContent = `Сумма: ${purchasesTotal}`;
    }

    const purchaseUpButtonEl = purchaseEl.querySelector('[data-action=up]');
    purchaseUpButtonEl.onclick = () => {
        if (purchaseEl == purchasesListEl.firstElementChild) {
            purchasesListEl.insertBefore(purchaseEl, null);
        } else {
            purchasesListEl.insertBefore(purchaseEl, purchaseEl.previousElementSibling);
        }
    }
    const purchaseDownButtonEl = purchaseEl.querySelector('[data-action=down]');
    purchaseDownButtonEl.onclick = () => {
        if (purchaseEl == purchasesListEl.lastElementChild) {
            purchasesListEl.insertBefore(purchaseEl, purchasesListEl.firstElementChild)
        } else {
            purchasesListEl.insertBefore(purchaseEl.nextElementSibling, purchaseEl);

        }
    }
    daleteAllEl.onclick = () =>{
        rootEl.innerHTML = `
<form data-id="purchase-add-form" >
<label for="inp_amount" class="labl">Сумма: </label>
<input type="text" id="inp_amount" data-id="purchase-input-amount" class="inp"/>
<label for="inp_category" class="labl">Категория:</label>
<input type="text" id="inp_category" data-id="purchase-input-category" class="inp" />
<button class="btn" data-action="purchase-add">Добавить</button>
</form>
<ul data-id="purchases-list" class="purchases-list"></ul>
<div data-id="purchases-total" class="purchases-total">Общая сумма: 0</div>
<button data-action="purchase-dalete-all"> dalete</button>
`
    }


    purchasesListEl.insertBefore(purchaseEl, purchasesListEl.firstElementChild);

    purchaseInputAmountEl.value = '';
    purchaseInputCategoryEl.value = '';
    purchaseInputAmountEl.focus();
};
