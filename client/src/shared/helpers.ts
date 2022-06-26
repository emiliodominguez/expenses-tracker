type CardBrand = { name: string; asset: string };

const cardTypesRegExps = Object.freeze({
	visa: /^4/,
	visaElectron: /^(4026|417500|4508|4844|491(3|7))/,
	masterCard: /^5[1-5]/,
	amex: /^3[47]/,
	diners: /^36/,
	dinersCarteBlanche: /^30[0-5]/
});

/**
 * Gets a card's brand based on its number
 * @param number The card number
 * @returns The card's brand
 */
export function getCardBrand(number?: number): CardBrand | null {
	if (!number) return null;

	const cardNumber = number.toString();

	switch (true) {
		case !!cardNumber.match(new RegExp(cardTypesRegExps.visa)):
			return { name: 'Visa', asset: 'visa.png' };
		case !!cardNumber.match(new RegExp(cardTypesRegExps.visaElectron)):
			return { name: 'Visa Electron ', asset: 'visa.png' };
		case !!cardNumber.match(new RegExp(cardTypesRegExps.masterCard)):
			return { name: 'Mastercard', asset: 'mastercard.png' };
		case !!cardNumber.match(new RegExp(cardTypesRegExps.amex)):
			return { name: 'AMEX', asset: 'amex.png' };
		case !!cardNumber.match(new RegExp(cardTypesRegExps.diners)):
			return { name: 'Diners', asset: 'dinners.png' };
		case !!cardNumber.match(new RegExp(cardTypesRegExps.dinersCarteBlanche)):
			return { name: 'Diners - Carte Blanche', asset: 'dinners.png' };
		default:
			return null;
	}
}

type ClassName = { className: string };

/**
 * A helper function to handle class name conditions easily.
 * Receives an object containing strings or an object with the CSS class as key
 * and a condition to add or remove it as value.
 * @param classNames - The classnames object
 * @returns The classes separated by a space
 */
export function className(...classNames: any): ClassName {
	const classes = [];

	for (const className of classNames) {
		if (typeof className === 'object') {
			for (const key in className) {
				if (className.hasOwnProperty(key) && className[key]) {
					classes.push(key);
				}
			}
		} else {
			classes.push(className);
		}
	}

	return { className: classes.join(' ') };
}

/**
 * Masks any given input
 * @param input The input
 * @param mask The mask
 * @param maskCharacter The mask character
 * @param fallbackCharacter A fallback character in case of undesired white spaces
 * @returns The masked input
 */
export function maskInput(input: string, mask?: string, maskCharacter: string = '*', fallbackCharacter: string = '_'): string {
	if (!mask) return input;

	let index = 0;
	const numeric = input.replaceAll(/[^\d]/g, '');
	const formatted = mask.split('').map(character => {
		if (character === maskCharacter) {
			character = numeric[index] ?? fallbackCharacter;
			index++;
		}

		return character;
	});

	return formatted.join('');
}
