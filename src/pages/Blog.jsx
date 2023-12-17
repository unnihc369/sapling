import React, { useEffect, useState } from "react";
import { UserState } from "../context/UserContext";
import Comment from "../components/Comment";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db, storage } from "../firebase";
import {
  ToastError,
  ToastInfo,
  ToastSuccess,
  ToastWarning,
} from "../utility/Toasts";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

const Blog = () => {
  const { blogFarm, user } = UserState();

  const [commentImage, setCommentImage] = useState("");
  const [comments, setComments] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comments) {
      return ToastWarning("please enter the content");
    }

    try {
      const docRef = await addDoc(collection(db, "blog"), {
        content: comments,
        farmId: blogFarm.id,
        image: commentImage,
      });
        
      ToastInfo("Comment added successfully");
      setComments('');
      setCommentImage('');
      getAllbogs(blogFarm);
    } catch (error) {
      ToastError(error.message);
    }
  };

  const [Allblogs, SetAllbogs] = useState([]);
  const getAllbogs = async (blogF) => {
    const q = query(collection(db, "blog"), where("farmId", "==", blogF.id));
    const querySnapshot = await getDocs(q);
    SetAllbogs(
      querySnapshot.docs.map((el) => {
        return el.data();
      })
    );
  };

  const onChangeFIleUploadHandler = (File) => {
    if (File === null) return;

    if (File === undefined) return ToastWarning("plese select proper image!");
    const blogRef = ref(storage, `blogPhotos/${File.name + v4()}`);

    const uploadTask = uploadBytesResumable(blogRef, File);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "paused":
            ToastError("upload paused");
            break;
          case "running":
            // ToastInfo("Running");
            console.log("running");
            break;
          default:
            break;
        }
      },
      (ere) => {
        ToastError(ere.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          ToastSuccess("Image upload successfull");
          // setProgress(null);
          setCommentImage((prev) => ({ ...prev, imageUrl: downloadUrl }));
        });
      }
    );
  };

  useEffect(() => {
    if (blogFarm) {
      getAllbogs(blogFarm);
    }
  }, []);

  return (
    <div className="bg-white">
      <h1
        style={{ textAlign: "center", marginBottom: "5px", fontSize: "30px" }}
      >
        Updates of your Farm
      </h1>

      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        style={{
          color: "black",
        }}
      >
        Click here get farm info
      </button>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                About your farm
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <article
                style={{
                  color: "black",
                }}
              >
                <img
                  src={blogFarm.data().images.imageUrl}
                  alt="Blog Post"
                  className="mb-8 w-half h-50 object-cover rounded-lg"
                />
                <div>
                  <h1 style={{ fontWeight: "bold" }}>About Farm</h1>
                  <p>FarmerName : {blogFarm.data().userName}</p>
                  <p>address :{blogFarm.data().addres} </p>
                  <p>Water Supply :{blogFarm.data().WaterSupply} </p>
                  <p>Type of Soil :{blogFarm.data().typeOfSoil} </p>
                  <p>
                    Farm Size :{blogFarm.data().farmSize} X{" "}
                    {blogFarm.data().farmSize}{" "}
                  </p>
                </div>
              </article>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                style={{
                  color: "black",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "90vw",
          height: "70vh",
          margin: "auto",
          overflowY: "scroll",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          gap: "20px",
          padding: "20px",
          backgroundColor: "blueviolet",
          marginTop: "10px",
        }}
      >
        {Allblogs.map((el) => (
          <Comment key={el.content} value={{ el }} />
        ))}
      </div>
      {user.isFarmer === "true" && (
        <form
          onSubmit={handleCommentSubmit}
          className="mt-8 p-4 bg-gray-100 rounded container"
        >
          <div className="mb-4">
            <label
              htmlFor="commentContent"
              className="block text-sm font-medium text-gray-700"
            >
              Comment
            </label>
            <textarea
              id="commentContent"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="commentImage"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL (optional)
            </label>
            <input
              type="file"
              id="commentImage"
              onChange={(e) => onChangeFIleUploadHandler(e.target.files[0])}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default Blog;
