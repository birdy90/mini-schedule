interface ScheduleDayItemBase {
  id?: string;
  title: string;
  regular: boolean;
  background: boolean;
}

export interface ScheduleDayItemPayload extends ScheduleDayItemBase {
  startDate: string;
  endDate: string;
}

export interface ScheduleDayItem extends ScheduleDayItemBase {
  startDate: Date;
  endDate: Date;
}

export interface ScheduleDayItemPayload extends ScheduleDayItemBase {
  startDate: string;
  endDate: string;
}

export type ItemTimeRange = [number, number];

export interface SimplifiedScheduleDayItem extends ScheduleDayItemBase {
  timeRange: ItemTimeRange;
  day: number;
}

export interface WeekProps {
  items: ScheduleDayItem[];
}

export interface DayDividerProps {
  index: number;
}

export interface DayProps {
  className?: string;
  index?: number;
  items?: SimplifiedScheduleDayItem[];
}
