class Table {
	constructor(index) {
		this.index = index;
		this.width = 0;
		this.thickness = 0;
		this.tableFields = [];
		this.categorySum = {
			inFeet: {
				unit: 0,
				perUnitAmount: 0,
				totalamount: 0,
			},
			inCubic: {
				unit: 0,
				perUnitAmount: 0,
				totalamount: 0,
			},
		};
		this.tableFieldsCount = 0;
		this.tableFieldsIndex = 0;
	}
}
var fullTotal = {
	feet: {
		measurment: 0,
		amount: 0,
	},
	cubic: {
		measurment: 0,
		amount: 0,
	},
};
var tableindex = 0;
var tableCount = 0;
var tables = [];

function createTable() {
	if (tableCount > 0) {
		tableindex = tableindex + 1;

		var tableHTML = `<div class="single_table single_table-${tableindex}">
    <div class="close_container close_container-${tableindex}">
      <div class="table_close_container table_close_container-${tableindex}">
        <img src="img/002-cross.png" alt="" id="table_close-${tableindex}" class="table_close table_close-${tableindex}" />
      </div>
    </div>
    <div class="single_table_top">
      <div class="single_table_top-left">
        <input type="number" placeholder="Width" class="input_field input_width" id="input_width-${tableindex}" />
        <input
          type="number"
          placeholder="thickness"
          class="input_field input_thickness"
          id="input_thickness-${tableindex}"
        />
      </div>
      <div class="single_table_top-right">
        <select class="select_wood" id="select_wood-0">
          <option value="teak">Teak</option>
          <option value="sal">Sal</option>
          <option value="burma">Burma</option>
        </select>
        <div class="add_field_container">
          <img src="img/plus.png" alt="plus_field" class="add_field add_field-${tableindex}" />
        </div>
      </div>
    </div>
    <div class="single_table_botttom">
      <table class="category_table">
        <thead>
          <tr>
            <th>Length</th>
            <th>Count</th>
            <th>In Feet</th>
						<th>In Cubic</th>
						<th></th>
          </tr>
        </thead>
        <tbody class ="table_category_body table_category_body-${tableindex}">
          <tr>
            <td>
              <input
                type="number"
                id="input_length-${tableindex}-0"
                class="input_field input_length input_length-${tableindex}"
                placeholder="Length"
              />
            </td>
            <td>
              <input
                type="number"
                id="input_count-${tableindex}-0"
                class="input_field input_count input_count-${tableindex}"
                placeholder="count"
              />
            </td>
            <td><p class="feet_info feet_info-${tableindex}" id="feet_info-${tableindex}-0">0</p></td>
						<td><p class="cubic_info cubic_info-${tableindex}" id="cubic_info-${tableindex}-0">0</p></td>
						<td>
									<img
										class="close_field"
										id="close_field-${tableindex}-0"
										src="img/002-cross.png"
										alt="delete particular Field"
									/>
								</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <table class="category_sum_table">
        <thead>
          <tr>
            <th>unit</th>
            <th>Total</th>
            <th>per unit amount</th>
            <th>total amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Feet</td>
            <td><p class="total_feet" id="total_feet-${tableindex}">0</p></td>
            <td>
              <input type="number" class="input_field per_feet_amount" id="per_feet_amount-${tableindex}" />
            </td>
            <td><p class="total_feet_amount" id="total_feet_amount-${tableindex}">0</p></td>
          </tr>
          <tr>
            <td>Cubic</td>
            <td><p class="total_cubic" id="total_cubic-${tableindex}">15</p></td>
            <td>
              <input type="number" class="input_field per_cubic_amount" id="per_cubic_amount-${tableindex}" />
            </td>
            <td><p class="total_cubic_amount" id="total_cubic_amount-${tableindex}">0</p></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>`;

		document.querySelector('.table_container').insertAdjacentHTML('beforeend', tableHTML);
		removingEventListener('.add_field', 'click', addFieldsInTable);
		addingEventListener('.add_field', 'click', addFieldsInTable);
		removingEventListener('.input_length', 'change', readingFieldLengthValue);
		addingEventListener('.input_length', 'change', readingFieldLengthValue);
		removingEventListener('.input_count', 'change', readingFieldCountValue);
		addingEventListener('.input_count', 'change', readingFieldCountValue);

		removingEventListener('.input_width', 'change', readingFieldWidthValue);
		addingEventListener('.input_width', 'change', readingFieldWidthValue);
		removingEventListener('.input_thickness', 'change', readingFieldThicknessValue);
		addingEventListener('.input_thickness', 'change', readingFieldThicknessValue);

		removingEventListener('.per_feet_amount', 'change', calculatingTotalAmountForFeet);
		addingEventListener('.per_feet_amount', 'change', calculatingTotalAmountForFeet);
		removingEventListener('.per_cubic_amount', 'change', calculatingTotalAmountForCubic);
		addingEventListener('.per_cubic_amount', 'change', calculatingTotalAmountForCubic);

		removingEventListener('.close_field', 'click', deletingParticularField);
		addingEventListener('.close_field', 'click', deletingParticularField);

		removingEventListener('.table_close', 'click', deletingParicularTable);
		addingEventListener('.table_close', 'click', deletingParicularTable);
	}
	var table = new Table(tableindex);
	tables.push(table);
	tables[tableindex].tableFields.push(insertFieldsIntoTable());
	tables[tableindex].tableFieldsCount = tables[tableindex].tableFieldsCount + 1;
	tableCount = tables.length;
}

createTable();

function insertFieldsIntoTable() {
	return {
		index: 0,
		length: 0,
		count: 0,
		inFeet: 0,
		inCubic: 0,
	};
}

document.querySelector(`.plus_table`).addEventListener('click', createTable);

function addingEventListener(className, eventType, functionName) {
	var field = document.querySelectorAll(`${className}`);
	field.forEach(element => {
		element.addEventListener(`${eventType}`, functionName);
	});
}

function removingEventListener(className, eventType, functionName) {
	var field = document.querySelectorAll(`${className}`);
	field.forEach(element => {
		element.removeEventListener(`${eventType}`, functionName, false);
	});
}

addingEventListener('.add_field', 'click', addFieldsInTable);

function addFieldsInTable(e) {
	var tableIndexByClicking = e.target.classList[1].split('-');
	var tableIndexByClicking = parseInt(tableIndexByClicking[1]);
	console.log(tables[tableIndexByClicking].tableFieldsIndex);
	tables[tableIndexByClicking].tableFieldsIndex = tables[tableIndexByClicking].tableFieldsIndex + 1;
	var fieldIndex = tables[tableIndexByClicking].tableFieldsIndex;
	tables[tableIndexByClicking].tableFields.push(insertFieldsIntoTable());
	var totalFieldsInTable = tables[tableIndexByClicking].tableFields;
	tables[tableIndexByClicking].tableFields[totalFieldsInTable.length - 1].index = fieldIndex;
	var fieldHTML = `
  <tr>
  <td>
    <input
      type="number"
      id="input_length-${tableIndexByClicking}-${fieldIndex}"
      class="input_field input_length input_length-${tableIndexByClicking}"
      placeholder="Length"
    />
  </td>
  <td>
    <input
      type="number"
      id="input_count-${tableIndexByClicking}-${fieldIndex}"
      class="input_field input_count input_count-${tableIndexByClicking}"
      placeholder="count"
    />
  </td>
  <td><p class="feet_info feet_info-${tableIndexByClicking}" id="feet_info-${tableIndexByClicking}-${fieldIndex}">0</p></td>
	<td><p class="cubic_info cubic_info-${tableIndexByClicking}" id="cubic_info-${tableIndexByClicking}-${fieldIndex}">0</p></td>
	<td>
		<img
		class="close_field"
		id="close_field-${tableIndexByClicking}-${fieldIndex}"
		src="img/002-cross.png"
		alt="delete particular Field"
		/>
	</td>
</tr>`;
	document.querySelector(`.table_category_body-${tableIndexByClicking}`).insertAdjacentHTML('beforeend', fieldHTML);
	tables[tableIndexByClicking].tableFieldsCount = tables[tableIndexByClicking].tableFields.length;
	removingEventListener('.input_length', 'change', readingFieldLengthValue);
	addingEventListener('.input_length', 'change', readingFieldLengthValue);
	removingEventListener('.input_count', 'change', readingFieldCountValue);
	addingEventListener('.input_count', 'change', readingFieldCountValue);
	removingEventListener('.close_field', 'click', deletingParticularField);
	addingEventListener('.close_field', 'click', deletingParticularField);
}

addingEventListener('.input_length', 'change', readingFieldLengthValue);
addingEventListener('.input_count', 'change', readingFieldCountValue);
addingEventListener('.input_width', 'change', readingFieldWidthValue);
addingEventListener('.input_thickness', 'change', readingFieldThicknessValue);

function readingFieldLengthValue(e) {
	var allIds = e.target.id.split('-');
	var name = allIds[0];
	var tableIndex = parseInt(allIds[1]);
	var fieldIndex = parseInt(allIds[2]);
	var value = parseFloat(e.target.value);
	insertingLengthAndCount(name, tableIndex, fieldIndex, value);
}

function readingFieldCountValue(e) {
	var allIds = e.target.id.split('-');
	var name = allIds[0];
	var tableIndex = parseInt(allIds[1]);
	var fieldIndex = parseInt(allIds[2]);
	var value = parseFloat(e.target.value);
	insertingLengthAndCount(name, tableIndex, fieldIndex, value);
}

function readingFieldWidthValue(e) {
	var allIds = e.target.id.split('-');
	var name = allIds[0];
	var tableIndex = parseInt(allIds[1]);
	var value = parseInt(e.target.value);
	insertingWidthAndThickness(name, tableIndex, value);
}

function readingFieldThicknessValue(e) {
	var allIds = e.target.id.split('-');
	var name = allIds[0];
	var tableIndex = parseInt(allIds[1]);
	var value = parseFloat(e.target.value);
	insertingWidthAndThickness(name, tableIndex, value);
}

function insertingLengthAndCount(name, tableIndex, fieldIndex, value) {
	// var selectedField = tables[tableIndex].tableFields[fieldIndex];
	var selectedField = selectParticularField(tableIndex, fieldIndex);
	if (name === 'input_length') {
		selectedField.length = value;
	} else {
		selectedField.count = value;
	}
	calculateInFeetandInCubic(tableIndex, fieldIndex);
}

function insertingWidthAndThickness(name, tableIndex, value) {
	// var selectedField = tables[tableIndex];
	var selectedField = selectingParicularTable(tableIndex);
	if (name === 'input_width') {
		selectedField.width = value;
	} else {
		selectedField.thickness = value;
	}
	calculateFeetAndCubicWithTable(tableIndex);
	calculatingFullTotal();
}

function calculateInFeetandInCubic(tableIndex, fieldIndex) {
	// var selectedField = tables[tableIndex].tableFields[fieldIndex];
	// var selectedTable = tables[tableIndex];

	var selectedField = selectParticularField(tableIndex, fieldIndex);
	var selectedTable = selectingParicularTable(tableIndex);
	selectedField.inFeet = selectedField.length * selectedField.count;
	selectedField.inCubic = parseFloat(
		((selectedField.length * selectedField.count * selectedTable.width * selectedTable.thickness) / 144).toFixed(2)
	);
	displayInFeetAndCubic(tableIndex, fieldIndex);
	calculatingAndDisplayingCategoryTotal(tableIndex);
}

function calculateFeetAndCubicWithTable(tableIndex) {
	// var selectedTable = tables[tableIndex];
	var selectedTable = selectingParicularTable(tableIndex);
	selectedTable.tableFields.forEach(element => {
		element.inFeet = element.length * element.count;
		element.inCubic = parseFloat(
			((element.length * element.count * selectedTable.width * selectedTable.thickness) / 144).toFixed(2)
		);
	});
	displayFeetAndCubicWithTable(tableIndex);
	calculatingAndDisplayingCategoryTotal(tableIndex);
}

function displayInFeetAndCubic(tableIndex, fieldIndex) {
	// var selectedField = tables[tableIndex].tableFields[fieldIndex];
	var selectedField = selectParticularField(tableIndex, fieldIndex);
	document.querySelector(`#feet_info-${tableIndex}-${fieldIndex}`).textContent = selectedField.inFeet;
	document.querySelector(`#cubic_info-${tableIndex}-${fieldIndex}`).textContent = selectedField.inCubic;
}

function displayFeetAndCubicWithTable(tableIndex) {
	var selectTable = document.querySelector(`.table_category_body-${tableIndex}`);
	var selectInFeet = selectTable.querySelectorAll('.feet_info');
	selectInFeet.forEach(element => {
		var id = element.id;
		var idSplit = id.split('-');
		var tableIndex = parseInt(idSplit[1]);
		var fieldIndex = parseInt(idSplit[2]);
		var selectedField = selectParticularField(tableIndex, fieldIndex);
		selectTable.querySelector(`#${id}`).textContent = selectedField.inFeet;
	});

	var selectInCubic = selectTable.querySelectorAll('.cubic_info');
	selectInCubic.forEach(element => {
		var id = element.id;
		var idSplit = id.split('-');
		var tableIndex = parseInt(idSplit[1]);
		var fieldIndex = parseInt(idSplit[2]);
		var selectedField = selectParticularField(tableIndex, fieldIndex);
		selectTable.querySelector(`#${id}`).textContent = selectedField.inCubic;
	});
}

function selectParticularField(tableindex, fieldIndex) {
	var selectedField;
	tables[tableindex].tableFields.forEach(element => {
		if (element.index == fieldIndex) {
			selectedField = element;
		}
	});
	return selectedField;
}

function calculatingAndDisplayingCategoryTotal(tableIndex) {
	var selectedFields = tables[tableIndex].tableFields;
	var categoryTotalFeet = 0;
	var categoryTotalCubic = 0;
	selectedFields.forEach(element => {
		categoryTotalFeet = categoryTotalFeet + element.inFeet;
		categoryTotalCubic = categoryTotalCubic + element.inCubic;
	});

	tables[tableIndex].categorySum.inFeet.unit = categoryTotalFeet;
	tables[tableIndex].categorySum.inCubic.unit = categoryTotalCubic;

	tables[tableIndex].categorySum.inFeet.totalamount =
		tables[tableIndex].categorySum.inFeet.unit * tables[tableIndex].categorySum.inFeet.perUnitAmount.toFixed(2);
	tables[tableIndex].categorySum.inCubic.totalamount = parseFloat(
		(tables[tableIndex].categorySum.inCubic.unit * tables[tableIndex].categorySum.inCubic.perUnitAmount).toFixed(2)
	);

	document.querySelector(`#total_feet-${tableIndex}`).textContent = categoryTotalFeet;
	document.querySelector(`#total_cubic-${tableIndex}`).textContent = categoryTotalCubic;

	document.querySelector(`#total_feet_amount-${tableIndex}`).textContent =
		tables[tableIndex].categorySum.inFeet.totalamount;
	document.querySelector(`#total_cubic_amount-${tableIndex}`).textContent =
		tables[tableIndex].categorySum.inCubic.totalamount;

	calculatingFullTotal();
}

addingEventListener('.per_feet_amount', 'change', calculatingTotalAmountForFeet);
addingEventListener('.per_cubic_amount', 'change', calculatingTotalAmountForCubic);

function calculatingTotalAmountForFeet(e) {
	var id = e.target.id.split('-');
	var table = selectingParicularTable(parseInt(id[1]));
	var value = parseFloat(e.target.value);
	table.categorySum.inFeet.perUnitAmount = value;
	table.categorySum.inFeet.totalamount = table.categorySum.inFeet.unit * value;
	document.querySelector(`#total_feet_amount-${id[1]}`).textContent = table.categorySum.inFeet.totalamount;
	calculatingFullTotal();
}

function calculatingTotalAmountForCubic(e) {
	var id = e.target.id.split('-');
	var table = selectingParicularTable(parseInt(id[1]));
	var value = parseFloat(e.target.value);
	table.categorySum.inCubic.perUnitAmount = value;
	table.categorySum.inCubic.totalamount = parseFloat((table.categorySum.inCubic.unit * value).toFixed(2));
	document.querySelector(`#total_cubic_amount-${id[1]}`).textContent = table.categorySum.inCubic.totalamount;
	calculatingFullTotal();
}

function selectingParicularTable(tableIndex) {
	var tableFind;
	tables.forEach(table => {
		if (table.index == tableIndex) {
			tableFind = table;
		}
	});
	return tableFind;
}

addingEventListener('.close_field', 'click', deletingParticularField);

function deletingParticularField(e) {
	var id = e.target.id;
	var idSplit = e.target.id.split('-');
	var tableIndex = parseInt(idSplit[1]);
	var fieldIndex = parseInt(idSplit[2]);
	var selectField = selectParticularField(tableIndex, fieldIndex);
	var indexOfSelectedField = selectingParicularTable(tableIndex).tableFields.indexOf(selectField);
	// deleting particular field from front end
	var deletingField = document.querySelector(`#${id}`).parentElement.parentElement;
	deletingField.parentElement.removeChild(deletingField);
	// deleting particular field from back end
	selectingParicularTable(tableIndex).tableFields.splice(indexOfSelectedField, 1);
	calculateFeetAndCubicWithTable(tableIndex);
}

function calculatingFullTotal() {
	var feetMeasurement = 0;
	var cubicMeasurement = 0;
	var feetAmount = 0;
	var cubicAmount = 0;
	tables.forEach(table => {
		feetMeasurement = feetMeasurement + table.categorySum.inFeet.unit;
		fullTotal.feet.measurment = feetMeasurement;

		cubicMeasurement = cubicMeasurement + table.categorySum.inCubic.unit;
		fullTotal.cubic.measurment = cubicMeasurement;

		feetAmount = feetAmount + table.categorySum.inFeet.totalamount;
		fullTotal.feet.amount = feetAmount;

		cubicAmount = cubicAmount + table.categorySum.inCubic.totalamount;
		fullTotal.cubic.amount = cubicAmount;

		document.querySelector('.full_feet_total').textContent = fullTotal.feet.measurment;
		document.querySelector('.full_cubic_total').textContent = fullTotal.cubic.measurment;
		document.querySelector('.full_feet_total_amount').textContent = fullTotal.feet.amount;
		document.querySelector('.full_cubic_total_amount').textContent = fullTotal.cubic.amount;
	});
}
addingEventListener('.table_close', 'click', deletingParicularTable);
function deletingParicularTable(e) {
	var idWithWords = e.target.id;
	var idWithWordsArray = idWithWords.split('-');
	var id = parseInt(idWithWordsArray[1]);
	var selectedTable = selectingParicularTable(id);
	console.log(id, selectedTable);

	var tableIndex = tables.indexOf(selectedTable);
	tables.splice(tableIndex, 1);
	calculatingFullTotal();
	// remove total from display
	var deletingTable = document.querySelector(`#${idWithWords}`).parentElement.parentElement.parentElement;

	deletingTable.parentElement.removeChild(deletingTable);
}
