function validateCreditCard(cardNumber) {
    // Remove todos os espaços e caracteres não numéricos
    cardNumber = cardNumber.replace(/\D/g, '');

    // Expressões regulares para identificar as bandeiras de cartão de crédito
    const cardPatterns = {
        'Visa': /^4[0-9]{12}(?:[0-9]{3})?$/, // Começa com 4 e tem 13 ou 16 dígitos
        'MasterCard': /^(5[1-5][0-9]{14}|2[2-7][0-9]{14})$/, // Começa com 51-55 ou 22-27 e tem 16 dígitos
        'American Express': /^3[47][0-9]{13}$/, // Começa com 34 ou 37 e tem 15 dígitos
        'Diners Club': /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/, // Começa com 300-305, 36 ou 38 e tem 14 dígitos
        'Discover': /^6(?:011|5[0-9]{2})[0-9]{12}$/, // Começa com 6011 ou 65 e tem 16 dígitos
        'EnRoute': /^(2014|2149)[0-9]{11}$/, // Começa com 2014 ou 2149 e tem 15 dígitos
        'JCB': /^(?:2131|1800|35\d{3})\d{11}$/, // Começa com 2131, 1800 ou 35 e tem 15 ou 16 dígitos
        'Voyager': /^8699[0-9]{11}$/, // Começa com 8699 e tem 15 dígitos
        'Hipercard': /^(606282|3841)[0-9]{10,13}$/, // Começa com 606282 ou 3841 e tem entre 16 e 19 dígitos
        'Aura': /^50[0-9]{14,17}$/ // Começa com 50 e tem de 16 a 19 dígitos
    };

    // Função para validar o número do cartão usando o Algoritmo de Luhn
    function luhnCheck(cardNumber) {
        let sum = 0;
        let shouldDouble = false;

        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber[i], 10);

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        return sum % 10 === 0;
    }

    // Verificar a bandeira do cartão
    let cardBrand = 'Desconhecida';
    for (const [brand, pattern] of Object.entries(cardPatterns)) {
        if (pattern.test(cardNumber)) {
            cardBrand = brand;
            break;
        }
    }

    // Verificar se o número do cartão é válido pelo algoritmo de Luhn
    const isValid = luhnCheck(cardNumber);

    return {
        isValid,
        brand: cardBrand
    };
}

// Exemplo de uso
const cardsNumber = [
    '5129310200936118',
    '4916120593298210',
    '379868034522808',
    '38428460867566',
    '6011253404455551',
    '201419918028340',
    '3571991243908616',
    '869965298144365',
    '6062822262187866',
    '5061140021591168']
cardsNumber.forEach(cardNumber => {
    const validationResult = validateCreditCard(cardNumber);
    console.log(`Número do Cartão: ${cardNumber}`);
    console.log(`Válido: ${validationResult.isValid}`);
    console.log(`Bandeira: ${validationResult.brand}\n`);
});

