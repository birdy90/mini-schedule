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
  owner: string;
}

export interface SimplifiedScheduleDayItem extends ScheduleDayItemBase {
  timeRange: [number, number];
  day: number;
  preview?: boolean;
}

export interface WeekProps {
  items: ScheduleDayItem[];
}

export interface ScheduleItemProps {
  item: SimplifiedScheduleDayItem;
  timeInterval: [number, number];
  preview?: boolean;
}

export interface DayDividerProps {
  index: number;
  timeInterval: [number, number];
}

export interface DayProps {
  index?: number;
  items?: SimplifiedScheduleDayItem[];
}
