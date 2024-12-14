import axios from "axios";
const baseUrl = "/api/courses";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};

const updateComment = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const updateLike = (id) => {
  const request = axios.put(`${baseUrl}/${id}/likes`);
  return request.then((response) => response.data);
};

const deleteComment = (courseId, commentId) => {
  const request = axios.delete(`${baseUrl}/${courseId}/${commentId}`);
  console.log(commentId)
  return request.then((response) => response.data);
};

export default { getAll, updateComment, deleteComment, setToken, updateLike };
