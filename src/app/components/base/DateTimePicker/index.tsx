import {
  ITime,
  convertDateTimeToString,
  createDateTime,
  getTime,
} from "@utils/createDateTime";
import { InputButton } from "./components/SelectButton";
import { useCallback, useEffect, useState } from "react";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { pt, registerTranslation } from "react-native-paper-dates";
registerTranslation("pt-BR", pt);

export interface IDateTimePickerProps {
  value: Date;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  minDate?: Date;
  maxDate?: Date;
  onChange: (value?: Date) => void;
}

export const DateTimePicker = ({
  value,
  placeholder,
  disabled,
  required,
  error,
  minDate,
  maxDate,
  onChange,
}: IDateTimePickerProps) => {
  const [modalDateVisible, setModalDateVisible] = useState(false);
  const [modalTimeVisible, setModalTimeVisible] = useState(false);
  const [dateState, setDateState] = useState<Date | undefined>(value);
  const [timeState, setTimeState] = useState<ITime>(getTime(value));
  const [dateTimeState, setDateTimeState] = useState(
    convertDateTimeToString(value)
  );

  const [selectedDateState, setSelectedDateState] = useState(false);

  const onToggleDateModal = () => {
    setModalDateVisible(!modalDateVisible);
  };

  const onToggleTimeModal = () => {
    setModalTimeVisible(!modalTimeVisible);
  };

  const handleClear = () => {
    setDateTimeState("");
    setDateState(undefined);
    setTimeState({ hours: 0, minutes: 0 });
    onChange(undefined);
  };

  const onConfirmDate = useCallback(
    (params: { date: Date }) => {
      onToggleDateModal();
      setDateState(createDateTime(params.date));
      onToggleTimeModal();
      onChange(createDateTime(params.date));
    },
    [modalDateVisible, setDateState]
  );

  const onConfirmTime = useCallback(
    ({ hours, minutes }: ITime) => {
      onToggleTimeModal();
      setTimeState({ hours, minutes });
      dateState?.setHours(hours - 3, minutes, 0, 0);
      onChange(dateState);
    },
    [modalDateVisible, setTimeState]
  );

  useEffect(() => {
    setDateTimeState(convertDateTimeToString(value));
  }, [value]);

  return (
    <>
      <InputButton
        value={dateTimeState}
        placeholder={placeholder}
        handleClear={handleClear}
        onPress={onToggleDateModal}
        isDirty={Boolean(value)}
        disabled={disabled}
        required={required}
        error={error}
      />
      <DatePickerModal
        locale="pt-BR"
        mode="single"
        saveLabel="Pronto"
        saveLabelDisabled={!selectedDateState}
        presentationStyle="overFullScreen"
        label="Data da abertura"
        startDate={minDate ? createDateTime(minDate) : undefined}
        endDate={maxDate ? createDateTime(maxDate) : undefined}
        visible={modalDateVisible}
        onDismiss={onToggleDateModal}
        date={dateState}
        onChange={({ date }) => {
          if (date) setSelectedDateState(true);
        }}
        allowEditing={false}
        onConfirm={onConfirmDate}
        uppercase
      />
      <TimePickerModal
        locale="pt-BR"
        visible={modalTimeVisible}
        onDismiss={onToggleTimeModal}
        onConfirm={onConfirmTime}
        hours={timeState.hours}
        minutes={timeState.minutes}
        label="Horário da abertura"
        cancelLabel="Cancelar"
        confirmLabel="Pronto"
        use24HourClock
        uppercase
      />
    </>
  );
};
