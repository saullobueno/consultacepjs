(function(win, doc) {
	let $formCEP = doc.querySelector('[data-js="form-cep"]');
	let $inputCEP = doc.querySelector('[data-js="input-cep"]');
	let ajax = new XMLHttpRequest();

	$formCEP.addEventListener('submit', handleSubmitFormCep, false);

	function handleSubmitFormCep() {
		event.preventDefault();
		var url = 'https://viacep.com.br/ws/[CEP]/json/'.replace(
			'[CEP]',
			$inputCEP.value
		);
		ajax.open('GET', url);
		ajax.send();
		ajax.addEventListener('readystatechange', handleReadyStateChange);
	}

	function handleReadyStateChange() {
		if (ajax.readyState === 4 && ajax.status === 200) {
			console.log('Formulário: ', ajax.responseText);
		}
		console.log('Carregando...');
	}
})(window, document);
