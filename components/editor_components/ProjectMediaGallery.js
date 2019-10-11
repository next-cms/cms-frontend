import React, { useState, useCallback, useEffect} from "react";

import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import SelectedImage from "../common/image_gallery/SelectedImage";
import { Checkbox, Row, Col, Button } from "antd";

function ProjectMediaGallery({ photos }) {

    const [selectAll, setSelectAll] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    
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

        if(!isSelected) {

            setSelectedImage(prevState => {
                const a = {...prevState};
                delete a[index];
                return a;
            });

        } else {

            setSelectedImage((prevState)=>({
                ...prevState,
                [index]: photo.src
            }))

        }
    }

    const onUploadClick = () => {
        console.log("successfully uploaded all image.", selectedImage);
    }
    
    const onDeleteClick = () => {
        console.log("successfully deleted all image.", selectedImage);
    }

    const imageRenderer = useCallback(
        ({ index, left, top, key, photo }) => (
            <SelectedImage
                selected={selectAll ? true : false}
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

    return (
        <div style={{
            padding: "10px"
        }}>
            <Row style={{marginBottom: "10px"}} type="flex" justify="space-between">
                <Col>
                    <Checkbox onChange={toggleSelectAll} checked={selectAll} >Select all</Checkbox>
                </Col>
                <Col>
                    <Button onClick={onDeleteClick} type="danger">Delete</Button>
                    <Button onClick={onUploadClick} style={{marginLeft: "5px"}} type="primary">Upload</Button>
                </Col>
            </Row>
            <Gallery photos={photos} renderImage={imageRenderer} />
            <ModalGateway>
                {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                    <Carousel
                    currentIndex={currentImage}
                    views={photos.map(x => ({
                        ...x,
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

ProjectMediaGallery.defaultProps = {
    photos: [
        {
            src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
            width: 1,
            height: 1
        },
        {
            src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
            width: 3,
            height: 4
        },
        {
            src: "https://source.unsplash.com/PpOHJezOalU/800x599",
            width: 4,
            height: 3
        },
        {
            src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
            width: 4,
            height: 3
        }
    ]
}

export default ProjectMediaGallery;
