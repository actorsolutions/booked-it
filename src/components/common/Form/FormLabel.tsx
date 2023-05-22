interface Props {
  cyTag: string;
  labelText: string;
  htmlFor: string;
}

export const FormLabel = (props: Props) => {
  const { cyTag, labelText, htmlFor } = props;
  return (
    <label htmlFor={htmlFor} data-cy={cyTag}>
      {" "}
      {labelText}
    </label>
  );
};
