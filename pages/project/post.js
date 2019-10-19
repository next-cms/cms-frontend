import React, {useEffect} from "react";
import PageWrapper from "../../components/common/PageWrapper";
import RichTextEditor from "../../components/common/rich_text_editor/slate/RichTextEditor";
import {useManualQuery, useMutation} from "graphql-hooks";
import {ADD_DATA_OBJECT, DATA_OBJECT_BY_ID, UPDATE_DATA_OBJECT} from "../../utils/GraphQLConstants";
import Router, {useRouter} from "next/router";
import {message} from "antd";
import {handleGraphQLAPIErrors} from "../../utils/helpers";
import {withAuthSync} from "../../utils/withAuthSync";
import RoutesInfo from "../../constants/RoutesInfo";

const Post = () => {
    const router = useRouter();

    const projectId = router.query.projectId;
    let postId = router.query.postId;

    const [addDataObject] = useMutation(ADD_DATA_OBJECT);
    const [updateDataObject] = useMutation(UPDATE_DATA_OBJECT);

    const [fetchDataObject, {loading, error, data}] = useManualQuery(DATA_OBJECT_BY_ID, {
        variables: {projectId, postId}
    });

    useEffect(() => {
        if (postId && postId !== "new") {
            const res = fetchDataObject();
        }
    }, [postId]);

    useEffect(() => {
        if (error) {
            handleGraphQLAPIErrors(error);
        }
    }, [error]);

    if (loading) return null;

    // if (error || !data) return null;
    const {dataObjectsByPostId} = data || {};

    console.log(dataObjectsByPostId);
    if (!dataObjectsByPostId && postId !== "new") {
        return null;
    }

    const onSave = async (post) => {
        console.log(post);
        const hideMessage = message.loading("Saving new post...", 0);
        let result;
        const {modifiedAt, createdAt, ...dataObject} = post;
        if (post.id && post.id !== "new") {
            result = await updateDataObject({
                variables: {
                    dataObject: dataObject,
                    projectId
                }
            });
        } else {
            result = await addDataObject({
                variables: {
                    dataObject,
                    projectId
                }
            });
        }
        if (!result.error) {
            message.success("Saved!");
            if (postId === "new") {
                if (result.addDataObject) {
                    postId = result.addDataObject.id;
                } else if (result.updateDataObject) {
                    postId = result.updateDataObject.id;
                }
                Router.push(`${RoutesInfo.Post.slug}?projectId=${projectId}&postId=${postId}`,
                    `${RoutesInfo.Post.slug}?projectId=${projectId}&postId=${postId}`);
            }
        } else {
            handleGraphQLAPIErrors(result.error);
        }
        hideMessage && hideMessage();
    };

    return (
        <PageWrapper style={{
            display: "flex",
            flex: "0 0 100%",
            flexDirection: "column",
            minHeight: "calc(100vh - 80px)",
            padding: "20px"
        }}>
            <div className="SlateEditor">
                <RichTextEditor onSave={onSave} postId={postId} projectId={projectId} post={dataObjectsByPostId}/>
                <style jsx global>{`
                .SlateEditor h1 {
                    font-family: "Times New Roman";
                    color: #3988af;
                    font-size: 55px;
                    line-height: 66px;
                    margin-bottom: 0px;
                    font-weight: 700;
                    font-style: normal;
                    text-transform: none;
                    letter-spacing: 1px;
                }
                .SlateEditor h2 {
                    font-family: "Times New Roman";
                    color: #3988af;
                    font-size: 35px;
                    line-height: 46px;
                    margin-bottom: 0px;
                    font-weight: 700;
                    font-style: normal;
                    text-transform: none;
                    letter-spacing: 1px;
                }
                .SlateEditor p {
                    color: #151e24;
                    font-size: 16px;
                    margin-bottom: 10px;
                }
                .SlateEditor table {
                    width: 100%;
                }
                .SlateEditor tr:first-child td {
                    background-color: #F8F8F8;
                }
                .SlateEditor tr {
                    height: 45px;
                }
            `}</style>
            </div>
        </PageWrapper>
    );
};

export default withAuthSync(Post);
