import React, { useEffect, useRef, useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";

const ModifyMulitifile = ({ sendFiles, setSendFiles }) => {
  // 파일 선택 태그
  const fileBt = useRef(null);

  // 이미지 미리보기 URL 관리
  const [previewFiles, setPreviewFiles] = useState([]);

  // 이미지 미리보기 JSX
  const makeThumbnail = () => {
    return previewFiles.map((item, index) => (
      <div className="write-img-contain" key={index}>
        <AiFillCloseSquare
          className="img-delete"
          onClick={() => {
            deleteFile(index);
          }}
        />
        <img src={item} alt={`preview-${index}`} />
      </div>
    ));
  };

  // 강제로 input type="file" 을 클릭한 것처럼 js 에서 실행
  const handleFileClick = () => {
    fileBt.current.click();
  };

  // 파일 목록
  const handleFileChange = e => {
    const filesArr = Array.from(e.target.files);
    setSendFiles([...sendFiles, ...filesArr]);

    const imgUrlArr = filesArr.map(item => URL.createObjectURL(item));
    setPreviewFiles([...previewFiles, ...imgUrlArr]);
  };

  // 파일 목록에서 특정 항목 삭제
  const deleteFile = _index => {
    const tempPreviewArr = previewFiles.filter(
      (item, index) => index !== _index,
    );
    setPreviewFiles(tempPreviewArr);
    const tempFileArr = sendFiles.filter((item, index) => index !== _index);
    setSendFiles(tempFileArr);
  };

  useEffect(() => {
    console.log(sendFiles);
    console.log(previewFiles);
  }, [sendFiles, previewFiles]);

  return (
    // 이미지 전체 영역
    <div className="write-img">
      {/* 이미지 보여지는 곳 */}
      <div className="write-img-inner">
        <div className="write-img-contain">{makeThumbnail()}</div>
      </div>
      <button className="img-upload" type="button">
        <label htmlFor="input-file" onClick={handleFileClick}>
          <span>이미지 업로드</span>
          <input
            type="file"
            className="img-upload-bt"
            accept="image/*"
            required
            multiple
            ref={fileBt}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>
      </button>
    </div>
  );
};

export default ModifyMulitifile;