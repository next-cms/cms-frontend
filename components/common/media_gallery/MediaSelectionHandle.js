import React, {useEffect, useState} from "react";
import {Icon} from "antd";
import getConfig from "next/config";
import * as PropTypes from "prop-types";

const {publicRuntimeConfig} = getConfig();
const {API_BASE_URL} = publicRuntimeConfig;

const imgStyle = {
    transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};

const selectedImgStyle = {
    transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
    transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};

const cont = {
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#eee",
    cursor: "pointer"
};

const SelectedImage = ({
                           index,
                           photo,
                           margin,
                           direction,
                           top,
                           left,
                           selectedAll,
                           singleSelect,
                           selectedItems,
                           onSelectPhoto,
                           onViewImage
                       }) => {
    const [isSelected, setIsSelected] = useState(selectedAll);

    const sx = (100 - (30 / photo.width) * 100) / 100;
    const sy = (100 - (30 / photo.height) * 100) / 100;

    selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;

    if (direction === "column") {
        cont.position = "absolute";
        cont.left = left;
        cont.top = top;
    }

    const handleOnSelectClick = () => {

        setIsSelected(!isSelected);
        onSelectPhoto(index, !isSelected, photo);

    };

    const handleOnViewClick = () => {
        onViewImage(index);
    };

    useEffect(() => {
        if (singleSelect) {
            setIsSelected(selectedItems[index]);
        } else {
            setIsSelected(selectedItems[index]);
            // onSelectPhoto(index, selectedAll, photo);
        }

    }, [selectedItems]);

    useEffect(() => {
        setIsSelected(selectedAll);
        onSelectPhoto(index, selectedAll, photo);
    }, [selectedAll]);

    return (
        <div
            style={{margin, height: photo.height, width: photo.width, ...cont}}
            className={!isSelected ? "gallery-item not-selected" : "gallery-item"}
        >

            <Icon
                className="select-icon"
                type="check-circle"
                theme="filled"
                onClick={handleOnSelectClick}
                style={{
                    position: "absolute",
                    visibility: `${isSelected ? "visible" : ""}`,
                    color: `${isSelected ? "#3e90ff" : "#eeeeee"}`,
                    backgroundColor: `${isSelected ? "#eeeeee" : "#3e90ff"}`,
                    top: "5px",
                    left: "5px",
                    fontSize: "20px",
                    borderRadius: "50%",
                    zIndex: "1"
                }}
            />
            <img
                alt={photo.name}
                style={
                    isSelected ? {...imgStyle, ...selectedImgStyle} : {...imgStyle}
                }
                {...photo}
                src={`${API_BASE_URL}${photo.src}`}
                onClick={handleOnViewClick}
            />
            <style jsx global>
                {
                    `
                    .gallery-item .select-icon {
                        visibility: hidden;
                    }

                    .gallery-item:hover .select-icon {
                        visibility: visible;
                    }

                    .not-selected:hover{outline:2px solid #06befa};
                `
                }
            </style>
        </div>
    );
};

SelectedImage.propTypes = {
    index: PropTypes.number,
    photo: PropTypes.object,
    margin: PropTypes.string,
    direction: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string,
    selected: PropTypes.bool,
    onSelectPhoto: PropTypes.func,
    onViewImage: PropTypes.func
};

export default SelectedImage;
