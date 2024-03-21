async function getLanguages() {
    const url = 'https://aibit-translator.p.rapidapi.com/api/v1/translator/support-languages';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4926e938bdmshbf0bd975f679b3fp11df43jsn6d9306e6135b',
            'X-RapidAPI-Host': 'aibit-translator.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        result.forEach(lang => {
            let inputOption = document.createElement('option');
            inputOption.value = lang.code;
            inputOption.textContent = lang.language;
            let outputOption = document.createElement('option');
            outputOption.value = lang.code;
            outputOption.textContent = lang.language;
            inputLanguage.append(inputOption);
            outputLanguage.append(outputOption);
        });
    } catch (error) {
        console.error(error);
    }
}


async function translate (event) {
    event.preventDefault();
    
    const url = 'https://aibit-translator.p.rapidapi.com/api/v1/translator/text';
    const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '4926e938bdmshbf0bd975f679b3fp11df43jsn6d9306e6135b',
		'X-RapidAPI-Host': 'aibit-translator.p.rapidapi.com'
	},
	body: new URLSearchParams({
		from: String(inputLanguage.value),
		to: String(outputLanguage.value),
		text: String(incomigText.value)
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	const translation = document.createElement('p');
    translation.textContent = result.trans;
    outputText.insertAdjacentElement('afterbegin', translation);
} catch (error) {
	console.error(error);
}
};




const incomigText = document.querySelector('#incoming-text');
const outputText = document.querySelector('.output-text');
const form = document.querySelector('.text-form');
const inputLanguage = document.querySelector('#input-language');
const outputLanguage = document.querySelector('#output-language');
getLanguages();
form.addEventListener('submit', translate);



