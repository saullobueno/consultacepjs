(function(win, doc) {
	let $formCEP = doc.querySelector('[data-js="form-cep"]');
	let $inputCEP = doc.querySelector('[data-js="input-cep"]');
	let $logradouro = doc.querySelector('[data-js="logradouro"]');
	let $bairro = doc.querySelector('[data-js="bairro"]');
	let $localidade = doc.querySelector('[data-js="localidade"]');
	let $uf = doc.querySelector('[data-js="uf"]');
	let $cep = doc.querySelector('[data-js="cep"]');
	let $status = doc.querySelector('[data-js="status"]');
	let ajax = new XMLHttpRequest();

	$formCEP.addEventListener('submit', handleSubmitFormCep, false);

	function handleSubmitFormCep() {
		event.preventDefault();
		var url = getUrl();
		ajax.open('GET', url);
		ajax.send();
		getMessage('loading');
		ajax.addEventListener('readystatechange', handleReadyStateChange);
	}

	function getUrl() {
		return replaceCEP('https://viacep.com.br/ws/[CEP]/json/');
	}

	function clearCEP() {
		return $inputCEP.value.replace(/\D/g, '');
	}

	function handleReadyStateChange() {
		if (isRequestOk()) {
			getMessage('ok');
		}
		fillCEPFields();
	}

	function isRequestOk() {
		return ajax.readyState === 4 && ajax.status === 200;
	}

	function fillCEPFields() {
		let data = parseData();
		if (!data) {
			getMessage('error');
			$logradouro.innerHTML = null;
			$bairro.innerHTML = null;
			$localidade.innerHTML = null;
			$uf.innerHTML = null;
			$cep.innerHTML = null;
		}

		$logradouro.innerHTML = '<strong>Logradouro: </strong>' + data.logradouro;
		$bairro.innerHTML = '<strong>Bairro: </strong>' + data.bairro;
		$localidade.innerHTML = '<strong>Localidade: </strong>' + data.localidade;
		$uf.innerHTML = '<strong>Estado: </strong>' + data.uf;
		$cep.innerHTML = '<strong>CEP: </strong>' + data.cep;
	}

	function parseData() {
		let result;
		try {
			result = JSON.parse(ajax.responseText);
		} catch (e) {
			result = null;
		}
		return result;
	}

	function getMessage(type) {
		let messages = {
			loading: 'Buscando informações...',
			ok: 'ENDEREÇO ENCONTRADO:',
			error: replaceCEP('Não encontramos o endereço para o CEP [CEP]')
		};
		$status.textContent = messages[type];
	}

	function replaceCEP(message) {
		let cep = clearCEP();
		return message.replace('[CEP]', clearCEP());
	}
})(window, document);
