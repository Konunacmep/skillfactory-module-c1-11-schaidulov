function sQuery (selector, context = document){
    this.elements = Array.from(context.querySelectorAll(selector));
	return this
}

sQuery.prototype.each = function (fn){
	this.elements.forEach((element, index) => fn.call(element, element, index));
	return this;
}

sQuery.prototype.click = function(fn){
	this.each(element => element.addEventListener('click', fn))
	return this
}

sQuery.prototype.hide = function(){
	this.each(element => element.style.display = 'none')
  return this;
}

sQuery.prototype.addClass = function(contents){
	this.each(element => element.classList.add(contents))
  return this;
}

sQuery.prototype.removeClass = function(contents){
	this.each(element => element.classList.remove(contents))
  return this;
}

sQuery.prototype.change = function(fn){
	this.each(element => element.addEventListener('change', fn))
  return this;
}

sQuery.prototype.value = function(contents){
	if (contents === undefined) {
		return this.elements[0].value;
	} else {
		this.elements[0].value = contents;
		return this;
	}
}

sQuery.prototype.show = function(){
	this.each(element => element.style.display = '')
  return this;
}

sQuery.prototype.disabled = function(contents){
	if (contents === true) {
		this.each(element => element.disabled = 'disabled')
	} else {
		this.each(element => element.removeAttribute('disabled'))
	}
  return this;
}

sQuery.prototype.html = function(contents){
	if (contents === undefined) { // проверка наличия аргумента
		return this.elements.map( element => element.innerHTML ); // если аргумента нет, возвращаем массив из innerHTML каждого элемента
	} else {
		this.each( element => element.innerHTML = contents ); // если аргумент есть, импользуем его для задания innerHTML каждого эелемент
		return this; // возвращем this для обеспечения возможности чейнинга
	}
}

sQuery.prototype.text = function(contents){
	if (contents === undefined) { // проверка наличия аргумента
		return this.elements.map( element => element.innerText ).join( '\n' ) // если агрумента нет, по аналогии с JQeury возвращаем строку из innerText всех элементов, сцепляя через \n
	} else {
		this.each(element => element.innerText = contents); // если аргумент есть, импользуем его для задания innerText каждого элемента
		return this;
	}
}

const $ = (e) => new sQuery(e);
