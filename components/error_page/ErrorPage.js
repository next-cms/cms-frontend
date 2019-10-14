import React from "react";
import {Button} from "antd";
import Link from "next/link";
import ErrorLayout from "../layout/error_layout/ErrorLayout";
import * as PropTypes from "prop-types";
import RoutesInfo from "../../constants/RoutesInfo";

const ErrorPage = ({status, subTitle}) => {
    return (
        <ErrorLayout status={status} subTitle={subTitle}>
            <Link href={RoutesInfo.Dashboard.path}>
                <Button>
                    Go To Dashboard
                </Button>
            </Link>
        </ErrorLayout>
    );
};

ErrorPage.propTypes = {
    status: PropTypes.number,
    subTitle: PropTypes.string
};

export default ErrorPage;
