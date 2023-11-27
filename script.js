/* Ação de eventos sobre o botão menu da tag nav (mobile). */
/* Parâmetros: Nome do evento, função. */
openMenu.addEventListener('click', () => {

	/* Sobrepõe a propriedade display: none aplicada no
	   CSS por display: flex que o torna visível. */ 
	menu.style.display = "flex"

	/* Captura o tamanho do menu nav e aplica na posição. */
	menu.style.right = (menu.offsetWidth * -1) + 'px'

	/* Após 10 milésimos de segundo, adiciona o atributo style, */
	/* e adiciona as propriedades CSS.*/
	setTimeout(()=> {
		/* Faz o menu nav aparecer na velocidade em que foi
		   determinado na propriedade transition no CSS.*/
		menu.style.opacity = '1'

		/* Move o menu nav para a posição 0 a direita. Utiliza 
		   também a velocidade definida, na propriedade transition 
		   no CSS para realizar o movimento mais suave.*/
		menu.style.right = "0"

		/* Oculta o botão que torna visível o elemento nav.*/
		openMenu.style.display = 'none'
	}, 10);
})

/* Ação de eventos sobre o botão X da tag nav (mobile). */
/* Parâmetros: Nome do evento, função. */
closeMenu.addEventListener('click', () => {

	/* Faz o menu nav desaparecer na velocidade em que foi
	   determinado na propriedade transition no CSS. */
	menu.style.opacity = '0'

	/* Captura o tamanho do menu nav e aplica na posição. */
	menu.style.right = (menu.offsetWidth * -1) + 'px'

	/* Torna visível o botão que apresenta o menu nav. */
	/* openMenu.style.display = 'block'*/
	
	/* Após 200 milésimos de 1 segundo, remove o atributo style. */
	setTimeout(()=> {
		menu.removeAttribute('style')
		openMenu.removeAttribute('style')
	}, 200);
})
const carForm = document.getElementById("car-form");
const carTable = document.getElementById("car-table").getElementsByTagName("tbody")[0];
const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", () => {
    const carName = document.getElementById("car-name").value;
    const carId = document.getElementById("car-id").value;
    const carBrand = document.getElementById("car-brand").value;
    const carColor = document.getElementById("car-color").value;
    const carPrice = document.getElementById("car-price").value;
    const carCondition = document.getElementById("car-condition").value;

    const newRow = carTable.insertRow();
    newRow.innerHTML = `
        <td>${carId}</td>
        <td>${carName}</td>
        <td>${carBrand}</td>
        <td>${carColor}</td>
        <td>${carPrice}</td>
        <td>${carCondition}</td>
        <td><button class="edit-button">Editar</button> <button class="delete-button">Apagar</button></td>
    `;

    const editButton = newRow.querySelector(".edit-button");
    editButton.addEventListener("click", () => editCar(newRow));

    const deleteButton = newRow.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => deleteCar(newRow));

    carForm.reset();
});

function editCar(row) {
    const cells = row.cells;
    const carId = cells[0].textContent;
    const carName = cells[1].textContent;
    const carBrand = cells[2].textContent;
    const carColor = cells[3].textContent;
    const carPrice = cells[4].textContent;
    const carCondition = cells[5].textContent;

    document.getElementById("car-id").value = carId;
    document.getElementById("car-name").value = carName;
    document.getElementById("car-brand").value = carBrand;
    document.getElementById("car-color").value = carColor;
    document.getElementById("car-price").value = carPrice;
    document.getElementById("car-condition").value = carCondition;

    carTable.deleteRow(row.rowIndex);
}

function deleteCar(row) {
    carTable.deleteRow(row.rowIndex);
}
