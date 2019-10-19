import React, {useEffect} from "react";
import PageWrapper from "../../components/common/PageWrapper";
import RichTextEditor from "../../components/common/rich_text_editor/slate/RichTextEditor";
import {useManualQuery, useMutation} from "graphql-hooks";
import {ADD_DATA_OBJECT, DATA_OBJECT_BY_SLUG, UPDATE_DATA_OBJECT} from "../../utils/GraphQLConstants";
import {useRouter} from "next/router";
import {message} from "antd";
import {handleGraphQLAPIErrors} from "../../utils/helpers";
import {withAuthSync} from "../../utils/withAuthSync";

const Post = () => {
    const router = useRouter();

    const projectId = router.query.projectId;
    const postId = router.query.postId;

    const [addDataObject] = useMutation(ADD_DATA_OBJECT);
    const [updateDataObject] = useMutation(UPDATE_DATA_OBJECT);

    const [fetchDataObject, {loading, error, data}] = useManualQuery(DATA_OBJECT_BY_SLUG, {
        variables: {projectId, slug: "home"}
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
    const {dataObjectsBySlug} = data || {};

    console.log(dataObjectsBySlug);

    const onSave = async (post) => {
        console.log(post);
        const hideMessage = message.loading("Saving new post...", 0);
        let result;
        if (post.id && post.id !== "new") {
            result = await updateDataObject({
                variables: {
                    dataObject: post,
                    projectId
                }
            });
        } else {
            const {modifiedAt, createdAt, ...dataObject} = post;
            result = await addDataObject({
                variables: {
                    dataObject,
                    projectId
                }
            });
        }
        if (!result.error) {
            message.success("Saved!");
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
                <RichTextEditor onSave={onSave} postId={postId} projectId={projectId} post={dataObjectsBySlug}/>
                <style jsx global>{`
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
            `}</style>
            </div>
        </PageWrapper>
    );
};

export default withAuthSync(Post);
