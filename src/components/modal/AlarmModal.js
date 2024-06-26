import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { colorSystem } from "../../css/color";
import "./alarmmodalstyle.css";
import moment from "moment";

const AlarmModalStyle = styled.div`
  .alarm-modal-content {
    border: 1px solid ${colorSystem.g800};
  }

  .alarm-item {
    background-color: ${colorSystem.newAlarmC};
    border-bottom: 1px solid ${colorSystem.g800};
    padding: 15px 10px;
    padding-bottom: 20px;
  }

  .alarm-item:last-child {
    border: 0px;
  }
  .alarm-contents {
    color: ${colorSystem.g300};
  }

  .alarm-time {
    color: ${colorSystem.g600};
  }

  .alarm-none-msg {
    background-color: ${colorSystem.newAlarmC};
    color: ${colorSystem.g600};
  }
`;

const AlarmModal = ({ alarmModalCancel, isNewAlarm, alarmListArr }) => {
  const modalRef = useRef(null);
  console.log("알림 목록 : ", alarmListArr);

  // const [isNewAlarm, setIsNewAlarm] = useState(false);

  useEffect(() => {
    const handler = event => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        alarmModalCancel(false);
      }
    };

    const handleResize = () => {
      alarmModalCancel(false);
    };

    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
      window.removeEventListener("resize", handleResize);
    };
  }, [alarmModalCancel]);

  const separateLetters = word => {
    const words = word.split(" : ");
    let res = "";
    if (words[1]) {
      res = (
        <span className="alarm-contents">{`${words[0]}\n : ${words[1]}`}</span>
      );
    } else {
      res = <span className="alarm-contents">{`${words[0]}`}</span>;
    }

    return res;
  };

  return (
    <AlarmModalStyle>
      <div ref={modalRef} className="alarm-modal-wrap">
        <div className="alarm-modal-content">
          <main>
            {isNewAlarm ? (
              alarmListArr.map((item, index) => {
                return (
                  <div className="alarm-item" key={index}>
                    <span className="alarm-contents alarm-contents-none">
                      {separateLetters(item.content)}
                    </span>
                    <span className="alarm-time">
                      {/* {moment(item.createdAt).format("MM-DD")} */}
                      {moment(item.createdAt).format("YYYY-MM-DD")}
                    </span>
                  </div>
                );
              })
            ) : (
              // 알람이 없는 경우
              <div className="alarm-item-none">
                <div className="alarm-none-msg">새로운 알림이 없습니다.</div>
              </div>
            )}

            {/* <div className="alarm-item">
              <span className="alarm-contents">새로운 댓글이 추가됨</span>
              <span className="alarm-time">06/30 18:14</span>
            </div> */}
            {/* <div className="alarm-item">
              <span className="alarm-contents">새로운 일정이 추가됨</span>
              <span className="alarm-time">06/30 18:14</span>
            </div> */}
            {/* <div className="alarm-item">
              <span className="alarm-contents">새로운 일정이 추가됨</span>
              <span className="alarm-time">1년 전</span>
            </div> */}
            {/* <div className="alarm-item">
              <span className="alarm-contents">새로운 일정이 추가됨</span>
              <span className="alarm-time">5년 전</span>
            </div> */}
          </main>
        </div>
      </div>
    </AlarmModalStyle>
  );
};

export default AlarmModal;
