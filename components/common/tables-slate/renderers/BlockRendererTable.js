/* eslint-disable react/react-in-jsx-scope */
const renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
        case "table":
            return (
                <table>
                    <tbody {...attributes}>{children}</tbody>
                </table>
            );
        case "table-row":
            return <tr {...attributes}>{children}</tr>;
        case "table-cell":
            return <td {...attributes}>{children}</td>;
        default:
            return next();
    }
};
export default renderBlock;