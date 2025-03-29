export interface ICustomRangeInputProps extends IOnChangeEventProps {
  onChange: (data: IOnChangeEventProps) => void;
  reload: number;
}

export interface IOnChangeEventProps {
  min: number;
  max: number;
}
