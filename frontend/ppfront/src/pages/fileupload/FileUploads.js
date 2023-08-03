import React, { useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import MUIDataTable from "mui-datatables";

import "./styles.css";
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";

import { ImageConfig } from "./ImageConfig";
import uploadImg from "./cloud-upload-regular-240.png";

const FileUploads = (props) => {
  const datatableData = [
    ["پوستر 6 ساعته تحریر 80 گرم"],
    ["پوستر 6 ساعته گلاسه 135 گرم"],
    ["تراکت تحریر 80 گرم ( 6 ساعته ) "],
    ["تراکت گلاسه 135 گرم ( 6 ساعته ) "],
    [" سربرگ تحریر 80 گرم ( 6 ساعته )"],
    ["سلفون براق ( 6 ساعته )"],
    ["سلفون مات ( 6 ساعته )"],
    ["لیبل سلفون براق ( 6 ساعته )"],
    ["اتیکت آویز گلاسه یووی "],
    ["کارت آویز دورگرد سلفون مات"],
  ];

  const classes = useStyles();

  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    console.log("New file:", newFile);
    if (newFile) {
      const updatedList = [...fileList, newFile];
      console.log("Updated fileList:", updatedList);
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };
  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < fileList.length; i++) {
      formData.append("files", fileList[i]);
    }
    if (formData.has("files")) {
      try {
        const response = await fetch(
          "https://backend.myhttpaddress.com/api/user/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          toast.success("فایل با موفقیت اپلود شد");
          const responseData = await response.json();
          console.log(responseData);
        } else {
          toast.error("آپلود فایل در چار مشکل شد");
        }
      } catch (error) {
        console.error("An error occurred while uploading the file:", error);
        toast.error("آپلود فایل در چار مشکل شد");
      }
    } else {
      console.log("Error uploading the file");
    }
  };
  return (
    <>
      <PageTitle />
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Widget title="آپلود فایل" disableWidgetMenu>
            <form>
              <div className="body_content_FileUpload">
                <div
                  ref={wrapperRef}
                  className="drop-file-input"
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                >
                  <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>بکشید و رها کنید</p>
                  </div>
                  <input type="file" value="" onInput={onFileDrop} />
                </div>
                {fileList.length > 0 ? (
                  <div className="drop-file-preview">
                    {fileList.map((item, index) => (
                      <div key={index} className="drop-file-preview__item">
                        <img
                          src={
                            ImageConfig[item.type.split("/")[1]] ||
                            ImageConfig["default"]
                          }
                          alt=""
                        />
                        <div className="drop-file-preview__item__info">
                          <p>{item.name}</p>
                          <p>{item.size}B</p>
                        </div>
                        <span
                          className="drop-file-preview__item__del"
                          onClick={() => fileRemove(item)}
                        >
                          x
                        </span>
                      </div>
                    ))}
                    <button
                      onClick={submitForm}
                      className="btn btn_file_upload "
                    >
                      آپلود فایل ها
                    </button>
                  </div>
                ) : null}
              </div>
            </form>
          </Widget>
        </Grid>
        <Grid item xs={12} md={12}>
          <Widget title="محاسبات" disableWidgetMenu>
            <PageTitle />
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <MUIDataTable
                  data={datatableData}
                  columns={["لطفا تایپ مورد نظر را انتخاب کنید"]}
                  options={{
                    filterType: "option",
                    textLabels: {
        pagination: {
          next: "بعدی >",
          previous: "< قبلی",
          rowsPerPage: "تعداد صفحات",
          displayRows: "از",
        },
      },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Widget
                  title="سربرگ تحریر 80 گرم ( 6 ساعته )"
                  disableWidgetMenu
                >
                  <div class="py-3 col-lg-12">
                    <div class="d-md-flex justify-content-between pb-2">
                      <span class="page-title mb-2">
                        پوستر 6 ساعته گلاسه 135 گرم
                      </span>
                    </div>
                    <div class="product-tour-quantity px-0 py-2 col">
                      <div class="d-flex align-items-center flex-wrap">
                        <div class="mt-3">
                          <div class="align-items-end">
                            <div class="g-0 font-size-12 pb-1 pb-2">تیراژ</div>
                            <div
                              role="group"
                              class="MuiToggleButtonGroup-root p-1 gap-1 border-black muirtl-1ya7z0e"
                            >
                              <button
                                class="MuiButtonBase-root MuiToggleButton-root MuiToggleButton-sizeMedium MuiToggleButton-standard MuiToggleButtonGroup-grouped MuiToggleButtonGroup-groupedHorizontal py-1 border-0 text-dark rounded ns-button text-nowrap MuiButton-label false muirtl-q5cu77"
                                tabindex="0"
                                type="button"
                                value="9838"
                                aria-pressed="false"
                              >
                                250
                                <span class="MuiTouchRipple-root muirtl-w0pj6f"></span>
                              </button>
                              <button
                                class="MuiButtonBase-root MuiToggleButton-root Mui-selected MuiToggleButton-sizeMedium MuiToggleButton-standard MuiToggleButtonGroup-grouped MuiToggleButtonGroup-groupedHorizontal py-1 border-0 text-dark rounded ns-button text-nowrap MuiButton-label secondary muirtl-q5cu77"
                                tabindex="0"
                                type="button"
                                value="9839"
                                aria-pressed="true"
                              >
                                500
                                <span class="MuiTouchRipple-root muirtl-w0pj6f"></span>
                              </button>
                              <button
                                class="MuiButtonBase-root MuiToggleButton-root MuiToggleButton-sizeMedium MuiToggleButton-standard MuiToggleButtonGroup-grouped MuiToggleButtonGroup-groupedHorizontal py-1 border-0 text-dark rounded ns-button text-nowrap MuiButton-label false muirtl-q5cu77"
                                tabindex="0"
                                type="button"
                                value="9840"
                                aria-pressed="false"
                              >
                                1000
                                <span class="MuiTouchRipple-root muirtl-w0pj6f"></span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p class="MuiTypography-root MuiTypography-inherit font-size-12 red-color mt-3 muirtl-1uk1gs8"></p>
                    </div>
                    <div class="w-100 product-tour-options">
                      <div class="row">
                        <div class="align-self-end py-2 col-md-4">
                          <div class="align-items-end py-3">
                            <div class="g-0 font-size-12 pb-1 pb-2 ">سرعت چاپ</div>
                            <div
                              role="group"
                              class="MuiToggleButtonGroup-root p-1 gap-1 border-black muirtl-1ya7z0e"
                            >
                              <button
                                class="MuiButtonBase-root MuiToggleButton-root Mui-selected MuiToggleButton-sizeMedium MuiToggleButton-standard MuiToggleButtonGroup-grouped MuiToggleButtonGroup-groupedHorizontal py-1 border-0 text-dark rounded ns-button text-nowrap MuiButton-label secondary muirtl-q5cu77"
                                tabindex="0"
                                type="button"
                                value="1"
                                aria-pressed="true"
                              >
                                معمولی
                                <span class="MuiTouchRipple-root muirtl-w0pj6f"></span>
                              </button>
                              <button
                                class="MuiButtonBase-root MuiToggleButton-root MuiToggleButton-sizeMedium MuiToggleButton-standard MuiToggleButtonGroup-grouped MuiToggleButtonGroup-groupedHorizontal py-1 border-0 text-dark rounded ns-button text-nowrap MuiButton-label false muirtl-q5cu77"
                                tabindex="0"
                                type="button"
                                value="2"
                                aria-pressed="false"
                              >
                                فوری
                                <span class="MuiTouchRipple-root muirtl-w0pj6f"></span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="align-self-end py-2 col-xxl-5 col-xl-6 col-lg-7 col-md-8">
                          <div class="align-items-end">
                            <div
                              role="group"
                              class="MuiToggleButtonGroup-root p-1 gap-1 border-black muirtl-1ya7z0e"
                            >
                              <button
                                class="MuiButtonBase-root MuiToggleButton-root Mui-selected MuiToggleButton-sizeMedium MuiToggleButton-standard MuiToggleButtonGroup-grouped MuiToggleButtonGroup-groupedHorizontal py-1 border-0 text-dark rounded ns-button text-nowrap MuiButton-label secondary muirtl-q5cu77"
                                tabindex="0"
                                type="button"
                                value="1"
                                aria-pressed="true"
                              >
                                یک رو
                                <span class="MuiTouchRipple-root muirtl-w0pj6f"></span>
                              </button>
                              <button
                                class="MuiButtonBase-root MuiToggleButton-root MuiToggleButton-sizeMedium MuiToggleButton-standard MuiToggleButtonGroup-grouped MuiToggleButtonGroup-groupedHorizontal py-1 border-0 text-dark rounded ns-button text-nowrap MuiButton-label false muirtl-q5cu77"
                                tabindex="0"
                                type="button"
                                value="2"
                                aria-pressed="false"
                              >
                                دو رو
                                <span class="MuiTouchRipple-root muirtl-w0pj6f"></span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="mt-3 background-element-color p-3 rounded col-md-8 col-12">
                          <span>
                            هزینه آماده سازی: <b>6 تومن</b>
                          </span>
                          
                        </div>
                      </div>
                    </div>
                    <div class="d-flex w-100 justify-content-center justify-content-md-end ">
                      <div class="ms-2">
                        <div class="wrapper">
                        <button
                      onClick={submitForm}
                      className="btn btn_file_upload "
                    >
                        شروع سفارش
                    </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Widget>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

FileUploads.propTypes = {
  onFileChange: PropTypes.func,
};

export default FileUploads;
