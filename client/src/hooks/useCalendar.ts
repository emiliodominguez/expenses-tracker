import type CalendarService from '@app/services/calendar.service';
import { Services } from '@app/services/services.enum';
import { useInjection } from 'inversify-react';
import { useState } from 'react';

interface IUseCalendarPayload {
	currentMonth: number;
	currentYear: number;
	months: string[];
	weekDays: string[];
	monthDays: number;
	monthFirstDay: number;
	goToMonth: (month: number) => void;
	goToNextMonth: () => void;
	goToPreviousMonth: () => void;
	goToYear: (year: number) => void;
}

/**
 * A hook to use a calendar
 */
export function useCalendar(): IUseCalendarPayload {
	const calendarService = useInjection<CalendarService>(Services.CalendarService);
	const [currentMonth, setCurrentMonth] = useState<number>(calendarService.currentMonth);
	const [currentYear, setCurrentYear] = useState<number>(calendarService.currentYear);

	function goToMonth(month: number): void {
		calendarService.goToMonth(month);
		setCurrentMonth(month);
	}

	function goToNextMonth(): void {
		calendarService.goToNextMonth();
		setCurrentMonth(calendarService.currentMonth);
	}

	function goToPreviousMonth(): void {
		calendarService.goToPreviousMonth();
		setCurrentMonth(calendarService.currentMonth);
	}

	function goToYear(year: number): void {
		calendarService.goToYear(year);
		setCurrentYear(year);
	}

	return {
		currentMonth,
		currentYear,
		months: calendarService.localizedMonths,
		weekDays: calendarService.localizedWeekDays,
		monthDays: calendarService.getNumberOfDaysInAMonth(currentMonth, currentYear),
		monthFirstDay: calendarService.getFirstDayOfAMonth(),
		goToMonth,
		goToNextMonth,
		goToPreviousMonth,
		goToYear
	};
}
