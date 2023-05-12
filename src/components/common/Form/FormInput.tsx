import { Control, Controller, RegisterOptions, FieldValues } from 'react-hook-form';
import { AuditionFormData } from '../../AuditionForm/index'

interface Props<T extends FieldValues> {
  inputCypressTag: string;
  inputId: string;
  inputType?: string;
  control: Control<T>;
  field: string;
  rules?: RegisterOptions;
}

export const FormInput = (props: Props<AuditionFormData>) => {
  const { inputCypressTag, inputId, control, field, inputType } = props;
  return (
    <div>
      <Controller
        name={field}
        control={control}
        rules={{ ...props.rules }}
        render={({ field: { onChange } }) => {
          return (
            <input id={inputId} data-cy={inputCypressTag} onChange={onChange} type={inputType} />
          );
        }}
      />
    </div>
  );
};
