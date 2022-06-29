import { injectable } from 'inversify';
import { capitalize } from '@app/shared/helpers';

@injectable()
export default class CalendarService {
	private _locale: string;

	private _today: Date;

	private _currentMonth: number;

	private _currentYear: number;

	private _localizedMonths: string[];

	private _localizedWeekDays: string[];

	get currentMonth(): number {
		return this._currentMonth;
	}

	get currentYear(): number {
		return this._currentYear;
	}

	get localizedMonths(): string[] {
		return this._localizedMonths;
	}

	get localizedWeekDays(): string[] {
		return this._localizedWeekDays;
	}

	constructor(/** locale?: string */) {
		// this._locale = locale || window.navigator.language || 'en-us';
		this._locale = 'en-us';
		this._today = new Date();
		this._today.setHours(0, 0, 0, 0);
		this._currentMonth = this._today.getMonth();
		this._currentYear = this._today.getFullYear();
		this._localizedMonths = this.getMonthsNames({ month: 'long' });
		this._localizedWeekDays = this.getWeekDaysNames({ weekday: 'short' });
	}

	/**
	 * Checks if the current day is today
	 * @param day - The day
	 */
	checkIfToday(day: number): boolean {
		return day === this._today.getDate() && this._currentMonth === this._today.getMonth() && this._currentYear === this._today.getFullYear();
	}

	/**
	 * Checks if current month and year
	 */
	checkIfCurrentMonthAndYear(): boolean {
		const currentMonth = this._today.getMonth();
		const currentYear = this._today.getFullYear();
		return this._currentMonth === currentMonth && this._currentYear === currentYear;
	}

	/**
	 * Restores the date to the current values
	 */
	restoreDate(): void {
		this._currentMonth = this._today.getMonth();
		this._currentYear = this._today.getFullYear();
	}

	/**
	 * Jumps to an specific year
	 * @param year - The year
	 */
	goToYear(year: number): void {
		this._currentYear = year;
	}

	/**
	 * Goes to the previous month
	 */
	goToPreviousMonth(): void {
		this._currentMonth = this._currentMonth === 0 ? 11 : this._currentMonth - 1;
	}

	/**
	 * Goes to the next month
	 */
	goToNextMonth(): void {
		this._currentMonth = (this._currentMonth + 1) % 12;
	}

	/**
	 * Jumps to an specific month
	 * @param month - The month
	 */
	goToMonth(month: number): void {
		this._currentMonth = month;
	}

	/**
	 * @param month - The month
	 * @param year - The year
	 * @returns The first day on a month
	 */
	getFirstDayOfAMonth(): number {
		return new Date(this._currentYear, this._currentMonth).getDay();
	}

	/**
	 * @param month - The month
	 * @param year - The year
	 * @returns The number of days in a month
	 */
	getNumberOfDaysInAMonth(month: number, year: number): number {
		/**
            The function new Date(year, month, 32) returns the 32nd day
            after the month started. Subtracting that date from 32,
            gets the final day of that month.
        */
		return 32 - new Date(year, month, 32).getDate();
	}

	/**
	 * @param month - The month index
	 * @param options - The format options
	 * @returns The localized month name
	 */
	getLocalizedMonthName(month: number, options?: Intl.DateTimeFormatOptions): string {
		let localizedMonths = this._localizedMonths;
		if (options) localizedMonths = this.getMonthsNames(options);
		return localizedMonths[month];
	}

	/**
	 * @param day - The day index
	 * @param options - The format options
	 * @returns The localized day name
	 */
	getLocalizedWeekDayName(day: number, options?: Intl.DateTimeFormatOptions): string {
		let localizedWeekDays = this.localizedWeekDays;
		if (options) localizedWeekDays = this.getWeekDaysNames(options);
		return localizedWeekDays[day];
	}

	/**
	 * @param day - The day
	 * @param month - The month
	 * @param year - The year
	 * @param options - The format options
	 * @returns A localized date string
	 */
	getLocalizedDate(day: number, month: number, year: number, options?: Intl.DateTimeFormatOptions): string {
		const date = new Date();
		const defaultOptions: Intl.DateTimeFormatOptions = {
			weekday: 'short',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			timeZone: 'UTC'
		};

		date.setDate(day);
		date.setMonth(month);
		date.setFullYear(year);
		return date.toLocaleDateString(this._locale, { ...options, ...defaultOptions });
	}

	/**
	 * @param options - The format options
	 * @returns An array of localized month names
	 */
	private getMonthsNames(options?: Intl.DateTimeFormatOptions): string[] {
		const date = new Date();
		const months: string[] = [];

		for (let i = 0; i < 12; i++) {
			date.setMonth(i);
			const month = date.toLocaleString(this._locale, options);
			months.push(capitalize(month));
		}

		return months;
	}

	/**
	 * @param options - The format options
	 * @returns An array of localized day names
	 */
	private getWeekDaysNames(options?: Intl.DateTimeFormatOptions): string[] {
		const date = new Date();
		const days: string[] = [];
		const daysOrder = [6, 7, 1, 2, 3, 4, 5]; // Starts on monday

		for (const order of daysOrder) {
			date.setDate(order);
			const day = date.toLocaleString(this._locale, options);
			days.push(capitalize(day));
		}

		return days;
	}
}
