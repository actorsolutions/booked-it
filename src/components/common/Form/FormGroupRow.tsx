import { ReactNode } from 'react';
interface Props {
  children: ReactNode;
  marginTop?: string;
}

export const FormGroupRow = (props: Props) => {
  const { children } = props;
  return (
    <>
      <div className={`form-group row mt-${props.marginTop || 0}`}>{children}</div>
    </>
  );
};
