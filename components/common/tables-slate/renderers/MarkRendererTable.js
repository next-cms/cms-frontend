/* eslint-disable react/react-in-jsx-scope */
const renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
        case "bold":
            return <strong {...attributes}>{children}</strong>;
        default:
            return next();
    }
};
export default renderMark;