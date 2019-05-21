// To Print Current Year in UI
$('#year').text(new Date().getFullYear());

// calculation variables
let currentTableIndex = 0;
const tables = [];
let totalFeet = 0,
    totalCubic = 0,
    totalFeetAmount = 0,
    totalCubicAmount = 0;

// class
class Table {
    constructor(tableIndex) {
        this.tableIndex = tableIndex;
        this.width = 0;
        this.thickness = 0;
        this.inputFields = [];
        this.subTotal = {
            feet: {
                totalFeet: 0,
                perUnitFeetAmount: 0,
                totalFeetamount: 0
            },
            cubic: {
                totalCubic: 0,
                perUnitCubicAmount: 0,
                totalCubicamount: 0
            }
        };
        this.inputFieldsIndex = 0;
    }
    calculateFeetAndCubic = function (fieldIndex) {
        // const tableIndex = this.tableIndex;
        // const fieldIndex = findIndexOfFieldByFieldVar(tableIndex, fieldIndex);
        const field = this.inputFields[fieldIndex];
        field.feet = field.length * field.count;
        field.cubic = parseFloat(((field.length * field.count * this.width * this.thickness) / 144).toFixed(2));
    };
    calculateFeetAndCubicArray = function () {
        if (this.width >= 0 && this.thickness >= 0) {
            const fields = this.inputFields;
            fields.forEach(field => {
                field.feet = field.length * field.count;
                field.cubic = parseFloat(((this.width * this.thickness * field.length * field.count) / 144).toFixed(2));
            });
        }
    };
    subTotalFeetAndCubic = function () {
        this.subTotal.feet.totalFeet = 0;
        this.subTotal.cubic.totalCubic = 0;
        const fields = this.inputFields;
        fields.forEach(field => {
            this.subTotal.feet.totalFeet = field.feet + this.subTotal.feet.totalFeet;
            this.subTotal.cubic.totalCubic = field.cubic + this.subTotal.cubic.totalCubic;
        });
        this.subTotal.feet.totalFeet = parseFloat(this.subTotal.feet.totalFeet.toFixed(2));
        this.subTotal.cubic.totalCubic = parseFloat(this.subTotal.cubic.totalCubic.toFixed(2));
    }
}

init();

function init() {
    addTable();
}

// function call for addEvent listeners
eventListeners();

// adding Event listener to Elements
function eventListeners() {
    // adding event listeners to add field plus image
    document.querySelector('body').addEventListener('click', allClicks);
    // adding event listener to width input change
    document.querySelector('body').addEventListener('change', allChangeEvents);
}

function addTable() {
    addTableToBackEnd();
    addTableToUI();
    // increasing the table index count
    currentTableIndex += 1;
}

function addTableToBackEnd() {
    const table = new Table(currentTableIndex);
    tables.push(table);
    const particularTableIndex = tables.length - 1;
    addInputFieldToBackEnd(particularTableIndex);
}

function addInputFieldToBackEnd(tableIndex) {
    const fieldIndex = tables[tableIndex].inputFieldsIndex
    const inputFieldData = {
        index: fieldIndex,
        length: 0,
        count: 0,
        feet: 0,
        cubic: 0
    }
    tables[tableIndex].inputFields.push(inputFieldData);
    tables[tableIndex].inputFieldsIndex += 1;
}

function addTableToUI() {
    // new table HTML code
    var newTableHTML = `
<div class="row mt-5 single_table-${currentTableIndex}">
    <div class="col-sm-11 mx-auto">
        <div class="card bg-dark text-white">
            <div class="card-header border-bottom border-danger">
                <div>
                    <i class="fas fa-trash delete_table" id="delete_table-${currentTableIndex}"></i>
                </div>
                <div class="row py-3">
                    <div class="col-3">
                        <div class="form-group">
                            <input type="number" id="width-${currentTableIndex}" class="form-control width" placeholder="Width">
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <input type="number" class="thickness form-control" id="thickness-${currentTableIndex}"
                            placeholder="Thickness">
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <select id="wood-${currentTableIndex}" class="form-control">
                                <option value="teak">Teak</option>
                                <option value="sal">Sal</option>
                                <option value="vembu">Vembu</option>
                                <option value="white_sal">White Sal</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-3 add_field_div">
                        <img class="d-block ml-auto add_field" src="img/plus.png" width="25px" height="25px"
                            id="add_field-${currentTableIndex}">
                    </div>
                </div>
            </div>
            <div class="card-body border-bottom border-danger">
                <table class="table table-sm table-borderless text-center text-white">
                    <thead>
                        <tr>
                            <th>Length</th>
                            <th>Count</th>
                            <th>Feet</th>
                            <th>Cubic</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="single_table_body-${currentTableIndex}">
                        <tr>
                            <td class="px-sm-3">
                                <input type="number" class="length form-control" id="length-${currentTableIndex}-0">
                            </td>
                            <td class="px-sm-3">
                                <input type="number" class="count form-control" id="count-${currentTableIndex}-0">
                            </td>
                            <td>
                                <p class="feet-${currentTableIndex}-0">0</p>
                            </td>
                            <td>
                                <p class="cubic-${currentTableIndex}-0">0</p>
                            </td>
                            <td>
                                <div>
                                    <img src="img/cross.png" alt="" width="20px" height="20px" class="delete_field" id="delete_field-${currentTableIndex}-0">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer">
                <table class="table table-borderless text-center text-white">
                    <thead>
                        <tr>
                            <th>Unit</th>
                            <th>Total</th>
                            <th>Per Unit Amount</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Feet</td>
                            <td>
                                <p class="sub_total_feet" id="sub_total_feet-${currentTableIndex}">0</p>
                            </td>
                            <td>
                                <input type="number" id="per_feet_amount-${currentTableIndex}" class="per_feet_amount form-control w-50 mx-auto">
                            </td>
                            <td>
                                <p class="sub_total_feet_amount" id="sub_total_feet_amount-${currentTableIndex}">0</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Cubic</td>
                            <td>
                                <p class="sub_total_cubic" id="sub_total_cubic-${currentTableIndex}">0</p>
                            </td>
                            <td>
                                <input type="number" id="per_cubic_amount-${currentTableIndex}" class="per_cubic_amount form-control w-50 mx-auto">
                            </td>
                            <td>
                                <p class="sub_total_cubic_amount" id="sub_total_cubic_amount-${currentTableIndex}">0</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>`;

    document.querySelector('.app-container').insertAdjacentHTML('beforeend', newTableHTML);
}

function allClicks(e) {
    // if its an add table
    if (e.target.classList.contains('add_table')) {
        addTable();
    }
    // if its an add field
    if (e.target.classList.contains('add_field')) {
        let id = e.target.id.split('-');
        const tableIndex = parseInt(id[1]);
        const fieldIndex = tables[findIndexOfTableByTableIndexVar(tableIndex)].inputFieldsIndex;
        addInputFieldToBackEnd(findIndexOfTableByTableIndexVar(tableIndex));
        addInputFieldToUI(tableIndex, fieldIndex);
    }
    // if its an delete field
    if (e.target.classList.contains('delete_field')) {
        let id = e.target.id.split('-');
        const tableIndex = parseInt(id[1]);
        const fieldIndex = parseInt(id[2]);
        deleteField(tableIndex, fieldIndex);
    }
    // Delete a table
    if (e.target.classList.contains('delete_table')) {
        let id = e.target.id.split('-');
        const tableIndex = parseInt(id[1]);
        deleteTable(tableIndex);
    }
    // Print Preview
    if (e.target.classList.contains('print_preview')) {
        printPreview();
    }
    // Print
    if (e.target.classList.contains('print')) {
        window.print();
    }
    // close black screen
    if (e.target.classList.contains('close_print')) {
        document.querySelector('.black_screen').style.display = 'none';
    }
}

function addInputFieldToUI(tableIndex, fieldIndex) {
    const newfieldHtml = `
                        <tr>
                            <td class="px-sm-3">
                                <input type="number" class="length form-control" id="length-${tableIndex}-${fieldIndex}">
                            </td>
                            <td class="px-sm-3">
                                <input type="number" class="count form-control" id="count-${tableIndex}-${fieldIndex}">
                            </td>
                            <td>
                                <p class="feet-${tableIndex}-${fieldIndex}">0</p>
                            </td>
                            <td>
                                <p class="cubic-${tableIndex}-${fieldIndex}">0</p>
                            </td>
                            <td>
                                <div>
                                    <img src="img/cross.png" alt="" width="20px" height="20px" class="delete_field" id="delete_field-${tableIndex}-${fieldIndex}">
                                </div>
                            </td>
                        </tr>
    `;

    document.querySelector(`.single_table_body-${tableIndex}`).insertAdjacentHTML('beforeend', newfieldHtml);
}

function deleteField(tableIndex, fieldIndex) {
    $.confirm({
        title: 'Delete',
        content: 'Are you sure you want to delete this row ?',
        buttons: {
            yes: {
                text: 'Yes, I want to',
                btnClass: 'btn-red',
                action: function () {
                    deleteFieldFromUI(tableIndex, fieldIndex);
                    deleteFieldFromBackEnd(tableIndex, fieldIndex);
                    // calculating and updating sub feet and cubic
                    subTotalFeetAndCubic(tableIndex);

                }
            },
            no: {
                text: 'Please,Cancel',
                action: function () {

                }
            }
        }
    });
}

function deleteFieldFromUI(tableIndex, fieldIndex) {
    document.querySelector(`#delete_field-${tableIndex}-${fieldIndex}`).parentElement.parentElement.parentElement.remove()
}

function deleteFieldFromBackEnd(tableIndex, fieldIndex) {
    // console.log(findIndexOfTableByTableIndexVar());
    // console.log(tables[findIndexOfTableByTableIndexVar()]);
    const allFields = tables[findIndexOfTableByTableIndexVar(tableIndex)].inputFields;
    allFields.forEach(field => {
        if (field.index === fieldIndex) {
            let indexOfField = allFields.indexOf(field);
            allFields.splice(indexOfField, 1);
        }
    });

}

function deleteTable(tableIndex) {
    $.confirm({
        title: 'Delete',
        content: 'Are you sure you want to delete this Table ?',
        buttons: {
            yes: {
                text: 'Yes, I want to',
                btnClass: 'btn-red',
                action: function () {
                    deleteTableFromUI(tableIndex);
                    deleteTableFromBackEnd(tableIndex);
                }
            },
            no: {
                text: 'Please,Cancel',
                action: function () {

                }
            }
        }
    });
}

function deleteTableFromUI(tableIndex) {
    document.querySelector(`.single_table-${tableIndex}`).remove();
}

function deleteTableFromBackEnd(tableIndex) {

    tables.forEach(table => {
        if (table.tableIndex === tableIndex) {
            let indexOfTable = tables.indexOf(table);
            tables.splice(indexOfTable, 1);
        }
    });

    fullTotal();
}

// all tasks of width and thickness
function allChangeEvents(e) {
    if (e.target.classList.contains('width') || e.target.classList.contains('thickness')) {
        let id = e.target.id.split('-');
        let fieldName = id[0];
        let tableIndex = id[1];
        let value = parseFloat(e.target.value);

        widthOrThickness(fieldName, tableIndex, value);
        subTotal(tableIndex);
    }
    // all tasks of length and count
    if (e.target.classList.contains('length') || e.target.classList.contains('count')) {
        let id = e.target.id.split('-');
        let fieldName = id[0];
        let tableIndex = id[1];
        let fieldIndex = id[2];
        let value = parseFloat(e.target.value);

        lengthOrCount(fieldName, tableIndex, fieldIndex, value);
        subTotal(tableIndex);
    }
    // feet per unit amount and cubic per unit amount
    if (e.target.classList.contains(`per_feet_amount`) || e.target.classList.contains(`per_cubic_amount`)) {
        let id = e.target.id.split('-');
        const fieldName = id[0];
        const tableIndex = parseInt(id[1]);
        const value = parseFloat(e.target.value);
        let fieldNameOriginal, newName;
        fieldName === `per_feet_amount` ? fieldNameOriginal = 'perUnitFeetAmount' : fieldNameOriginal = 'perUnitCubicAmount';
        fieldName === `per_feet_amount` ? newName = 'feet' : newName = 'cubic';
        tables[findIndexOfTableByTableIndexVar(tableIndex)].subTotal[newName][fieldNameOriginal] = value;

        // subTotal
        subTotal(tableIndex);
    }
}

function widthOrThickness(fieldName, tableIndex, value) {
    // setting the values
    tables[findIndexOfTableByTableIndexVar(tableIndex)][fieldName] = value;
    // calculating feet and cubic value for entire array
    tables[findIndexOfTableByTableIndexVar(tableIndex)].calculateFeetAndCubicArray();
    // displaying the data in UI
    // storing particaular table
    const fields = tables[findIndexOfTableByTableIndexVar(tableIndex)].inputFields;
    fields.forEach(field => {
        //selecting and displaying feet and cubic
        document.querySelector(`.feet-${tableIndex}-${field.index}`).textContent = field.feet;
        document.querySelector(`.cubic-${tableIndex}-${field.index}`).textContent = field.cubic;
    });
    // // calculating sub total feet and cubic
    // tables[findIndexOfTableByTableIndexVar(tableIndex)].subTotalFeetAndCubic();
    // // displaying sub total feet and cubic
    // const singleTable = tables[findIndexOfTableByTableIndexVar(tableIndex)];
    // document.querySelector(`#sub_total_feet-${tableIndex}`).textContent = singleTable.subTotal.feet.totalFeet;

    // document.querySelector(`#sub_total_cubic-${tableIndex}`).textContent = singleTable.subTotal.cubic.totalCubic;
    subTotalFeetAndCubic(tableIndex);
}

function lengthOrCount(fieldName, tableIndex, fieldIndex, value) {
    let oneTable = tables[findIndexOfTableByTableIndexVar(tableIndex)];
    // setting the values
    oneTable.inputFields[findIndexOfFieldByFieldVar(tableIndex, fieldIndex)][fieldName] = value;
    // calculating the feet and cubic value
    oneTable.calculateFeetAndCubic(findIndexOfFieldByFieldVar(tableIndex, fieldIndex));
    // displaying the data in UI
    // storing particular row
    const field = tables[findIndexOfTableByTableIndexVar(tableIndex)].inputFields[findIndexOfFieldByFieldVar(tableIndex, fieldIndex)];
    // selecting and displaying the feet and cubic element
    document.querySelector(`.feet-${tableIndex}-${fieldIndex}`).textContent = field.feet;
    document.querySelector(`.cubic-${tableIndex}-${fieldIndex}`).textContent = field.cubic;
    // // calculating sub total feet and cubic
    // tables[findIndexOfTableByTableIndexVar(tableIndex)].subTotalFeetAndCubic();
    // // displaying sub total feet and cubic
    // const singleTable = tables[findIndexOfTableByTableIndexVar(tableIndex)];
    // document.querySelector(`#sub_total_feet-${tableIndex}`).textContent = singleTable.subTotal.feet.totalFeet;

    // document.querySelector(`#sub_total_cubic-${tableIndex}`).textContent = singleTable.subTotal.cubic.totalCubic;
    subTotalFeetAndCubic(tableIndex);
}

function subTotalFeetAndCubic(tableIndex) {
    // calculating sub total feet and cubic
    tables[findIndexOfTableByTableIndexVar(tableIndex)].subTotalFeetAndCubic();
    // displaying sub total feet and cubic
    const singleTable = tables[findIndexOfTableByTableIndexVar(tableIndex)];
    document.querySelector(`#sub_total_feet-${tableIndex}`).textContent = singleTable.subTotal.feet.totalFeet;

    document.querySelector(`#sub_total_cubic-${tableIndex}`).textContent = singleTable.subTotal.cubic.totalCubic;

    subTotal(tableIndex);
}
// calculating and displaying sub total amount
function subTotal(tableIndex) {
    // calculating
    const table = tables[findIndexOfTableByTableIndexVar(tableIndex)];
    table.subTotal.feet.totalFeetamount = parseFloat((table.subTotal.feet.totalFeet * table.subTotal.feet.perUnitFeetAmount).toFixed(2));
    table.subTotal.cubic.totalCubicamount = parseFloat((table.subTotal.cubic.totalCubic * table.subTotal.cubic.perUnitCubicAmount).toFixed(2));

    console.log(table.subTotal.feet.totalFeetamount, table.subTotal.cubic.totalCubicamount);
    // displaying
    document.querySelector(`#sub_total_feet_amount-${tableIndex}`).textContent = table.subTotal.feet.totalFeetamount;

    document.querySelector(`#sub_total_cubic_amount-${tableIndex}`).textContent = table.subTotal.cubic.totalCubicamount;
    // calling fulltotal after change in sub total
    fullTotal();

}

// helper function 
function findIndexOfTableByTableIndexVar(tableIndex) {
    let index;
    tables.forEach(table => {
        if (table.tableIndex === parseInt(tableIndex)) {
            let indexOfTable = tables.indexOf(table);
            index = indexOfTable;
        }
    });
    return index;
}

function findIndexOfFieldByFieldVar(tableIndex, fieldIndex) {
    let index;
    const allFields = tables[findIndexOfTableByTableIndexVar(tableIndex)].inputFields;
    allFields.forEach(field => {
        if (field.index === parseInt(fieldIndex)) {
            let indexOfField = allFields.indexOf(field);
            index = indexOfField;
        }
    });
    return index;
}

function fullTotal() {
    totalFeet = 0;
    totalCubic = 0;
    totalFeetAmount = 0;
    totalCubicAmount = 0;

    let tablesArr = tables;
    console.log(tablesArr);
    tablesArr.forEach(table => {
        totalFeet = table.subTotal.feet.totalFeet + totalFeet;
        totalCubic = table.subTotal.cubic.totalCubic + totalCubic;
        totalFeetAmount = table.subTotal.feet.totalFeetamount + totalFeetAmount;
        totalCubicAmount = table.subTotal.cubic.totalCubicamount + totalCubicAmount;
    });
    document.querySelector('.total_feet').textContent = totalFeet;
    document.querySelector('.total_cubic').textContent = totalCubic;
    document.querySelector('.total_feet_amount').textContent = totalFeetAmount;
    document.querySelector('.total_cubic_amount').textContent = totalCubicAmount;
}

function printPreview() {
    document.querySelector('.black_screen').style.display = 'block';
    tables.forEach(table => {
        let widthThicknessHTML = `${table.width} x ${table.thickness}`;
        let feetCubicHTML = `
                        <tr>
                            <td>Feet</td>
                            <td>${table.subTotal.feet.totalFeet}</td>
                            <td>${table.subTotal.feet.perUnitFeetAmount}</td>
                            <td>${table.subTotal.feet.totalFeetamount}</td>
                        </tr>
                        <tr>
                            <td>Cubic</td>
                            <td>${table.subTotal.cubic.totalCubic}</td>
                            <td>${table.subTotal.cubic.perUnitCubicAmount}</td>
                            <td>${table.subTotal.cubic.totalCubicamount}</td>			
                        </tr>
                        `;
        let inputFields = table.inputFields;
        let fieldHTML = '';
        inputFields.forEach((field, index) => {
            newFieldHTML = `<tr>
                            <td>${index+1}</td>
                            <td>${field.length}</td>
                            <td>${field.count}</td>
                            <td>${field.feet}</td>
                            <td>${field.cubic}</td>
                        </tr>`;
            fieldHTML = fieldHTML + newFieldHTML;
        });
        let tableHTML = `
                <table class="table-sm table-bordered w-75 mx-auto text-center">
					<thead>
						<tr>
							<th colspan="5">${widthThicknessHTML}</th>
						</tr>
						<tr>
							<th scope="col">Item-no</th>
							<th scope="col">Length</th>
							<th scope="col">Count</th>
							<th scope="col">Feet</th>
							<th scope="col">Cubic</th>
						</tr>
					</thead>
					<tbody>
                        ${fieldHTML}
					</tbody>
				</table>
				<table class="table-sm table-borderless w-75 mx-auto text-center">
                    <thead>
                        <tr>
                            <th>Unit</th>
                            <th>Total</th>
                            <th>Per Unit Amount</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${feetCubicHTML}
                    </tbody>
                </table>
                <hr>
                        `;
        document.querySelector(`.tables`).insertAdjacentHTML('beforeend', tableHTML);
    });
    let completeTotalHTML = `
                <table class="table-sm w-75 mx-auto text-center table-danger">
					<thead>
						<tr class="text-dark">
							<th>Unit</th>
							<th>Total Measurement</th>
							<th>Total Amount</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Feet</td>
							<td>
								${totalFeet}
							</td>
							<td>
								${totalFeetAmount}
							</td>
						</tr>
						<tr>
							<td>Cubic</td>
							<td>
								${totalCubic}
							</td>
							<td>
								${totalCubicAmount}
							</td>
						</tr>
					</tbody>
                </table>
                <div class="text-center mt-4">
                    <h4>Total Amount: ₹ ${totalCubicAmount + totalFeetAmount}</h4>
                </div>
    `;
    document.querySelector(`.tables`).insertAdjacentHTML('beforeend', completeTotalHTML);
}