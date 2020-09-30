'use strict';

//get data

function getData() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((data) => {
            createTable(data);
            userDetailedInfo(data);
            sortUser(data);
        })
        .catch();
}
getData();


//create Table

function createTable(data) {

    const parent = document.querySelector('.table-body');
    parent.innerHTML = '';

    data.forEach(({id, name, username, email, website}) => {
        const row = document.createElement('tr');
        row.className = 'user';
        row.setAttribute('id', `${id}`);
        row.innerHTML = `<td  class="table-head-user-name">${name}</td>
                         <td  class="table-head-userName">${username}</td>
                         <td  class="table-head-user-email">${email}</td>
                         <td  class="table-head-user-website">${website}</td> `;
        parent.append(row);
    });

}

//Modal 
const modalSelector = document.querySelector('.modal');
const parentNode = document.querySelector('.table-body');
const modalTable = document.querySelector('.modal-table-body');


function userDetailedInfo(data) {

    parentNode.addEventListener('click', (e) => {
        if(e.target.parentNode.classList.contains('user')) {
            openModal(modalSelector);
        }

        data.forEach(item => {
            console.log(item);
            if(+e.target.parentNode.getAttribute('id') === item.id) {
                const {id, address, company, phone} = item;
                const row = document.createElement('tr');
                row.className = 'modal-table-body-detailed-info';
                row.setAttribute('id', `${id}`);
                row.innerHTML = `
                    <td class='modal-table-body'>${address.city}</td>
                    <td class='modal-table-body'>${address.street}</td>
                    <td class='modal-table-body'>${address.suite}</td>
                    <td class='modal-table-body'>${phone}</td>
                    <td class='modal-table-body'>${company.name}</td>
                    <td class='modal-table-body'>${company.catchPhrase}</td>
                `;
                modalTable.append(row);
            }
        });       
        
    });

}

modalSelector.addEventListener('click', (e) => {
    if (e.target === modalSelector) {
        removeModal(modalSelector);
    }
});

function openModal (modal) {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

function removeModal (modal) {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    modalTable.innerHTML = '';
}

//Sort by field
const field = document.querySelectorAll('.table-head-users');


function sortUser(data) {

    field.forEach(item => {
        item.addEventListener('click', (e) => {
          const column = item.getAttribute('data-column');
          const order = item.getAttribute('data-order');
          if(order === 'desc') {
                item.setAttribute('data-order', 'asc');
                data = data.sort((a, b) => a[column] > b[column] ? 1 : -1);
          } else {
                item.setAttribute('data-order', 'desc');
                data = data.sort((a, b) => a[column] < b[column] ? 1 : -1);
          }
          createTable(data);
        });
    });

}

