import axios from "axios";

// 삭제페이지 목록 불러오기
export const getDeleteList = async _id => {
  try {
    const response = await axios.get(
      `/api/board/deleted?signed_user_id=${_id}`,
    );
    const status = response.status.toString().charAt(0);
    // console.log("resopnse : ", response);
    if (status === "2") {
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};

// 복원 3 > 1 상태변경
export const patchDeleteList = async selectedBoardId => {
  try {
    const response = await axios.patch(`/api/board/state`, selectedBoardId);
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};

// 영구삭제
export const deleteRemoveList = async selectedCalendarId => {
  try {
    const response = await axios.delete(`/api/board`, {
      data: selectedCalendarId,
    });
    const status = response.status.toString().charAt(0);
    if (status === "2") {
      return response.data;
    } else {
      alert("API 오류발생 status 확인해주세요");
    }
  } catch (error) {
    console.log(error);
  }
};
