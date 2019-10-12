import React, {useEffect, useState} from "react";
import {Collapse, message, Row, Table, Typography} from "antd";
import * as PropTypes from "prop-types";
import {useQuery} from "graphql-hooks";
import {withRouter} from "next/router";
import {handleGraphQLAPIErrors} from "../../utils/helpers";
import InfiniteScroll from "react-infinite-scroller";

const {Title, Paragraph, Text} = Typography;

const AvailableComponentList = ({router, query}) => {
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(20);
    const [infiniteLoading, setInfiniteLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const projectId = router.query.projectId;

    const {loading, error, data, refetch} = useQuery(
        query,
        {
            variables: {projectId, skip, limit: limit},
            updateData(prevData, data) {
                return {
                    ...data,
                    allAvailableComponents: [...prevData.allAvailableComponents, ...data.allAvailableComponents]
                };
            },
            skipCache: true
        }
    );

    useEffect(() => {
        if (error) {
            handleGraphQLAPIErrors(error);
        }
        console.log("loading:", loading);
        let hideMessage;
        if (loading) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading available components...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
            setInfiniteLoading(false);
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    if (error || !data) return <Row gutter={4}/>;
    const {allAvailableComponents, _allAvailableComponentsMeta} = data;

    console.log("allAvailableComponents", allAvailableComponents);

    const handleInfiniteOnLoad = () => {
        setInfiniteLoading(true);
        if (allAvailableComponents.length >= _allAvailableComponentsMeta.count) {
            setInfiniteLoading(false);
            setHasMore(false);
            return;
        }
        setSkip(skip + limit);
    };

    const getComponents = items => {
        if (!items) return null;
        return items.map(item => {
            return (<Collapse.Panel header={item.name} key={item.id}>
                <Title level={4}><b>{item.name}</b> from {item.vendor}</Title>
                {item.props && <React.Fragment>
                    <div><b>Props:</b></div>
                    <Table pagination={false} dataSource={Object.keys(item.props).map(key => {
                        return {
                            key: key,
                            name: key,
                            type: item.props[key].type,
                            options: item.props[key].options && item.props[key].options.join(", "),
                            required: item.props[key].isRequired ? "Yes" : "No",
                            description: item.props[key].description
                        };
                    })} columns={[
                        {
                            title: "Name",
                            dataIndex: "name",
                            key: "name",
                        },
                        {
                            title: "Type",
                            dataIndex: "type",
                            key: "type",
                        },
                        {
                            title: "Options",
                            dataIndex: "options",
                            key: "options",
                        },
                        {
                            title: "Required",
                            dataIndex: "required",
                            key: "required",
                        },
                        {
                            title: "Description",
                            dataIndex: "description",
                            key: "description",
                            render: (text, record) => (
                                <span dangerouslySetInnerHTML={{__html: text}}/>
                            )
                        }
                    ]}/>
                </React.Fragment>}
            </Collapse.Panel>);
        });
    };

    return (
        <InfiniteScroll initialLoad={false}
                        pageStart={0}
                        loadMore={handleInfiniteOnLoad}
                        hasMore={!infiniteLoading && hasMore}
                        useWindow={true}
                        threshold={1000}>
            <Collapse accordion>
                {getComponents(allAvailableComponents)}
            </Collapse>
        </InfiniteScroll>
    );
};

AvailableComponentList.propTypes = {
    router: PropTypes.object,
    query: PropTypes.string
};

export default withRouter(AvailableComponentList);
