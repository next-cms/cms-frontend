import React, {useCallback, useContext, useEffect, useState} from "react";
import Gallery from "react-photo-gallery";
import Carousel, {Modal, ModalGateway} from "react-images";
import SelectedImage from "./MediaSelectionHandle";
import {Button, Checkbox, Col, Icon, message, Row, Upload} from "antd";
import {useQuery} from "graphql-hooks";
import {ALL_MEDIA} from "../../../utils/GraphQLConstants";
import {handleGraphQLAPIErrors} from "../../../utils/helpers";
import getConfig from "next/config";
import {AuthContext} from "../../../contexts/AuthContextProvider";
import * as PropTypes from "prop-types";
import {DataStoreContext} from "../../../contexts/DataStoreContextProvider";

const {publicRuntimeConfig} = getConfig();
const {UPLOAD_IMAGE_URL, API_BASE_URL} = publicRuntimeConfig;

const MediaGallery = ({isSingleSelect, onSelect}) => {
    const authContext = useContext(AuthContext);
    const dataStoreContext = useContext(DataStoreContext);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedImage, setSelectedImage] = useState({});

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(20);

    const projectId = dataStoreContext.currentProject.id;

    const {loading, error, data, refetch} = useQuery(
        ALL_MEDIA,
        {
            variables: {projectId, skip, limit},
            updateData(prevData, data) {
                return {
                    ...data,
                    allMedia: {
                        data: [...prevData.allMedia.data, ...data.allMedia.data],
                        hasMore: data.allMedia.hasMore
                    }
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
            if (isSingleSelect) {
                setSelectedImage({
                    [index]: photo
                });
            } else {
                setSelectedImage((prevState) => ({
                    ...prevState,
                    [index]: photo
                }));
            }
        }

        if (onSelect) {
            onSelect({...photo, src: `${API_BASE_URL}${photo.src}`});
        }
    };

    const onUploadChange = ({file, fileList}) => {
        console.log("successfully uploaded all image.", file, fileList);
        if (file.status !== "uploading") {
            console.log(file, fileList);
            refetch();
        }
    };

    const onDeleteClick = (e) => {
        console.log("successfully deleted all image.", selectedImage);
    };

    const onClickLoadMore = (e) => {
        setSkip(skip + limit);
    };

    const imageRenderer = useCallback(
        ({index, left, top, key, photo}) => (
            <SelectedImage
                selectAll={selectAll}
                singleSelect={isSingleSelect}
                selectedItems={selectedImage}
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
        [selectAll, selectedImage]
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
    if (!allMedia) return null;

    return (
        <div style={{padding: "10px", width: "100%"}}>
            <Row style={{marginBottom: "10px"}} type="flex" justify="space-between">
                <Col>
                    {!isSingleSelect && <Checkbox onChange={toggleSelectAll} checked={selectAll}>Select all</Checkbox>}
                </Col>
                <Col>
                    <Button onClick={onDeleteClick} type="danger">Delete</Button>
                    <Upload action={`${UPLOAD_IMAGE_URL}?projectId=${projectId}`} showUploadList={false} multiple={true}
                            onChange={onUploadChange} headers={{Authorization: `Bearer ${authContext.token}`}}>
                        <Button style={{marginLeft: "5px"}} type="primary">
                            <Icon type="upload"/> Upload
                        </Button>
                    </Upload>
                </Col>
            </Row>
            <div style={{maxHeight: "calc(100vh - 175px)", overflowY: "auto"}}>
                <Gallery photos={allMedia.data || []} renderImage={imageRenderer}/>
                {allMedia.hasMore &&
                <Button onClick={onClickLoadMore} ghost={true} type="primary" style={{marginTop: "10px"}}>Load
                    More</Button>}
            </div>
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={allMedia.data.map(photo => ({
                                src: `${API_BASE_URL}${photo.src}`,
                                srcset: photo.srcSet,
                                caption: photo.name
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>

            <style jsx global>
                {`
                    .css-yrspe {
                        z-index: 1001 !important;
                    }

                    .css-1rbq2qy {
                        z-index: 1001 !important;
                    }
                `}
            </style>

        </div>
    );
};

MediaGallery.propTypes = {
    isSingleSelect: PropTypes.bool,
    onSelect: PropTypes.func
};

export default MediaGallery;
