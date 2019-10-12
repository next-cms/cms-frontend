import React, {useCallback, useContext, useEffect, useState} from "react";
import Gallery from "react-photo-gallery";
import Carousel, {Modal, ModalGateway} from "react-images";
import SelectedImage from "./MediaSelectionHandle";
import {Button, Checkbox, Col, Icon, message, Row, Upload} from "antd";
import {useQuery} from "graphql-hooks";
import {ALL_MEDIA} from "../../../utils/GraphQLConstants";
import {handleGraphQLAPIErrors} from "../../../utils/helpers";
import {useRouter} from "next/router";
import getConfig from "next/config";
import {AuthContext} from "../../../contexts/AuthContextProvider";

const {publicRuntimeConfig} = getConfig();
const {UPLOAD_IMAGE_URL} = publicRuntimeConfig;

const MediaGallery = ({}) => {
    const authContext = useContext(AuthContext);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(20);

    const router = useRouter();
    const projectId = router.query.projectId;

    const {loading, error, data, refetch} = useQuery(
        ALL_MEDIA,
        {
            variables: {projectId, skip, limit: limit},
            updateData(prevData, data) {
                return {
                    ...data,
                    allMedia: [...prevData.allMedia, ...data.allMedia]
                };
            }
        }
    );

    const openLightbox = (index) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    };

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    const onSelectPhoto = (index, isSelected, photo) => {

        if (!isSelected) {

            setSelectedImage(prevState => {
                const a = {...prevState};
                delete a[index];
                return a;
            });

        } else {

            setSelectedImage((prevState) => ({
                ...prevState,
                [index]: photo
            }));

        }
    };

    const onUploadChange = ({file, fileList}) => {
        console.log("successfully uploaded all image.", file, fileList);
        if (file.status !== "uploading") {
            console.log(file, fileList);
        }
    };

    const onDeleteClick = () => {
        console.log("successfully deleted all image.", selectedImage);
    };

    const imageRenderer = useCallback(
        ({index, left, top, key, photo}) => (
            <SelectedImage
                selected={selectAll}
                key={key}
                margin={"2px"}
                index={index}
                photo={photo}
                left={left}
                top={top}
                onSelectPhoto={onSelectPhoto}
                onViewImage={openLightbox}
            />
        ),
        [selectAll]
    );

    useEffect(() => {
        if (error) {
            handleGraphQLAPIErrors(error);
        }
        console.log("loading:", loading);
        let hideMessage;
        if (loading) {
            hideMessage && hideMessage();
            hideMessage = message.loading("Loading...", 0);
        } else {
            hideMessage && hideMessage();
            hideMessage = null;
        }
        if (hideMessage) return hideMessage;
    }, [error, loading]);

    if (error || !data) return null;
    const {allMedia} = data;

    console.log("allMedia", allMedia);

    return (
        <div style={{padding: "10px", width: "100%"}}>
            <Row style={{marginBottom: "10px"}} type="flex" justify="space-between">
                <Col>
                    <Checkbox onChange={toggleSelectAll} checked={selectAll}>Select all</Checkbox>
                </Col>
                <Col>
                    <Button onClick={onDeleteClick} type="danger">Delete</Button>
                    <Upload action={`${UPLOAD_IMAGE_URL}?projectId=${projectId}`} showUploadList={false}
                            onChange={onUploadChange} headers={{Authorization: `Bearer ${authContext.token}`}}>
                        <Button style={{marginLeft: "5px"}} type="primary">
                            <Icon type="upload"/> Upload
                        </Button>
                    </Upload>
                </Col>
            </Row>
            <Gallery photos={allMedia || []} renderImage={imageRenderer}/>
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={allMedia.map(x => ({
                                src: x,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
};

// MediaGallery.defaultProps = {
//     photos: [
//         {
//             src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
//             width: 4,
//             height: 3
//         },
//         {
//             src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
//             width: 1,
//             height: 1
//         },
//         {
//             src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
//             width: 3,
//             height: 4
//         },
//         {
//             src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
//             width: 3,
//             height: 4
//         },
//         {
//             src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
//             width: 3,
//             height: 4
//         },
//         {
//             src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
//             width: 4,
//             height: 3
//         },
//         {
//             src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
//             width: 3,
//             height: 4
//         },
//         {
//             src: "https://source.unsplash.com/PpOHJezOalU/800x599",
//             width: 4,
//             height: 3
//         },
//         {
//             src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
//             width: 4,
//             height: 3
//         }
//     ]
// };

export default MediaGallery;
