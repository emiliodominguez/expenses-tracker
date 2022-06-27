//#region className
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
//#endregion

//#region getCardBrand
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
export function getCardBrand(number?: number | string): CardBrand | null {
	if (!number) return null;

	if (typeof number === 'string') number = parseInt(number);

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
//#endregion

//#region Color helpers
/**
 * Converts an hexadecimal color to RGB
 * @param hex The color HEX
 * @returns The RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
	const shortHexRegExp = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shortHexRegExp, (_, r, g, b) => r + r + g + g + b + b);
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	if (!result) throw Error('A valid HEX must be provided');

	return {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	};
}

/**
 * Converts a color component to hex
 * @param component The component
 * @returns The converted component
 */
function componentToHex(component: number): string {
	var hex = component.toString(16);
	return hex.length === 1 ? '0' + hex : hex;
}

/**
 * Converts a RGB color to hexadecimal
 * @param r The R component
 * @param g The G component
 * @param b The B component
 * @returns The HEX color
 */
export function rgbToHex(r: number, g: number, b: number): string {
	return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * Generates a color scale based on one color
 * @param colorHex The HEX color
 * @param steps The amount of steps
 * @returns The color scale
 */
export function generateColorScale(colorHex: string, steps: number = 10): string[] {
	const offset = 20;
	const scale: string[] = [];
	let { r, g, b } = hexToRgb(colorHex);

	for (let i = 0; i < steps; i++) {
		r -= offset;
		g -= offset;
		b -= offset;
		scale.push(rgbToHex(clamp(r, 0, 255), clamp(g, 0, 255), clamp(b, 0, 255)));
	}

	return scale;
}
//#endregion

//#region Math helpers
/**
 * Clamps a number between min and max values
 * @param number The number
 * @param min The min value
 * @param max The max value
 * @returns The result
 */
export function clamp(number: number, min: number, max: number): number {
	return Math.max(min, Math.min(number, max));
}
//#endregion
