interface Props {
    labelCypressTag: string;
    labelText: string;
    htmlFor: string
}

export const FormLabel = (props: Props) => {
    const { labelCypressTag, labelText, htmlFor } = props;
    return (
        <label htmlFor={htmlFor} data-cy={labelCypressTag}> {labelText}</label>
    );
};
